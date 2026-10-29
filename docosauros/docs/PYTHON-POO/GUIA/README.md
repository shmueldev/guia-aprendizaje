---
id: python-poo
title: Python con POO
sidebar_label: Python con POO
description: Clases, encapsulamiento, herencia, contratos y un dominio que después cabe en FastAPI o Django.
slug: /python-poo
---

# Plan de Aprendizaje Completo: Python con POO

> **Objetivo:** Modelar un problema con objetos propios, no con diccionarios sueltos. FastAPI, Django y los modelos de SQLAlchemy son clases: si la POO está floja, el framework se memoriza y no se entiende.
>
> **Metodología:** Un solo dominio (tareas de un usuario) crece en cada fase. No abras un ejemplo nuevo por cada concepto. La guía nombra lo que debes estudiar; los apuntes y el código van en [Mis notas](/docs/python-poo/notas).

> **Avance actual:** las notas propias llegan hasta la fase 4. Están en [Mis notas](/docs/python-poo/notas).

## Índice

1. [Fase 1: Clases y objetos](#fase-1-clases-y-objetos)
2. [Fase 2: Encapsulamiento, decoradores de clase y métodos especiales](#fase-2-encapsulamiento-decoradores-de-clase-y-métodos-especiales)
3. [Fase 3: Herencia y composición](#fase-3-herencia-y-composición)
4. [Fase 4: Datos, Enum y contratos](#fase-4-datos-enum-y-contratos)
5. [Fase 5: Un dominio que un framework puede usar](#fase-5-un-dominio-que-un-framework-puede-usar)
6. [Proyectos integradores](#proyectos-integradores)

---

## Fase 1: Clases y objetos

> **Meta:** Separar el molde de los ejemplares y saber qué vive en cada uno.

- [ ] `class`, instancia y la diferencia entre el molde y el objeto
- [ ] `__init__` y `self` (convención, no palabra reservada)
- [ ] Atributos de instancia vs. atributos de clase, y qué pasa si asignas el de clase en una instancia
- [ ] Métodos que leen estado vs. métodos que lo cambian
- [ ] `__str__` (humano / `print`) vs. `__repr__` (logs / depuración)
- [ ] Crear varios objetos de la misma clase sin que compartan estado de instancia
- [ ] 🧪 **Práctica:** `Tarea` con título, estado y un método `cerrar()` que no deja cerrarla dos veces. Implementa `__str__` y `__repr__`.

---

## Fase 2: Encapsulamiento, decoradores de clase y métodos especiales

> **Meta:** Que el objeto proteja su estado, exponga una API clara y se comporte como un tipo nativo de Python.

### 2.1 Datos protegidos y “privados”

- [ ] Convención `_atributo`: aviso a otros programadores, no seguridad real
- [ ] Name mangling con `__atributo`: Python lo renombra a `_Clase__atributo`; para qué sirve y para qué no
- [ ] Por qué no hay `private` real en Python y qué se hace en su lugar (propiedad + método)

### 2.2 Decoradores propios de la clase

- [ ] `@property` para leer como atributo
- [ ] `@nombre.setter` para validar al asignar
- [ ] `@nombre.deleter` (cuándo tiene sentido)
- [ ] `@classmethod`: recibe la clase (`cls`), no la instancia. Fábricas alternativas (`from_dict`, `desde_fecha`)
- [ ] `@staticmethod`: no recibe `self` ni `cls`. Cuándo es un helper y cuándo debería ser una función del módulo
- [ ] Diferencia clara: instancia vs. clase vs. estático (un ejemplo de los tres en la misma clase)

### 2.3 Métodos especiales (dunder) que vas a ver en librerías

- [ ] Comparación: `__eq__`, y por qué si defines `__eq__` conviene pensar en `__hash__` (o poner `frozen` / no hashear)
- [ ] Contenedores: `__len__`, `__iter__`, `__contains__`, `__getitem__` / `__setitem__`
- [ ] Booleano: `__bool__` (o `__len__` como respaldo)
- [ ] Representación ya vista: `__str__`, `__repr__`
- [ ] Contexto (puente a avanzado): idea de `__enter__` / `__exit__` cuando el objeto abre un recurso

### 2.4 Lógica de negocio en el objeto

- [ ] Si la regla necesita los datos del objeto, vive en el objeto (`asignar_tarea`, `cerrar`)
- [ ] No sacar todos los campos a una función externa para “procesarlos” y volver a meterlos
- [ ] 🧪 **Práctica:** `Usuario` con `_tareas` protegidas, `@property` que devuelve copia, `asignar_tarea` con reglas, más un `@classmethod` `desde_email` y un `@staticmethod` que valide el formato del email. Implementa `__len__`, `__iter__` y `__eq__`.

---

## Fase 3: Herencia y composición

> **Meta:** Reutilizar sin armar una jerarquía que nadie puede seguir.

### 3.1 Herencia

- [ ] Herencia cuando hay un **"es un"**: `Tarea` y `TareaConFecha`
- [ ] `super()` en `__init__` y en métodos sobrescritos; qué pasa si lo omites
- [ ] Sobrescribir un método y llamar al padre con `super()`
- [ ] `isinstance` e `issubclass`
- [ ] Orden de resolución de métodos (MRO) a nivel práctico: `Clase.__mro__` cuando hay herencia múltiple o dudas
- [ ] Herencia múltiple: cuándo evitarla; preferir composición

### 3.2 Composición

- [ ] Composición cuando hay un **"tiene un"**: un `Proyecto` contiene tareas, no hereda de `Tarea`
- [ ] Preferir composición si la jerarquía solo existe para compartir dos métodos
- [ ] El contenedor concentra reglas que afectan al conjunto (`atrasadas()`), no la clase base
- [ ] 🧪 **Práctica:** `Proyecto` con tareas normales y `TareaConFecha`, `super()` en la hija, y un método `atrasadas()` solo en el proyecto.

---

## Fase 4: Datos, Enum y contratos

> **Meta:** No escribir una clase larga cuando el dato es un registro, y fijar contratos claros.

### 4.1 Dataclass y Enum

- [ ] `@dataclass` para `__init__`, `__repr__` e `__eq__` generados
- [ ] `frozen=True` cuando el dato no debe mutar
- [ ] `field(default_factory=...)` para listas/dicts por defecto (no `[]` mutable en la firma)
- [ ] `Enum` / `StrEnum` para estados fijos (`PENDIENTE`, `HECHA`, `CANCELADA`) en vez de strings sueltos
- [ ] Dónde lo vuelves a ver: path parameters en FastAPI, estados de un modelo

### 4.2 Contratos: ABC vs Protocol

- [ ] `abc.ABC` + `@abstractmethod`: la subclase debe implementar o no se instancia
- [ ] `typing.Protocol`: contrato estructural (“si tiene estos métodos, sirve”) sin herencia
- [ ] Cuándo ABC (jerarquía tuya) y cuándo Protocol (cualquier objeto compatible)
- [ ] Tipar atributos y retornos: el editor ve `Tarea`, no `Any`
- [ ] `TypedDict` o dataclass para datos de entrada/salida cuando aún no hay ORM

### 4.3 Práctica de fase

- [ ] 🧪 **Práctica:** `Tarea` como dataclass (o con `Enum` de estado), `Repositorio` como ABC **y** el mismo contrato expresado con `Protocol`, más una implementación en memoria con `guardar` y `listar`.

---

## Fase 5: Un dominio que un framework puede usar

> **Meta:** Que la regla de negocio no importe FastAPI ni Django.

- [ ] El objeto de dominio no conoce HTTP ni la base de datos
- [ ] Excepción de dominio (`TareaYaCerrada`, `EmailInvalido`) en vez de `print` o un 404 dentro de la clase
- [ ] Servicio + repositorio: el servicio orquesta; el objeto aplica la regla; el repositorio guarda
- [ ] Misma forma que tendrá un endpoint después: el framework solo traduce
- [ ] Relación con el mundo real: modelos de Django / SQLAlchemy = estado + reglas, persistidos por otra capa
- [ ] 🧪 **Práctica:** `Tarea.cerrar()` lanza excepción de dominio. Un servicio la captura y decide el mensaje. Sin FastAPI ni Django en el dominio.

---

## Proyectos integradores

1. **Dominio de tareas** — usuario, proyecto y tarea, con `Enum` de estados, propiedades, `classmethod` de fábrica, excepciones propias y sin lógica HTTP.
2. **Repositorio en memoria** — implementa un `Protocol` o ABC; más adelante FastAPI solo lo envuelve.

---

## Recursos

| Recurso | Uso |
|---|---|
| [Classes](https://docs.python.org/es/3/tutorial/classes.html) | Clases, herencia, `self` |
| [property](https://docs.python.org/es/3/library/functions.html#property) | `@property`, setter, deleter |
| [classmethod / staticmethod](https://docs.python.org/es/3/library/functions.html#classmethod) | Fábricas y helpers |
| [dataclasses](https://docs.python.org/es/3/library/dataclasses.html) | Registros |
| [enum](https://docs.python.org/es/3/library/enum.html) | Estados fijos |
| [abc](https://docs.python.org/es/3/library/abc.html) | Clases abstractas |
| [typing.Protocol](https://docs.python.org/es/3/library/typing.html#typing.Protocol) | Contratos estructurales |
| [Data model — special methods](https://docs.python.org/es/3/reference/datamodel.html#special-method-names) | Lista de dunder |

---

## Criterios de avance

| Fase | La dominas cuando... |
|---|---|
| 1 | Creas dos tareas distintas y no comparten título; `__repr__` sirve en un log |
| 2 | Explicas la diferencia entre `_x`, `__x`, `@property`, `@classmethod` y `@staticmethod` con un ejemplo |
| 3 | Explicas por qué un proyecto contiene tareas y no hereda de ellas; usas `super()` bien |
| 4 | Tienes un `Enum` de estado, un dataclass y un `Protocol` o ABC de repositorio |
| 5 | La regla de cerrar una tarea no menciona HTTP ni SQL |
