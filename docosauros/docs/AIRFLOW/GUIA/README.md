---
id: airflow
title: Airflow
sidebar_label: Airflow
description: Plan de aprendizaje de Apache Airflow para orquestar pipelines.
slug: /airflow
---

# Plan de Aprendizaje Completo: Airflow

> **Objetivo:** Orquestar pipelines con DAGs idempotentes, dependencias claras y fallos que se puedan reintentar.
>
> **Metodología:** Corre Airflow en local con el proyecto oficial o Docker Compose. Un DAG que solo funciona en tu sesión de notebook no cuenta.

## Índice

1. [Fase 1: Conceptos y el scheduler](#fase-1-conceptos-y-el-scheduler)
2. [Fase 2: Tu primer DAG](#fase-2-tu-primer-dag)
3. [Fase 3: Dependencias, datos y ramificación](#fase-3-dependencias-datos-y-ramificación)
4. [Fase 4: Conexiones, variables y operadores de datos](#fase-4-conexiones-variables-y-operadores-de-datos)
5. [Fase 5: Pruebas, backfill y operación](#fase-5-pruebas-backfill-y-operación)
6. [Proyectos integradores](#proyectos-integradores)

## Fase 1: Conceptos y el scheduler

> **Meta:** Entender qué programa Airflow y qué no ejecuta por arte de magia.

- [ ] DAG, task, operator, sensor, hook
- [ ] Scheduler, webserver, worker, metadata DB
- [ ] Scheduling: cron, data interval, catchup
- [ ] Idempotencia: correr el mismo día dos veces no duplica el resultado
- [ ] 🧪 **Práctica:** Levanta Airflow local y recorre la UI: DAGs, grid, logs de una tarea de ejemplo.

## Fase 2: Tu primer DAG

> **Meta:** Escribir un DAG pequeño y explícito.

- [ ] Decorador `@dag` / `@task` (TaskFlow) o operadores clásicos, y por qué eliges uno
- [ ] `start_date`, `schedule`, `catchup=False` al empezar
- [ ] `retries`, `retry_delay`, `owner`
- [ ] Una tarea = un efecto (extraer, transformar o cargar), no las tres
- [ ] 🧪 **Práctica:** DAG de tres tareas: descargar un archivo del día, validar filas, escribir Parquet.

## Fase 3: Dependencias, datos y ramificación

> **Meta:** Pasar información chica entre tareas y decidir caminos.

- [ ] Dependencias con `>>` y grupos de tareas
- [ ] XCom para metadatos (ruta, conteo), no para dataframes enormes
- [ ] Branching: saltar la carga si la validación falla
- [ ] Sensores con timeout y modo reschedule para no ocupar un worker
- [ ] 🧪 **Práctica:** Si el archivo del día no llega, el DAG espera un tope y falla con un log útil.

## Fase 4: Conexiones, variables y operadores de datos

> **Meta:** Sacar credenciales del código.

- [ ] Connections y Variables; nada de passwords en el DAG
- [ ] Hooks: filesystem, S3, base de datos
- [ ] `BashOperator` / `PythonOperator` como escape, no como estilo por defecto
- [ ] Plantillas Jinja: `{{ ds }}` y la fecha lógica del intervalo
- [ ] 🧪 **Práctica:** La ruta de salida y la conexión salen de Variables/Connections.

## Fase 5: Pruebas, backfill y operación

> **Meta:** Poder repetir un día histórico y confiar en el código antes de desplegar.

- [ ] Probar la función de la tarea sin levantar todo el scheduler
- [ ] `airflow dags test` o ejecutar una tarea con una fecha fija
- [ ] Backfill consciente: qué días reprocesar y el efecto en la tabla destino
- [ ] Alertas (email o log) y un dueño del DAG
- [ ] Estructura de repo: `dags/`, `plugins/` o paquete propio, `requirements`
- [ ] 🧪 **Práctica:** Reprocesa un día ya cargado y demuestra que el destino no duplicó filas.

## Proyectos integradores

1. **Ingesta diaria** — sensor o descarga, validación, escritura particionada, reintento.
2. **Orquestación de un job de Spark o dbt** — Airflow dispara, no contiene toda la transformación.

## Recursos

| Recurso | Uso |
|---|---|
| [Concepts](https://airflow.apache.org/docs/apache-airflow/stable/core-concepts/index.html) | DAG, scheduler, data interval |
| [Tutorial TaskFlow](https://airflow.apache.org/docs/apache-airflow/stable/tutorial/taskflow.html) | Primer DAG |
| [Best practices](https://airflow.apache.org/docs/apache-airflow/stable/best-practices.html) | DAGs mantenibles |

## Criterios de avance

| Fase | La dominas cuando... |
|---|---|
| 1 | Explicas data interval y catchup con un ejemplo de un día |
| 2 | El DAG tiene tres tareas con reintentos y dueño |
| 3 | Un fallo de validación no carga basura |
| 4 | No hay secretos en el archivo del DAG |
| 5 | Reprocesar un día es seguro |
