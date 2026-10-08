---
id: python-intermedio
title: Python intermedio
sidebar_label: Python intermedio
description: Funciones, colecciones, módulos, archivos y errores para dejar de escribir scripts frágiles.
slug: /python-intermedio
---

# Plan de Aprendizaje Completo: Python intermedio

> **Objetivo:** Escribir Python claro y predecible antes de FastAPI, Django, Pandas o PySpark. Si una lista se modifica sola o un import falla, el framework no es el problema.
>
> **Metodología:** Cada fase cierra con un script que corre de nuevo sin tocarlo. No pases de fase sin ese script.

Tus apuntes van en [Mis notas](/docs/python-intermedio/notas).

## Índice

1. [Fase 1: Funciones, alcance y mutabilidad](#fase-1-funciones-alcance-y-mutabilidad)
2. [Fase 2: Colecciones](#fase-2-colecciones)
3. [Fase 3: Módulos, paquetes y entornos](#fase-3-módulos-paquetes-y-entornos)
4. [Fase 4: Archivos y errores](#fase-4-archivos-y-errores)
5. [Fase 5: Iterar sin cargar todo](#fase-5-iterar-sin-cargar-todo)
6. [Proyectos integradores](#proyectos-integradores)

## Fase 1: Funciones, alcance y mutabilidad

> **Meta:** Saber qué variable cambia, dónde vive y qué devuelve cada función.

- [ ] Parámetros, retorno y funciones que no devuelven `None` por accidente
- [ ] Argumentos posicionales, por nombre, `*args` y `**kwargs`
- [ ] Alcance: local, global y por qué una variable de adentro no existe afuera
- [ ] Mutabilidad: una lista o un dict se comparten; un número o un string, no
- [ ] El valor por defecto mutable (`def f(items=[])`) y por qué se reemplaza con `None`
- [ ] 🧪 **Práctica:** Una función `agregar(item, items=None)` que no arrastra elementos de la llamada anterior.

## Fase 2: Colecciones

> **Meta:** Elegir la estructura y transformarla sin un `for` lleno de índices.

- [ ] `list`, `dict`, `set`, `tuple`: cuándo cada una
- [ ] Slicing, desempaquetado y `enumerate` / `zip`
- [ ] Comprensiones de lista, dict y set, y cuándo un `for` normal se lee mejor
- [ ] `dict.get`, `setdefault` y fusionar diccionarios
- [ ] Ordenar con `key` y un criterio de negocio, no solo alfabético
- [ ] 🧪 **Práctica:** De una lista de ventas, totales por categoría con un dict y una comprensión.

## Fase 3: Módulos, paquetes y entornos

> **Meta:** Que el código de un archivo pueda usarse desde otro sin copiarlo.

- [ ] `import`, `from ... import` y el nombre con el que queda el módulo
- [ ] `if __name__ == "__main__"` para que importar no ejecute el script
- [ ] Paquete con `__init__.py` y rutas relativas dentro del paquete
- [ ] Entorno virtual: `venv` o `uv`, y un `requirements.txt` que otro pueda instalar
- [ ] No dejar dependencias sueltas en el Python del sistema
- [ ] 🧪 **Práctica:** Un paquete `informes/` con dos módulos y un `python -m` que lo ejecuta.

## Fase 4: Archivos y errores

> **Meta:** Leer datos y fallar con un mensaje que dice qué pasó.

- [ ] `pathlib` para rutas, no strings pegados a mano
- [ ] Leer y escribir texto, CSV y JSON
- [ ] `with` para cerrar el archivo aunque haya un error
- [ ] `try` / `except` / `else` / `finally`, y capturar la excepción concreta, no un `except:` vacío
- [ ] Lanzar una excepción propia con un mensaje de negocio
- [ ] 🧪 **Práctica:** Un lector de CSV que avisa la fila y la columna cuando un número viene mal.

## Fase 5: Iterar sin cargar todo

> **Meta:** Recorrer datos grandes sin meterlos enteros en una lista.

- [ ] Iterador: qué es pedir el siguiente elemento
- [ ] Generador con `yield` y la diferencia con una lista ya construida
- [ ] `itertools`: `islice`, `groupby`, `chain` a nivel de uso
- [ ] No convertir a `list()` por reflejo si el siguiente paso solo recorre
- [ ] 🧪 **Práctica:** Un generador que lee un archivo línea por línea y cuenta, sin `readlines()`.

## Proyectos integradores

1. **Resumen de un CSV** — lee ventas, agrupa por categoría y escribe un JSON. Funciones puras en un módulo, errores con fila y columna.
2. **Paquete instalable en el venv** — el mismo resumen se importa desde otro script.

## Recursos

| Recurso | Uso |
|---|---|
| [Tutorial de Python](https://docs.python.org/es/3/tutorial/) | Funciones, módulos y errores |
| [pathlib](https://docs.python.org/es/3/library/pathlib.html) | Rutas |
| [itertools](https://docs.python.org/es/3/library/itertools.html) | Recorrer sin materializar |

## Criterios de avance

| Fase | La dominas cuando... |
|---|---|
| 1 | Explicas por qué un default `[]` se comparte entre llamadas |
| 2 | Resumes una lista con un dict sin perder filas |
| 3 | Importas tu paquete y el script principal no se dispara al importar |
| 4 | Un CSV roto termina con un error que señala la fila |
| 5 | Cuentas líneas de un archivo sin cargarlo entero |
