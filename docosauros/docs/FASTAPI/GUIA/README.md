---
id: fastapi
title: FastAPI
sidebar_label: FastAPI
description: Plan de aprendizaje completo de FastAPI, desde Python moderno hasta producción.
slug: /fastapi
---

# 🚀 Plan de Aprendizaje Completo: FastAPI

> **Objetivo:** Dominar el desarrollo de APIs profesionales con FastAPI, desde los fundamentos de Python moderno hasta el despliegue en producción, incluyendo visualización interactiva con Dash.
>
> **Metodología sugerida:** Cada fase incluye teoría + práctica. No avances a la siguiente fase sin haber construido al menos un mini-proyecto con lo aprendido. Marca los checkboxes `[ ]` conforme avances.

---

## 📋 Índice

1. [Fase 1: Fundamentos de Python Moderno](#-fase-1-fundamentos-de-python-moderno)
2. [Fase 2: Desarrollo de APIs con FastAPI](#-fase-2-desarrollo-de-apis-con-fastapi)
3. [Fase 3: Persistencia de Datos y ORM](#️-fase-3-persistencia-de-datos-y-orm)
4. [Fase 4: Consumo de APIs Externas, Concurrencia y Seguridad](#-fase-4-consumo-de-apis-externas-concurrencia-y-seguridad)
5. [Fase 5: Arquitectura de Software y Calidad](#️-fase-5-arquitectura-de-software-y-calidad)
6. [Fase 6: Visualización Interactiva con Dash](#-fase-6-visualización-interactiva-con-dash)
7. [Fase 7: Despliegue y Producción](#-fase-7-despliegue-y-producción)
8. [Proyectos Integradores](#-proyectos-integradores-sugeridos)

---

## 🐍 Fase 1: Fundamentos de Python Moderno

> **Meta de la fase:** Escribir Python tipado y entender el modelo asíncrono antes de tocar FastAPI. FastAPI está construido *sobre* estos dos pilares.

### 1.1 Tipado de Datos Estático (Type Hints)

- [ ] **Tipos básicos**
  - `int`, `float`, `str`, `bool`, `bytes`, `None`
  - Anotación de variables: `edad: int = 30`
  - Anotación de funciones: parámetros y valor de retorno (`def suma(a: int, b: int) -> int:`)
- [ ] **Colecciones tipadas**
  - `list[int]` / `List[int]` (sintaxis moderna vs. módulo `typing`)
  - `dict[str, float]` / `Dict[str, float]`
  - `tuple[int, str]`, `set[str]`
  - Colecciones anidadas: `list[dict[str, list[int]]]`
- [ ] **Tipos avanzados**
  - `Optional[str]` — equivale a `str | None` (clave para campos opcionales en APIs)
  - `Union[int, str]` — sintaxis moderna `int | str`
  - `Callable[[int, int], int]` — funciones como parámetros
  - `Any` — cuándo usarlo y por qué evitarlo
  - `Literal["activo", "inactivo"]` — valores restringidos
  - `TypedDict` y `NamedTuple` — diccionarios/tuplas con estructura fija
  - `Annotated[str, ...]` — **crítico**: es la sintaxis que FastAPI usa para metadatos de parámetros
- [ ] **Herramientas de verificación**
  - `mypy` o `pyright` para chequear tipos estáticamente
  - Configuración del type checker en el editor (VS Code / Cursor)
- [ ] 🧪 **Práctica:** Refactoriza un script viejo tuyo agregando type hints completos y pásalo por `mypy`.

### 1.2 Programación Asíncrona (`async` / `await`)

- [ ] **Conceptos previos**
  - I/O-bound vs. CPU-bound: por qué la asincronía solo ayuda en el primero
  - Bloqueo: qué significa que una operación "bloquee" el hilo
- [ ] **El Event Loop (bucle de eventos)**
  - Qué es y cómo orquesta las tareas
  - La analogía del "mesero": un solo hilo atiende miles de clientes si delega las esperas (no se queda parado frente a la cocina)
  - `asyncio.run()` como punto de entrada
- [ ] **Funciones síncronas vs. asíncronas**
  - `def` vs. `async def`: qué devuelve cada una (valor vs. corrutina)
  - `await`: ceder el control al event loop mientras se espera
  - Errores comunes: olvidar `await`, llamar código bloqueante dentro de `async def`
  - `asyncio.sleep()` vs. `time.sleep()` (el ejemplo canónico de bloqueo)
- [ ] **Concurrencia con asyncio**
  - `asyncio.gather()`: disparar varias corrutinas a la vez y esperar todos los resultados
  - `asyncio.create_task()`: lanzar tareas en segundo plano
  - `asyncio.wait_for()` y timeouts
  - `asyncio.Semaphore`: limitar el número de tareas simultáneas
  - Manejo de excepciones en tareas concurrentes (`return_exceptions=True`)
- [ ] 🧪 **Práctica:** Script que descarga 10 URLs: primero secuencial con `time.sleep`, luego concurrente con `asyncio.gather`. Mide y compara tiempos.

---

## ⚡ Fase 2: Desarrollo de APIs con FastAPI

> **Meta de la fase:** Recibir, validar y responder datos correctamente. Aquí todo es lineal y lógico: es la base sólida de todo lo demás.

### 2.1 Primeros Pasos

- [ ] **Setup del proyecto**
  - Entorno virtual (`venv` o `uv`), instalación de `fastapi` y `uvicorn`
  - Primera app: `app = FastAPI()` + `uvicorn main:app --reload`
  - Documentación automática: Swagger UI (`/docs`) y ReDoc (`/redoc`)
  - Qué es OpenAPI y por qué FastAPI lo genera gratis

### 2.2 Rutas y Parámetros (Endpoints y Métodos HTTP)

- [ ] **Métodos HTTP y su semántica**
  - `GET` — leer recursos (sin efectos secundarios)
  - `POST` — crear recursos
  - `PUT` / `PATCH` — actualizar (reemplazo total vs. parcial)
  - `DELETE` — eliminar recursos
  - Convenciones REST: nombres de rutas en plural (`/usuarios`, `/productos/{id}`)
- [ ] **Path Parameters (parámetros de ruta)**
  - Declaración: `@app.get("/items/{item_id}")`
  - Tipado y conversión automática (`item_id: int`)
  - Validaciones con `Path()`: `gt`, `ge`, `lt`, `le`
  - Orden de las rutas: rutas fijas antes que rutas con parámetros
  - Enums como path parameters (valores predefinidos)
- [ ] **Query Parameters (parámetros de consulta)**
  - Parámetros opcionales con valores por defecto (`?skip=0&limit=10`)
  - Validaciones con `Query()`: `min_length`, `max_length`, `pattern` (regex)
  - Parámetros múltiples: `list[str]` en query
  - `Annotated[int, Query(ge=1)]` — la forma moderna recomendada
- [ ] **Request Body (cuerpo de la petición)**
  - Recibir JSON con modelos Pydantic
  - Combinar path + query + body en un mismo endpoint
  - `Body()`, campos embebidos y múltiples modelos en el body
- [ ] **Otros tipos de entrada**
  - Headers (`Header()`) y Cookies (`Cookie()`)
  - Formularios (`Form()`) y subida de archivos (`File()`, `UploadFile`)

### 2.3 Modelado y Validación con Pydantic

- [ ] **Creación de esquemas (`BaseModel`)**
  - Definir modelos con campos tipados
  - Campos obligatorios vs. opcionales (`Optional` / valores por defecto)
  - Modelos anidados (un modelo dentro de otro)
  - Tipos especiales: `EmailStr`, `HttpUrl`, `datetime`, `UUID`, `Decimal`
- [ ] **Validación automática**
  - Coerción de tipos (str `"5"` → int `5`) y modo estricto
  - Restricciones con `Field()`: `min_length`, `gt`, `default`, `description`, `examples`
  - Errores 422 automáticos: leer y entender el detalle del error
- [ ] **Validaciones personalizadas**
  - `@field_validator` — validar un campo individual (ej. password fuerte)
  - `@model_validator` — validar relaciones entre campos (ej. `password == confirm_password`)
  - Lanzar `ValueError` con mensajes claros
- [ ] **Serialización de datos**
  - `.model_dump()` y `.model_dump_json()` (Pydantic v2)
  - `response_model`: controlar qué devuelve el endpoint (ej. nunca devolver el password)
  - `response_model_exclude_unset`, alias de campos (`camelCase` ↔ `snake_case`)
  - Patrón de esquemas: `UserCreate` (entrada), `UserRead` (salida), `UserUpdate` (parcial)
- [ ] **Configuración de modelos**
  - `model_config` / `ConfigDict`: `from_attributes=True` (clave para ORM más adelante)

### 2.4 Respuestas y Códigos de Estado (HTTP Status Codes)

- [ ] **Códigos esenciales y cuándo usarlos**
  - `200 OK` — lectura/operación exitosa
  - `201 Created` — recurso creado (respuesta de POST)
  - `204 No Content` — éxito sin cuerpo (respuesta típica de DELETE)
  - `400 Bad Request` — petición inválida por lógica de negocio
  - `401 Unauthorized` vs. `403 Forbidden` — no autenticado vs. sin permisos
  - `404 Not Found` — recurso inexistente
  - `409 Conflict` — conflicto (ej. email ya registrado)
  - `422 Unprocessable Entity` — el que Pydantic lanza automáticamente
  - `500 Internal Server Error` — errores no controlados
- [ ] **Control de respuestas en FastAPI**
  - `status_code=status.HTTP_201_CREATED` en el decorador
  - `JSONResponse`, `Response`, `RedirectResponse`, `FileResponse`, `StreamingResponse`

### 2.5 Manejo de Errores

- [ ] **`HTTPException`**
  - Lanzar errores con código y detalle: `raise HTTPException(status_code=404, detail="No encontrado")`
  - Añadir headers personalizados al error
- [ ] **Excepciones personalizadas**
  - Crear clases de excepción propias del dominio (ej. `SaldoInsuficienteError`)
  - `@app.exception_handler()` — convertir excepciones de dominio en respuestas HTTP
  - Sobrescribir el handler de errores de validación (formato de error unificado)
- [ ] **Buenas prácticas**
  - Formato de error consistente en toda la API
  - No filtrar detalles internos (stack traces) al cliente en producción

### 2.6 Inyección de Dependencias (`Depends`)

- [ ] **Concepto y motivación**
  - Qué problema resuelve: reutilizar lógica sin repetir código
  - Sintaxis: `def endpoint(dep = Depends(mi_funcion))` y `Annotated[Tipo, Depends(...)]`
- [ ] **Patrones de uso**
  - Dependencias con parámetros comunes (paginación: `skip`, `limit`)
  - Dependencias como clases (`__call__` / `__init__`)
  - Sub-dependencias (dependencias que dependen de otras)
  - Dependencias a nivel de router o aplicación completa (`dependencies=[...]`)
- [ ] **Ciclo de vida de recursos**
  - Dependencias con `yield`: abrir un recurso (ej. sesión de BD) y cerrarlo al terminar — **crucial** para gestionar conexiones a base de datos de forma segura
  - Manejo de excepciones dentro de dependencias con `yield`
  - Caché de dependencias en una misma petición (`use_cache`)
- [ ] **Casos reales**
  - `get_db()` — sesión de base de datos por petición
  - `get_current_user()` — usuario autenticado (se completa en Fase 4)
  - Verificación de API keys o roles

### 2.7 🧪 Proyecto de Fase

- [ ] **API de gestión de tareas (To-Do) en memoria:** CRUD completo con validación Pydantic, códigos de estado correctos, manejo de errores y paginación con dependencias. Sin base de datos todavía (usa un `dict` en memoria).

---

## 🗄️ Fase 3: Persistencia de Datos y ORM

> **Meta de la fase:** Guardar datos de verdad. Empieza con SQLite y consultas síncronas para no mezclar conceptos; luego pasa a PostgreSQL y sesiones asíncronas.

### 3.1 Bases de Datos Relacionales (PostgreSQL / SQLite)

- [ ] **Fundamentos de SQL**
  - `SELECT`, `INSERT`, `UPDATE`, `DELETE`, `WHERE`, `ORDER BY`, `LIMIT`
  - `JOIN` (INNER, LEFT), `GROUP BY` y funciones de agregación
- [ ] **Diseño de tablas**
  - Tipos de datos SQL y su correspondencia con Python
  - Claves primarias (`PRIMARY KEY`), autoincrementales, UUIDs
  - Restricciones: `NOT NULL`, `UNIQUE`, `CHECK`, `DEFAULT`
  - Índices: qué son y cuándo crearlos
- [ ] **Relaciones y claves foráneas**
  - `FOREIGN KEY` y su papel en la integridad referencial
  - Relación **1:N** (un usuario tiene muchas tareas)
  - Relación **N:M** con tabla intermedia (estudiantes ↔ cursos)
  - Relación **1:1** (usuario ↔ perfil)
  - `ON DELETE CASCADE` / `SET NULL` — qué pasa al borrar el padre
- [ ] **SQLite vs. PostgreSQL**
  - SQLite: para aprender y prototipos (un solo archivo, cero configuración)
  - PostgreSQL: para producción (concurrencia, tipos avanzados, robustez)
  - Instalar PostgreSQL localmente o con Docker

### 3.2 ORM con SQLAlchemy 2.0 / SQLModel

> ⚠️ **Importante:** aprende SQLAlchemy directamente con la sintaxis **2.0** (modelos con `Mapped` / `mapped_column`, consultas con `select()`). Evita la sintaxis legacy de la v1.4 (`declarative_base()`, `Column()`, `session.query()`): mezclarla con FastAPI moderno genera mucha confusión y la mayoría de tutoriales viejos la usan. Si un tutorial usa `session.query(...)`, descártalo o tradúcelo a 2.0.

- [ ] **Conceptos de ORM**
  - Qué es un ORM y qué problema resuelve (mapear tablas ↔ clases)
  - Trade-offs: productividad vs. control fino del SQL
  - Sintaxis 2.0 vs. legacy 1.4: reconocer código viejo para no copiarlo (`Column` → `mapped_column`, `session.query()` → `select()`)
- [ ] **Etapa síncrona primero (recomendado para no mezclar conceptos)**
  - `create_engine()` con SQLite
  - Modelos declarativos: `DeclarativeBase`, `Mapped[int]`, `mapped_column()`
  - `Session`, `sessionmaker` y el patrón "una sesión por petición"
  - CRUD síncrono completo: `session.add()`, `session.get()`, `select()`, `session.delete()`, `session.commit()` / `rollback()`
- [ ] **Relaciones en el ORM**
  - `relationship()` y `back_populates`
  - Estrategias de carga: lazy loading vs. `selectinload` / `joinedload` (evitar el problema N+1)
- [ ] **Etapa asíncrona (`AsyncSession`)**
  - `create_async_engine()` con drivers async: `aiosqlite`, `asyncpg`
  - `AsyncSession` y `async_sessionmaker`
  - Reescribir el CRUD con `await session.execute(select(...))`
  - Dependencia `get_db()` asíncrona con `yield` para FastAPI
  - Precaución: lazy loading no funciona igual en async (cargar relaciones explícitamente)
- [ ] **SQLModel (alternativa)**
  - Qué es: Pydantic + SQLAlchemy en una sola clase (del creador de FastAPI)
  - Cuándo conviene y cuáles son sus límites frente a SQLAlchemy puro
- [ ] **Consultas eficientes**
  - Paginación real con `offset` / `limit`
  - Filtros dinámicos y búsquedas (`where`, `ilike`)
  - Conteos y agregaciones (`func.count`)

### 3.3 Migraciones con Alembic

- [ ] **Concepto**
  - Por qué no basta con `create_all()`: el esquema evoluciona y no puedes perder datos
  - Migraciones como "control de versiones" de la base de datos
- [ ] **Setup**
  - `alembic init`, estructura de carpetas, configuración de `env.py` y `alembic.ini`
  - Conectar Alembic con los metadatos de tus modelos (`target_metadata`)
  - Configuración para motores asíncronos
- [ ] **Flujo de trabajo**
  - Autogenerar versiones: `alembic revision --autogenerate -m "mensaje"`
  - **Siempre revisar** el archivo generado antes de aplicar
  - Aplicar: `alembic upgrade head` / revertir: `alembic downgrade -1`
  - Historial: `alembic history`, `alembic current`
- [ ] **Gestión de cambios sin perder datos**
  - Agregar columnas con valores por defecto a tablas con datos
  - Renombrar columnas (Alembic lo detecta como drop+add: corregir a mano)
  - Migraciones de datos (no solo de esquema) dentro de una revisión

### 3.4 🧪 Proyecto de Fase

- [ ] **Migrar el To-Do de la Fase 2 a base de datos real:** usuarios y tareas (1:N), etiquetas (N:M), CRUD asíncrono con `AsyncSession`, y al menos 3 migraciones de Alembic simulando evolución del esquema.

---

## 🌐 Fase 4: Consumo de APIs Externas, Concurrencia y Seguridad

> **Meta de la fase:** Tu API ya guarda datos; ahora debe comunicarse con otros servicios sin bloquearse, y ser segura.

### 4.1 Peticiones a APIs Externas con HTTPX

- [ ] **Flujo básico (síncrono primero)**
  - `httpx.Client()`: `get`, `post`, headers, query params, JSON body
  - Leer respuestas: `.status_code`, `.json()`, `.raise_for_status()`
  - Timeouts: por qué **nunca** hacer peticiones sin timeout
  - Práctica: consumir una API pública (clima, países, pasarela de pagos en sandbox)
- [ ] **Versión asíncrona (`httpx.AsyncClient`)**
  - Transformar las peticiones síncronas a `async with httpx.AsyncClient() as client:`
  - Por qué usar un cliente compartido y reutilizado (pool de conexiones) vía `lifespan` de FastAPI
- [ ] **Identificar el bloqueo: `async def` vs. `def` en FastAPI**
  - Regla práctica: si dentro usas `await` → `async def`; si usas librerías bloqueantes viejas → `def` normal (FastAPI lo manda al threadpool)
  - El peor error: `async def` con código bloqueante dentro (congela todo el servidor)
- [ ] **Concurrencia avanzada aplicada**
  - `asyncio.gather()` para disparar múltiples peticiones externas o consultas a la vez
  - `asyncio.Semaphore` para limitar tareas simultáneas y no tumbar servidores ajenos
  - Reintentos con backoff exponencial ante fallos transitorios
- [ ] **Manejo de errores de red**
  - `httpx.TimeoutException`, `httpx.ConnectError`, respuestas 4xx/5xx del servicio externo
  - Traducir fallos externos a errores propios (ej. `502 Bad Gateway` / `503`)

### 4.2 Seguridad y Autenticación

- [ ] **Hashing de contraseñas**
  - Por qué **nunca** guardar contraseñas en texto plano (ni "encriptadas" reversibles)
  - Hash vs. cifrado; salt y factor de costo
  - `passlib` + `bcrypt` (o `argon2`): `hash()` y `verify()`
- [ ] **OAuth2 con tokens JWT**
  - Anatomía de un JWT: header, payload (claims: `sub`, `exp`, `iat`), firma
  - Crear y firmar tokens con `python-jose` o `pyjwt` (algoritmo HS256, `SECRET_KEY`)
  - Verificación: firma válida + no expirado
  - Flujo `OAuth2PasswordBearer` + endpoint `/token` con `OAuth2PasswordRequestForm`
  - Dependencia `get_current_user()`: extraer el token, decodificarlo, cargar el usuario
  - Proteger endpoints: solo usuarios logueados entran
  - Access tokens vs. refresh tokens (concepto y cuándo implementarlos)
  - Autorización por roles/scopes (usuario normal vs. admin)
- [ ] **Otras piezas de seguridad**
  - CORS (`CORSMiddleware`): qué es y cómo configurarlo bien
  - HTTPS en producción (se retoma en Fase 7)
  - Rate limiting básico (ej. `slowapi`)

### 4.3 Middlewares (los "peajes")

- [ ] **Concepto**
  - Funciones globales que interceptan **toda** petición antes del endpoint y toda respuesta después
- [ ] **Implementación**
  - `@app.middleware("http")`: medir tiempo de respuesta y añadirlo como header (`X-Process-Time`)
  - Middleware de logging de peticiones (método, ruta, status, duración)
  - Headers de seguridad, request ID para trazabilidad
  - Middlewares incluidos: `CORSMiddleware`, `GZipMiddleware`, `TrustedHostMiddleware`
  - Orden de ejecución cuando hay varios middlewares

### 4.4 Tareas en Segundo Plano (`BackgroundTasks`)

- [ ] **Concepto y uso**
  - Responder al cliente de inmediato y delegar lo lento (ej. enviar email de confirmación)
  - `background_tasks.add_task(funcion, arg1, arg2)`
  - Límite: cuándo `BackgroundTasks` ya no alcanza y necesitas una cola real (Celery, ARQ, RQ) — solo el concepto

### 4.5 Configuración y Entornos

- [ ] **Variables de entorno**
  - Por qué las credenciales **nunca** van en el código ni en Git
  - Archivos `.env` y `.env.example`; añadir `.env` a `.gitignore`
- [ ] **`pydantic-settings`**
  - Clase `Settings(BaseSettings)`: `DATABASE_URL`, `SECRET_KEY`, `DEBUG`, etc.
  - Validación y tipado de la configuración al arrancar
  - `@lru_cache` para instanciar Settings una sola vez
  - Configuración por entorno: desarrollo / pruebas / producción

### 4.6 🧪 Proyecto de Fase

- [ ] **Agregar al proyecto:** registro y login con JWT, endpoints protegidos por usuario, un endpoint que agregue datos de una API externa con `gather` + semáforo, middleware de tiempos, email simulado con `BackgroundTasks` y toda la configuración con `pydantic-settings`.

---

## 🏗️ Fase 5: Arquitectura de Software y Calidad

> **Meta de la fase:** Que tu API sea mantenible por un equipo y que no se rompa al hacer cambios.

### 5.1 Estructura de Proyecto Profesional

- [ ] **Organización por capas / módulos con `APIRouter`**
  - Separar rutas por dominio: `routers/users.py`, `routers/tasks.py`, `routers/auth.py`
  - `prefix`, `tags` y `dependencies` a nivel de router
  - `app.include_router()` y versionado de API (`/api/v1`)
- [ ] **Separación de responsabilidades (capas)**
  - **Router (capa de presentación):** recibe la petición, valida entrada, devuelve respuesta — sin lógica de negocio
  - **Servicio (capa de negocio):** reglas del dominio, orquestación
  - **Repositorio (capa de datos):** todo el acceso a la BD encapsulado
  - **Esquemas (Pydantic)** vs. **Modelos (ORM)**: por qué se mantienen separados
- [ ] **Estructura de carpetas de referencia**

```text
app/
├── main.py              # Creación de la app, middlewares, lifespan
├── core/
│   ├── config.py        # Settings (pydantic-settings)
│   └── security.py      # Hashing, JWT
├── db/
│   ├── session.py       # Engine y get_db()
│   └── base.py          # DeclarativeBase
├── models/              # Modelos SQLAlchemy (tablas)
├── schemas/             # Esquemas Pydantic (entrada/salida)
├── repositories/        # Acceso a datos (CRUD)
├── services/            # Lógica de negocio
├── routers/             # Endpoints (APIRouter por dominio)
└── tests/               # Pruebas
```

- [ ] **Ciclo de vida de la aplicación**
  - `lifespan` (context manager): inicializar recursos al arrancar y liberarlos al apagar

### 5.2 Pruebas Automatizadas (Pytest + HTTPX)

- [ ] **Fundamentos de Pytest**
  - Estructura de tests, `assert`, convenciones de nombres (`test_*.py`)
  - Fixtures: setup/teardown reutilizable; `conftest.py`
  - Parametrización: `@pytest.mark.parametrize` para probar muchos casos
- [ ] **Pruebas de la API**
  - `TestClient` (síncrono) para empezar
  - `httpx.AsyncClient` + `ASGITransport` + `pytest-asyncio` para tests async
  - Probar el camino feliz **y** los errores (404, 401, 422)
- [ ] **Pruebas con base de datos**
  - BD de pruebas aislada (SQLite en memoria o PostgreSQL efímero)
  - Sobrescribir dependencias: `app.dependency_overrides[get_db]`
  - Rollback/limpieza entre tests para independencia total
- [ ] **Pruebas unitarias vs. de integración**
  - Unitarias: servicios y utilidades aisladas (con mocks: `unittest.mock`, `respx` para HTTPX)
  - Integración: flujo completo endpoint → servicio → BD
  - Probar autenticación: fixture que genera un token válido
- [ ] **Calidad de código**
  - Cobertura con `pytest-cov` (objetivo razonable: 80%+ en lógica de negocio)
  - Linter y formateador: `ruff` (+ `ruff format`)
  - Pre-commit hooks básicos

### 5.3 🧪 Proyecto de Fase

- [ ] **Refactorizar el proyecto completo** a la estructura por capas y escribir suite de tests: unitarios para servicios, integración para cada endpoint, cobertura ≥ 80%.

---

## 📊 Fase 6: Visualización Interactiva con Dash

> **Meta de la fase:** Construir dashboards interactivos que consuman tu API de FastAPI con datos reales.

### 6.1 Fundamentos de Dash y Plotly

- [ ] **Plotly primero**
  - `plotly.express`: líneas, barras, dispersión, pastel, histogramas
  - Personalización: títulos, ejes, colores, `hover_data`
  - `plotly.graph_objects` para control fino (cuando `express` no alcanza)
- [ ] **Componentes HTML (`dash.html`)**
  - `html.Div`, `html.H1`–`html.H6`, `html.P`, `html.Button`, `html.Table`
  - Propiedades: `id`, `className`, `style`, `children`
  - Composición del layout como árbol de componentes
- [ ] **Componentes del núcleo (`dash.dcc`)**
  - `dcc.Graph` — insertar figuras de Plotly
  - `dcc.Dropdown`, `dcc.Slider`, `dcc.RangeSlider`, `dcc.DatePickerRange`
  - `dcc.Input`, `dcc.Checklist`, `dcc.RadioItems`, `dcc.Tabs`
  - `dcc.Store` — guardar datos en el navegador
  - `dcc.Interval` — refresco automático (dashboards en tiempo real)
  - `dcc.Loading` — spinners de carga
- [ ] **Tablas de datos**
  - `dash_table.DataTable` (o `dash-ag-grid`): orden, filtro, paginación

### 6.2 Callbacks de Dash

- [ ] **Anatomía de un callback**
  - `@callback(Output(...), Input(...))`: id del componente + propiedad
  - Flujo reactivo: el usuario cambia un Input → se ejecuta la función → se actualiza el Output
- [ ] **Patrones de interactividad**
  - Múltiples Inputs y múltiples Outputs en un callback
  - `State`: leer valores sin disparar el callback (ej. formulario + botón "Enviar")
  - Callbacks en cadena: la salida de uno alimenta la entrada de otro (dropdown país → dropdown ciudad → gráfica)
  - `prevent_initial_call` y `dash.no_update`
  - `ctx.triggered_id`: saber qué componente disparó el callback
- [ ] **Manejo de estado**
  - Compartir datos entre callbacks con `dcc.Store`
  - Por qué **nunca** usar variables globales para datos de usuario
- [ ] **Avanzado (opcional)**
  - Pattern-matching callbacks (`MATCH`, `ALL`) para componentes dinámicos
  - Apps multipágina (`dash.register_page`)

### 6.3 Integración Dash + FastAPI

- [ ] **Arquitectura**
  - Servicios separados: FastAPI (backend, puerto 8000) + Dash (frontend, puerto 8050)
  - Alternativa: montar Dash dentro de FastAPI con `WSGIMiddleware` — pros y contras
- [ ] **Consumo de endpoints desde los callbacks**
  - `httpx` / `requests` dentro del callback: pedir datos a FastAPI y convertirlos a DataFrame/figura
  - Los callbacks de Dash son síncronos: usar `httpx.Client` (no `AsyncClient`)
  - URL del backend configurable por variable de entorno (clave para Docker después)
- [ ] **Flujo completo con datos reales**
  - Filtros del dashboard (fechas, categorías) → query parameters del endpoint → gráfica actualizada
  - Autenticación: obtener JWT y enviarlo en el header `Authorization` desde Dash
  - Manejo de errores: qué mostrar si la API no responde (mensajes amables, no stack traces)
  - Rendimiento: paginar/agregar en el backend, no traer tablas gigantes al navegador
  - `dcc.Interval` + endpoint de FastAPI = dashboard que se actualiza solo

### 6.4 Estilo y Diseño Visual

- [ ] **`dash-bootstrap-components` (dbc)**
  - Temas de Bootstrap (`dbc.themes.BOOTSTRAP`, `CYBORG`, `FLATLY`...)
  - Sistema de rejilla responsivo: `dbc.Container`, `dbc.Row`, `dbc.Col`
  - Componentes: `dbc.Card` (tarjetas KPI), `dbc.Navbar`, `dbc.Tabs`, `dbc.Modal`, `dbc.Alert`, `dbc.Spinner`
- [ ] **Diseño de dashboard profesional**
  - Layout clásico: navbar arriba, fila de KPIs, filtros laterales, gráficas en grid
  - Consistencia visual: paleta de colores unificada entre Bootstrap y Plotly (templates de Plotly)
  - Responsividad: que se vea bien en pantalla completa y en laptop
  - CSS propio en `assets/` cuando dbc no alcanza

### 6.5 🧪 Proyecto de Fase

- [ ] **Dashboard completo conectado a tu API:** KPIs en tarjetas, 3+ gráficas interactivas con filtros encadenados, tabla con paginación, login contra FastAPI (JWT) y refresco automático con `dcc.Interval`.

---

## 🚀 Fase 7: Despliegue y Producción

> **Meta de la fase:** Que todo el sistema (API + Dashboard + BD) corra empaquetado, reproducible y listo para el mundo real.

### 7.1 Dockerización

- [ ] **Fundamentos de Docker**
  - Imagen vs. contenedor; registros (Docker Hub)
  - Comandos esenciales: `build`, `run`, `ps`, `logs`, `exec`, `stop`
- [ ] **`Dockerfile` para FastAPI**
  - Imagen base (`python:3.12-slim`), `WORKDIR`, `COPY`, instalación de dependencias
  - Orden de capas para aprovechar la caché (dependencias antes que código)
  - Multi-stage builds para imágenes ligeras
  - `.dockerignore` (excluir `venv`, `.env`, `__pycache__`)
  - Usuario no-root dentro del contenedor
- [ ] **`Dockerfile` para Dash** (mismo patrón, distinto puerto/comando)
- [ ] **`docker-compose` — todo junto**
  - Servicios: `api` (FastAPI) + `dashboard` (Dash) + `db` (PostgreSQL)
  - Red interna: los servicios se hablan por nombre (`http://api:8000`, `postgresql://db:5432`)
  - Volúmenes: persistencia de datos de PostgreSQL
  - Variables de entorno con `env_file`; `depends_on` + healthchecks
  - Ejecutar migraciones de Alembic al arrancar
  - Hot-reload en desarrollo con volúmenes montados (compose override)

### 7.2 Servidores de Producción

- [ ] **Uvicorn / Gunicorn para el backend**
  - Uvicorn solo vs. Gunicorn con workers `UvicornWorker`
  - Cuántos workers: regla `(2 × núcleos) + 1` y sus matices
  - Diferencias dev/prod: sin `--reload`, `DEBUG=False`, logging estructurado
- [ ] **Despliegue del Dashboard**
  - Dash en producción con Gunicorn (`server = app.server`)
- [ ] **Reverse proxy (concepto e implementación básica)**
  - Nginx / Caddy / Traefik delante de los servicios
  - HTTPS con certificados (Let's Encrypt)
  - Enrutamiento: `/api` → FastAPI, `/` → Dash
- [ ] **Observabilidad mínima**
  - Logging estructurado (JSON) y niveles adecuados
  - Endpoint `/health` para healthchecks
  - Nociones de métricas y monitoreo (Prometheus/Grafana — solo panorama)
- [ ] **Opciones de hosting**
  - VPS (DigitalOcean, Hetzner) con docker-compose
  - PaaS (Railway, Render, Fly.io) — el camino fácil
  - Nociones de CI/CD: tests + build + deploy automático (GitHub Actions)

### 7.3 🧪 Proyecto de Fase

- [ ] **Sistema completo en contenedores:** `docker compose up` levanta PostgreSQL + FastAPI (con migraciones automáticas) + Dash, comunicándose entre sí, con `.env` de ejemplo y README de instalación.

---

## 🎯 Proyectos Integradores Sugeridos

Elige **uno** y hazlo crecer fase a fase (es mejor un proyecto profundo que cinco superficiales):

1. **Sistema de seguimiento de gastos personales** — usuarios, categorías, transacciones, presupuestos, dashboard de gastos mensuales.
2. **Plataforma de monitoreo de precios** — scraping/consumo de APIs externas con concurrencia, alertas con BackgroundTasks, dashboard de evolución de precios.
3. **API + Dashboard de indicadores de negocio (BI)** — ingesta de datos de ventas, endpoints de agregación, tablero ejecutivo con KPIs y filtros (natural si vienes de Power BI).

---

## 📚 Recursos Recomendados

| Recurso | Uso |
|---|---|
| [Documentación oficial de FastAPI](https://fastapi.tiangolo.com/es/) | Referencia principal — el tutorial oficial es excelente y está en español |
| [Documentación de Pydantic](https://docs.pydantic.dev/) | Validación y serialización |
| [SQLAlchemy 2.0 — tutorial unificado](https://docs.sqlalchemy.org/en/20/tutorial/) | ORM y Core |
| [Documentación de Alembic](https://alembic.sqlalchemy.org/) | Migraciones |
| [Documentación de HTTPX](https://www.python-httpx.org/) | Cliente HTTP sync/async |
| [Documentación de Dash](https://dash.plotly.com/) | Dashboards |
| [dash-bootstrap-components](https://dash-bootstrap-components.opensource.faculty.ai/) | Estilos y layout |
| [Real Python — asyncio](https://realpython.com/async-io-python/) | Asincronía a fondo |
| [Documentación de Pytest](https://docs.pytest.org/) | Pruebas |
| [Docker — Get Started](https://docs.docker.com/get-started/) | Contenedores |

---

## ✅ Criterios de Avance por Fase

| Fase | Sabes que la dominas cuando... |
|---|---|
| 1 | Puedes explicar la analogía del "mesero" y escribir un script con `gather` + semáforo sin consultar docs |
| 2 | Construyes un CRUD validado con códigos de estado correctos y dependencias sin copiar/pegar |
| 3 | Agregas una columna a una tabla con datos en producción sin perder nada (Alembic) |
| 4 | Proteges un endpoint con JWT y consumes 5 APIs externas concurrentemente sin bloquear el servidor |
| 5 | Otro desarrollador entiende tu estructura sin preguntarte, y tus tests atrapan un bug antes que tú |
| 6 | Tu dashboard consume datos reales de tu API con filtros encadenados y se ve profesional |
| 7 | `docker compose up` levanta todo el sistema en una máquina limpia sin pasos manuales |
