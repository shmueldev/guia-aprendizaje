---
id: errores
title: Manejo de errores
sidebar_label: 2.5
description: Apuntes de FastAPI hasta la fase 3.
slug: /fastapi/notas/errores
---

# 2.5 Manejo de Errores

## `HTTPException`

`HTTPException` permite detener el procesamiento de un endpoint y devolver inmediatamente una respuesta de error con un código de estado y un detalle. Es apropiada cuando la condición detectada ya corresponde a una respuesta HTTP, como un recurso inexistente o credenciales inválidas. El parámetro `headers` permite incluir cabeceras en esa respuesta, por ejemplo, `WWW-Authenticate` en un error `401`.

```python
from fastapi import FastAPI, HTTPException, status

app = FastAPI()

@app.get("/items/{item_id}")
def leer_item(item_id: int):
    if item_id != 42:
        # Detiene la ejecución y responde un 404 inmediatamente
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail="El artículo solicitado no existe en la base de datos."
        )
    return {"item": "El artículo definitivo"}

@app.get("/secreto")
def zona_privada(token: str = None):
    if not token:
        # Añadiendo cabeceras personalizadas al error
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Se requiere un token de acceso válido.",
            headers={"WWW-Authenticate": "Bearer"}
        )
    return {"secreto": "Información confidencial"}
```

## Excepciones personalizadas

Cuando una regla de negocio falla, conviene representarla con una excepción propia del dominio, independiente de FastAPI y de HTTP. Así, la capa de servicio puede reutilizarse desde una API, una tarea programada o una aplicación de consola. La capa web traduce luego esa excepción a una respuesta HTTP mediante un manejador registrado con `@app.exception_handler()`.

Un flujo habitual consta de tres pasos:

1. **Definir excepciones de dominio.** Son clases normales de Python que heredan de `Exception`; no conocen códigos HTTP ni importan FastAPI. Por ejemplo, una regla de saldo podría representarse con `SaldoInsuficienteError`.

```python
# excepciones.py
class ObjetoNoEncontradoError(Exception):
    """Excepción lanzada cuando un recurso no existe en la base de datos."""
    def __init__(self, mensaje: str = "El recurso solicitado no existe."):
        self.mensaje = mensaje
        super().__init__(self.mensaje)

class TokenInvalidoError(Exception):
    """Excepción lanzada cuando la autenticación falla."""
    pass
```

2. **Registrar handlers en FastAPI.** Si una parte de la aplicación lanza una excepción registrada, FastAPI ejecuta el handler correspondiente y este construye la respuesta HTTP. El handler puede establecer el código, el cuerpo y las cabeceras.

```python
# main.py
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from excepciones import ObjetoNoEncontradoError, TokenInvalidoError

app = FastAPI()

# Handler global para cuando un ítem no existe
@app.exception_handler(ObjetoNoEncontradoError)
async def objeto_no_encontrado_handler(request: Request, exc: ObjetoNoEncontradoError):
    return JSONResponse(
        status_code=404,
        content={"error": "Not Found", "detalle": exc.mensaje}
    )

# Handler global para errores de autenticación
@app.exception_handler(TokenInvalidoError)
async def token_invalido_handler(request: Request, exc: TokenInvalidoError):
    return JSONResponse(
        status_code=401,
        content={"error": "Unauthorized", "detalle": "Se requiere un token válido."},
        headers={"WWW-Authenticate": "Bearer"}
    )
```

3. **Usar la excepción desde el endpoint o servicio.** El endpoint delega la operación y deja que el handler traduzca la excepción. La lógica de negocio no necesita decidir cómo se representa el error en HTTP.

```python
# controladores.py
@app.get("/items/{item_id}")
def leer_item(item_id: int):
    # En la vida real, aquí llamarías a: servicio.obtener_item(item_id)
    if item_id != 42:
        # Lanzas tu propia excepción interna. El handler global se encarga del resto.
        raise ObjetoNoEncontradoError("El artículo solicitado no existe en la base de datos.")
        
    return {"item": "El artículo definitivo"}
```

