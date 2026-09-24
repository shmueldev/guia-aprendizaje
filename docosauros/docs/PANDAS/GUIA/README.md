---
id: pandas
title: Pandas
sidebar_label: Pandas
description: Plan de aprendizaje de Pandas para limpieza, joins y preparación de pipelines.
slug: /pandas
---

# Plan de Aprendizaje Completo: Pandas

> **Objetivo:** Limpiar, unir y resumir tablas hasta dejar un dataset confiable para un pipeline o un modelo.
>
> **Metodología:** Trabaja sobre un archivo real (ventas, logs o un export de Power BI). Cada fase deja ese archivo más usable que al empezar.

## Índice

1. [Fase 1: Series, DataFrame y lectura](#fase-1-series-dataframe-y-lectura)
2. [Fase 2: Selección y limpieza](#fase-2-selección-y-limpieza)
3. [Fase 3: Joins, grupos y reshape](#fase-3-joins-grupos-y-reshape)
4. [Fase 4: Fechas, texto y calidad](#fase-4-fechas-texto-y-calidad)
5. [Fase 5: Rendimiento y handoff al pipeline](#fase-5-rendimiento-y-handoff-al-pipeline)
6. [Proyectos integradores](#proyectos-integradores)

## Fase 1: Series, DataFrame y lectura

> **Meta:** Cargar datos sin adivinar tipos.

- [ ] `Series` vs `DataFrame`; índice y columnas
- [ ] `read_csv`, `read_excel`, `read_parquet`: separador, encoding, `dtype`, `parse_dates`
- [ ] `head`, `info`, `describe`, `shape`, `columns`
- [ ] `loc` vs `iloc`
- [ ] 🧪 **Práctica:** Carga un CSV problemático (comas en texto, fechas, nulos) y deja un `info()` limpio.

## Fase 2: Selección y limpieza

> **Meta:** Que cada columna tenga un tipo y un significado.

- [ ] Filtros booleanos y `query`
- [ ] Nulos: `isna`, `dropna`, `fillna`; cuándo borrar y cuándo imputar
- [ ] Duplicados: `duplicated`, `drop_duplicates`, claves de negocio
- [ ] Tipos: `astype`, categorías, errores con `to_numeric(..., errors="coerce")`
- [ ] Renombres y un diccionario de columnas estable
- [ ] 🧪 **Práctica:** Documento de calidad: % nulos, duplicados y tipos antes/después.

## Fase 3: Joins, grupos y reshape

> **Meta:** Combinar tablas como en un modelo estrella chico.

- [ ] `merge`: inner, left, claves compuestas, sufijos, validar cardinalidad con `validate`
- [ ] `concat` y cuándo no usarlo en lugar de un join
- [ ] `groupby`: `agg`, `transform`, `filter`
- [ ] `pivot`, `pivot_table`, `melt` (el UNPIVOT de un reporte ancho)
- [ ] 🧪 **Práctica:** Hecho de ventas + dimensión de producto, con totales por categoría y mes.

## Fase 4: Fechas, texto y calidad

> **Meta:** Dejar llaves de tiempo y texto comparables.

- [ ] `to_datetime`, zonas, periodos `dt.to_period("M")`
- [ ] Resample básico sobre una serie
- [ ] Strings: `str.strip`, `str.lower`, `str.extract`
- [ ] Outliers con percentiles o reglas de negocio, no solo con un z-score ciego
- [ ] 🧪 **Práctica:** Calendario de meses continuos aunque falten días en la fuente.

## Fase 5: Rendimiento y handoff al pipeline

> **Meta:** Saber el límite de Pandas en una laptop y cómo entregar el resultado.

- [ ] Evitar `apply` fila a fila; preferir operaciones vectorizadas
- [ ] `category` y lectura por columnas (`usecols`)
- [ ] Exportar Parquet con tipos estables
- [ ] Qué de esta lógica debe vivir después en SQL o Spark
- [ ] 🧪 **Práctica:** Script reproducible (`argparse` o función `main`) que lee crudo y escribe curado.

## Proyectos integradores

1. **Dataset de ventas listo para BI** — limpieza, dimensión de producto y agregado mensual.
2. **Bitácora de calidad** — mismo pipeline sobre dos meses y un diff de esquemas.

## Recursos

| Recurso | Uso |
|---|---|
| [10 minutes to pandas](https://pandas.pydata.org/docs/user_guide/10min.html) | Mapa rápido |
| [User guide](https://pandas.pydata.org/docs/user_guide/index.html) | Joins, groupby, tiempo |
| [Pandas comparada con SQL](https://pandas.pydata.org/docs/getting_started/comparison/comparison_with_sql.html) | Si ya piensas en SQL |

## Criterios de avance

| Fase | La dominas cuando... |
|---|---|
| 1 | Lees un archivo y justificas cada dtype |
| 2 | Entregas un conteo de nulos y duplicados, no solo un `dropna` |
| 3 | Un join no duplica filas y puedes probarlo |
| 4 | El mes de una fecha no depende del formato del Excel |
| 5 | El script corre de nuevo sobre un archivo nuevo sin editar celdas a mano |
