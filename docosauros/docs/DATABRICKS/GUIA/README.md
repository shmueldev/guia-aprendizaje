---
id: databricks
title: Databricks
sidebar_label: Databricks
description: Plan de aprendizaje de Databricks para notebooks, jobs, Delta y costo.
slug: /databricks
---

# Plan de Aprendizaje Completo: Databricks

> **Objetivo:** Pasar de un notebook suelto a un job repetible sobre Delta Lake, con permisos y un ojo en el costo del cluster.
>
> **Metodología:** Todo lo que sirva en PySpark se reutiliza. Aquí se suma la plataforma: workspace, catálogo, jobs y tablas Delta.

## Índice

1. [Fase 1: Workspace y clusters](#fase-1-workspace-y-clusters)
2. [Fase 2: Notebooks con disciplina](#fase-2-notebooks-con-disciplina)
3. [Fase 3: Delta Lake](#fase-3-delta-lake)
4. [Fase 4: Jobs, orquestación y ambientes](#fase-4-jobs-orquestación-y-ambientes)
5. [Fase 5: Gobernanza y costo](#fase-5-gobernanza-y-costo)
6. [Proyectos integradores](#proyectos-integradores)

## Fase 1: Workspace y clusters

> **Meta:** Saber dónde corre el código y quién paga el cómputo.

- [ ] Workspace, carpetas, repos de Git
- [ ] Cluster all-purpose vs job cluster
- [ ] Runtime, autoscaling y auto-termination
- [ ] DBFS, volúmenes y Unity Catalog a nivel de concepto: dónde viven los archivos y las tablas
- [ ] 🧪 **Práctica:** Un cluster que se apaga solo y un notebook leído desde un repo, no pegado a mano.

## Fase 2: Notebooks con disciplina

> **Meta:** Que el notebook sea una entrada, no la única copia de la lógica.

- [ ] Widgets o parámetros de job para la fecha de proceso
- [ ] Separar lectura, transformación y escritura
- [ ] `%run` o módulos importados: una sola implementación de la transformación
- [ ] Logs que digan qué fecha y cuántas filas se escribieron
- [ ] 🧪 **Práctica:** Notebook parametrizado que procesa un día y falla con un mensaje claro si la fecha viene vacía.

## Fase 3: Delta Lake

> **Meta:** Tablas con historia, esquema y escrituras seguras.

- [ ] Parquet vs Delta: transacción, time travel, `OPTIMIZE`
- [ ] `CREATE TABLE`, `MERGE` para upsert de una dimensión o un hecho
- [ ] Evolución de esquema controlada, no a ciegas
- [ ] `VACUUM` y la retención: no borrar historia que todavía necesitas
- [ ] Partición y `ZORDER` como idea de rendimiento, aplicada con medida
- [ ] 🧪 **Práctica:** Un `MERGE` diario que actualiza clientes y agrega los nuevos sin duplicar.

## Fase 4: Jobs, orquestación y ambientes

> **Meta:** Correr sin tener el notebook abierto.

- [ ] Job con tarea de notebook o de wheel / script
- [ ] Cluster de job, reintentos, alertas
- [ ] Dependencia entre tareas (ingesta → curado → agregado)
- [ ] Dev y prod: otro catálogo o prefijo, no el mismo path
- [ ] 🧪 **Práctica:** Workflow de dos tareas encadenadas, lanzado por horario o a mano con parámetro.

## Fase 5: Gobernanza y costo

> **Meta:** Que otra persona pueda leer la tabla y que el cluster no quede encendido el fin de semana.

- [ ] Permisos mínimos sobre el catálogo o el workspace
- [ ] Service principal o identidad del job, distinta a tu usuario interactivo
- [ ] Etiquetas de costo y revisión de DBU
- [ ] Documentar dueño, frescura y grano de la tabla
- [ ] 🧪 **Práctica:** Ficha de una tabla: grano, fuente, job que la escribe y cluster que usa.

## Proyectos integradores

1. **Pipeline medallón corto** — bronze archivo, silver `MERGE`, gold agregado, en un workflow.
2. **Dimensión de cliente** — upsert diario y una consulta de time travel para ver el cambio.

## Recursos

| Recurso | Uso |
|---|---|
| [Databricks getting started](https://docs.databricks.com/en/getting-started/index.html) | Workspace |
| [Delta Lake](https://docs.delta.io/latest/delta-intro.html) | Tablas y MERGE |
| [Jobs](https://docs.databricks.com/en/jobs/index.html) | Orquestación |

## Criterios de avance

| Fase | La dominas cuando... |
|---|---|
| 1 | Distingues cluster interactivo de cluster de job y apagas el primero |
| 2 | La fecha de proceso entra por parámetro |
| 3 | Un `MERGE` es idempotente si lo corres dos veces el mismo día |
| 4 | El workflow corre sin tu sesión abierta |
| 5 | Puedes decir cuánto cómputo usa el job y quién es dueño de la tabla |
