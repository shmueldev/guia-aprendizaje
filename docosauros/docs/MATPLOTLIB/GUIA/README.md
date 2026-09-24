---
id: matplotlib
title: Matplotlib
sidebar_label: Matplotlib
description: Plan de aprendizaje de Matplotlib para gráficos claros antes de Seaborn y Dash.
slug: /matplotlib
---

# Plan de Aprendizaje Completo: Matplotlib

> **Objetivo:** Controlar figura, ejes y estilo para contar un hallazgo, no para decorar un notebook.
>
> **Metodología:** Cada gráfica responde una pregunta. Si el título no es una frase con el hallazgo, se rehace.

## Índice

1. [Fase 1: Figura, ejes y el objeto Artist](#fase-1-figura-ejes-y-el-objeto-artist)
2. [Fase 2: Gráficos de una pregunta](#fase-2-gráficos-de-una-pregunta)
3. [Fase 3: Paneles, anotaciones y estilo](#fase-3-paneles-anotaciones-y-estilo)
4. [Fase 4: Exportar para un informe](#fase-4-exportar-para-un-informe)
5. [Proyectos integradores](#proyectos-integradores)

## Fase 1: Figura, ejes y el objeto Artist

> **Meta:** Dejar `plt.plot` suelto y usar la interfaz orientada a objetos.

- [ ] `fig, ax = plt.subplots()`
- [ ] Título, etiquetas, límites y ticks
- [ ] Varias líneas en el mismo eje y una leyenda que no tape datos
- [ ] Tamaños en pulgadas y `dpi`
- [ ] 🧪 **Práctica:** Una serie de ventas mensual con título que diga si sube o baja.

## Fase 2: Gráficos de una pregunta

> **Meta:** Elegir el gráfico según la pregunta, no según el que salió primero.

- [ ] Línea para tiempo, barra para categorías, histograma para distribución
- [ ] Dispersión con color o tamaño como tercera variable
- [ ] Barras horizontales cuando los nombres son largos
- [ ] Cuándo un gráfico de pastel estorba
- [ ] 🧪 **Práctica:** Tres preguntas, tres gráficos, una frase de lectura bajo cada uno.

## Fase 3: Paneles, anotaciones y estilo

> **Meta:** Comparar sin hacer diez ventanas.

- [ ] `subplots` con rejilla y `sharex` / `sharey`
- [ ] `ax.annotate` para marcar un pico o una caída
- [ ] Colores consistentes (pocos, con significado) y `rcParams`
- [ ] Ejes gemelos solo si las unidades son distintas y hace falta
- [ ] 🧪 **Práctica:** Panel 2x2 de un mismo dataset con una paleta única.

## Fase 4: Exportar para un informe

> **Meta:** Entregar una imagen que se lea en una diapositiva y en un README.

- [ ] `savefig` PNG y SVG, `bbox_inches="tight"`
- [ ] Fondo acorde al destino (informe claro vs tablero oscuro)
- [ ] No depender del estilo por defecto del notebook
- [ ] 🧪 **Práctica:** Exporta el panel de la fase 3 a `docs/img` con nombre y fecha en el archivo, no en el título.

## Proyectos integradores

1. **Una página de EDA** — cuatro gráficos y un párrafo de decisión (qué limpiar después).
2. **Antes y después de la limpieza** — misma escala en ambos paneles.

## Recursos

| Recurso | Uso |
|---|---|
| [Quick start](https://matplotlib.org/stable/users/explain/quick_start.html) | Figura y ejes |
| [Cheatsheets](https://matplotlib.org/cheatsheets/) | Referencia visual |

## Criterios de avance

| Fase | La dominas cuando... |
|---|---|
| 1 | Creas la figura con `ax`, no con el estado global |
| 2 | Justificas el tipo de gráfico en una oración |
| 3 | Un panel comparte escala y no mezcla colores al azar |
| 4 | La imagen exportada se lee sin abrir el notebook |
