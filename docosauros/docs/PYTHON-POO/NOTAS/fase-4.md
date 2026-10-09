---
id: fase-4
title: Fase 4 · Datos simples y contratos
sidebar_label: 4. Datos y contratos
description: Apuntes de dataclass, frozen, abc y Protocol.
slug: /python-poo/notas/fase-4
---

# Fase 4: Datos simples y contratos

> **Meta:** No escribir una clase larga cuando el dato es un registro.

## 1. `@dataclass` para datos con igualdad y representación

Cuando el objeto es sobre todo datos (título, estado, id) y no una lógica compleja, `@dataclass` genera `__init__`, `__repr__` e `__eq__` sin escribirlos a mano.

```python
from dataclasses import dataclass

@dataclass
class Tarea:
    titulo: str
    completada: bool = False
```

```python
t1 = Tarea("Refactorizar API")
t2 = Tarea("Refactorizar API")
print(t1)          # Tarea(titulo='Refactorizar API', completada=False)
print(t1 == t2)    # True, porque dataclass compara por campos
```

## 2. `frozen=True` cuando el dato no debe cambiar

Un dataclass congelado no permite asignar atributos después de crearlo. Sirve para valores que son un hecho, no un estado mutable.

```python
from dataclasses import dataclass

@dataclass(frozen=True)
class IdUsuario:
    valor: str

uid = IdUsuario("u-001")
# uid.valor = "otro"  # dataclasses.FrozenInstanceError
```

## 3. Clase abstracta (`abc`) cuando varias implementaciones deben cumplir lo mismo

`ABC` y `@abstractmethod` obligan a las clases hijas a implementar ciertos métodos. Si falta uno, no puedes instanciar la clase.

```python
from abc import ABC, abstractmethod

class Repositorio(ABC):
    @abstractmethod
    def guardar(self, tarea: Tarea) -> None: ...

    @abstractmethod
    def listar(self) -> list[Tarea]: ...


class RepositorioMemoria(Repositorio):
    def __init__(self) -> None:
        self._items: list[Tarea] = []

    def guardar(self, tarea: Tarea) -> None:
        self._items.append(tarea)

    def listar(self) -> list[Tarea]:
        return list(self._items)
```

## 4. `typing.Protocol` cuando solo importa el comportamiento

Un `Protocol` describe qué métodos debe tener un objeto, sin herencia. Sirve cuando varias clases distintas pueden “cumplir el contrato” sin compartir una clase base.

```python
from typing import Protocol

class Guardable(Protocol):
    def guardar(self, tarea: Tarea) -> None: ...
    def listar(self) -> list[Tarea]: ...


def respaldar(repo: Guardable) -> int:
    return len(repo.listar())
```

Cualquier objeto con `guardar` y `listar` sirve, aunque no herede de `Repositorio`.

## 5. Tipar atributos y retornos

Tipar evita que el editor vea `Any` y te avise antes de ejecutar. En dataclasses y métodos de repositorio, el tipo es parte del contrato.

```python
def listar_abiertas(repo: Repositorio) -> list[Tarea]:
    return [t for t in repo.listar() if not t.completada]
```

## 6. Práctica mínima

```python
from abc import ABC, abstractmethod
from dataclasses import dataclass


@dataclass
class Tarea:
    titulo: str
    completada: bool = False


class Repositorio(ABC):
    @abstractmethod
    def guardar(self, tarea: Tarea) -> None: ...

    @abstractmethod
    def listar(self) -> list[Tarea]: ...


class RepositorioMemoria(Repositorio):
    def __init__(self) -> None:
        self._items: list[Tarea] = []

    def guardar(self, tarea: Tarea) -> None:
        self._items.append(tarea)

    def listar(self) -> list[Tarea]:
        return list(self._items)


repo = RepositorioMemoria()
repo.guardar(Tarea("Escribir tests"))
print(repo.listar())
```

> Esta fase en `projects/python/poo` todavía era un esquema. Aquí quedó el mínimo con ejemplos que corren. Cuando profundices, se puede ampliar.
