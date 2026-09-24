---
id: estadistica
title: Estadística
sidebar_label: Estadística
description: Plan de estadística aplicada para leer datos y evaluar modelos.
slug: /estadistica
---

# Plan de Aprendizaje Completo: Estadística

> **Objetivo:** Leer una tabla o un modelo con criterio estadístico: distribución, incertidumbre y la diferencia entre un patrón y un accidente.
>
> **Metodología:** Cada fase usa un dataset real en Pandas. La fórmula se entiende con un ejemplo numérico antes de pasar a la siguiente.

## Índice

1. [Fase 1: Describir sin engañarse](#fase-1-describir-sin-engañarse)
2. [Fase 2: Probabilidad e incertidumbre](#fase-2-probabilidad-e-incertidumbre)
3. [Fase 3: Comparar grupos](#fase-3-comparar-grupos)
4. [Fase 4: Relaciones](#fase-4-relaciones)
5. [Fase 5: Muestreo y sesgo](#fase-5-muestreo-y-sesgo)
6. [Proyectos integradores](#proyectos-integradores)

## Fase 1: Describir sin engañarse

> **Meta:** Elegir el resumen correcto según la forma de los datos.

- [ ] Media, mediana, moda; cuándo la media miente por un outlier
- [ ] Rango, varianza, desviación estándar, percentiles
- [ ] Histogramas y boxplots como lectura, no como decoración
- [ ] Tablas de frecuencia para categorías
- [ ] 🧪 **Práctica:** Resume una métrica de negocio y escribe qué resumen usarías en una reunión y cuál ocultarías.

## Fase 2: Probabilidad e incertidumbre

> **Meta:** Hablar de chance sin tratar un porcentaje suelto como verdad.

- [ ] Probabilidad, eventos independientes y condicionales
- [ ] Teorema de Bayes con un ejemplo de clasificación (falso positivo)
- [ ] Distribuciones: normal, binomial, y colas largas en datos de negocio
- [ ] Intervalos y la idea de margen de error, sin memorizar la fórmula a ciegas
- [ ] 🧪 **Práctica:** Explica con números por qué un modelo con 95% de accuracy puede ser inútil si la clase positiva es rara.

## Fase 3: Comparar grupos

> **Meta:** Decidir si una diferencia merece atención.

- [ ] Hipótesis nula, alternativa, p-valor como evidencia, no como un interruptor mágico
- [ ] Error tipo I y tipo II en una decisión de negocio
- [ ] Comparar medias o proporciones entre dos grupos
- [ ] Tamaño del efecto: una diferencia significativa puede ser pequeña
- [ ] 🧪 **Práctica:** Compara conversión o ticket promedio entre dos segmentos y di si el cambio importa.

## Fase 4: Relaciones

> **Meta:** Medir asociación y no venderla como causa.

- [ ] Covarianza y correlación
- [ ] Regresión lineal simple: pendiente, intercepto, residuos
- [ ] Variables confusoras con un ejemplo concreto
- [ ] Correlación espuria: dos series que suben juntas no se causan
- [ ] 🧪 **Práctica:** Una correlación y una frase que diga qué no puedes concluir.

## Fase 5: Muestreo y sesgo

> **Meta:** Saber si la tabla representa a quien dices que representa.

- [ ] Población vs muestra
- [ ] Sesgo de selección, de supervivencia y de fuga de información en el tiempo
- [ ] Datos faltantes: al azar o porque algo falló en el negocio
- [ ] Partir train y test sin mirar el futuro (puente a la guía de validación)
- [ ] 🧪 **Práctica:** Lista tres formas en que tu dataset de práctica podría estar sesgado.

## Proyectos integradores

1. **Informe de una métrica** — distribución, comparación de dos grupos y una conclusión con límite.
2. **Diagnóstico de un accuracy alto** — clase desbalanceada, línea base y qué métrica sí importa.

## Recursos

| Recurso | Uso |
|---|---|
| [Think Stats](https://greenteapress.com/thinkstats2/html/index.html) | Estadística con Python |
| [OpenIntro Statistics](https://www.openintro.org/book/os/) | Conceptos y ejercicios |
| [Seeing Theory](https://seeing-theory.brown.edu/) | Intuición visual |

## Criterios de avance

| Fase | La dominas cuando... |
|---|---|
| 1 | Eliges mediana o media según la distribución, no por costumbre |
| 2 | Explicas un falso positivo con probabilidad condicional |
| 3 | Separas “hay diferencia” de “la diferencia vale la pena” |
| 4 | No llamas causa a una correlación |
| 5 | Señalas un sesgo concreto en un dataset antes de modelar |
