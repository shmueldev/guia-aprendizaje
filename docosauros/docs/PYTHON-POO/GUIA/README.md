---
id: python-poo
title: Python con POO
sidebar_label: Python con POO
description: Clases, composición y un dominio que después cabe en FastAPI o Django.
slug: /python-poo
---

# Plan de Aprendizaje Completo: Python con POO

> **Objetivo:** Modelar un problema con objetos propios, no con diccionarios sueltos. FastAPI, Django y los modelos de SQLAlchemy son clases: si la POO está floja, el framework se memoriza y no se entiende.
>
> **Metodología:** Un solo dominio (tareas de un usuario) crece en cada fase. No abras un ejemplo nuevo por cada concepto.

Tus apuntes van en [Mis notas](/docs/python-poo/notas).

> **Avance actual:** las notas propias llegan hasta la fase 4. Están en [Mis notas](/docs/python-poo/notas).

## Índice

1. [Fase 1: Clases y objetos](#fase-1-clases-y-objetos)
2. [Fase 2: Comportamiento y datos protegidos](#fase-2-comportamiento-y-datos-protegidos)
3. [Fase 3: Herencia y composición](#fase-3-herencia-y-composición)
4. [Fase 4: Datos simples y contratos](#fase-4-datos-simples-y-contratos)
5. [Fase 5: Un dominio que un framework puede usar](#fase-5-un-dominio-que-un-framework-puede-usar)
6. [Proyectos integradores](#proyectos-integradores)

## Fase 1: Clases y objetos

> **Meta:** Separar el molde de los ejemplares.

- [ ] `class`, `__init__`, `self` y la diferencia entre clase e instancia
- [ ] Atributos de instancia y atributos de clase, y cuál se comparte
- [ ] Métodos que leen estado y métodos que lo cambian
- [ ] `__str__` y `__repr__` para ver el objeto en un log y no un `<object at 0x...>`
- [ ] 🧪 **Práctica:** `Tarea` con título, estado y un método `cerrar()` que no deja cerrarla dos veces.

## Fase 2: Comportamiento y datos protegidos

> **Meta:** Que el objeto invalide los estados imposibles, no el código de afuera.

- [ ] Convención `_atributo` y por qué no es seguridad real
- [ ] `@property` para leer y validar al asignar
- [ ] Métodos especiales útiles: `__eq__`, `__len__`, `__iter__`
- [ ] Una operación de negocio vive en el objeto, no en una función que recibe cinco dicts
- [ ] 🧪 **Práctica:** `Usuario` cuya lista de tareas no se reemplaza desde afuera; se agregan con un método.

## Fase 3: Herencia y composición

> **Meta:** Reutilizar sin armar una jerarquía que nadie puede seguir.

- [ ] Herencia cuando hay un "es un": `Tarea` y `TareaConFecha`
- [ ] `super()` y qué pasa si lo omites
- [ ] Composición cuando hay un "tiene un": un `Proyecto` contiene tareas, no hereda de `Tarea`
- [ ] Preferir composición si la jerarquía solo existe para compartir dos métodos
- [ ] 🧪 **Práctica:** `Proyecto` con tareas dentro, y un método `atrasadas()` que no está copiado en cada tarea.

## Fase 4: Datos simples y contratos

> **Meta:** No escribir una clase larga cuando el dato es un registro.

- [ ] `@dataclass` para datos con igualdad y representación incluidas
- [ ] `frozen=True` cuando el dato no debe cambiar después de crearse
- [ ] Una clase abstracta pequeña (`abc`) cuando varias implementaciones deben cumplir el mismo método
- [ ] Tipar atributos y retornos para que el editor vea el objeto, no un `Any`
- [ ] 🧪 **Práctica:** `Tarea` como dataclass y un protocolo o clase base `Repositorio` con `guardar` y `listar`.

## Fase 5: Un dominio que un framework puede usar

> **Meta:** Que la regla de negocio no importe FastAPI ni Django.

- [ ] El objeto no conoce HTTP ni la base de datos
- [ ] Una excepción de dominio (`TareaYaCerrada`) en vez de un `print` o un código 404 dentro de la clase
- [ ] Un servicio que usa el objeto y un repositorio: la misma forma que después tendrá un endpoint
- [ ] Django models y los modelos de SQLAlchemy son el mismo oficio: estado más reglas, persistidos por otro
- [ ] 🧪 **Práctica:** Cerrar una tarea pasa por `Tarea.cerrar()`. El servicio solo llama y traduce el error. Sin framework.

## Proyectos integradores

1. **Dominio de tareas** — usuario, proyecto y tarea, con estados válidos y excepciones propias.
2. **Repositorio en memoria** — guarda y lista esos objetos. Más adelante FastAPI solo lo envuelve.

## Recursos

| Recurso | Uso |
|---|---|
| [Classes](https://docs.python.org/es/3/tutorial/classes.html) | Clases y herencia |
| [dataclasses](https://docs.python.org/es/3/library/dataclasses.html) | Registros |
| [abc](https://docs.python.org/es/3/library/abc.html) | Contratos |

## Criterios de avance

| Fase | La dominas cuando... |
|---|---|
| 1 | Creas dos tareas distintas desde la misma clase y no comparten título |
| 2 | Un estado inválido lo rechaza el objeto, no un `if` suelto en el script |
| 3 | Explicas por qué un proyecto contiene tareas y no hereda de ellas |
| 4 | Un dataclass congelado y un repositorio con dos métodos te alcanzan |
| 5 | La regla de cerrar una tarea no menciona HTTP |
