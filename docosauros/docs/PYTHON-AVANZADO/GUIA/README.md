---
id: python-avanzado
title: Python avanzado
sidebar_label: Python avanzado
description: Decoradores, tipado, concurrencia y pruebas para usar frameworks sin pelear con el lenguaje.
slug: /python-avanzado
---

# Plan de Aprendizaje Completo: Python avanzado

> **Objetivo:** Leer el código de FastAPI, Django, Pandas y PySpark y reconocer el mecanismo de Python que está debajo: un decorador, un generador, un tipo o una espera.
>
> **Metodología:** Intermedio y POO van antes. Cada fase muestra el mismo recurso en Python puro y dice en qué librería lo vas a volver a ver.

Tus apuntes van en [Mis notas](/docs/python-avanzado/notas).

## Índice

1. [Fase 1: Decoradores](#fase-1-decoradores)
2. [Fase 2: Gestores de contexto](#fase-2-gestores-de-contexto)
3. [Fase 3: Tipado que los frameworks exigen](#fase-3-tipado-que-los-frameworks-exigen)
4. [Fase 4: Hilos, procesos y asyncio](#fase-4-hilos-procesos-y-asyncio)
5. [Fase 5: Logging, empaquetado y pruebas](#fase-5-logging-empaquetado-y-pruebas)
6. [Proyectos integradores](#proyectos-integradores)

## Fase 1: Decoradores

> **Meta:** Entender que `@algo` es una función que envuelve otra.

- [ ] Una función puede recibir y devolver otra función
- [ ] Escribir un decorador que mide el tiempo y conserva el nombre con `functools.wraps`
- [ ] Decorador con argumentos
- [ ] Dónde vuelve a aparecer: `@app.get` en FastAPI, `@login_required` en Django, `@property` en una clase
- [ ] 🧪 **Práctica:** `@medir` sobre tres funciones y un log con el nombre real, no `wrapper`.

## Fase 2: Gestores de contexto

> **Meta:** Abrir y cerrar un recurso aunque la operación falle.

- [ ] `with` y el protocolo `__enter__` / `__exit__`
- [ ] `contextlib.contextmanager` para no escribir una clase
- [ ] Varios recursos en un solo `with`
- [ ] Dónde vuelve a aparecer: sesión de SQLAlchemy, archivo, cliente HTTP, lock
- [ ] 🧪 **Práctica:** Un contexto que abre un archivo de log y lo cierra, y otro que hace `rollback` si hubo excepción.

## Fase 3: Tipado que los frameworks exigen

> **Meta:** Anotar funciones y estructuras como lo hacen FastAPI y las firmas de Pandas.

- [ ] `list[int]`, `dict[str, float]`, `tuple[int, str]`, `set[str]`
- [ ] `str | None` para un campo opcional
- [ ] `Literal`, `TypedDict` y `Callable`
- [ ] `Annotated` para colgar metadatos de un tipo, que es la forma moderna de los parámetros de FastAPI
- [ ] Pasar el archivo por `pyright` o `mypy` y corregir lo que marque
- [ ] 🧪 **Práctica:** Las funciones del proyecto de POO quedan anotadas y el type checker pasa en modo básico.

## Fase 4: Hilos, procesos y asyncio

> **Meta:** Elegir la herramienta según si el programa espera o calcula.

- [ ] I/O-bound frente a CPU-bound
- [ ] `threading` cuando esperas y la librería no es async
- [ ] `multiprocessing` cuando el CPU está ocupado (un cálculo de Pandas o un UDF pesado no se arregla con `async`)
- [ ] `async` / `await`, `asyncio.gather` y el error de meter `time.sleep` dentro de `async def`
- [ ] Dónde vuelve a aparecer: endpoints `async` de FastAPI, el driver de Spark que no debes bloquear, `asyncio` en un cliente HTTP
- [ ] 🧪 **Práctica:** Diez esperas de un segundo, primero secuenciales y después con `gather`. Anota los tiempos.

## Fase 5: Logging, empaquetado y pruebas

> **Meta:** Un módulo que otra persona instala y prueba, no un notebook de un solo uso.

- [ ] `logging` con niveles, no `print` para diagnosticar
- [ ] Paquete con `pyproject.toml` o al menos instalable en el venv
- [ ] `pytest`: un test del camino feliz y uno del error
- [ ] Dónde vuelve a aparecer: tests de una API, logs de un job de Spark, el paquete que Airflow importa
- [ ] 🧪 **Práctica:** El dominio de tareas tiene dos tests y un log cuando una transición de estado se rechaza.

## Proyectos integradores

1. **Mini librería `tareas`** — dominio de la guía de POO, decorador de tiempo, contexto de unidad de trabajo y tipos.
2. **Cliente concurrente** — baja o simula varias respuestas y deja un log por cada fallo, sin tumbar el lote.

## Recursos

| Recurso | Uso |
|---|---|
| [functools](https://docs.python.org/es/3/library/functools.html) | `wraps` |
| [contextlib](https://docs.python.org/es/3/library/contextlib.html) | `with` propio |
| [typing](https://docs.python.org/es/3/library/typing.html) | Anotaciones |
| [asyncio](https://docs.python.org/es/3/library/asyncio.html) | Concurrencia de espera |
| [pytest](https://docs.pytest.org/) | Pruebas |

## Criterios de avance

| Fase | La dominas cuando... |
|---|---|
| 1 | Lees `@app.get` y sabes que es una función envolviendo a tu función |
| 2 | Un recurso se cierra solo si el bloque falla |
| 3 | Anotas una función opcional y el editor te avisa si pasas el tipo mal |
| 4 | Decides hilo, proceso o `asyncio` con una frase, según espera o cálculo |
| 5 | `pytest` falla si quitas una regla del dominio |
