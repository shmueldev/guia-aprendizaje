---
id: alembic
title: Alembic
sidebar_label: 3.3
description: Apuntes de FastAPI hasta la fase 3.
slug: /fastapi/notas/alembic
---

# 3.3 Migraciones de base de datos con Alembic

En esta sección aprendo a gestionar la evolución del esquema de mi base de datos con Alembic. Creo revisiones para registrar los cambios, las reviso antes de aplicarlas y procuro conservar los datos existentes durante las actualizaciones.

## 1. Qué problema resuelve Alembic

`Base.metadata.create_all()` es útil al comenzar un proyecto o preparar un prototipo: crea las tablas que todavía no existen. Sin embargo, no actualiza las tablas existentes cuando cambio mis modelos. Si agrego una columna a una clase después de haber creado la tabla, `create_all()` no añade esa columna a la base de datos.

Cuando el esquema evoluciona, borrar la base para volver a crearla puede destruir datos. Aplicar cambios manuales directamente también puede dejar distintos entornos con esquemas diferentes. Para gestionar esos cambios uso Alembic.

Una migración registra una transición entre versiones del esquema, de forma parecida al control de versiones del código:

- `upgrade()` aplica el cambio y avanza el esquema.
- `downgrade()` intenta revertirlo y regresar a una versión anterior.

Una reversión no siempre puede recuperar datos que se hayan eliminado o transformado. Reviso qué hace cada `downgrade()` y mantengo respaldos adecuados antes de aplicar cambios importantes.

## 2. Instalación y configuración

Instalo Alembic en el entorno virtual del proyecto y, desde la raíz donde está mi aplicación, inicializo el entorno de migraciones:

```powershell
pip install alembic
alembic init alembic
```

La estructura creada incluye la configuración y el entorno de ejecución de Alembic, además de la carpeta donde se guardan las revisiones:

```text
alembic.ini
alembic/
    env.py
    README
    script.py.mako
    versions/
```

Cada revisión nueva se guarda como un archivo Python dentro de `alembic/versions/`. Mantengo esos archivos bajo control de versiones junto con el código de la aplicación.

### Configurar `alembic.ini`

En `alembic.ini` configuro la URL de conexión que Alembic necesita. Para SQLite síncrono, por ejemplo:

```ini
sqlalchemy.url = sqlite:///./app.db
```

En un proyecto real, evito dejar credenciales en el repositorio. Puedo cargar la URL desde variables de entorno en `env.py` o configurar el entorno de ejecución para proporcionar una URL segura.

### Conectar Alembic con mis modelos

Para generar revisiones comparando los modelos con la base de datos, Alembic necesita acceder a sus metadatos. En `alembic/env.py` importo mi `Base` y mis modelos, y asigno `Base.metadata` a `target_metadata`:

```python
from alembic import context
from database import Base
import models

config = context.config
target_metadata = Base.metadata
```

Importo `models` aunque no lo use directamente en el fragmento: esa importación registra las clases de modelo en `Base.metadata`. Si no se importan, Alembic puede no detectar sus tablas y proponer una revisión vacía o incompleta.

Conservo el resto de la plantilla generada en `env.py`, que define cómo ejecutar migraciones fuera de línea y en línea. Ajusto la lectura de la URL y la configuración de logging según la estructura de mi proyecto.

## 3. Configuración para motores asíncronos

Si la aplicación usa SQLAlchemy asíncrono, puedo inicializar la plantilla asíncrona de Alembic:

```powershell
alembic init -t async alembic
```

La plantilla configura la ejecución en línea para conectar con un driver asíncrono. La URL debe corresponder al driver instalado; por ejemplo:

```ini
sqlalchemy.url = sqlite+aiosqlite:///./app.db
```

Para PostgreSQL con `asyncpg`, la URL tiene una forma similar a `postgresql+asyncpg://...`. También en la configuración asíncrona importo los modelos y asigno `target_metadata = Base.metadata`. La plantilla asíncrona no cambia el diseño de las revisiones: sus funciones `upgrade()` y `downgrade()` siguen usando la API de migraciones de Alembic.

## 4. Flujo de trabajo

### 1. Creo una revisión

Después de modificar mis modelos, pido a Alembic que compare los metadatos con el esquema de la base de datos y proponga una revisión:

```powershell
alembic revision --autogenerate -m "agregar tabla de usuarios"
```

La autogeneración es una ayuda, no una garantía. Puede omitir cambios o interpretar ciertos cambios de forma incorrecta, como un renombre de columna.

### 2. Reviso el archivo generado

