---
id: azure
title: Azure
sidebar_label: Azure
description: Plan de aprendizaje de Azure para lagos de datos, Data Factory e identidad.
slug: /azure
---

# Plan de Aprendizaje Completo: Azure

> **Objetivo:** Armar un flujo de datos en Azure con identidad, un lago, orquestación y control de costo, en paralelo a lo aprendido en AWS.
>
> **Metodología:** Un grupo de recursos de práctica. Todo lo que crees vive ahí para poder borrarlo de un golpe al cerrar la fase.

## Índice

1. [Fase 1: Suscripción, identidad y grupos de recursos](#fase-1-suscripción-identidad-y-grupos-de-recursos)
2. [Fase 2: Lago y cómputo](#fase-2-lago-y-cómputo)
3. [Fase 3: Orquestación con Data Factory](#fase-3-orquestación-con-data-factory)
4. [Fase 4: Consulta y modelo](#fase-4-consulta-y-modelo)
5. [Fase 5: Seguridad, costo e IaC](#fase-5-seguridad-costo-e-iac)
6. [Proyectos integradores](#proyectos-integradores)

## Fase 1: Suscripción, identidad y grupos de recursos

> **Meta:** Separar el ejercicio del resto de la suscripción.

- [ ] Suscripción, grupo de recursos, región
- [ ] Entra ID: usuario, grupos, RBAC sobre el grupo de recursos
- [ ] Azure CLI (`az login`) y la suscripción activa
- [ ] Presupuesto del grupo de recursos
- [ ] 🧪 **Práctica:** Un grupo `rg-guia-dev` con una etiqueta `owner` y `env`.

## Fase 2: Lago y cómputo

> **Meta:** Aterrizar archivos y procesarlos sin dejar la cuenta abierta de más.

- [ ] Storage account, contenedores `raw` y `curated`, acceso con identidad en lugar de keys cuando se pueda
- [ ] ADLS Gen2 y la idea de carpetas por fecha
- [ ] Azure Functions o un job corto para transformar un archivo
- [ ] Parquet como formato curado
- [ ] 🧪 **Práctica:** Sube un CSV a `raw` y deja un Parquet en `curated/anio/mes`.

## Fase 3: Orquestación con Data Factory

> **Meta:** Que el movimiento de datos no dependa de un clic en el portal.

- [ ] Pipeline, actividad de copia, actividad de transformación
- [ ] Linked services y datasets
- [ ] Triggers de programación; parámetros de fecha
- [ ] Reintento y qué pasa si el archivo del día no está
- [ ] Integración con un DAG de Airflow como idea: quién orquesta qué
- [ ] 🧪 **Práctica:** Pipeline diario parametrizado que copia y transforma un día.

## Fase 4: Consulta y modelo

> **Meta:** Leer lo curado con SQL sin volver a bajar el CSV.

- [ ] Vista o tabla sobre el Parquet (Synapse serverless, Fabric o Databricks sobre el mismo lago: elige una y profundiza)
- [ ] Grano de la tabla y partición por fecha
- [ ] Una consulta de negocio: total por categoría y mes
- [ ] Documentar fuente, frescura y dueño
- [ ] 🧪 **Práctica:** Una consulta guardada que otro podría usar en un reporte.

## Fase 5: Seguridad, costo e IaC

> **Meta:** Cerrar accesos y poder recrear el grupo.

- [ ] RBAC mínimo: quien orquesta no es administrador de la suscripción
- [ ] Key Vault para secretos que todavía no pueden ser identidad administrada
- [ ] Cost Management filtrado por el grupo de recursos
- [ ] Bicep o Terraform del storage y del grupo, aunque el pipeline siga en el portal al principio
- [ ] Borrar el grupo al terminar el ejercicio de práctica
- [ ] 🧪 **Práctica:** Lista de recursos, costo estimado y un script que recrea storage + contenedores.

## Proyectos integradores

1. **Lago de un dominio** — raw, curated, pipeline diario y una consulta.
2. **Comparación AWS vs Azure** — el mismo flujo de la guía de AWS, nombrando el servicio equivalente.

## Recursos

| Recurso | Uso |
|---|---|
| [Azure Data Factory](https://learn.microsoft.com/azure/data-factory/) | Pipelines |
| [Data Lake Storage](https://learn.microsoft.com/azure/storage/blobs/data-lake-storage-introduction) | Lago |
| [RBAC](https://learn.microsoft.com/azure/role-based-access-control/overview) | Permisos |

## Criterios de avance

| Fase | La dominas cuando... |
|---|---|
| 1 | El ejercicio vive en un grupo de recursos con presupuesto |
| 2 | Hay raw y curated, y el curado es Parquet |
| 3 | El pipeline corre un día concreto por parámetro |
| 4 | Una consulta SQL responde una pregunta de negocio sobre el lago |
| 5 | Puedes borrar el grupo y decir qué volverías a crear |
