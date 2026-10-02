---
id: rutas
title: Rutas y parámetros
sidebar_label: 2.1 y 2.2
description: Apuntes de FastAPI hasta la fase 3.
slug: /fastapi/notas/rutas
---

# Fase 2: Desarrollo de APIs con FastAPI

## 2.1 Primeros pasos

* **venv:** los entornos virtuales de Python son ideales para proyectos pequeños, ya que requieren poca configuración y son compatibles con casi cualquier sistema.
* **uv:** es un gestor de entornos de alta velocidad, ideal para proyectos grandes con cientos de dependencias.
* **OpenAPI:** es un formato de descripción de APIs REST, escrito en JSON o YAML, que especifica cómo funciona nuestra API: rutas, parámetros que recibe y tipos de datos que devuelve.

### Flujo de trabajo técnico automatizado

1. **Pydantic:** valida los datos de entrada y salida de Python.
2. **FastAPI:** lee la estructura de Pydantic y los decoradores de las rutas (@app.get()) y genera un archivo JSON bajo el estándar de OpenAPI.
3. **Swagger UI / ReDoc:** toma ese JSON automático y, en segundo plano, crea la documentación web.

```python
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Item(BaseModel):
    nombre: str
    precio: float

@app.post("/items/")
def crear_item(item: Item):
    return {"mensaje": f"Item {item.nombre} creado con éxito"}
```

## 2.2 Rutas y parámetros (Endpoints y métodos HTTP)

Los métodos HTTP indican la acción que se desea realizar sobre un recurso. Seguir estas reglas garantiza que nuestra API sea predecible y estandarizada.

### 2.2.1 Métodos HTTP y su semántica

* **GET:** recupera información del servidor. Es idempotente y seguro.
* **POST:** crea un nuevo recurso enviando datos al servidor.
* **PUT:** realiza un reemplazo total.
* **PATCH:** realiza una modificación parcial, enviando solo el campo específico que se desea cambiar.
* **DELETE:** elimina un recurso del servidor.
* **Convenciones REST:** los nombres de rutas suelen ir en plural, por ejemplo: `/usuarios`, `/productos/{id}`.

### 2.2.2 Path Parameters (parámetros de ruta)

Los Path Parameters se definen dentro de la URL y sirven para identificar un recurso específico. En FastAPI, se escriben dentro de llaves `{}` en la ruta.

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/items/{item_id}")
def leer_item(item_id: int):
    return {"item_id": item_id, "mensaje": "ID válido"}
```

#### Declaración y tipado

Cuando una variable aparece dentro de la URL, FastAPI la interpreta como un parámetro de ruta. También convierte automáticamente el valor al tipo indicado.

```python
@app.get("/usuarios/{usuario_id}")
def obtener_usuario(usuario_id: int):
    return {"usuario_id": usuario_id}
```

#### Validaciones con Path()

Podemos validar el valor del parámetro de ruta con `Path()`, usando restricciones como `gt`, `ge`, `lt` y `le`.

```python
from typing import Annotated
from fastapi import FastAPI, Path

app = FastAPI()

@app.get("/usuarios/{usuario_id}")
def obtener_usuario(
    usuario_id: Annotated[int, Path(title="El ID del usuario", ge=1, le=1000)]
):
    return {"usuario_id": usuario_id}
```

#### Orden de las rutas

Las rutas más específicas deben ir antes que las rutas con parámetros, porque FastAPI intenta resolverlas en orden.

```python
@app.get("/items/me")
def mi_item():
    return {"mensaje": "Ruta fija"}

@app.get("/items/{item_id}")
def leer_item(item_id: int):
    return {"item_id": item_id}
```

#### Enums como path parameters

Cuando solo queremos aceptar ciertos valores predefinidos, usamos `Enum`.

```python
from enum import Enum
from fastapi import FastAPI

app = FastAPI()

class TipoModelo(str, Enum):
    alexnet = "alexnet"
    resnet = "resnet"
    lenet = "lenet"

@app.get("/modelos/{nombre_modelo}")
def obtener_modelo(nombre_modelo: TipoModelo):
    if nombre_modelo == TipoModelo.alexnet:
        return {"nombre": nombre_modelo, "descripcion": "Ideal para imágenes básicas."}

    return {"nombre": nombre_modelo, "descripcion": "Modelo profundo."}
```

### 2.2.3 Query Parameters (parámetros de consulta)

Los Query Parameters se usan para filtrar, ordenar, paginar o buscar información. No identifican recursos, sino que modifican la forma en que los vemos. Van al final de la URL, después de `?`.

Ejemplo clásico:

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/articulos/")
def listar_articulos(skip: int = 0, limit: int = 10):
    return {"skip": skip, "limit": limit}
```

