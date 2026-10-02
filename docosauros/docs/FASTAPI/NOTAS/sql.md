---
id: sql
title: Fase 3.1 · SQL relacional
sidebar_label: 3.1 SQL
description: SQL que sostiene los modelos de SQLAlchemy, con el ejemplo de usuarios y tareas.
slug: /fastapi/notas/sql
---

# 3.1 Bases de datos relacionales

Pydantic valida lo que entra y sale de la API. SQLAlchemy guarda eso en tablas. Un `VARCHAR` es un `str`, un `INTEGER` es un `int`, un `TIMESTAMP` es un `datetime`.

En el ORM esas reglas se declaran en la columna: `primary_key=True`, `unique=True`, `nullable=False`, `index=True`. Un UUID en la URL (`/users/f47ac10b-...`) no revela cuántos usuarios hay, a diferencia de `/users/1`.

## Lo que hay que poder escribir

```sql
SELECT id, email
FROM usuarios
WHERE activo = 1
ORDER BY creado_en DESC
LIMIT 20;

INSERT INTO usuarios (email, nombre) VALUES ('ana@ejemplo.com', 'Ana');

UPDATE usuarios SET nombre = 'Ana Ruiz' WHERE id = 1;

DELETE FROM tareas WHERE id = 10;
```

Un `JOIN` arma el hecho con su dimensión. `GROUP BY` resume.

```sql
SELECT u.nombre, COUNT(t.id) AS tareas
FROM usuarios AS u
LEFT JOIN tareas AS t ON t.usuario_id = u.id
GROUP BY u.id, u.nombre;
```

`LEFT JOIN` conserva al usuario aunque no tenga tareas. Un `INNER JOIN` lo habría borrado del resultado.

## Relaciones

| Relación | Ejemplo | Cómo se guarda |
|---|---|---|
| 1:N | Un usuario, muchas tareas | `tareas.usuario_id` apunta a `usuarios.id` |
| N:M | Estudiantes y cursos | Tabla intermedia `inscripciones` |
| 1:1 | Usuario y perfil | La clave foránea además es única |

`ON DELETE CASCADE` borra las tareas si borras al usuario. `ON DELETE SET NULL` deja la tarea y vacía la clave. Si no pones nada, la base rechaza el borrado del padre mientras existan hijos.

```sql
CREATE TABLE tareas (
  id INTEGER PRIMARY KEY,
  titulo TEXT NOT NULL,
  usuario_id INTEGER NOT NULL,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);
```

Un índice acelera el filtro o el join que repites (`email`, `usuario_id`). No se indexa cada columna: cada índice hay que mantenerlo en cada escritura.

## SQLite y PostgreSQL

SQLite es un archivo y cero configuración: sirve para aprender. PostgreSQL es el motor de producción: aguanta concurrencia y tipos más ricos. El SQL de arriba corre en los dos; la URL de conexión cambia cuando pases a SQLAlchemy.
