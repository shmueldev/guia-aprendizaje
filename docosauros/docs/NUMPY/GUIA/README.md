---
id: numpy
title: NumPy
sidebar_label: NumPy
description: Plan de aprendizaje de NumPy para cálculo vectorizado antes de Pandas y Spark.
slug: /numpy
---

# Plan de Aprendizaje Completo: NumPy

> **Objetivo:** Pensar en arreglos, no en bucles de Python, para preparar Pandas, visualización y el salto a cómputo distribuido.
>
> **Metodología:** Cada fase termina con un script medido. Si un `for` recorre celdas, todavía no está la fase.

## Índice

1. [Fase 1: Arrays, dtypes y creación](#fase-1-arrays-dtypes-y-creación)
2. [Fase 2: Indexación, máscaras y broadcasting](#fase-2-indexación-máscaras-y-broadcasting)
3. [Fase 3: Álgebra y agregaciones](#fase-3-álgebra-y-agregaciones)
4. [Fase 4: Rendimiento y puente a tablas](#fase-4-rendimiento-y-puente-a-tablas)
5. [Proyectos integradores](#proyectos-integradores)

## Fase 1: Arrays, dtypes y creación

> **Meta:** Crear `ndarray` a propósito y saber qué tipo numérico estás usando.

- [ ] `array`, `zeros`, `ones`, `arange`, `linspace`, `full`
- [ ] `shape`, `ndim`, `size`, `dtype`, `itemsize`
- [ ] Enteros vs flotantes vs booleanos; `astype` y pérdida de precisión
- [ ] Diferencia entre vista y copia (`reshape` vs `copy`)
- [ ] 🧪 **Práctica:** Genera una matriz 1_000 x 8 de mediciones y reporta shape, dtype y memoria.

## Fase 2: Indexación, máscaras y broadcasting

> **Meta:** Seleccionar y transformar sin bucles.

- [ ] Slicing, indexación elegante e indexación booleana
- [ ] Máscaras combinadas con `&`, `|`, `~` (no `and` / `or`)
- [ ] Broadcasting: alinear formas `(n, 1)` con `(1, m)`
- [ ] `np.where`, `np.clip`, `np.nan` y por qué `NaN` no es `None`
- [ ] 🧪 **Práctica:** Limpia una matriz con valores fuera de rango y nulos usando solo máscaras.

## Fase 3: Álgebra y agregaciones

> **Meta:** Resumir y combinar arreglos como lo harías en una métrica.

- [ ] `sum`, `mean`, `std`, `min`, `max` con `axis`
- [ ] Producto punto, multiplicación de matrices (`@`) y normas
- [ ] `unique`, `bincount`, `histogram`
- [ ] Semillas con `np.random.default_rng` para resultados repetibles
- [ ] 🧪 **Práctica:** Normaliza columnas (z-score) y calcula una matriz de correlación simple.

## Fase 4: Rendimiento y puente a tablas

> **Meta:** Saber cuándo NumPy basta y cuándo pasar a Pandas.

- [ ] Vectorizar una función con `np.vectorize` y por qué casi nunca es la mejor opción
- [ ] Comparar un bucle Python contra una operación de array con `timeit`
- [ ] Guardar y leer `.npy` / `.npz`
- [ ] De array a `DataFrame`: cuándo hace falta índice, columnas y tipos
- [ ] 🧪 **Práctica:** Reescribe un script de totales diarios en NumPy y documenta el speedup.

## Proyectos integradores

1. **Control de calidad de sensores** — máscaras, rangos válidos y un resumen por columna.
2. **Mini feature store numérico** — normalización y una matriz lista para graficar en Matplotlib.

## Recursos

| Recurso | Uso |
|---|---|
| [NumPy absolute beginners](https://numpy.org/doc/stable/user/absolute_beginners.html) | Base oficial |
| [Broadcasting](https://numpy.org/doc/stable/user/basics.broadcasting.html) | Formas y ejes |

## Criterios de avance

| Fase | La dominas cuando... |
|---|---|
| 1 | Creas un array con el dtype y la forma que pediste, no los que salieron por accidente |
| 2 | Filtras y rellenas sin un `for` |
| 3 | Agregas por eje y explicas qué dimensión desaparece |
| 4 | Mides un cambio de rendimiento y decides si el siguiente paso es Pandas |
