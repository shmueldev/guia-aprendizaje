---
id: pydantic
title: Pydantic
sidebar_label: 2.3
description: Apuntes de FastAPI hasta la fase 3.
slug: /fastapi/notas/pydantic
---

## 2.3 Modelado y validación con Pydantic

### 2.3.1 Creación de esquemas (BaseModel)

Pydantic se basa en clases que heredan de `BaseModel`. Cada atributo que definimos se convierte en un campo con reglas estrictas.

* **Campos obligatorios vs. opcionales:** un campo es obligatorio si solo defines su tipo. Es opcional si le asignas un valor por defecto, como `None`, un texto fijo o un número.
* **Modelos anidados:** puedes usar un modelo de Pydantic como tipo de dato de un atributo dentro de otro modelo. Esto permite estructurar JSON con subobjetos complejos.
* **Tipos especiales:** Pydantic incluye tipos avanzados listos para usar. Algunos requieren instalar `pydantic[email]`.
  * **EmailStr:** valida que el texto sea un correo electrónico real, por ejemplo: `usuario@dominio.com`.
  * **HttpUrl:** valida que sea una URL web válida.
  * **datetime:** convierte automáticamente cadenas en formato ISO, como `2026-09-25T12:00:00`, a objetos `datetime` de Python.
  * **UUID y Decimal:** son ideales para identificadores únicos y transacciones de dinero exactas.

```python
from datetime import datetime
from decimal import Decimal
from uuid import UUID
from pydantic import BaseModel, EmailStr, HttpUrl

# Modelo hijo
class Direccion(BaseModel):
    calle: str
    ciudad: str

# Modelo padre (anidado)
class ClientePerfil(BaseModel):
    id: UUID
    email: EmailStr
    sitio_web: HttpUrl | None = None
    balance: Decimal
    creado_en: datetime
    direccion: Direccion
```

### 2.3.2 Validación automática y errores 422

Cuando FastAPI recibe un JSON, Pydantic intenta validarlo campo por campo.

* **Coerción de tipos:** Pydantic es flexible por defecto. Si defines un campo como `int` y el cliente envía `"5"` o `5.0`, Pydantic lo convertirá automáticamente a `5`.
* **Restricciones con `Field()`:** sirve para añadir metadatos, valores por defecto y límites a nivel de atributo.

```python
from pydantic import BaseModel, Field

class Producto(BaseModel):
    nombre: str = Field(min_length=3, examples=["Laptop Gamer"])
    precio: float = Field(default=1.0, gt=0, description="Precio unitario")
```

### 2.3.3 Validaciones personalizadas

Cuando las restricciones básicas de `Field()` no son suficientes, podemos programar nuestras propias reglas de negocio mediante decoradores de Pydantic.

* **`@field_validator`:** valida un solo campo. Siempre debe ser un método de clase con `@classmethod`. Si el dato es incorrecto, lanza un `ValueError`.
* **`@model_validator`:** valida el modelo completo después de haber validado los campos individuales. Es ideal para comparar campos entre sí.

```python
from pydantic import BaseModel, Field, field_validator, model_validator
from typing_extensions import Self

class RegistroUsuario(BaseModel):
    username: str
    password: str = Field(min_length=8)
    confirm_password: str

    @field_validator("username")
    @classmethod
    def username_no_admin(cls, v: str) -> str:
        if "admin" in v.lower():
            raise ValueError("El nombre de usuario no puede contener la palabra 'admin'")
        return v

    @model_validator(mode="after")
    def verificar_contraseñas(self) -> Self:
        if self.password != self.confirm_password:
            raise ValueError("Las contraseñas no coinciden")
        return self
```

### 2.3.4 Serialización de datos

La serialización es el proceso inverso: transformar un objeto de Python/Pydantic de nuevo a un formato JSON o a un diccionario estándar para enviarlo al cliente.

* **`.model_dump()` y `.model_dump_json()`:** convierten un modelo en un diccionario o en una cadena JSON.
* **`response_model`:** controla qué devuelve el endpoint.

```python
from fastapi import FastAPI
from pydantic import BaseModel, EmailStr, Field

app = FastAPI()

class UserCreate(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8)

class UserRead(BaseModel):
    id: int
    email: EmailStr
    activo: bool

@app.post("/usuarios/", response_model=UserRead)
def crear_usuario(usuario_ingresado: UserCreate):
    usuario_db = {"id": 1, "email": usuario_ingresado.email, "activo": True}
    return usuario_db
```

> En este ejemplo, aunque la función devuelve un diccionario con más información, FastAPI solo expondrá los campos definidos en `UserRead`.

* **`response_model_exclude_unset=True`:** si la base de datos tiene campos vacíos o por defecto que el cliente no envió, esta opción evita enviar esos campos vacíos en el JSON final, reduciendo el ancho de banda.
* **Alias de campos:** permite mapear nombres de Python, como `snake_case`, con nombres de JSON o JavaScript, como `camelCase`.

#### Patrón de esquemas

Es común trabajar con tres tipos de modelos:

* **UserCreate:** para la entrada del cliente.
* **UserRead:** para la salida pública del sistema.
* **UserUpdate:** para actualizaciones parciales.

### 2.3.5 Configuración de modelos (`model_config`)

Pydantic nos permite modificar el comportamiento de un modelo con una variable de clase especial llamada `model_config`, que usa `ConfigDict`.

La configuración más importante cuando trabajas con APIs es `from_attributes=True` (antes llamada `orm_mode=True`).

#### ¿Por qué es clave `from_attributes=True`?

Por defecto, Pydantic sabe leer diccionarios de Python, como `usuario["nombre"]`. Sin embargo, las bases de datos usando ORMs, como SQLAlchemy o SQLModel, suelen devolver objetos con atributos, como `usuario.nombre`.

Al activar `from_attributes=True`, Pydantic puede tomar un objeto directamente de la base de datos, extraer sus atributos de forma automática y serializarlos en el JSON de salida sin necesidad de hacer un mapeo manual campo por campo.

```python
from pydantic import BaseModel, ConfigDict

class Usuario(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    nombre: str
```

Esto es muy útil cuando más adelante trabajemos con ORM y bases de datos en FastAPI.
