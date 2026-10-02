---
id: dependencias
title: Dependencias
sidebar_label: 2.6
description: Apuntes de FastAPI hasta la fase 3.
slug: /fastapi/notas/dependencias
---

# 2.6 Inyección de Dependencias (Depends)
Es lo que hace posible la arquitectura en capas profesional. En FastAPI `depends` no es solo pasar servicios, es la herramienta principal para pasar recursos, seguridad y datos comunes.

## ¿Para qué sirve? (Problemas que resuelve)

1. **Eliminar la duplicación de código (DRY - Dont Repeat Yourself)** Si tenemos 30 endpoints que requieren de validar un token, en lugar de escribir 30 veces el código de validación, creamos una sola funcion y lo inyectamos.

2. **Desacoplamiento** Separamos la infrastructura, (conectar a la BD, leer headers HTTP) de la lógica de negocio.

3. **Facilidad para Testing (Mocks)** En nuestras pruebas automatizadas, podemos decirle a FastAPI: "Cuando un endpoint pida la base de datos real, inyéctale una base de datos de prueba". Esto se hace con un par de líneas sin tocar el código original.

4. **Gestión segura de recursos** Abre conexiones y garantiza que se cierren automáticamente, pase lo que pase, evitando fugas de memoria o saturación de bases de datos.

## 1. Concepto y Sintaxis Moderna
El estandar de hoy es utilizar `Annoted` de la libreria nativa de `typing`. Esto mejora el auto-completado en los editores y separa claramente el tipo de dato de la logica de FastAPI.

```python
from typing import Annotated
from fastapi import FastAPI, Depends, Header

app = FastAPI()

# La dependencia: una función común y corriente
def verificar_api_key(x_api_key: Annotated[str | None, Header()] = None):
    if not x_api_key or x_api_key != "mi-token-secreto":
        from fastapi import HTTPException
        raise HTTPException(status_code=403, detail="API Key inválida")
    return x_api_key

# El Endpoint usando Annotated
@app.get("/datos-seguros")
def obtener_datos(api_key: Annotated[str, Depends(verificar_api_key)]):
    return {"mensaje": "Acceso concedido", "key_usada": api_key}
```

## 2. Patrones de Uso Avanzado
En lugar de escribir skip: int = 0, limit: int = 10 en todas las rutas de listados, agrupamos la lógica.

### A. Parámetros Comunes (Paginación)

```python
def parametros_paginacion(skip: int = 0, limit: int = 10):
    return {"skip": skip, "limit": limit}

@app.get("/productos")
def listar_productos(paginacion: Annotated[dict, Depends(parametros_paginacion)]):
    # 'paginacion' contendrá un diccionario {'skip': X, 'limit': Y}
    return {"datos": [], "paginacion": paginacion}
```

### B. Dependencias como Clases (__init__ / __call__)
Usar funciones nos limita a un comportamiento fijo, usar clases nos permite guardar configuraciones o estados. Cualquier clase cuyo constructor `(__init__)` reciba parametros puede ser usada como una dependencia.

```python
class ValidadorDeRol:
    def __init__(self, rol_requerido: str):
        self.rol_requerido = rol_requerido

    # El método __call__ hace que la instancia de la clase se pueda invocar como una función
    def __call__(self, x_user_role: Annotated[str, Header()]):
        if x_user_role != self.rol_requerido:
            from fastapi import HTTPException
            raise HTTPException(status_code=403, detail="No tienes el rol requerido")
        return x_user_role

# Uso profesional: Reutilizas la misma clase con configuraciones distintas
@app.get("/admin-panel")
def zona_admin(rol: Annotated[str, Depends(ValidadorDeRol("admin"))]):
    return {"status": "Bienvenido Administrador"}
```

### C. Sub-dependencias (dependencias que dependen de otras)
Las dependencias pueden requerir de otras dependencias en cascada. FastAPI resuelve el árbol jerárquico de forma automática.

```python
def obtener_config_entorno():
    return "PRODUCCION"

# Esta dependencia DEPENDE de la anterior
def verificar_mantenimiento(entorno: Annotated[str, Depends(obtener_config_entorno)]):
    if entorno == "MANTENIMIENTO":
        from fastapi import HTTPException
        raise HTTPException(status_code=503, detail="Servicio no disponible")
    return entorno

@app.get("/api/v1")
def mi_api(entorno: Annotated[str, Depends(verificar_mantenimiento)]):
    return {"status": "Online", "entorno": entorno}
```

### D. Dependencias a nivel de router o aplicación completa (dependencies=[...])
Podemos aplicar muchas reglas de seguridad o validacion a muchas rutas al mismo tiempo, en lugar de ir una por una.
Cuando ponemos varias validaciones seguidas (por ejemplo: primero verificar que esté logueado, y luego verificar que sea administrador).

```python
from fastapi import APIRouter

# Este router protegerá TODOS sus endpoints automáticamente
router = APIRouter(
    prefix="/usuarios",
    dependencies=[Depends(verificar_api_key)] # Se ejecuta para todas las rutas de abajo
)

@router.get("/") # Ya está protegido de forma implícita
def listar_usuarios():
    return [{"id": 1, "nombre": "Alice"}]
```

## 3. Ciclo de vida de recursos
Esre es el concepto mas critico en aplicaciones profesionales de FastAPI para gestionar conexiones de Base de Datos. El uso de `yield` crea un manejador de  contexto implicito.

```python
# Imaginemos un generador de sesiones de Base de Datos (SQLAlchemy)
def get_db():
    db = CrearConexionBaseDeDatos() # 1. Se ejecuta ANTES de que el endpoint inicie.
    try:
        yield db                    # 2. FastAPI le entrega 'db' al endpoint y pausa aquí.
    except Exception:
        db.rollback()               # 3. Si el endpoint o el servicio fallan, hace un rollback.
        raise
    finally:
        db.close()                  # 4. PASE LO QUE PASE (éxito o error), la conexión SE CIERRA de forma segura.
```

### Caché de dependencias (use_cache=True)
Si el endpoint inyecta una función de servicio, y esa función a su vez inyecta get_db(), FastAPI llamaría a get_db() dos veces. Por defecto, use_cache=True, lo que significa que FastAPI crea la conexión una sola vez por petición HTTP, la guarda en caché, la comparte con todos los que la pidan en esa misma llamada y la cierra al final. Si por alguna razón crítica necesitas conexiones separadas en la misma petición, puedes usar Depends(get_db, use_cache=False).


 Casos reales
get_db() — sesión de base de datos por petición
get_current_user() — usuario autenticado (se completa en Fase 4)
Verificación de API keys o roles