Ejemplo de uso real: `/articulos/?skip=10&limit=20`

#### Forma moderna con `Annotated` y `Query()`

```python
from typing import Annotated
from fastapi import FastAPI, Query

app = FastAPI()

@app.get("/usuarios/")
def buscar_usuarios(
    q: Annotated[str | None, Query(description="Query de búsqueda")] = None
):
    return {"query": q}
```

#### Validaciones avanzadas con Query()

La función `Query()` permite restringir lo que el cliente puede enviar antes de que la petición se procese.

```python
from typing import Annotated
from fastapi import FastAPI, Query

app = FastAPI()

@app.get("/productos/")
def buscar_productos(
    codigo: Annotated[
        str,
        Query(
            min_length=3,
            max_length=15,
            pattern=r"^PROD-"
        )
    ]
):
    return {"codigo_producto": codigo}
```

> `pattern` usa expresiones regulares. En este caso, si alguien llama a `/productos/?codigo=hola`, FastAPI responderá con un error 422 porque no cumple la regla `^PROD-`.

#### Parámetros múltiples (`list[str]` en query)

Esto permite enviar varios valores para aplicar varios filtros a la vez.

```python
from typing import Annotated
from fastapi import FastAPI, Query

app = FastAPI()

@app.get("/tienda/")
def filtrar_por_colores(
    colores: Annotated[list[str] | None, Query()] = None
):
    return {"colores_seleccionados": colores}
```

Ejemplo: `/tienda/?colores=rojo&colores=azul&colores=verde`

También se puede definir una lista con valores por defecto:

```python
@app.get("/tienda/predeterminada/")
def filtrar_predeterminado(
    colores: Annotated[list[str], Query()] = ["negro", "blanco"]
):
    return {"colores": colores}
```

### 2.2.4 Request Body (cuerpo de la petición)

El Request Body se usa para enviar datos estructurados desde el cliente al servidor. A diferencia de los parámetros de ruta, estos datos no aparecen visibles en la URL; normalmente viajan en formato JSON.

Se usa principalmente en `POST`, `PUT` y `PATCH`.

#### Recibir JSON con modelos Pydantic

Cuando declaras una clase que hereda de `BaseModel`, FastAPI entiende automáticamente que esos datos deben leerse desde el cuerpo de la petición.

```python
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class UsuarioCrear(BaseModel):
    username: str
    email: str
    edad: int
    activo: bool = True

@app.post("/usuarios/")
def crear_usuario(usuario: UsuarioCrear):
    return {"mensaje": f"Usuario {usuario.username} registrado", "datos": usuario}
```

### 2.2.5 Combinar Path + Query + Body en un mismo endpoint

FastAPI es extremadamente inteligente. No necesitas decirle explícitamente de dónde viene cada variable; el framework lo deduce siguiendo tres reglas clave:

1. Si la variable está definida en la URL (`{item_id}`), entonces es un **Path Parameter**.
2. Si es un tipo singular como `int`, `str`, `bool` y no está en la URL, entonces es un **Query Parameter**.
3. Si es un modelo de Pydantic (`BaseModel`), entonces es un **Request Body**.

```python
from typing import Annotated
from fastapi import FastAPI, Path, Query
from pydantic import BaseModel

app = FastAPI()

class Articulo(BaseModel):
    nombre: str
    precio: float

@app.put("/tienda/articulos/{articulo_id}")
def actualizar_articulos_completo(
    articulo_id: Annotated[int, Path(ge=1)],
    articulo: Articulo,
    notificar: Annotated[bool, Query()] = False
):
    return {
        "articulo_id": articulo_id,
        "articulo_actualizado": articulo,
        "notificacion_enviada": notificar
    }
```

En este ejemplo:

* `articulo_id` viene de la ruta.
* `articulo` viene del cuerpo JSON.
* `notificar` viene de la query string, por ejemplo: `?notificar=true`.

### 2.2.6 Múltiples modelos en el body y campos embebidos (`Body()`)

#### Recibir múltiples modelos en el body

A veces necesitas recibir más de un objeto JSON en la misma petición. Por ejemplo, cuando procesas una compra con los datos del cliente y del producto al mismo tiempo.

```python
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Cliente(BaseModel):
    nombre: str
    vip: bool

class Producto(BaseModel):
    id: int
    cantidad: int

@app.post("/compras/")
def procesar_compra(
    cliente: Cliente,
    producto: Producto
):
    return {"cliente": cliente, "producto": producto}
```

