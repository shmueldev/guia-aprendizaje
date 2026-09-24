---
id: machine-learning
title: Machine Learning
sidebar_label: Machine Learning
description: Plan de machine learning clásico con scikit-learn, desde la línea base hasta un modelo interpretable.
slug: /machine-learning
---

# Plan de Aprendizaje Completo: Machine Learning

> **Objetivo:** Entrenar modelos clásicos con scikit-learn, empezar siempre por una línea base y saber qué pregunta responde el modelo.
>
> **Metodología:** Un solo problema de principio a fin (clasificación o regresión de negocio). Las fases rehacen ese problema, no saltan de dataset de juguete en juguete.

## Índice

1. [Fase 1: El problema antes del algoritmo](#fase-1-el-problema-antes-del-algoritmo)
2. [Fase 2: Features y fugas](#fase-2-features-y-fugas)
3. [Fase 3: Modelos supervisados](#fase-3-modelos-supervisados)
4. [Fase 4: Modelos no supervisados, con medida](#fase-4-modelos-no-supervisados-con-medida)
5. [Fase 5: Interpretar y entregar](#fase-5-interpretar-y-entregar)
6. [Proyectos integradores](#proyectos-integradores)

## Fase 1: El problema antes del algoritmo

> **Meta:** Definir target, grano y línea base antes de importar un estimador.

- [ ] Clasificación, regresión y por qué clustering no es “el modelo” si la pregunta es predecir
- [ ] Target: qué fila, qué momento, qué evento. Una fila mal definida arruina el resto
- [ ] Línea base: la clase mayoritaria, la media, o una regla de negocio
- [ ] Métrica alineada al costo: accuracy, precision, recall, F1, RMSE, MAE
- [ ] 🧪 **Práctica:** Una página que diga la pregunta, el grano, el target y la línea base numérica.

## Fase 2: Features y fugas

> **Meta:** Construir columnas que existían en el momento de la decisión.

- [ ] Numéricas, categóricas, fechas descompuestas
- [ ] Escalado y encoding dentro del pipeline de scikit-learn, no antes de partir los datos
- [ ] Fuga: usar el futuro, el id, o un agregado calculado con el target
- [ ] `ColumnTransformer` + `Pipeline`
- [ ] 🧪 **Práctica:** Lista de features prohibidas de tu problema y un pipeline que transforma solo con train.

## Fase 3: Modelos supervisados

> **Meta:** Comparar pocos modelos contra la línea base, no coleccionar algoritmos.

- [ ] Regresión lineal y logística: coeficientes con signo y unidad
- [ ] Árboles y random forest o gradient boosting, y el sobreajuste visible en train vs validación
- [ ] `train_test_split` estratificado cuando la clase es rara
- [ ] Curva ROC o matriz de confusión según el problema, no las dos por decorar
- [ ] 🧪 **Práctica:** Tres modelos y una tabla: métrica de línea base, de validación y de test. El test se mira una vez.

## Fase 4: Modelos no supervisados, con medida

> **Meta:** Agrupar o reducir dimensión solo si cambia una decisión.

- [ ] K-means: escala, elección de k, clusters que se pueden nombrar
- [ ] PCA para entender varianza, no para “mejorar accuracy” sin mirar
- [ ] Un cluster sin interpretación no se entrega
- [ ] 🧪 **Práctica:** Segmentos de clientes con un nombre de negocio y una métrica que los distinga.

## Fase 5: Interpretar y entregar

> **Meta:** Que otra persona sepa cuándo creerle al modelo.

- [ ] Importancia de variables o coeficientes, con sus límites
- [ ] Errores típicos: en qué segmento falla
- [ ] Reproducibilidad: semilla, versiones, script único
- [ ] El notebook no es el entregable; lo es el script y la métrica
- [ ] 🧪 **Práctica:** Informe de una página: pregunta, línea base, modelo elegido, dónde falla, qué no hace.

## Proyectos integradores

1. **Clasificador de un evento de negocio** — fuga controlada, línea base y una métrica que no sea solo accuracy.
2. **Regresión de un valor** — error en la unidad del negocio (pesos, días, unidades), no solo un R².

## Recursos

| Recurso | Uso |
|---|---|
| [scikit-learn user guide](https://scikit-learn.org/stable/user_guide.html) | API y pipelines |
| [Hands-On Machine Learning](https://www.oreilly.com/library/view/hands-on-machine-learning/9781098125967/) | Recorrido práctico |
| [Choosing the right estimator](https://scikit-learn.org/stable/machine_learning_map.html) | Mapa, no receta ciega |

## Criterios de avance

| Fase | La dominas cuando... |
|---|---|
| 1 | Tienes línea base numérica antes del primer modelo |
| 2 | El pipeline no ve el test y no usa columnas del futuro |
| 3 | Ganas a la línea base en validación y lo muestras en una tabla |
| 4 | Un cluster tiene nombre y una diferencia medible |
| 5 | Alguien puede rerun el script y obtener la misma métrica |
