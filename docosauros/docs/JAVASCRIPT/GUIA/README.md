---
id: javascript
title: JavaScript
sidebar_label: JavaScript
description: Plan de aprendizaje de JavaScript moderno antes de React.
slug: /javascript
---

# Plan de Aprendizaje Completo: JavaScript

> **Objetivo:** Leer y escribir JavaScript moderno para consumir una API y manipular una página, como base de React.
>
> **Metodología:** Sin framework en esta guía. El navegador y Node bastan. Cada fase deja un archivo que abres y usas.

## Índice

1. [Fase 1: Lenguaje](#fase-1-lenguaje)
2. [Fase 2: Colecciones y funciones](#fase-2-colecciones-y-funciones)
3. [Fase 3: Asincronía y fetch](#fase-3-asincronía-y-fetch)
4. [Fase 4: DOM y módulos](#fase-4-dom-y-módulos)
5. [Fase 5: Proyecto en el navegador](#fase-5-proyecto-en-el-navegador)
6. [Proyectos integradores](#proyectos-integradores)

## Fase 1: Lenguaje

> **Meta:** Tipos, alcance y errores que vas a ver en React.

- [ ] `let`, `const`, y por qué no `var`
- [ ] Tipos: string, number, boolean, `null`, `undefined`, objeto, array
- [ ] Comparaciones: `===`
- [ ] Condicionales y bucles cortos
- [ ] `try` / `catch` con un mensaje útil
- [ ] 🧪 **Práctica:** Un script de Node que valide un objeto “fila de ventas” y liste errores.

## Fase 2: Colecciones y funciones

> **Meta:** Transformar listas como transformarías un DataFrame chico.

- [ ] Funciones, arrow functions, parámetros por defecto
- [ ] `map`, `filter`, `reduce`, `find`
- [ ] Desestructuración y spread
- [ ] Inmutabilidad práctica: no mutar el array original si vas a volver a pintarlo
- [ ] 🧪 **Práctica:** De un JSON de ventas, totales por categoría sin un `for` clásico.

## Fase 3: Asincronía y fetch

> **Meta:** Pedir datos a tu API y manejar el fallo.

- [ ] Promesas: `then`, `catch`, `finally`
- [ ] `async` / `await`
- [ ] `fetch`: status, JSON, headers `Authorization`
- [ ] Timeout o abortar una petición colgada
- [ ] 🧪 **Práctica:** Script que llama a un endpoint local y muestra un error claro si responde 401 o 500.

## Fase 4: DOM y módulos

> **Meta:** Pintar el resultado en una página sin framework.

- [ ] Seleccionar nodos, crear elementos, escuchar `click` y `change`
- [ ] No concatenar HTML con datos de usuario sin cuidado
- [ ] Módulos `import` / `export`
- [ ] Vite o un servidor estático simple para desarrollar
- [ ] 🧪 **Práctica:** Página con un select que vuelve a pedir datos y rehace una lista.

## Fase 5: Proyecto en el navegador

> **Meta:** Una mini app de una pantalla, ordenada en archivos.

- [ ] Separar `api.js`, `render.js` y el arranque
- [ ] Estados de carga, vacío y error
- [ ] Formato de números y fechas para una persona, no el JSON crudo
- [ ] 🧪 **Práctica:** Buscador de un recurso de tu API con esos tres estados.

## Proyectos integradores

1. **Cliente de tu API de tareas o ventas** — lista, filtro y detalle en HTML plano.
2. **Lector de un JSON curado** — agregados en el cliente solo si el archivo es chico; si no, pídelos al backend.

## Recursos

| Recurso | Uso |
|---|---|
| [JavaScript MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide) | Lenguaje |
| [Fetch](https://developer.mozilla.org/es/docs/Web/API/Fetch_API/Using_Fetch) | HTTP |
| [Vite](https://vite.dev/guide/) | Servidor de desarrollo |

## Criterios de avance

| Fase | La dominas cuando... |
|---|---|
| 1 | Evitas `var` y comparas con `===` sin pensarlo |
| 2 | Resumes una lista con `map` / `filter` / `reduce` |
| 3 | Una API caída no deja la página en blanco sin mensaje |
| 4 | El filtro redibuja la lista desde datos, no editando el DOM a ciegas |
| 5 | El código está partido en módulos y se entiende el flujo |
