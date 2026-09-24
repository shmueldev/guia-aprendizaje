---
id: dash
title: Dash
sidebar_label: Dash
description: Plan de aprendizaje de Dash y Plotly para dashboards sobre datos reales.
slug: /dash
---

# Plan de Aprendizaje Completo: Dash

> **Objetivo:** Construir un dashboard interactivo que lea datos ya curados (archivo, SQL o tu API) y se pueda usar sin abrir un notebook.
>
> **Metodología:** La guía de FastAPI ya toca Dash como consumidor de API. Aquí el foco es el producto visual: layout, filtros y una lectura clara.

## Índice

1. [Fase 1: Plotly y el primer layout](#fase-1-plotly-y-el-primer-layout)
2. [Fase 2: Callbacks](#fase-2-callbacks)
3. [Fase 3: Datos de verdad](#fase-3-datos-de-verdad)
4. [Fase 4: Diseño de un tablero](#fase-4-diseño-de-un-tablero)
5. [Fase 5: Multi-página y despliegue](#fase-5-multi-página-y-despliegue)
6. [Proyectos integradores](#proyectos-integradores)

## Fase 1: Plotly y el primer layout

> **Meta:** Separar la figura de la página.

- [ ] `plotly.express`: línea, barra, dispersión
- [ ] Títulos que afirman el hallazgo, ejes con unidad
- [ ] `html.Div`, títulos y `dcc.Graph`
- [ ] Un solo archivo `app.py` con layout estático
- [ ] 🧪 **Práctica:** Una página con dos gráficos del dataset de Pandas, sin interactividad todavía.

## Fase 2: Callbacks

> **Meta:** Un control cambia la figura y nada más se recalcula por accidente.

- [ ] `@callback`, `Input`, `Output`, `State`
- [ ] Dropdown, rango de fechas, checklist
- [ ] `prevent_initial_call` y `no_update`
- [ ] No uses variables globales para el filtro del usuario
- [ ] 🧪 **Práctica:** Filtro de categoría que actualiza KPI, gráfica y tabla.

## Fase 3: Datos de verdad

> **Meta:** El dashboard no esconde un CSV gigante en memoria sin criterio.

- [ ] Cargar al arranque lo agregado; filtrar en memoria solo si cabe
- [ ] Llamar a FastAPI o a una consulta SQL cuando el filtro cambia el universo
- [ ] Errores visibles: mensaje si la fuente no responde
- [ ] `dcc.Interval` solo si la frescura lo exige
- [ ] 🧪 **Práctica:** El filtro de mes pega a un endpoint o a un Parquet particionado, no trae todo el histórico.

## Fase 4: Diseño de un tablero

> **Meta:** Que se lea en una pantalla de trabajo.

- [ ] `dash-bootstrap-components`: container, row, col, cards de KPI
- [ ] Orden: filtros, KPIs, tendencia, desglose, tabla
- [ ] Paleta alineada al azul de esta guía, pocas series
- [ ] Responsive: se puede usar en laptop
- [ ] 🧪 **Práctica:** Tablero de ventas con 4 KPIs, 2 gráficos y una tabla paginada.

## Fase 5: Multi-página y despliegue

> **Meta:** Más de una vista y un proceso que no sea `debug=True`.

- [ ] Páginas con `dash.register_page` o enlaces claros
- [ ] Configuración por variable de entorno (URL del API, ruta de datos)
- [ ] Gunicorn apuntando a `server = app.server`
- [ ] 🧪 **Práctica:** Dos páginas (resumen y detalle) sirviendo fuera del modo debug.

## Proyectos integradores

1. **Tablero ejecutivo** — KPIs, tendencia y desglose sobre el dataset curado de Pandas.
2. **Tablero conectado a tu API** — login simple o API key y filtros que viajan como query params.

## Recursos

| Recurso | Uso |
|---|---|
| [Dash tutorial](https://dash.plotly.com/tutorial) | Layout y callbacks |
| [Plotly Express](https://plotly.com/python/plotly-express/) | Figuras |
| [dash-bootstrap-components](https://dash-bootstrap-components.opensource.faculty.ai/) | Rejilla y cards |

## Criterios de avance

| Fase | La dominas cuando... |
|---|---|
| 1 | La figura tiene una pregunta en el título |
| 2 | Un filtro actualiza solo lo que debe |
| 3 | Cambiar el mes no descarga el dataset entero |
| 4 | Otra persona ubica el KPI principal en cinco segundos |
| 5 | La app arranca con un comando de producción |
