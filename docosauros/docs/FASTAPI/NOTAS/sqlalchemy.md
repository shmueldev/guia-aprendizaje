---
id: sqlalchemy
title: SQLAlchemy 2.0
sidebar_label: 3.2
description: Apuntes de FastAPI hasta la fase 3.
slug: /fastapi/notas/sqlalchemy
---

# 3.2 ORM con SQLAlchemy 2.0 / SQLModel

En esta sección aprendo a conectar una aplicación FastAPI con una base de datos usando un ORM. Empiezo con SQLAlchemy 2.0 en modo síncrono, incorporo relaciones y consultas eficientes, y después reviso cómo cambia el trabajo con `AsyncSession`. Al final comparo SQLAlchemy con SQLModel.

> Para seguir los ejemplos, uso la sintaxis moderna de SQLAlchemy 2.0: modelos con `Mapped` y `mapped_column()`, y consultas construidas con `select()`. Evito copiar tutoriales antiguos que usan `Column()` o `session.query()`.

## 1. Qué es un ORM

Un ORM (Object-Relational Mapper) conecta el modelo relacional de una base de datos con objetos de Python. Una tabla se representa mediante una clase y cada fila mediante una instancia. Así puedo trabajar con objetos sin escribir SQL para cada operación:

```python
user = session.get(User, 1)
```

La línea anterior busca por clave primaria, de forma equivalente a una consulta SQL como `SELECT ... WHERE id = 1`.

### Productividad y control del SQL

| Criterio | ORM, como SQLAlchemy o SQLModel | SQL escrito directamente |
| --- | --- | --- |
| Productividad | Me permite definir modelos y reutilizar operaciones comunes de lectura y escritura. | Tengo que escribir o construir las consultas de forma explícita. |
| Control | El ORM genera SQL; puedo inspeccionarlo, ajustar la consulta o usar SQL explícito cuando haga falta. | Decido exactamente qué SQL se ejecuta. |
| Rendimiento | La traducción entre objetos y filas tiene un coste, y una carga mal elegida puede generar consultas N+1. | Evito parte del coste de mapeo, aunque sigo teniendo que diseñar consultas eficientes. |
| Seguridad | Las expresiones del ORM parametrizan los valores habituales de las consultas. | Debo parametrizar los valores; concatenar datos en una consulta puede abrir una inyección SQL. |

En una aplicación habitual, puedo usar SQLAlchemy para la mayoría de las operaciones y SQL parametrizado para consultas que requieran control específico. Un ORM no garantiza por sí solo consultas eficientes ni hace que una aplicación sea más segura si escribo SQL inseguro.

### Cómo reconozco la sintaxis antigua

En código antiguo puedo encontrar `Column()` para declarar campos y `session.query()` para consultar. En el estilo 2.0 uso `mapped_column()` y `select()`:

```python
# Estilo antiguo
id = Column(Integer, primary_key=True)
users = session.query(User).filter(User.email == email).all()

# Estilo SQLAlchemy 2.0
id: Mapped[int] = mapped_column(primary_key=True)
users = session.execute(
    select(User).where(User.email == email)
).scalars().all()
```

La API `session.query()` sigue existiendo por compatibilidad en SQLAlchemy 2.x, pero en estos apuntes uso `select()` para mantener un solo estilo y facilitar la transición a consultas asíncronas. La sintaxis de consulta no vuelve asíncrona una operación por sí sola: para eso necesito un motor asíncrono y `AsyncSession`.

## 2. SQLAlchemy 2.0 síncrono

Empiezo con la versión síncrona porque permite entender modelos, sesiones y transacciones sin añadir todavía `async` y `await`. FastAPI puede ejecutar endpoints síncronos; si uso operaciones síncronas de base de datos, estas ocupan un hilo mientras esperan la respuesta de la base de datos.

### Motor y base declarativa

`create_engine()` crea el motor, que administra la conexión con la base de datos. Para empezar, uso SQLite, que guarda los datos en un archivo:

```python
# database.py
from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker

DATABASE_URL = "sqlite:///./app.db"

engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False},
)
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)


class Base(DeclarativeBase):
    pass
```

La opción `check_same_thread=False` es necesaria para este uso común de SQLite con FastAPI. No la necesito para PostgreSQL. En una aplicación real, guardo la URL de conexión en la configuración del entorno, no en el código fuente.

### Modelos con `Mapped` y `mapped_column`

Declaro cada tabla como una clase que hereda de `Base`. Los tipos dentro de `Mapped[...]` describen los valores que maneja Python; `mapped_column()` configura la columna SQL correspondiente.

