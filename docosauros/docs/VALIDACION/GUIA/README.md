---
id: validacion
title: Validación y experimentos
sidebar_label: Validación y experimentos
description: Plan para validar modelos sin engañarte con el test ni con una métrica bonita.
slug: /validacion
---

# Plan de Aprendizaje Completo: Validación y experimentos

> **Objetivo:** Medir un modelo como se mide un experimento: datos separados en el tiempo, métrica estable y una decisión de si el cambio vale la pena.
>
> **Metodología:** Reutiliza el problema de la guía de Machine Learning. Esta guía no entrena modelos nuevos por deporte; pone a prueba el que ya tienes.

## Índice

1. [Fase 1: Partir los datos en serio](#fase-1-partir-los-datos-en-serio)
2. [Fase 2: Validación cruzada y tiempo](#fase-2-validación-cruzada-y-tiempo)
3. [Fase 3: Métricas y umbrales](#fase-3-métricas-y-umbrales)
4. [Fase 4: Errores y segmentos](#fase-4-errores-y-segmentos)
5. [Fase 5: Experimento y decisión](#fase-5-experimento-y-decisión)
6. [Proyectos integradores](#proyectos-integradores)

## Fase 1: Partir los datos en serio

> **Meta:** Que el test represente el futuro, no una mezcla del pasado.

- [ ] Train, validación y test con roles distintos
- [ ] El test no se usa para elegir el modelo ni para tunear
- [ ] Corte temporal cuando la fila tiene fecha
- [ ] Grupos: no dejar al mismo cliente en train y en test si la pregunta es sobre clientes nuevos
- [ ] 🧪 **Práctica:** Dibuja la línea de tiempo de tu dataset y marca qué meses entran en cada conjunto.

## Fase 2: Validación cruzada y tiempo

> **Meta:** Estimar el error sin una sola partición con suerte.

- [ ] K-fold y estratificación
- [ ] `TimeSeriesSplit` cuando el orden importa
- [ ] Por qué un shuffle aleatorio en series de tiempo infla el resultado
- [ ] Varianza del score entre folds: si salta mucho, no confíes en el promedio solo
- [ ] 🧪 **Práctica:** Compara un split aleatorio contra un split temporal y anota la diferencia de métrica.

## Fase 3: Métricas y umbrales

> **Meta:** Elegir el punto de corte según el costo, no según el default 0.5.

- [ ] Matriz de confusión en conteos, no solo en tasas
- [ ] Precision y recall atados a un costo (falso positivo vs falso negativo)
- [ ] Curva precision-recall cuando la clase es rara
- [ ] Calibración: una probabilidad 0.8 debería acertar cerca del 80%
- [ ] 🧪 **Práctica:** Dos umbrales y una frase de cuál usarías en operación y por qué.

## Fase 4: Errores y segmentos

> **Meta:** Saber para quién falla el modelo.

- [ ] Error por segmento: región, canal, antigüedad, decil de score
- [ ] Casos extremos revisados a mano
- [ ] Deriva: la distribución de una feature hoy vs la del train
- [ ] 🧪 **Práctica:** Una tabla de métrica por segmento y el segmento que no deberías automatizar todavía.

## Fase 5: Experimento y decisión

> **Meta:** Comparar contra la regla actual, no contra un modelo imaginario.

- [ ] Champion vs challenger: la regla de negocio o el modelo viejo es el rival
- [ ] Tamaño de muestra mínimo a nivel conceptual: no declares victoria con 20 casos
- [ ] Registro del experimento: datos, semilla, métrica, fecha, conclusión
- [ ] Cuándo no desplegar
- [ ] 🧪 **Práctica:** Bitácora de un experimento con la decisión “sirve / no sirve / sirve solo en este segmento”.

## Proyectos integradores

1. **Auditoría de tu modelo** — split temporal, métrica por segmento y umbral elegido.
2. **Comparación contra la regla actual** — el modelo tiene que ganar en la métrica que el negocio paga.

## Recursos

| Recurso | Uso |
|---|---|
| [Cross-validation — scikit-learn](https://scikit-learn.org/stable/modules/cross_validation.html) | Particiones |
| [Model evaluation](https://scikit-learn.org/stable/modules/model_evaluation.html) | Métricas |
| [Calibration](https://scikit-learn.org/stable/modules/calibration.html) | Probabilidades honestas |

## Criterios de avance

| Fase | La dominas cuando... |
|---|---|
| 1 | El test es un periodo que el modelo no vio |
| 2 | Puedes explicar por qué un shuffle aleatorio te haría ver mejor de lo que eres |
| 3 | El umbral sale de un costo, no del default |
| 4 | Señalas un segmento donde el modelo no debe decidir solo |
| 5 | La bitácora dice si gana a la regla actual |
