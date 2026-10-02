---
id: respuestas
title: Respuestas HTTP
sidebar_label: 2.4
description: Apuntes de FastAPI hasta la fase 3.
slug: /fastapi/notas/respuestas
---

# 2.4 Respuestas y códigos de estado HTTP

Los códigos de estado comunican el resultado de una petición de forma clara y estandarizada. Se agrupan en familias: `2xx` indica éxito, `4xx` señala un problema en la petición o los permisos del cliente, y `5xx` indica un problema del servidor.

## Códigos esenciales y cuándo usarlos

### Éxito (serie 2xx)

* **`200 OK`** — La petición se procesó correctamente. Es habitual en lecturas (`GET`) y en actualizaciones que devuelven un resultado (`PUT` o `PATCH`).
* **`201 Created`** — La petición creó un recurso. Es una respuesta habitual para `POST`; no todos los `POST` tienen que devolver este código, ya que también pueden realizar otras acciones.
* **`204 No Content`** — La petición se procesó correctamente y la respuesta no incluye cuerpo. Es común en operaciones `DELETE`. No se debe devolver contenido junto con este código.

### Errores del cliente (serie 4xx)

* **`400 Bad Request`** — La petición no se puede procesar por una regla de la aplicación o del negocio; por ejemplo, una transferencia que supera el saldo disponible.
* **`401 Unauthorized`** — El cliente no está autenticado o sus credenciales no son válidas.
* **`403 Forbidden`** — El cliente está autenticado, pero no tiene permiso para realizar la operación; por ejemplo, una persona usuaria que intenta acceder a una ruta exclusiva para administradores.
* **`404 Not Found`** — No se encuentra el recurso solicitado, como un producto con un ID inexistente.
* **`409 Conflict`** — La petición entra en conflicto con el estado actual del recurso; por ejemplo, registrar un correo electrónico que ya está en uso.
* **`422 Unprocessable Entity`** — FastAPI responde automáticamente con este código cuando los datos de entrada no pasan la validación, por ejemplo, si un campo entero recibe texto no convertible. Pydantic detecta el error de validación y FastAPI construye la respuesta HTTP.

### Errores del servidor (serie 5xx)

* **`500 Internal Server Error`** — Ocurrió un error inesperado en el servidor, como una excepción no controlada. Los errores previstos deben manejarse de forma explícita; los inesperados deben registrarse y no exponerse al cliente con detalles internos.

## Control de respuestas en FastAPI

### Código de estado en el decorador

El parámetro `status_code` establece el código que FastAPI devolverá por defecto y documentará en OpenAPI. Se suele usar `status` para acceder a las constantes con nombre.

```python
from fastapi import FastAPI, status
from pydantic import BaseModel

app = FastAPI()

class Producto(BaseModel):
    nombre: str
    precio: float

@app.post("/productos/", status_code=status.HTTP_201_CREATED)
def crear_producto(producto: Producto):
    return {"mensaje": "Producto creado", "data": producto}
```

### Respuestas especializadas

Por defecto, FastAPI convierte los diccionarios y modelos de Pydantic que devuelve un endpoint en una respuesta JSON. Para controlar el cuerpo, las cabeceras, la redirección o la transmisión, se pueden devolver clases de `fastapi.responses`:

* **`JSONResponse`** — Devuelve JSON y permite indicar manualmente el código de estado, el contenido y las cabeceras. Para interrumpir el flujo y comunicar un error HTTP, normalmente se usa `HTTPException`.
* **`Response`** — Devuelve contenido sin conversión automática a JSON. Sirve, por ejemplo, para enviar una respuesta vacía con código `204`.
* **`RedirectResponse`** — Redirige al cliente a otra URL. Por defecto utiliza el código `307`.
* **`FileResponse`** — Envía un archivo existente del servidor, por ejemplo, para ofrecer un informe descargable.
* **`StreamingResponse`** — Envía el contenido por partes, sin tener que cargar la respuesta completa en memoria antes de empezar. Es útil para archivos grandes o datos generados progresivamente.

```python
from fastapi import FastAPI, status
from fastapi.responses import JSONResponse, Response, RedirectResponse, FileResponse, StreamingResponse

app = FastAPI()

# 1. JSONResponse personalizado
@app.get("/error-manual")
def error_manual():
    return JSONResponse(
        status_code=status.HTTP_418_IM_A_TEAPOT,
        content={"error": "Soy una tetera"},
        headers={"X-Custom-Header": "ValorEspecial"}
    )

# 2. RedirectResponse
@app.get("/ir-a-google")
def ir_a_google():
    return RedirectResponse(url="https://google.com")

# 3. FileResponse
@app.get("/descargar-reporte")
def descargar_reporte():
    return FileResponse(path="documentos/reporte.pdf", filename="reporte_2026.pdf")

# 4. StreamingResponse (Simulado con un generador)
def generar_datos_gigantes():
    for i in range(100):
        yield f"Línea de datos número {i}\n"

@app.get("/stream")
def streaming_datos():
    return StreamingResponse(generar_datos_gigantes(), media_type="text/plain")
```
