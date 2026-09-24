---
id: seaborn
title: Seaborn
sidebar_label: Seaborn
description: Plan de aprendizaje de Seaborn para EDA estadística sobre Pandas.
slug: /seaborn
---

# Plan de Aprendizaje Completo: Seaborn

> **Objetivo:** Hacer análisis exploratorio estadístico encima de un DataFrame, apoyado en Matplotlib cuando haga falta afinar el eje.
>
> **Metodología:** Seaborn resume relaciones. Matplotlib sigue siendo el lienzo. No abandones lo aprendido en la guía anterior.

## Índice

1. [Fase 1: Temas, DataFrames y figuras](#fase-1-temas-dataframes-y-figuras)
2. [Fase 2: Distribuciones y categorías](#fase-2-distribuciones-y-categorías)
3. [Fase 3: Relaciones](#fase-3-relaciones)
4. [Fase 4: Facetas y lectura de EDA](#fase-4-facetas-y-lectura-de-eda)
5. [Proyectos integradores](#proyectos-integradores)

## Fase 1: Temas, DataFrames y figuras

> **Meta:** Integrar Seaborn con el `ax` de Matplotlib.

- [ ] `set_theme`, paletas y contexto (`notebook`, `talk`, `paper`)
- [ ] Toda función recibe `data` + nombres de columnas, no listas sueltas
- [ ] Pasar un `ax` existente para combinar con Matplotlib
- [ ] 🧪 **Práctica:** Mismo gráfico en tema claro y oscuro, legible en los dos.

## Fase 2: Distribuciones y categorías

> **Meta:** Ver forma, outliers y comparación entre grupos.

- [ ] `histplot`, `kdeplot`, `boxplot`, `violinplot`
- [ ] `barplot` con estimador e intervalo, vs una barra de Pandas ya agregada
- [ ] `countplot` para frecuencias
- [ ] Orden de categorías con sentido de negocio, no alfabético por defecto
- [ ] 🧪 **Práctica:** Compara una métrica entre 4 segmentos y señala el outlier.

## Fase 3: Relaciones

> **Meta:** Buscar asociación sin declarar causalidad.

- [ ] `scatterplot` y `lineplot` con `hue` y `style`
- [ ] `relplot` cuando la faceta es parte de la pregunta
- [ ] `heatmap` de correlación: método, máscara del triángulo, anotaciones
- [ ] Correlación no es causalidad: anótalo en el título o en el texto
- [ ] 🧪 **Práctica:** Heatmap de un dataset ancho y una frase sobre qué par investigar.

## Fase 4: Facetas y lectura de EDA

> **Meta:** Cerrar una exploración con figuras que otro pueda leer.

- [ ] `FacetGrid` / `catplot` / `displot` para partir por una dimensión
- [ ] Límites compartidos para comparar de verdad
- [ ] Exportar con Matplotlib (`fig.savefig`) después de `tight_layout`
- [ ] 🧪 **Práctica:** Informe de 5 figuras: distribución, categoría, relación, correlación y una faceta.

## Proyectos integradores

1. **EDA de un mes de ventas** — cinco figuras y tres decisiones de limpieza o de modelo.
2. **Comparación de dos fuentes** — mismas preguntas visuales sobre el crudo y el curado.

## Recursos

| Recurso | Uso |
|---|---|
| [Seaborn tutorial](https://seaborn.pydata.org/tutorial.html) | API por tipo de gráfico |
| [Gallery](https://seaborn.pydata.org/examples/index.html) | Elegir el gráfico |

## Criterios de avance

| Fase | La dominas cuando... |
|---|---|
| 1 | Ajustas ejes de Matplotlib sobre un gráfico de Seaborn |
| 2 | Comparas grupos sin distorsionar el orden ni el estimador |
| 3 | Lees un heatmap sin tratar la correlación como causa |
| 4 | Entregas un paquete corto de EDA, no un notebook infinito |