El cliente deberá enviar un JSON como este:

```json
{
  "cliente": {
    "nombre": "Carlos",
    "vip": true
  },
  "producto": {
    "id": 99,
    "cantidad": 2
  }
}
```

#### Campos embebidos con `Body(embed=True)`

Por defecto, si solo declaras un único modelo Pydantic, FastAPI espera que el JSON empiece directamente con sus propiedades. Sin embargo, si quieres obligar a que ese JSON viaje bajo una llave contenedora, usas `Body(embed=True)`.

```python
from typing import Annotated
from fastapi import FastAPI, Body
from pydantic import BaseModel

app = FastAPI()

class UsuarioCrear(BaseModel):
    username: str
    email: str
    edad: int
    activo: bool = True

@app.post("/v2/usuarios/")
def crear_usuario_embebido(
    usuario: Annotated[UsuarioCrear, Body(embed=True)]
):
    return usuario
```

Ahora la petición deberá verse así:

```json
{
  "usuario": {
    "username": "Carlos",
    "email": "carlos@example.com",
    "edad": 30,
    "activo": true
  }
}
```

### Resumen

En FastAPI, la forma en que se extraen los datos depende de su ubicación y tipo:

* **Ruta:** `/usuarios/{usuario_id}`
* **Query:** `/usuarios/?skip=0&limit=10`
* **Body:** JSON enviado en el cuerpo de la petición

Conocer esta diferencia es clave para construir APIs limpias, claras y bien estructuradas.

### 2.2.7 Otros tipos de entrada

#### Cabeceras `Header()` y Cookies `(Cookie()`
Las cabeceras transportan metadatos de la peticion (como token, autenticacion o datos del navegador), mientras que las cookies guardan pequeños estados del lado del cliente.

```python
from typing import Annotated
from fastapi import FastAPI, Header, Cookie

app = FastAPI()

@app.get("/seguridad/")
def verificar_acceso(
    # FastAPI convierte automáticamente 'x_auth_token' a la cabecera HTTP 'X-Auth-Token'
    x_auth_token: Annotated[str | None, Header()] = None,
    # Lee una cookie específica llamada 'id_sesion' enviada por el navegador
    id_sesion: Annotated[str | None, Cookie()] = None
):
    return {
        "Cabecera X-Auth-Token": x_auth_token,
        "Cookie id_sesion": id_sesion
    }
```

otro ejemplo
```python
from typing import Optional
from fastapi import FastAPI, Header, Cookie, Response

app = FastAPI()

# Endpoint: GET /perfil
@app.get("/perfil")
def leer_perfil(
    # 1. LEER UN HEADER (Metadato manual)
    # FastAPI convierte automáticamente 'Authorization' a 'authorization'
    authorization: Optional[str] = Header(None),
    
    # 2. LEER UNA COOKIE (Estado automático)
    # Buscamos la cookie llamada 'preferencia_idioma'
    preferencia_idioma: Optional[str] = Cookie(None)
):
    # Si el cliente no envió el header de seguridad, rechazamos la petición
    if not authorization:
        return {"error": "No tienes el header de 'Authorization'. Acceso denegado."}

    # Si no hay cookie, asignamos un idioma por defecto
    idioma = preferencia_idioma or "es"
    saludo = "Welcome!" if idioma == "en" else "¡Bienvenido!"

    return {
        "mensaje": "Acceso concedido al perfil",
        "token_recibido": authorization,
        "idioma_detectado_en_cookie": idioma,
        "texto_bienvenida": saludo
    }


# Endpoint extra: Solo para simular cómo el servidor CREA la cookie la primera vez
@app.get("/configurar-idioma-en")
def configurar_idioma(response: Response):
    # Usamos el objeto response para inyectar la cookie en el navegador
    response.set_cookie(key="preferencia_idioma", value="en", httponly=True)
    return {"mensaje": "Cookie de idioma configurada en Inglés ('en'). Vuelve a probar /perfil"}
```

#### Formularios `Form`
Cuando un usuario envia datos desde un Form de HTML (con la etiqueta `<form>`) estos no viajan como un JSON (application/json), sino codificados como `application/x-www-form-urlencoded.`

Si intentamos usar un modelo de Pydantic estandar aqui va a fallar. FastAPI esperará un JSON y fallará. Para recibir datos de formulario, debes usar la función Form().

```python
from typing import Annotated
from fastapi import FastAPI, Form

app = FastAPI()

@app.post("/login/")
def iniciar_sesion(
    username: Annotated[str, Form()],
    password: Annotated[str, Form()]
):
    # Procesa las credenciales de forma segura
    return {"username": username, "estado": "Autenticado"}
```

