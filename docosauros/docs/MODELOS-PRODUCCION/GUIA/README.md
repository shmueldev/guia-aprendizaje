---
id: modelos-produccion
title: Modelos en producción
sidebar_label: Modelos en producción
description: Plan para servir, versionar y vigilar un modelo sin que viva solo en un notebook.
slug: /modelos-produccion
---

# Plan de Aprendizaje Completo: Modelos en producción

> **Objetivo:** Sacar el modelo del notebook: un artefacto versionado, un contrato de entrada y una forma de saber si sigue sirviendo.
>
> **Metodología:** El modelo es el de las guías anteriores. Aquí el trabajo de ingeniería es empaquetarlo, exponerlo y vigilarlo. FastAPI es el servidor.

## Índice

1. [Fase 1: Del notebook al artefacto](#fase-1-del-notebook-al-artefacto)
2. [Fase 2: Contrato de datos](#fase-2-contrato-de-datos)
3. [Fase 3: Servir el modelo](#fase-3-servir-el-modelo)
4. [Fase 4: Batch vs online](#fase-4-batch-vs-online)
5. [Fase 5: Vigilancia](#fase-5-vigilancia)
6. [Proyectos integradores](#proyectos-integradores)

## Fase 1: Del notebook al artefacto

> **Meta:** Entrenar con un script y guardar un objeto que otro proceso puede cargar.

- [ ] Script de entrenamiento con semilla, rutas y parámetros explícitos
- [ ] Guardar el `Pipeline` completo (preproceso + modelo), no solo el estimador
- [ ] Versión del artefacto: fecha o hash, y la métrica de validación al lado
- [ ] `requirements` pinneados lo bastante para volver a cargar el archivo
- [ ] 🧪 **Práctica:** Un comando entrena y escribe `model.joblib` más un JSON con la métrica y la fecha.

## Fase 2: Contrato de datos

> **Meta:** Rechazar filas que el modelo no sabe leer.

- [ ] Esquema de entrada: nombres, tipos, rangos razonables
- [ ] Qué pasa con nulos que el train no vio
- [ ] No recalcular features “a ojo” en la API; el mismo pipeline del entrenamiento
- [ ] Ejemplo de request y de response escritos
- [ ] 🧪 **Práctica:** Tres payloads: uno válido, uno con tipos malos y uno con una categoría nueva. Documenta la respuesta de cada uno.

## Fase 3: Servir el modelo

> **Meta:** Una API pequeña que predice y no reentrena en cada request.

- [ ] Cargar el artefacto al arrancar, no en cada llamada
- [ ] Endpoint de predicción y endpoint de salud
- [ ] Tiempo de respuesta y un límite de filas por request
- [ ] Logs: versión del modelo, no los datos sensibles completos
- [ ] 🧪 **Práctica:** FastAPI sirve el pipeline y un test llama al endpoint con el payload válido.

## Fase 4: Batch vs online

> **Meta:** Elegir el modo según la decisión, no según la moda.

- [ ] Online: la decisión ocurre en el momento (fraude, precio, aprobación)
- [ ] Batch: puntuar una tabla de la noche y dejar el score en el lago o en la base
- [ ] Idempotencia del batch: reprocesar el día no duplica scores
- [ ] Dónde encaja Airflow o un job: orquesta el batch, no contiene el modelo
- [ ] 🧪 **Práctica:** Un job que lee el día, escribe scores y puede correr dos veces sin duplicar.

## Fase 5: Vigilancia

> **Meta:** Enterarte cuando el mundo cambió y el modelo no.

- [ ] Guardar predicciones y, cuando exista, el resultado real
- [ ] Deriva de entradas: una feature que ya no se parece al train
- [ ] Caída de la métrica cuando el label llega tarde
- [ ] Cuándo reentrenar y cuándo apagar y volver a la regla de negocio
- [ ] 🧪 **Práctica:** Un reporte semanal de volumen, distribución del score y métrica si ya hay labels.

## Proyectos integradores

1. **API de scoring** — pipeline versionado, contrato y test.
2. **Scoring nocturno** — batch idempotente más un chequeo de deriva simple.

## Recursos

| Recurso | Uso |
|---|---|
| [scikit-learn persistence](https://scikit-learn.org/stable/model_persistence.html) | Guardar el pipeline |
| [FastAPI](https://fastapi.tiangolo.com/es/) | Servir la predicción |
| [Made With ML — MLOps](https://madewithml.com/) | Panorama de producción |

## Criterios de avance

| Fase | La dominas cuando... |
|---|---|
| 1 | Otra máquina carga el artefacto y obtiene la misma predicción de prueba |
| 2 | Un payload malo no entra al modelo |
| 3 | La API predice sin reentrenar y dice qué versión corre |
| 4 | Sabes si tu caso es batch u online y lo implementaste así |
| 5 | Tienes una señal para apagar el modelo si los datos cambian |
