---
id: aws
title: AWS
sidebar_label: AWS
description: Plan de aprendizaje de AWS para almacenamiento, datos, identidad y costo.
slug: /aws
---

# Plan de Aprendizaje Completo: AWS

> **Objetivo:** Diseñar un flujo de datos pequeño en AWS con identidad, almacenamiento, cómputo y una idea clara de la factura.
>
> **Metodología:** Usa una cuenta de práctica y un presupuesto con alarma. Cada fase debe poder apagarse. No dejes un recurso corriendo “para ver”.

## Índice

1. [Fase 1: Cuenta, IAM y regiones](#fase-1-cuenta-iam-y-regiones)
2. [Fase 2: Almacenamiento y cómputo](#fase-2-almacenamiento-y-cómputo)
3. [Fase 3: Datos](#fase-3-datos)
4. [Fase 4: Eventos y orquestación](#fase-4-eventos-y-orquestación)
5. [Fase 5: Red, seguridad y costo](#fase-5-red-seguridad-y-costo)
6. [Proyectos integradores](#proyectos-integradores)

## Fase 1: Cuenta, IAM y regiones

> **Meta:** Entrar con el menor privilegio y saber en qué región estás creando cosas.

- [ ] Cuenta, usuario raíz solo para lo inevitable, usuario o rol de trabajo
- [ ] Políticas, roles, `AssumeRole`; nada de access keys en el código
- [ ] Regiones y zonas; elegir una y quedarte ahí al empezar
- [ ] AWS CLI y un perfil con nombre
- [ ] Presupuesto y alarma de costo el primer día
- [ ] 🧪 **Práctica:** Un rol que puede listar un bucket y no puede administrar IAM.

## Fase 2: Almacenamiento y cómputo

> **Meta:** Guardar archivos y correr un proceso que termina.

- [ ] S3: buckets, prefijos, clases de almacenamiento, bloqueo de acceso público
- [ ] Versionado y ciclo de vida a un nivel básico
- [ ] Lambda para un proceso corto; límites de tiempo y memoria
- [ ] EC2 o Fargate solo si el proceso no cabe en una función
- [ ] 🧪 **Práctica:** Sube un CSV a S3 y una Lambda que cuente filas y escriba un resumen en otro prefijo.

## Fase 3: Datos

> **Meta:** Consultar y transformar sin convertir S3 en un desorden de CSV.

- [ ] Formato: CSV de aterrizaje, Parquet para lo curado
- [ ] Glue Data Catalog y crawler o registro manual de una tabla
- [ ] Athena para consultar Parquet en S3
- [ ] RDS PostgreSQL cuando necesitas transacciones, no para todo
- [ ] Redshift o un warehouse como panorama, no como primer servicio
- [ ] 🧪 **Práctica:** Una tabla Athena sobre Parquet particionado por fecha y una consulta de totales.

## Fase 4: Eventos y orquestación

> **Meta:** Disparar el proceso cuando llega el archivo, no a mano.

- [ ] EventBridge o notificación de S3 hacia Lambda o un workflow
- [ ] Step Functions para encadenar validar → transformar → publicar
- [ ] Colas SQS cuando hay que absorber picos
- [ ] Reintentos e idempotencia: el mismo archivo dos veces no duplica el curado
- [ ] 🧪 **Práctica:** Al subir un archivo a `raw/`, parte un flujo que deja el resultado en `curated/`.

## Fase 5: Red, seguridad y costo

> **Meta:** Cerrar lo que abriste y explicar el costo de una corrida.

- [ ] Security groups y el principio de no abrir `0.0.0.0/0` a una base
- [ ] Cifrado en S3 (SSE) y secretos en Secrets Manager, no en variables sueltas del repo
- [ ] CloudWatch logs de la Lambda o del step
- [ ] Cost Explorer: qué servicio gastó
- [ ] IaC de introducción: un stack mínimo en Terraform o CloudFormation del bucket y el rol
- [ ] 🧪 **Práctica:** Borras o paras los recursos de práctica y el presupuesto queda en calma.

## Proyectos integradores

1. **Ingesta serverless** — S3 raw, Lambda o Step Functions, Parquet, Athena.
2. **API chica en Lambda** — solo si ya cerraste FastAPI; aquí el foco es el empaquetado y el rol.

## Recursos

| Recurso | Uso |
|---|---|
| [IAM best practices](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html) | Identidad |
| [S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html) | Almacenamiento |
| [Athena](https://docs.aws.amazon.com/athena/latest/ug/what-is.html) | SQL sobre S3 |

## Criterios de avance

| Fase | La dominas cuando... |
|---|---|
| 1 | Trabajas con un rol y una alarma de costo activa |
| 2 | Un archivo entra a S3 y un proceso termina solo |
| 3 | Consultas Parquet con Athena sin descargar el dataset |
| 4 | El flujo se dispara por el archivo y es idempotente |
| 5 | Puedes apagar el ejercicio y decir qué se iba a cobrar |
