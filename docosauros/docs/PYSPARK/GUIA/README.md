---
id: pyspark
title: PySpark
sidebar_label: PySpark
description: Plan de aprendizaje de PySpark para transformar datos que ya no caben en Pandas.
slug: /pyspark
---

# Plan de Aprendizaje Completo: PySpark

> **Objetivo:** Transformar datos con DataFrames distribuidos: particiones, joins y escrituras que un pipeline pueda repetir.
>
> **Metodología:** Empieza en local (`local[*]`). Cada fase debe poder correr de nuevo y escribir Parquet, no solo mostrarse con `show()`.

## Índice

1. [Fase 1: Sesión, lazy evaluation y el cluster](#fase-1-sesión-lazy-evaluation-y-el-cluster)
2. [Fase 2: DataFrames y transformaciones](#fase-2-dataframes-y-transformaciones)
3. [Fase 3: Joins, ventanas y agregaciones](#fase-3-joins-ventanas-y-agregaciones)
4. [Fase 4: Particiones, shuffle y formato](#fase-4-particiones-shuffle-y-formato)
5. [Fase 5: Spark SQL y calidad del job](#fase-5-spark-sql-y-calidad-del-job)
6. [Proyectos integradores](#proyectos-integradores)

## Fase 1: Sesión, lazy evaluation y el cluster

> **Meta:** Saber qué se ejecuta en el driver y qué se reparte.

- [ ] `SparkSession`, master local y UI en el puerto 4040
- [ ] Transformación vs acción (`select` no calcula; `count` sí)
- [ ] Driver, executors, particiones, jobs, stages, tasks
- [ ] Por qué `collect()` de un dataset grande tumba la máquina
- [ ] 🧪 **Práctica:** Lee un CSV grande, cuenta filas y abre la UI para ver el stage.

## Fase 2: DataFrames y transformaciones

> **Meta:** Limpiar con la API de columnas, no con un UDF de entrada.

- [ ] `select`, `withColumn`, `filter`, `drop`, `alias`
- [ ] Funciones: `col`, `when`, `lit`, fechas, strings
- [ ] Esquema explícito vs inferencia
- [ ] Nulos y casteo seguro
- [ ] UDF solo cuando no existe función nativa, y el costo que tiene
- [ ] 🧪 **Práctica:** Normaliza un archivo de ventas a un esquema fijo y escribe un sample con `show` limitado.

## Fase 3: Joins, ventanas y agregaciones

> **Meta:** Reproducir la lógica de un modelo estrella.

- [ ] Joins y explosión de filas; `broadcast` de una dimensión chica
- [ ] `groupBy` + `agg`
- [ ] Window functions: `row_number`, `sum` acumulado, partición por cliente
- [ ] Deduplicar con ventana, no con un `dropDuplicates` a ciegas si hay regla de negocio
- [ ] 🧪 **Práctica:** Última compra por cliente y venta acumulada del mes.

## Fase 4: Particiones, shuffle y formato

> **Meta:** Escribir datos que el siguiente job pueda leer barato.

- [ ] `repartition` vs `coalesce`
- [ ] Shuffle: cuándo un join o un groupBy lo dispara
- [ ] Parquet, partición de carpeta por fecha (`partitionBy`)
- [ ] Compactar archivos pequeños
- [ ] 🧪 **Práctica:** Reescribe el resultado particionado por `anio` y `mes` y compara el plan.

## Fase 5: Spark SQL y calidad del job

> **Meta:** Poder explicar el plan y probar la transformación.

- [ ] `createOrReplaceTempView` y SQL equivalente al DataFrame
- [ ] `explain` a nivel de lectura: scans, exchanges
- [ ] Cache solo si reutilizas el mismo DataFrame
- [ ] Pruebas con `chispa` o comparando un dataset chico esperado
- [ ] 🧪 **Práctica:** Un módulo `transform(df) -> df` con un test de 10 filas.

## Proyectos integradores

1. **Ingesta diaria a Parquet curado** — esquema, deduplicación y partición por fecha.
2. **Agregado para BI** — hecho mensual listo para que Pandas o un dashboard lo lea.

## Recursos

| Recurso | Uso |
|---|---|
| [Spark SQL guide](https://spark.apache.org/docs/latest/sql-programming-guide.html) | DataFrames |
| [PySpark API](https://spark.apache.org/docs/latest/api/python/index.html) | Funciones |
| [Tuning](https://spark.apache.org/docs/latest/tuning.html) | Shuffle y memoria |

## Criterios de avance

| Fase | La dominas cuando... |
|---|---|
| 1 | Señalas qué línea dispara el cómputo |
| 2 | Limpias sin UDF |
| 3 | Un join no multiplica el hecho y lo demuestras con conteos |
| 4 | La salida queda particionada y sin miles de archivos de 1 KB |
| 5 | Un test pequeño protege la función de transformación |
