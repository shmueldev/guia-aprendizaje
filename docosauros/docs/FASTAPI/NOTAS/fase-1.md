---
id: fase-1
title: Fase 1 · Python moderno
sidebar_label: 1. Python moderno
description: Type hints y async/await, con el ejemplo de descargas corregido.
slug: /fastapi/notas/fase-1
---

# Fase 1: Fundamentos de Python moderno

## 1.1 Tipado

Los type hints no detienen la ejecución si rompes las reglas. Para obligar a respetarlos se usa `mypy` o `pyright` (Pylance en Cursor).

### Colecciones

No solo dices que es una lista. Dices qué hay adentro.

- `list[int]` — lista de enteros
- `dict[str, float]` — un menú de precios: `{"pizza": 12.5}`
- `tuple[int, str]` — exactamente dos elementos, en ese orden
- `set[str]` — textos únicos
- `list[dict[str, list[int]]]` — lista de diccionarios cuyas llaves son texto y cuyos valores son listas de enteros

### Tipos que FastAPI usa todo el tiempo

- `str | None` — el campo puede faltar. En APIs es el campo opcional.
- `int | float` — más de un tipo aceptado.
- `Callable[[int, int], int]` — el valor es una función: recibe dos enteros y devuelve un entero.
- `Any` — apaga el chequeo. Si abunda, los hints dejan de servir.
- `Literal["activo", "inactivo"]` — solo esos valores. `"pendiente"` es un error del editor.
- `TypedDict` y `NamedTuple` — estructura fija, con nombres.
- `Annotated[str, Query(max_length=50)]` — el tipo más metadatos. FastAPI lo usa para validar parámetros.

```python
from typing import Annotated, Literal

edad: int = 30

def suma(a: int, b: int) -> int:
    return a + b

estado: Literal["activo", "inactivo"] = "activo"
```

## 1.2 Async / await

**I/O-bound:** el programa espera algo externo (red, disco, base de datos). Ahí la asincronía sirve: el procesador atiende otra tarea mientras llega la respuesta.

**CPU-bound:** el procesador está calculando. `async` no ayuda. Para eso está `multiprocessing`.

**Bloqueo:** una operación detiene el hilo hasta terminar. Un `time.sleep(5)` congela todo lo demás.

El **event loop** reparte las tareas. Cuando una corrutina espera, el loop pasa a la siguiente que ya puede continuar. `asyncio.run()` arranca ese loop una sola vez, al inicio.

`await` cede el control mientras esa corrutina espera. Una corrutina se puede pausar y reanudar sin perder su estado, y es mucho más liviana que un hilo.

Errores que rompen el beneficio:

1. Llamar una función `async` y olvidar el `await`.
2. Meter `time.sleep()` o `requests.get()` dentro de `async def`. Eso bloquea el loop entero.

| | Qué hace |
|---|---|
| `time.sleep()` | Bloquea el hilo |
| `asyncio.sleep()` | Devuelve el control al loop |

| Herramienta | Para qué |
|---|---|
| `asyncio.gather` | Lanza varias corrutinas y espera todas, en el mismo orden |
| `asyncio.create_task` | La lanza en segundo plano y el código sigue |
| `asyncio.wait_for` | Límite de tiempo. Si se pasa, `TimeoutError` |
| `asyncio.Semaphore(3)` | Como máximo 3 a la vez. Sirve para no tumbar una API ajena |
| `gather(..., return_exceptions=True)` | Un fallo no tumba el lote; el error queda en la lista |

### Ejemplo clave: 10 descargas

La versión síncrona tarda unos 10 segundos. La asíncrona, cerca de 1, porque las esperas ocurren juntas.

```python
import asyncio
import time

URLS = [f"https://ejemplo.com/{i}" for i in range(1, 11)]


def descargar_sync(url: str) -> str:
    time.sleep(1)
    return f"contenido de {url}"


def ejecutar_sync() -> list[str]:
    inicio = time.perf_counter()
    resultados = [descargar_sync(url) for url in URLS]
    print(f"Síncrono: {time.perf_counter() - inicio:.2f} s")
    return resultados


async def descargar_async(url: str) -> str:
    await asyncio.sleep(1)
    return f"contenido de {url}"


async def ejecutar_async() -> list[str]:
    inicio = time.perf_counter()
    tareas = [descargar_async(url) for url in URLS]
    resultados = await asyncio.gather(*tareas)
    print(f"Asíncrono: {time.perf_counter() - inicio:.2f} s")
    return resultados


if __name__ == "__main__":
    ejecutar_sync()
    asyncio.run(ejecutar_async())
```

El punto de la fase: FastAPI está construido sobre tipos y sobre este modelo de espera. Si el `await` no está, o si adentro hay código bloqueante, la API se comporta como un servidor de un solo cliente.