Antes de aplicar una revisión, abro el archivo nuevo en `alembic/versions/` y verifico:

- Que `upgrade()` haga exactamente los cambios que necesito.
- Que `downgrade()` revierta esos cambios de forma aceptable.
- Que no se eliminen columnas o datos por una detección incorrecta.
- Que restricciones, índices, valores por defecto y dependencias estén contemplados.

Si la revisión no refleja mi intención, la corrijo manualmente antes de aplicarla.

### 3. Aplico o revierto revisiones

Para aplicar todas las migraciones pendientes hasta la última revisión:

```powershell
alembic upgrade head
```

Para retroceder una revisión:

```powershell
alembic downgrade -1
```

Antes de revertir, compruebo el `downgrade()` correspondiente: puede eliminar columnas o descartar datos que no se puedan reconstruir. En entornos importantes, hago respaldo y pruebo el procedimiento en un entorno similar antes de ejecutarlo en producción.

### 4. Consulto el estado

Uso estos comandos para inspeccionar las revisiones y el estado de la base de datos:

```powershell
alembic history
alembic current
```

`history` muestra las revisiones disponibles en el proyecto. `current` muestra la revisión que Alembic registra como aplicada en la base de datos configurada.

## 5. Cambios sin perder datos

### Agregar una columna a una tabla con datos

Si agrego una columna obligatoria a una tabla que ya contiene filas, debo decidir qué valor tendrán las filas existentes. Una opción es definir un valor por defecto en el servidor:

```python
status: Mapped[str] = mapped_column(
    String(20),
    nullable=False,
    server_default="active",
)
```

Después de generar la revisión, compruebo que el `upgrade()` incluye el valor por defecto apropiado para el motor de base de datos. En tablas grandes o aplicaciones con requisitos estrictos, puedo aplicar el cambio en etapas: agregar la columna permitiendo nulos, rellenar los datos existentes, y luego establecer `NOT NULL`. Así controlo mejor el backfill y el impacto del cambio.

Distingo `server_default`, que se aplica en la base de datos, de un valor por defecto de Python que solo se activa cuando la aplicación crea objetos mediante SQLAlchemy.

### Renombrar una columna

La autogeneración normalmente no puede saber que eliminé un atributo y añadí otro con un nombre distinto. Puede proponer eliminar la columna anterior y crear una nueva, lo que perdería los valores existentes.

Si el cambio es realmente un renombre, reviso la migración y reemplazo las operaciones de eliminación y creación por un renombre explícito:

```python
from alembic import op
import sqlalchemy as sa


def upgrade() -> None:
    op.alter_column(
        "users",
        "username",
        new_column_name="login_name",
        existing_type=sa.String(length=50),
    )


def downgrade() -> None:
    op.alter_column(
        "users",
        "login_name",
        new_column_name="username",
        existing_type=sa.String(length=50),
    )
```

Compruebo que el dialecto de mi base de datos soporte la operación y que la revisión incluya el tipo existente cuando sea necesario. No aplico un `drop_column()` seguido de `add_column()` si mi intención es conservar los datos y renombrar el campo.

### Migrar datos dentro de una revisión

Algunas revisiones cambian los datos además del esquema. Por ejemplo, puedo añadir una columna nullable, rellenarla combinando valores anteriores y decidir después si debe ser obligatoria:

```python
from alembic import op
import sqlalchemy as sa


def upgrade() -> None:
    op.add_column(
        "users",
        sa.Column("full_name", sa.String(), nullable=True),
    )
    op.execute(
        "UPDATE users "
        "SET full_name = first_name || ' ' || last_name "
        "WHERE full_name IS NULL"
    )


def downgrade() -> None:
    op.drop_column("users", "full_name")
```

La expresión de concatenación puede depender del motor de base de datos, así que la verifico contra el dialecto que uso. También tengo en cuenta que este `downgrade()` elimina los valores de `full_name`; no puede deshacer la combinación y recuperar exactamente el estado original si alguien modificó esos datos después.

## 6. Puntos que retengo

- Uso `create_all()` para crear tablas que aún no existen, no para versionar cambios del esquema.
- Mantengo las revisiones de Alembic en el repositorio y conecto `target_metadata` con los metadatos de los modelos.
- Trato `--autogenerate` como una propuesta que siempre reviso antes de aplicar.
- Verifico los efectos de `upgrade()` y `downgrade()`, especialmente si podrían eliminar o transformar datos.
- Planifico los cambios en columnas obligatorias, renombres y migraciones de datos para conservar los valores existentes.