## Buenas prácticas

Define un contrato de error estable para toda la API. Por ejemplo, las respuestas de error pueden seguir esta estructura:

```python
{ "status": "error", "code": "NOMBRE_ERROR", "message": "Texto legible" }
```

Los handlers de dominio anteriores ilustran el mecanismo con una estructura distinta (`error` y `detalle`). En una API real, elige un único contrato y aplícalo también a esos handlers; no mezcles formatos entre errores HTTP, errores de dominio y errores de validación.

FastAPI devuelve `422 Unprocessable Entity` automáticamente cuando falla la validación de entrada. Puedes registrar un handler para cambiar la estructura de esa respuesta. El ejemplo siguiente también normaliza las excepciones HTTP; conserva las cabeceras del error y evita devolver los valores enviados por el cliente en los detalles de validación.

```python
from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from starlette.exceptions import HTTPException as StarletteHTTPException

app = FastAPI()

@app.exception_handler(StarletteHTTPException)
async def http_exception_handler(request: Request, exc: StarletteHTTPException):
    message = (
        exc.detail
        if isinstance(exc.detail, str)
        else "La solicitud no pudo procesarse."
    )
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "status": "error",
            "code": f"HTTP_{exc.status_code}",
            "message": message,
        },
        headers=exc.headers,
    )

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=422,
        content={
            "status": "error",
            "code": "VALIDATION_ERROR",
            "message": "Los datos enviados no son válidos.",
            "details": [
                {
                    "field": ".".join(str(part) for part in error["loc"]),
                    "code": error["type"],
                }
                for error in exc.errors()
            ],
        },
    )
```

En producción, devuelve al cliente mensajes comprensibles y seguros. No expongas stack traces, consultas, rutas internas ni secretos; registra esos detalles en los logs del servidor y protege también los mensajes incluidos en `HTTPException.detail`.

### un ejemplo completo
1. La Capa de Datos/Servicio (Donde ocurre la validación)Esta clase es pura lógica de Python. No importa si la llamas desde una API web, desde un script de consola (CLI) o desde una tarea programada; las reglas de negocio se validan aquí adentro.

```python
servicios/items.py
from excepciones import ObjetoNoEncontradoError

class ItemService:
    def obtener_por_id(self, item_id: int):
        # 1. Simulación de búsqueda en Base de Datos
        item = buscar_en_base_de_datos(item_id) 
        
        # 2. LA VALIDACIÓN REAL OCURRE AQUÍ
        if not item:
            # Lanza la excepción de tu dominio, NO un HTTPException
            raise ObjetoNoEncontradoError(f"El artículo con ID {item_id} no existe.")
            
        return item
```

2. El Endpoint (El "Controlador")Mira lo limpio que queda.
El endpoint no tiene bloques if, no tiene validaciones de existencia, ni sabe qué códigos de estado HTTP (404, 401, etc.) enviar si algo sale mal. Solo delega el trabajo.

```python
routers/items.py
from fastapi import APIRouter, Depends
from servicios.items import ItemService

router = APIRouter()

@router.get("/items/{item_id}")
def leer_item(item_id: int, servicio: ItemService = Depends()):
    # El endpoint solo llama al servicio y retorna el éxito.
    # Si el servicio lanza "ObjetoNoEncontradoError", la ejecución se detiene aquí
    # y salta directamente al Handler Global sin que escribas código extra.
    item = servicio.obtener_por_id(item_id)
    return {"item": item}
```
¿Por qué se hace así en proyectos grandes?

Reutilización: Si mañana creamos otra ruta que necesita validar si un ítem existe, solo llamas a servicio.obtener_por_id(item_id) y listo. 

La validación ya está empaquetada.Pruebas Unitarias (Testing): Puedes probar toda tu lógica de negocio (el archivo servicios/items.py) de forma súper rápida en tus tests automatizados sin necesidad de levantar FastAPI, simular peticiones HTTP, ni usar clientes de prueba (TestClient). Solo pruebas funciones normales de Python.
