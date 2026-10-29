---
id: fase-2
title: Fase 2 · Encapsulamiento y decoradores de clase
sidebar_label: 2. Encapsulamiento
description: Apuntes de encapsulamiento, @property y métodos especiales.
slug: /python-poo/notas/fase-2
---

# Fase 2: Encapsulamiento, decoradores de clase y métodos especiales

Esta fase va al encapsulamiento: el objeto es el único dueño de sus datos y nadie desde afuera debería poder romperlo o dejarlo en un estado inconsistente.

> En la [guía](/docs/python-poo) esta fase también pide `@classmethod`, `@staticmethod`, `__atributo` (name mangling) y más dunder (`__hash__`, `__contains__`, `__getitem__`, `__bool__`). Abajo está lo que ya documenté; el resto se completa al estudiarlo.

## 1. Convención `_atributo` y por qué no es seguridad real

En lenguajes como Java o C# existen palabras reservadas como `private` o `public` para bloquear el acceso a los datos. En Python no hay puertas con llave. Todo es público por diseño.

La comunidad de Python resuelve esto así:

* Si escribo un guion bajo antes de un atributo, como `_atributo`, le estoy indicando a otros programadores que ese dato es privado y no debería usarse directamente.
* Eso no es seguridad real. Python no me va a impedir modificar ese atributo si alguien decide hacerlo a propósito.

```python
objeto._saldo = -5000
```

Python no me va a detener. La convención sirve como aviso, no como protección real.

## 2. `@property` para leer y validar al asignar

Para crear una barrera real que proteja los datos, uso los decoradores `@property` y `@atributo.setter`.

Estas herramientas permiten que, desde afuera, el código se vea como una variable normal, pero por dentro se ejecuten validaciones y reglas de negocio.

```python
class Producto:
    def __init__(self, precio):
        self.precio = precio  # Python llama automáticamente al setter

    @property
    def precio(self):
        return self._precio  # Leo el dato protegido

    @precio.setter
    def precio(self, nuevo_valor):
        if nuevo_valor < 0:
            raise ValueError("¡El precio no puede ser negativo!")
        self._precio = nuevo_valor
```

Si alguien intenta hacer esto:

```python
p = Producto(100)
p.precio = -5
```

el objeto no acepta ese valor. La regla vive dentro del propio objeto.

## 3. Métodos especiales útiles: `__eq__`, `__len__` y `__iter__`

Estos son atajos para que mis objetos se comporten como elementos nativos de Python, como listas, números o diccionarios. En Python, estos métodos también se conocen como dunder methods.

* `__eq__(self, otro)`: define cuándo dos objetos son iguales.
* `__len__(self)`: permite usar `len(objeto)`.
* `__iter__(self)`: permite recorrer el objeto con `for elemento in objeto`.

```python
class Producto:
    def __init__(self, id_producto, nombre, precio):
        self.id_producto = id_producto
        self.nombre = nombre
        self.precio = precio

    # Dos productos son iguales si tienen el mismo ID
    def __eq__(self, otro):
        if not isinstance(otro, Producto):
            return False
        return self.id_producto == otro.id_producto


class CarritoDeCompras:
    def __init__(self):
        self._productos = []  # Lista interna para guardar los objetos

    def agregar(self, producto):
        self._productos.append(producto)

    def __len__(self):
        return len(self._productos)

    def __iter__(self):
        return iter(self._productos)
```

Ahora lo pruebo de forma real:

```python
# Creo algunos productos
p1 = Producto(101, "Laptop", 800)
p2 = Producto(101, "Laptop Pro", 1200)  # Mismo ID, diferente precio y nombre
p3 = Producto(102, "Mouse", 20)

# --- Probando __eq__ ---
print(p1 == p2)  # True, porque tienen el mismo ID: 101
print(p1 == p3)  # False

# Creo el carrito y agrego productos
mi_carrito = CarritoDeCompras()
mi_carrito.agregar(p1)
mi_carrito.agregar(p3)

# --- Probando __len__ ---
print(len(mi_carrito))  # 2

# --- Probando __iter__ ---
for producto in mi_carrito:
    print(f"Producto: {producto.nombre} - ${producto.precio}")
```

Esto hace que el objeto se sienta más natural dentro de Python. No tengo que acceder a estructuras internas manualmente si ya el objeto sabe cómo comportarse.

## 4. Operaciones de negocio dentro del objeto

Un error muy común de principiante es sacar todos los datos del objeto, procesarlos en una función externa y luego meterlos de vuelta.

La regla de oro es esta: si la lógica necesita los datos del objeto, esa lógica pertenece al objeto. El código de afuera no debería calcular impuestos, validar stock ni formatear correos. Solo debería dar la orden: `producto.aplicar_descuento()`.