```python
# models.py
from typing import Optional

from sqlalchemy import ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from database import Base


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    username: Mapped[str] = mapped_column(String(50), unique=True, index=True)
    email: Mapped[str] = mapped_column(String(255), unique=True)
    items: Mapped[list["Item"]] = relationship(back_populates="owner")


class Item(Base):
    __tablename__ = "items"

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(200), index=True)
    description: Mapped[Optional[str]] = mapped_column(default=None)
    owner_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"))
    owner: Mapped["User"] = relationship(back_populates="items")
```

Con `Mapped[str]` indico un valor requerido y, por convención, una columna no nula. Con `Mapped[Optional[str]]` indico que el valor puede ser `None` y, por tanto, nulo. También puedo configurar explícitamente opciones como `nullable`, `unique`, `index` y `default` en `mapped_column()`.

Para crear las tablas durante el desarrollo, importo los modelos antes de llamar a `create_all()` para que SQLAlchemy conozca sus tablas:

```python
# create_tables.py
from database import Base, engine
import models

Base.metadata.create_all(bind=engine)
```

`create_all()` sirve para prototipos y aprendizaje; no sustituye a una herramienta de migraciones cuando el esquema evoluciona.

### Sesiones y una sesión por petición

Una `Session` representa una unidad de trabajo con la base de datos: mantiene una transacción y un mapa de los objetos que estoy modificando. No comparto una sesión global entre peticiones. Creo una sesión para cada petición y la cierro al terminar:

```python
# dependencies.py
from collections.abc import Generator

from sqlalchemy.orm import Session

from database import SessionLocal


def get_db() -> Generator[Session, None, None]:
    with SessionLocal() as session:
        yield session
```

FastAPI puede inyectar esta dependencia con `Depends(get_db)`. El bloque `with` cierra la sesión incluso si ocurre un error durante la petición.

### CRUD síncrono con FastAPI

En estos endpoints llamo `db` al objeto `Session`; por eso `db.add()`, `db.get()` y `db.delete()` son las llamadas `session.add()`, `session.get()` y `session.delete()` del temario. `commit()` confirma la transacción. Si algo falla, `rollback()` revierte los cambios pendientes. Después de insertar, `refresh()` permite obtener valores generados por la base de datos, como el identificador.

```python
# main.py
from fastapi import Depends, FastAPI, HTTPException, status
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from dependencies import get_db
import models

app = FastAPI()


@app.post("/users/", status_code=status.HTTP_201_CREATED)
def create_user(username: str, email: str, db: Session = Depends(get_db)):
    user = models.User(username=username, email=email)
    db.add(user)
    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=409, detail="El usuario o el email ya existen")
    db.refresh(user)
    return user


@app.get("/users/{user_id}")
def read_user(user_id: int, db: Session = Depends(get_db)):
    user = db.get(models.User, user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return user


@app.get("/users/")
def read_users(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    stmt = select(models.User).offset(skip).limit(limit)
    return db.execute(stmt).scalars().all()


@app.put("/users/{user_id}")
def update_user_email(user_id: int, new_email: str, db: Session = Depends(get_db)):
    user = db.get(models.User, user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    user.email = new_email
    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=409, detail="El email ya está en uso")
    db.refresh(user)
    return user


@app.delete("/users/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_user(user_id: int, db: Session = Depends(get_db)):
    user = db.get(models.User, user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    db.delete(user)
    db.commit()


@app.post("/users/{user_id}/items/", status_code=status.HTTP_201_CREATED)
def create_item_for_user(
    user_id: int,
    title: str,
    description: str | None = None,
    db: Session = Depends(get_db),
):
    user = db.get(models.User, user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    item = models.Item(title=title, description=description, owner=user)
    db.add(item)
    db.commit()
    db.refresh(item)
    return item
```

Uso `db.get(Model, id)` cuando busco por clave primaria. Para filtros y otras consultas uso `select()`. Al ejecutar `select(Model)`, `scalars()` extrae los objetos del resultado y `all()` los reúne en una lista.

## 3. Relaciones y carga de datos

### `relationship()` y `back_populates`

En el ejemplo, un usuario puede tener muchos artículos. `ForeignKey("users.id")` define la relación en la base de datos y `relationship()` permite navegar entre los objetos de Python. `back_populates` vincula ambos lados: `user.items` y `item.owner`.

Puedo crear el artículo asignando `owner=user`, como en el endpoint anterior, o asignando `owner_id=user_id`. La primera forma mantiene la relación entre objetos de manera explícita durante la unidad de trabajo.

### Carga perezosa, N+1 y carga anticipada

La carga perezosa (*lazy loading*) consulta una relación cuando accedo a ella. Si primero traigo muchos usuarios y luego accedo a `user.items` para cada uno, puedo provocar el problema N+1: una consulta para los usuarios y otra consulta por cada usuario.

Para cargar una colección de manera anticipada, uso `selectinload()`. Para una relación de un objeto hacia otro, puedo usar `joinedload()`:

