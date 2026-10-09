---
id: fase-1
title: Fase 1 · Clases y objetos
sidebar_label: 1. Clases y objetos
description: Apuntes de clases, __init__, atributos y __str__/__repr__.
slug: /python-poo/notas/fase-1
---

# Fase 1: Clases y objetos

## 1. Clases, `__init__`, `self` y la anatomía de un objeto

Cuando diseño una clase, estoy creando un plano. Ese plano define la estructura que tendrán los objetos que construya más adelante. La clase no guarda datos únicos de cada instancia; describe qué atributos y qué comportamientos tendrán esos objetos.

* **Clase (`class`):** es el molde. Define la forma general del objeto.
* **Instancia u objeto:** es la versión concreta creada a partir de ese molde.
* **`__init__`:** es el constructor. Python lo ejecuta automáticamente al crear una instancia para inicializar su estado.

```python
class Persona:
    def __init__(self, nombre):
        self.nombre = nombre  # self.nombre guarda el dato en la instancia actual
```

> En Python, `self` no es una palabra reservada. Es una convención, pero es la que usa la comunidad y la guía oficial de estilo `PEP 8`.

## 2. Atributos de instancia vs. atributos de clase

Este concepto es clave en la POO. Hay que distinguir entre los datos que pertenecen a cada objeto y los que son compartidos por todos.

### Atributos de instancia

Son los datos únicos de cada objeto. Se crean dentro del constructor usando `self`.

* **Concepto:** Si la clase es el molde de una persona, cada persona tiene un nombre, una edad y un color de ojos propios.
* **En la vida real:** Si me cambio el color de cabello, el de mi vecino no cambia. Ese dato me pertenece solamente a mí.

### Atributos de clase

Son los datos compartidos por todos los objetos de esa clase. Se declaran fuera de `__init__`, directamente dentro de la clase.

* **Concepto:** Todos los seres humanos compartimos el mismo planeta de origen o la misma especie.
* **En la vida real:** Si cambia el estado del planeta Tierra, afecta a todos por igual. Ese dato pertenece a la comunidad, no a un individuo.

```python
class Auto:
    # ATRIBUTO DE CLASE (compartido por todos los autos)
    numero_de_ruedas = 4

    def __init__(self, color, marca):
        # ATRIBUTOS DE INSTANCIA (únicos de cada auto)
        self.color = color
        self.marca = marca
```

Si creo dos autos:

* `auto_juan = Auto("Rojo", "Ferrari")`
* `auto_maria = Auto("Azul", "Mazda")`

Cada uno tiene su propio color, pero si pregunto por las ruedas, ambos verán el mismo valor de la clase: `4`.

Cuando ejecuto este ejemplo, puedo ver exactamente qué ocurre detrás de escena:

```python
class Auto:
    numero_de_ruedas = 4

    def __init__(self, color, marca):
        self.color = color
        self.marca = marca

# 1. Creo los dos autos
auto_juan = Auto("Rojo", "Ferrari")
auto_maria = Auto("Azul", "Mazda")

# 2. Modifico las ruedas solo del auto de Juan
auto_juan.numero_de_ruedas = 6

# 3. Reviso el resultado
print(f"Ruedas del auto de Juan: {auto_juan.numero_de_ruedas}")
print(f"Ruedas del auto de María: {auto_maria.numero_de_ruedas}")
```

Salida:

```text
Ruedas del auto de Juan: 6
Ruedas del auto de María: 4
```

Aquí aparece un detalle importante de Python: la sobrescritura local.

1. Al principio, ni Juan ni María tienen un valor propio para `numero_de_ruedas`. Cuando lo consultan, Python busca en la clase y encuentra `4`.
2. Cuando hago `auto_juan.numero_de_ruedas = 6`, no estoy cambiando la clase; estoy creando un valor nuevo solo para ese objeto.
3. María no tiene ese valor propio, así que sigue consultando la clase y ve el valor original: `4`.

## 3. Métodos que leen estado vs. métodos que lo cambian

Este es el eje para entender cómo interactúan los objetos con el mundo real. Los métodos no son solo acciones sueltas; están conectados directamente con el estado del objeto.

### Métodos que leen el estado