#### Archivos y Subidas (`File()` y `UploadFile`)
Para recibir archivos del cliente (como fotos, PDFs o audios) el formulario debe enviarse bajo el tipo `multipart/form-data` FastAPI ofrece dos herramientas para calcularlos.

* **Opción A**: `bytes` con `File()` (Solo para archivos muy pequeños)Carga todo el archivo directamente en la memoria RAM. Si el archivo pesa 2 GB, el servidor consumirá 2 GB de memoria al instante, lo cual puede colapsar la infraestructura.

```python
from typing import Annotated
from fastapi import FastAPI, File

app = FastAPI()

@app.post("/avatar-pequeno/")
def subir_avatar_en_memoria(archivo: Annotated[bytes, File()]):
    # 'archivo' contiene los bytes puros
    return {"tamaño_archivo": len(archivo)} 
```

* **Opción B**: `UploadFile` **(La opción recomendada e inteligente)**
`UploadFile` no satura la memoria RAM. Utiliza un archivo temporal guardado en el disco duro del servidor para procesar archivos gigantescos (de varios Gigabytes) de forma asíncrona y eficiente.

```python
from typing import Annotated
from fastapi import FastAPI, File, UploadFile

app = FastAPI()

@app.post("/subir-video/")
async def subir_archivo_grande(
    archivo: Annotated[UploadFile, File(description="Un archivo de video grande")]
):
    # Accedes a metadatos del archivo sin haberlo leído completamente en RAM todavía
    nombre_original = archivo.filename
    tipo_contenido = archivo.content_type
    
    # Leemos el archivo por pedazos (asíncronamente) para guardarlo en el servidor
    contenido = await archivo.read() 
    
    # Siempre es buena práctica cerrar el stream del archivo temporal
    await archivo.close()
    
    return {
        "nombre": nombre_original,
        "tipo": tipo_contenido,
        "bytes_leidos": len(contenido)
    }
```

**Propiedades clave de UploadFile:**

* **filename**: El nombre original del archivo (ej. foto_perfil.png).
* **content_type**: El tipo MIME del archivo (ej. image/png).
* **file**: Un objeto de archivo de Python nativo sobre el cual puedes operar.

ultimo ejemplo completo

```python
from typing import Annotated
from fastapi import FastAPI, Header, Form, File, UploadFile, HTTPException, status

app = FastAPI(
    title="Plataforma de Música - API de Perfiles",
    description="Endpoint simulado para la gestión y actualización de perfiles de usuario.",
    version="1.0.0"
)

@app.put("/perfil/actualizar", tags=["Usuario"])
async def actualizar_perfil(
    # 1. HEADER: Simulamos una validación de token de autenticación
    x_auth_token: Annotated[
        str, 
        Header(description="Token de autenticación del usuario (ej: mi-token-secreto)")
    ],
    
    # 2. FORM: Datos de texto que vienen desde un formulario HTML
    nombre: Annotated[str, Form(min_length=3, max_length=50, description="Tu nombre público")],
    biografia: Annotated[str, Form(max_length=200, description="Breve descripción sobre ti")],
    
    # 3. FILE / UPLOADFILE: Archivo binario para la foto de perfil
    foto_perfil: Annotated[
        UploadFile, 
        File(description="Tu nueva foto de perfil (Formatos aceptados: PNG, JPG)")
    ]
):
    # --- Validación simulada de seguridad ---
    if x_auth_token != "mi-token-secreto":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token de autenticación inválido o ausente."
        )
        
    # --- Validación del tipo de archivo ---
    formatos_validos = ["image/png", "image/jpeg"]
    if foto_perfil.content_type not in formatos_validos:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Formato de archivo no permitido. Solo se aceptan PNG o JPG."
        )

    # --- Procesamiento asíncrono del archivo (Simulación de guardado) ---
    # En un caso real, aquí leerías los bytes y los guardarías en disco o en AWS S3
    contenido_foto = await foto_perfil.read()
    tamaño_en_kb = len(contenido_foto) / 1024
    await foto_perfil.close() # Siempre cerramos el flujo del archivo temporal

    # --- Respuesta exitosa ---
    return {
        "estado": "Perfil actualizado con éxito",
        "datos_guardados": {
            "nombre": nombre,
            "biografia": biografia
        },
        "archivo_procesado": {
            "nombre_original": foto_perfil.filename,
            "tipo_mime": foto_perfil.content_type,
            "tamaño_aproximado": f"{tamaño_en_kb:.2f} KB"
        }
    }
```