```python
from sqlalchemy import select
from sqlalchemy.orm import joinedload, selectinload

# Dos consultas típicamente: usuarios y sus artículos mediante IN (...)
stmt = select(User).options(selectinload(User.items))
users = session.execute(stmt).scalars().all()

# Una consulta con JOIN para traer cada artículo y su propietario
stmt = select(Item).options(joinedload(Item.owner))
items = session.execute(stmt).scalars().all()
```

`selectinload()` suele ser una buena opción para colecciones. `joinedload()` puede ser útil para relaciones de muchos a uno o uno a uno. Si uso `joinedload()` con una colección, el JOIN puede repetir filas del objeto principal; en ese caso, SQLAlchemy requiere que elimine duplicados con `unique()`:

```python
stmt = select(User).options(joinedload(User.items))
users = session.execute(stmt).unique().scalars().all()
```

## 4. SQLAlchemy asíncrono

El modo asíncrono permite que el servidor atienda otras tareas mientras una operación de entrada/salida espera. No hace que una consulta individual sea automáticamente más rápida; su beneficio depende de la carga y de que el resto del camino de entrada/salida también sea compatible con `async`.

Para usarlo necesito un driver asíncrono. Por ejemplo, uso `aiosqlite` con SQLite o `asyncpg` con PostgreSQL. Instalo el driver correspondiente y utilizo una URL como `sqlite+aiosqlite:///./app.db` o `postgresql+asyncpg://usuario:clave@host/base`.

### Motor, fábrica de sesiones y dependencia

```python
# database_async.py
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine

from database import Base

DATABASE_URL = "sqlite+aiosqlite:///./app.db"

async_engine = create_async_engine(DATABASE_URL)
AsyncSessionLocal = async_sessionmaker(
    bind=async_engine,
    class_=AsyncSession,
    expire_on_commit=False,
)
```

En una aplicación real, mantengo una sola definición de `Base` y la comparto entre la configuración síncrona o asíncrona que elija; no defino dos bases distintas para los mismos modelos.

La dependencia asíncrona abre y cierra una sesión por petición:

```python
# dependencies_async.py
from collections.abc import AsyncGenerator

from sqlalchemy.ext.asyncio import AsyncSession

from database_async import AsyncSessionLocal


async def get_db() -> AsyncGenerator[AsyncSession, None]:
    async with AsyncSessionLocal() as session:
        yield session
```

### CRUD con `AsyncSession`

Las llamadas a la base de datos que realizan entrada/salida llevan `await`. `add()` solo registra el objeto en la sesión, por eso no se espera con `await`; `delete()` sí es asíncrono en `AsyncSession`.

```python
from fastapi import Depends, FastAPI, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from dependencies_async import get_db
import models

app = FastAPI()


@app.post("/users/", status_code=status.HTTP_201_CREATED)
async def create_user(username: str, email: str, db: AsyncSession = Depends(get_db)):
    user = models.User(username=username, email=email)
    db.add(user)
    await db.commit()
    await db.refresh(user)
    return user


@app.get("/users/{user_id}")
async def read_user(user_id: int, db: AsyncSession = Depends(get_db)):
    user = await db.get(models.User, user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return user


@app.get("/users/")
async def read_users(db: AsyncSession = Depends(get_db)):
    stmt = select(models.User).options(selectinload(models.User.items))
    result = await db.execute(stmt)
    return result.scalars().all()


@app.delete("/users/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_user(user_id: int, db: AsyncSession = Depends(get_db)):
    user = await db.get(models.User, user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    await db.delete(user)
    await db.commit()
```

Para actualizar un objeto, obtengo la instancia, cambio sus atributos y hago `await db.commit()`. Si una operación falla después de iniciar una transacción, hago `await db.rollback()` antes de reutilizar la sesión.

### Precaución con la carga perezosa en async

No debo asumir que puedo acceder a una relación no cargada dentro de una función asíncrona. SQLAlchemy no puede iniciar de forma implícita esa operación de entrada/salida al evaluar `user.items`; puede producir un error como `MissingGreenlet`. Cargo las relaciones necesarias en la consulta, por ejemplo con `selectinload()`, o utilizo una estrategia explícita compatible con async.

Para crear las tablas con un motor asíncrono, puedo ejecutar la operación síncrona de metadatos dentro de la conexión asíncrona:

```python
async with async_engine.begin() as connection:
    await connection.run_sync(Base.metadata.create_all)
```

## 5. SQLModel como alternativa

SQLModel, creado por el autor de FastAPI, combina modelos de datos de Pydantic con la integración ORM de SQLAlchemy. Puede reducir la duplicación en una aplicación pequeña, aunque no elimina todas las decisiones de diseño.

