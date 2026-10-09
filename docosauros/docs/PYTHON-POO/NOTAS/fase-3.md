---
id: fase-3
title: Fase 3 · Herencia y composición
sidebar_label: 3. Herencia y composición
description: Apuntes de herencia, super() y composición con Proyecto y Tarea.
slug: /python-poo/notas/fase-3
---

# Fase 3: Herencia y composición

## 1. Herencia cuando hay un "es un": Tarea y TareaConFecha

Uso la herencia solo cuando una clase es una versión especializada de otra. La relación tiene que ser clara y honesta.

* Ejemplo: una `TareaConFecha` es una `Tarea`, pero con capacidades adicionales relacionadas con fechas y vencimientos.
* El peligro real aparece cuando la herencia se usa solo para reutilizar código sin sentido. Por ejemplo, no tiene sentido decir que un `Usuario` hereda de `BaseDeDatos` solo porque guarda información. Un usuario no es una base de datos.

## 2. `super()` y qué pasa si lo omites

`super()` me permite que la clase hija llame a la clase padre y ejecute su constructor o sus métodos sin tener que volver a escribir toda la lógica.

* Si uso `super().__init__()`, la clase hija hereda los atributos iniciales que definimos en la clase base y luego agrega sus propios datos.
* Si lo omito, el constructor de la clase hija reemplaza al constructor del padre. Eso significa que puedo perder los atributos que la clase base ya había definido para ese objeto.

```python
class TareaConFecha(Tarea):
    def __init__(self, titulo: str, fecha_limite: str):
        super().__init__(titulo)  # Inicializa lo del padre de forma segura
        self.fecha_limite = fecha_limite  # Inicializa lo propio de la hija
```

## 3. Composición: cuando una clase "tiene un" conjunto de cosas

La composición es el motor principal del software profesional. Ocurre cuando una clase usa otras clases como piezas dentro de su diseño.

* Ejemplo: un `Proyecto` tiene muchas `Tarea`. El proyecto no es una tarea; es un contenedor inteligente que organiza y gestiona tareas.
* La composición es flexible. Si mañana cambia la forma en que funciona una tarea, el proyecto puede seguir operando sin depender de sus detalles internos.

## 4. Práctica

```python
from datetime import datetime

# 1. CLASE PADRE (base)
class Tarea:
    def __init__(self, titulo):
        self.titulo = titulo
        self.completada = False

    def completar(self):
        self.completada = True

    def __repr__(self):
        estado = "OK" if self.completada else "PENDIENTE"
        return f"{estado} {self.titulo}"


# 2. CLASE HIJA (herencia: "es un")
class TareaConFecha(Tarea):
    def __init__(self, titulo, fecha_limite):
        super().__init__(titulo)
        self.fecha_limite = datetime.strptime(fecha_limite, "%Y-%m-%d")

    @property
    def esta_atrasada(self):
        """Verifica si la tarea venció y no fue completada."""
        return not self.completada and datetime.now() > self.fecha_limite

    def __repr__(self):
        texto_padre = super().__repr__()
        fecha_str = self.fecha_limite.strftime("%Y-%m-%d")
        return f"{texto_padre} (Vence: {fecha_str})"


# 3. COMPOSICIÓN ("tiene un")
class Proyecto:
    def __init__(self, nombre_proyecto):
        self.nombre_proyecto = nombre_proyecto
        self._lista_tareas = []

    def agregar_tarea(self, tarea_objeto):
        if isinstance(tarea_objeto, Tarea):
            self._lista_tareas.append(tarea_objeto)
        else:
            raise TypeError("¡Solo puedes agregar objetos de tipo Tarea!")

    def obtener_atrasadas(self):
        """
        Método de negocio centralizado. El proyecto analiza sus tareas
        sin que las tareas normales tengan código de fechas mezclado.
        """
        atrasadas = []
        for tarea in self._lista_tareas:
            if hasattr(tarea, "esta_atrasada") and tarea.esta_atrasada:
                atrasadas.append(tarea)
        return atrasadas

    def mostrar_tablero(self):
        print(f"\n--- TABLERO: {self.nombre_proyecto} ---")
        for t in self._lista_tareas:
            print(t)
```

### El experimento en acción

```python
# Creo el contenedor (composición)
mi_proyecto = Proyecto("Lanzamiento de App")

# Creo tareas normales (clase padre)
t1 = Tarea("Diseñar logo")
t2 = Tarea("Escribir términos de servicio")

# Creo tareas con fecha de vencimiento (herencia)
t3 = TareaConFecha("Corregir bug crítico", "2025-01-01")
t4 = TareaConFecha("Subir a producción", "2027-12-31")

# Inyecto las tareas en el proyecto
mi_proyecto.agregar_tarea(t1)
mi_proyecto.agregar_tarea(t2)
mi_proyecto.agregar_tarea(t3)
mi_proyecto.agregar_tarea(t4)

# Avanzo el estado de una tarea normal
t1.completar()

# Muestro el tablero completo
mi_proyecto.mostrar_tablero()

# Filtro las tareas atrasadas
print("\nAlertas de tareas atrasadas:")
print(mi_proyecto.obtener_atrasadas())
```

### Resultado en consola

```text
--- TABLERO: Lanzamiento de App ---
OK Diseñar logo
PENDIENTE Escribir términos de servicio
PENDIENTE Corregir bug critico (Vence: 2025-01-01)
PENDIENTE Subir a producción (Vence: 2027-12-31)

Alertas de tareas atrasadas:
[PENDIENTE Corregir bug critico (Vence: 2025-01-01)]
```

### Análisis de la arquitectura

* Gracias a la herencia, `TareaConFecha` no tuvo que reescribir los métodos de completar la tarea ni la lógica del estado; se los pidió a su padre usando `super()`.
* Gracias a la composición, la clase `Proyecto` pudo recibir tareas normales y especializadas en una sola lista, manteniendo el código ordenado y desacoplado.
* El método `obtener_atrasadas()` vive únicamente en el proyecto. No ensucio la clase base `Tarea` con código de fechas que no necesita.

Esto es una buena muestra de cómo la POO ayuda a modelar el mundo con claridad: cada clase tiene una responsabilidad, y las relaciones entre objetos reflejan la realidad del problema que estoy resolviendo.
