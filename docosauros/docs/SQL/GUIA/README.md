---
id: sql
title: SQL
sidebar_label: SQL
description: Plan de aprendizaje de SQL para ingeniería de datos y ciencia de datos.
slug: /sql
---

# Plan de Aprendizaje Completo: SQL

> **Objetivo:** Leer, unir y agregar datos en una base relacional hasta poder defender un número de negocio y dejar una consulta reusable.
>
> **Metodología:** Usa PostgreSQL o SQL Server. Cada fase termina con una consulta guardada, no con un resultado pegado en un chat.

## Índice

1. [Fase 1: Lectura y filtros](#fase-1-lectura-y-filtros)
2. [Fase 2: Joins y grano](#fase-2-joins-y-grano)
3. [Fase 3: Agregados y ventanas](#fase-3-agregados-y-ventanas)
4. [Fase 4: Modelado para análisis](#fase-4-modelado-para-análisis)
5. [Fase 5: Calidad y rendimiento](#fase-5-calidad-y-rendimiento)
6. [Proyectos integradores](#proyectos-integradores)

## Fase 1: Lectura y filtros

> **Meta:** Traer solo las filas y columnas que responden la pregunta.

- [ ] `SELECT`, `FROM`, `WHERE`, `ORDER BY`, `LIMIT` / `TOP`
- [ ] Tipos: fecha, número, texto, nulos. `NULL` no se compara con `=`
- [ ] `AND`, `OR`, `IN`, `BETWEEN`, `LIKE`
- [ ] Alias y una columna calculada con nombre claro
- [ ] 🧪 **Práctica:** Tres preguntas de un negocio (ventas de un mes, clientes activos, productos sin precio) con una consulta cada una.

## Fase 2: Joins y grano

> **Meta:** Unir tablas sin duplicar el hecho.

- [ ] `INNER`, `LEFT`, y cuándo un `RIGHT` solo confunde
- [ ] Claves primarias y foráneas
- [ ] El grano: una fila es una venta, un día o un cliente, y el join no lo cambia sin que tú lo notes
- [ ] Conteos antes y después del join para cazar explosión de filas
- [ ] 🧪 **Práctica:** Ventas + producto + cliente, y un conteo que demuestra que no duplicaste ventas.

## Fase 3: Agregados y ventanas

> **Meta:** Resumir y comparar sin bajar el detalle a un notebook.

- [ ] `GROUP BY`, `COUNT`, `SUM`, `AVG`, `HAVING`
- [ ] `CASE` para segmentos
- [ ] Funciones de ventana: `ROW_NUMBER`, `SUM() OVER`, `LAG`
- [ ] Ranking por grupo (último pedido por cliente, venta acumulada del mes)
- [ ] 🧪 **Práctica:** Top de clientes del mes y la variación contra el mes anterior.

## Fase 4: Modelado para análisis

> **Meta:** Dejar consultas que un pipeline o un modelo puedan reutilizar.

- [ ] Vistas para el hecho y las dimensiones, no un SQL de 200 líneas cada vez
- [ ] Grano documentado en un comentario: qué es una fila
- [ ] Llaves de fecha (`YYYYMM` o fecha truncada) estables
- [ ] CTEs para leer la consulta por pasos
- [ ] 🧪 **Práctica:** Una vista de ventas mensuales por categoría, lista para Pandas o para un dashboard.

## Fase 5: Calidad y rendimiento

> **Meta:** Saber si el número es confiable y si la consulta aguanta.

- [ ] Chequeos: nulos en la clave, duplicados, fechas fuera de rango
- [ ] `EXPLAIN` a nivel de lectura: scan grande vs búsqueda
- [ ] Índices: cuándo ayudan en un filtro o un join, no crearlos por reflejo
- [ ] Parámetros y no concatenar texto de usuario dentro del SQL
- [ ] 🧪 **Práctica:** Un script de 5 chequeos que corre antes de publicar la vista.

## Proyectos integradores

1. **Mart de ventas** — hecho, producto y calendario, con un chequeo de duplicados.
2. **Cohorte simple** — clientes nuevos por mes y cuántos vuelven al mes siguiente.

## Recursos

| Recurso | Uso |
|---|---|
| [PostgreSQL tutorial](https://www.postgresql.org/docs/current/tutorial.html) | SQL de práctica |
| [Use the index, Luke](https://use-the-index-luke.com/) | Índices sin mito |
| [Modo SQL tutorial](https://mode.com/sql-tutorial/) | Análisis con SQL |

## Criterios de avance

| Fase | La dominas cuando... |
|---|---|
| 1 | Filtras fechas y nulos sin sorpresas |
| 2 | Pruebas que el join no multiplicó el hecho |
| 3 | Comparas un mes contra el anterior en SQL |
| 4 | Otra persona usa tu vista sin pedirte el query original |
| 5 | Tienes chequeos de calidad y una idea de por qué la consulta es lenta o no |