```python
from sqlmodel import Field, Relationship, SQLModel


class Team(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str = Field(index=True, max_length=100)
    heroes: list["Hero"] = Relationship(back_populates="team")


class Hero(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str
    secret_name: str
    team_id: int | None = Field(default=None, foreign_key="team.id")
    team: Team | None = Relationship(back_populates="heroes")
```

### Cuándo lo elijo y cuáles son sus límites

- Lo considero para CRUDs directos, prototipos y equipos pequeños cuando los datos de persistencia y los de la API son parecidos.
- Elijo SQLAlchemy puro cuando necesito separar claramente los modelos de base de datos de los esquemas de entrada y salida, o cuando necesito controlar patrones ORM avanzados.
- En ambos casos separo los esquemas de creación y respuesta cuando la API no debe exponer todos los campos guardados. Por ejemplo, no devuelvo una contraseña aunque la reciba al registrar una cuenta.
- SQLModel usa SQLAlchemy, pero su versión debe ser compatible con las versiones de sus dependencias. También reviso si sus abstracciones cubren las necesidades concretas del proyecto.

## 6. Consultas eficientes

### Paginación con `offset()` y `limit()`

La paginación limita las filas que solicito a la base de datos. Para una página numerada, calculo el desplazamiento y aplico `limit()` y `offset()`:

```python
from sqlalchemy import select
from sqlalchemy.orm import Session


def get_users_page(session: Session, page: int = 1, page_size: int = 10):
    offset = (page - 1) * page_size
    stmt = select(User).order_by(User.id).offset(offset).limit(page_size)
    return session.execute(stmt).scalars().all()
```

Valido que `page` y `page_size` sean positivos y limito el tamaño máximo en el endpoint. Añado un orden estable para que los registros no cambien de página de forma impredecible.

### Filtros dinámicos y búsqueda con `where()` e `ilike()`

Puedo construir una consulta base y añadir condiciones solo cuando recibo los filtros:

```python
from sqlalchemy import select
from sqlalchemy.orm import Session


def search_heroes(
    session: Session,
    query_name: str | None = None,
    team_id: int | None = None,
):
    stmt = select(Hero)

    if query_name:
        stmt = stmt.where(Hero.name.ilike(f"%{query_name}%"))
    if team_id is not None:
        stmt = stmt.where(Hero.team_id == team_id)

    return session.execute(stmt).scalars().all()
```

`ilike()` realiza una búsqueda que no distingue mayúsculas en motores que la soportan. El comportamiento exacto puede variar según el motor de base de datos. Las expresiones de SQLAlchemy parametrizan los valores; no construyo SQL concatenando directamente datos recibidos por la API.

### Conteos y agregaciones con `func.count`

Cuando necesito el total de resultados para los metadatos de paginación, delego el conteo a la base de datos:

```python
from sqlalchemy import func, select
from sqlalchemy.orm import Session


def count_heroes_by_team(session: Session, team_id: int) -> int:
    stmt = select(func.count(Hero.id)).where(Hero.team_id == team_id)
    return session.execute(stmt).scalar_one()
```

### Listado paginado con total

Aplico los mismos filtros a la consulta de resultados y a la consulta de conteo:

```python
from fastapi import Depends, FastAPI, Query
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from dependencies import get_db
import models

app = FastAPI()


@app.get("/heroes/")
def list_heroes(
    search: str | None = None,
    page: int = Query(default=1, ge=1),
    size: int = Query(default=10, ge=1, le=100),
    db: Session = Depends(get_db),
):
    stmt = select(models.Hero)
    count_stmt = select(func.count(models.Hero.id))

    if search:
        condition = models.Hero.name.ilike(f"%{search}%")
        stmt = stmt.where(condition)
        count_stmt = count_stmt.where(condition)

    total = db.execute(count_stmt).scalar_one()
    offset = (page - 1) * size
    heroes = db.execute(
        stmt.order_by(models.Hero.id).offset(offset).limit(size)
    ).scalars().all()

    return {
        "items": heroes,
        "total": total,
        "page": page,
        "size": size,
        "pages": (total + size - 1) // size,
    }
```

Con este patrón la base de datos filtra, pagina y cuenta los registros. Evito cargar toda la tabla en Python para después descartar filas en memoria.

## 7. Puntos que retengo

- Uso `Mapped` y `mapped_column()` para declarar modelos en el estilo 2.0.
- Uso `session.get(Model, id)` para buscar por clave primaria y `select()` para el resto de consultas.
- Creo una sesión por petición y cierro o revierto la transacción según corresponda.
- Elijo estrategias de carga explícitas para evitar consultas N+1 y para acceder a relaciones con `AsyncSession`.
- El modo asíncrono requiere un driver asíncrono y operaciones `await`; no es una sustitución automática que siempre mejore el rendimiento.
- Uso paginación, filtros y agregaciones en la base de datos en lugar de procesar conjuntos grandes en memoria.