Estos métodos no modifican nada. Solo revisan los atributos del objeto, procesan la información y la devuelven o la muestran.

* Ejemplo del mundo real: consultar el saldo de mi cuenta o revisar la temperatura de mi teléfono.
* En código: suelen tener nombres como `obtener_`, `mostrar_` o `get_`.

### Métodos que cambian el estado

Estos métodos sí alteran los valores internos del objeto. Cambian el “presente” del objeto y, por lo tanto, lo convierten en otro estado.

* Ejemplo del mundo real: gastar dinero de mi cuenta o encender la linterna del teléfono.
* En código: suelen hacer algo como `self.atributo = nuevo_valor`.

```python
class Celular:
    def __init__(self, modelo):
        self.modelo = modelo
        self.bateria = 100  # Estado inicial: batería al 100%

    # 1. MÉTODO QUE LEE EL ESTADO
    def revisar_bateria(self):
        return f"El celular {self.modelo} tiene {self.bateria}% de batería."

    # 2. MÉTODO QUE CAMBIA EL ESTADO
    def jugar_videojuego(self, horas):
        desgaste = horas * 15
        self.bateria = self.bateria - desgaste
        print(f"Jugaste por {horas} horas...")
```

Ahora lo pruebo en acción:

```python
# Creo el objeto celular
mi_telefono = Celular("iPhone 15")

# Leo el estado
print(mi_telefono.revisar_bateria())
# Resultado: El celular iPhone 15 tiene 100% de batería.

# Cambio el estado
mi_telefono.jugar_videojuego(3)
# Resultado: Jugaste por 3 horas...

# Vuelvo a leer el estado para confirmar el cambio
print(mi_telefono.revisar_bateria())
# Resultado: El celular iPhone 15 tiene 55% de batería.
```

Como se puede ver, `jugar_videojuego` modificó permanentemente el estado interno (`self.bateria`). Esa diferencia es la clave entre un método consultor y un método modificador.

## 4. `__str__` y `__repr__` para ver el objeto en un log

Ambos son métodos mágicos, también llamados dunder, porque empiezan y terminan con doble guion bajo. Sirven para convertir un objeto en texto, pero tienen un objetivo distinto.

La regla de oro es simple: `__str__` está pensado para los usuarios humanos de la aplicación, mientras que `__repr__` está pensado para el programador, cuando está depurando o revisando logs.

### Diferencias clave

| Característica | `__str__` | `__repr__` |
| --- | --- | --- |
| ¿Para quién es? | Para el usuario final | Para el desarrollador y los logs |
| Objetivo | Ser claro y legible | Ser técnico y preciso |
| Cómo se activa | `print(objeto)` o `str(objeto)` | Cuando se muestra el objeto en consola o en un log |
| Meta ideal | "Un texto amigable" | "Un texto que permita recrear el objeto" |

### Verlo en código

```python
class CuentaBancaria:
    def __init__(self, titular, saldo, id_interno):
        self.titular = titular
        self.saldo = saldo
        self.id_interno = id_interno

    # Para el humano: legible y amigable
    def __str__(self):
        return f"Cuenta de {self.titular} - Saldo disponible: ${self.saldo:,}"

    # Para el programador: técnico y preciso en logs
    def __repr__(self):
        return f"CuentaBancaria(titular='{self.titular}', saldo={self.saldo}, id_interno={self.id_interno})"
```

```python
cuenta_cliente = CuentaBancaria("Carlos Pérez", 1500000, 9482)
print(cuenta_cliente)
# Resultado: Cuenta de Carlos Pérez - Saldo disponible: $1,500,000
```

Cuando ejecuto `print(cuenta_cliente)`, Python busca `__str__` y muestra una versión amigable para el usuario.

```python
lista_de_cuentas = [cuenta_cliente]
print(lista_de_cuentas)
# Resultado: [CuentaBancaria(titular='Carlos Pérez', saldo=1500000, id_interno=9482)]
```

En este caso, Python usa `__repr__` porque está mostrando el objeto dentro de una lista y necesita una versión útil para la depuración.

### Consejo profesional

Si no defino `__str__`, pero sí defino `__repr__`, Python usa `__repr__` como respaldo. Por eso, en proyectos reales, es muy habitual definir al menos `__repr__` en las clases.