Eso produce código más limpio, más mantenible y más seguro. La lógica vive cerca de los datos que la usan.

## 5. Práctica con código

```python
from typing import Iterator


class Tarea:
    def __init__(self, titulo: str):
        self.titulo = titulo
        self.completada = False

    def __repr__(self):
        return f"Tarea('{self.titulo}', completada={self.completada})"


class Usuario:
    def __init__(self, username: str, email: str):
        self.username = username
        self.email = email
        self._tareas: list[Tarea] = []

    # Protegemos la lista para que no sea manipulada desde afuera
    @property
    def tareas(self) -> list[Tarea]:
        """
        Retorna una copia de la lista.
        Así evito que hagan usuario.tareas.clear() y modifiquen la lista real.
        """
        return self._tareas.copy()

    # Operación de negocio segura
    def asignar_tarea(self, nueva_tarea: Tarea) -> None:
        """Agrega una tarea validando las reglas del negocio."""
        if not isinstance(nueva_tarea, Tarea):
            raise TypeError("Solo se pueden asignar instancias válidas de la clase Tarea.")

        # Validar duplicados por título
        if any(t.titulo == nueva_tarea.titulo for t in self._tareas):
            raise ValueError(f"La tarea '{nueva_tarea.titulo}' ya está asignada a este usuario.")

        self._tareas.append(nueva_tarea)

    # Métodos especiales para comportamiento nativo
    def __len__(self) -> int:
        return len(self._tareas)

    def __iter__(self) -> Iterator[Tarea]:
        return iter(self._tareas)

    def __eq__(self, otro: object) -> bool:
        if not isinstance(otro, Usuario):
            return False
        return self.username.lower() == otro.username.lower()

    def __repr__(self) -> str:
        return f"Usuario(username='{self.username}', tareas_totales={len(self)})"


# Demostración del comportamiento protegido
if __name__ == "__main__":
    user1 = Usuario("dev_marta", "marta@code.com")
    t1 = Tarea("Refactorizar API")
    t2 = Tarea("Actualizar dependencias")

    # 1. Mutación segura a través de métodos de negocio
    user1.asignar_tarea(t1)
    user1.asignar_tarea(t2)

    # 2. Intento de sabotaje externo
    user1.tareas.clear()  # limpia la copia, no la lista real
    print(f"Tareas reales después del intento de borrado: {len(user1)}")

    # 3. Uso de métodos mágicos nativos
    print(f"El usuario tiene {len(user1)} tareas asignadas.")

    print("\nListado de tareas iterando directamente sobre el usuario:")
    for tarea in user1:
        print(f" - {tarea.titulo}")

    # 4. Validación de duplicados (invariante del objeto)
    print("\nIntentando agregar una tarea duplicada...")
    try:
        user1.asignar_tarea(Tarea("Refactorizar API"))
    except ValueError as e:
        print(f"Bloqueado por el objeto: {e}")

    # 5. Comparación nativa con __eq__
    user2 = Usuario("dev_marta", "otro_correo@code.com")
    print(f"\n¿user1 es el mismo usuario que user2?: {user1 == user2}")
```

> Con este tipo de diseño no solo protejo datos, sino que también construyo objetos con identidad, reglas y comportamiento claros. Eso es un paso importante hacia software más profesional y más difícil de romper.

## 6. Lo que la guía pide además (para estudiar / completar)

### `__atributo` (name mangling)

Con doble guion bajo, Python renombra el atributo a `_Clase__atributo`. No es privacidad real; evita choques en herencia.

```python
class Caja:
    def __init__(self):
        self.__secreto = 1

c = Caja()
# c.__secreto  # AttributeError
print(c._Caja__secreto)  # 1
```

### `@classmethod` y `@staticmethod`

```python
class Usuario:
    def __init__(self, email: str):
        self.email = email

    @classmethod
    def desde_email(cls, email: str):
        """Fábrica: crea la instancia a partir de un email."""
        return cls(email.strip().lower())

    @staticmethod
    def email_parece_valido(email: str) -> bool:
        """Helper: no usa self ni cls."""
        return "@" in email and "." in email.split("@")[-1]
```

* `@classmethod` recibe la clase (`cls`): sirve para constructores alternativos.
* `@staticmethod` no recibe `self` ni `cls`: es un helper ligado al tema de la clase.

### Más dunder útiles

| Método | Para qué |
|---|---|
| `__hash__` | Poder usar el objeto en un `set` o como clave de `dict` (junto con `__eq__`) |
| `__bool__` | Qué significa `if objeto:` |
| `__contains__` | `elemento in objeto` |
| `__getitem__` | `objeto[clave]` |
