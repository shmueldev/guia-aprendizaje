---
id: react
title: React
sidebar_label: React.js
description: Plan de aprendizaje de React para una interfaz sobre tus APIs de datos.
slug: /react
---

# Plan de Aprendizaje Completo: React.js

> **Objetivo:** Construir una interfaz de datos con componentes, estado y rutas, consumiendo la API que ya sabes hacer.
>
> **Metodología:** Vite + React. JavaScript de la guía anterior se asume. El entregable es una app de varias vistas, no un solo componente gigante.

## Índice

1. [Fase 1: Componentes y JSX](#fase-1-componentes-y-jsx)
2. [Fase 2: Estado y eventos](#fase-2-estado-y-eventos)
3. [Fase 3: Efectos y datos remotos](#fase-3-efectos-y-datos-remotos)
4. [Fase 4: Composición de un tablero](#fase-4-composición-de-un-tablero)
5. [Fase 5: Rutas, build y despliegue](#fase-5-rutas-build-y-despliegue)
6. [Proyectos integradores](#proyectos-integradores)

## Fase 1: Componentes y JSX

> **Meta:** Partir la pantalla en piezas con props.

- [ ] Proyecto Vite, estructura `src/`
- [ ] Función componente, JSX, `className`
- [ ] Props de solo lectura; componer hijos
- [ ] Listas con `key` estable
- [ ] 🧪 **Práctica:** Tarjeta de KPI reutilizable con título, valor y unidad.

## Fase 2: Estado y eventos

> **Meta:** El filtro vive en el estado, la UI es consecuencia.

- [ ] `useState` para un filtro y un valor derivado (no dupliques el total en otro estado)
- [ ] Eventos de inputs controlados
- [ ] Levantar el estado al componente que coordina la página
- [ ] 🧪 **Práctica:** Filtro de categoría que recorta una lista local y actualiza el KPI.

## Fase 3: Efectos y datos remotos

> **Meta:** Cargar de la API con carga, error y limpieza.

- [ ] `useEffect` para pedir datos cuando cambia el filtro
- [ ] Estados `loading`, `error`, `data`
- [ ] Abortar la petición anterior si el filtro cambia rápido
- [ ] URL del API por variable `import.meta.env`
- [ ] 🧪 **Práctica:** La misma pantalla contra FastAPI, con mensaje si el backend está caído.

## Fase 4: Composición de un tablero

> **Meta:** Una página que se parece a un producto.

- [ ] Layout: barra, filtros, fila de KPIs, gráfico (una lib liviana o una tabla)
- [ ] Componentes tontos de presentación vs un contenedor que habla con la API
- [ ] Formato de números (`Intl.NumberFormat`)
- [ ] Accesible a nivel básico: labels en los filtros, contraste
- [ ] 🧪 **Práctica:** Vista de resumen de ventas con componentes en archivos separados.

## Fase 5: Rutas, build y despliegue

> **Meta:** Navegar y publicar el estático.

- [ ] React Router: resumen y detalle
- [ ] Links internos, no recargar toda la app
- [ ] `npm run build` y previsualizar
- [ ] El build no incluye secretos
- [ ] 🧪 **Práctica:** Dos rutas publicadas en un hosting estático o servidas por el mismo dominio que la API.

## Proyectos integradores

1. **Cliente del tablero** — KPIs y detalle contra tu API, la alternativa React a la guía de Dash.
2. **Explorador de corridas** — lista de ejecuciones de un pipeline (fecha, estado, filas) si ya tienes ese endpoint.

## Recursos

| Recurso | Uso |
|---|---|
| [Tutorial de React](https://react.dev/learn) | Componentes, estado, efectos |
| [Vite](https://vite.dev/guide/) | Proyecto y build |
| [React Router](https://reactrouter.com/start/declarative/installation) | Rutas |

## Criterios de avance

| Fase | La dominas cuando... |
|---|---|
| 1 | Un KPI es un componente con props, usado tres veces |
| 2 | El filtro no se guarda en el DOM, se guarda en estado |
| 3 | Ves carga y error, y una petición vieja no pisa a la nueva |
| 4 | La página está partida en archivos con una sola responsabilidad |
| 5 | `npm run build` genera la app y las rutas siguen funcionando |
