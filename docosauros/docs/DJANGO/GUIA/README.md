---
id: django
title: Django
sidebar_label: Django
description: Plan de aprendizaje de Django y Django REST Framework para APIs y paneles de datos.
slug: /django
---

# Plan de Aprendizaje Completo: Django

> **Objetivo:** Construir aplicaciones web y APIs con Django cuando el proyecto pide baterías incluidas: admin, ORM, autenticación y un marco claro de proyecto.
>
> **Metodología:** Cada fase cierra con un entregable. FastAPI ya cubre APIs livianas; aquí el foco es el framework completo y Django REST Framework.

## Índice

1. [Fase 1: Proyecto, apps y el ciclo de una petición](#fase-1-proyecto-apps-y-el-ciclo-de-una-petición)
2. [Fase 2: Modelos, ORM y migraciones](#fase-2-modelos-orm-y-migraciones)
3. [Fase 3: Vistas, URLs, templates y admin](#fase-3-vistas-urls-templates-y-admin)
4. [Fase 4: Django REST Framework](#fase-4-django-rest-framework)
5. [Fase 5: Auth, permisos y configuración](#fase-5-auth-permisos-y-configuración)
6. [Fase 6: Pruebas y despliegue](#fase-6-pruebas-y-despliegue)
7. [Proyectos integradores](#proyectos-integradores)

## Fase 1: Proyecto, apps y el ciclo de una petición

> **Meta:** Entender cómo Django parte un proyecto en apps y qué ocurre desde la URL hasta la respuesta.

- [ ] Entorno virtual, `django`, `django-admin startproject` y `python manage.py runserver`
- [ ] Estructura: `manage.py`, `settings.py`, `urls.py`, `wsgi.py` / `asgi.py`
- [ ] Crear una app (`startapp`) y registrarla en `INSTALLED_APPS`
- [ ] Ciclo request → URL resolver → vista → respuesta
- [ ] Settings por entorno: no dejar `DEBUG=True` ni `SECRET_KEY` en el repo
- [ ] 🧪 **Práctica:** Proyecto vacío con una app `core` que responda un JSON de salud en `/health`.

## Fase 2: Modelos, ORM y migraciones

> **Meta:** Modelar datos relacionales y evolucionar el esquema sin perder filas.

- [ ] Campos: `CharField`, `IntegerField`, `DecimalField`, `DateTimeField`, `ForeignKey`, `ManyToManyField`
- [ ] `null` vs `blank`, `related_name`, `on_delete`
- [ ] Consultas: `filter`, `exclude`, `get`, `order_by`, `select_related`, `prefetch_related`
- [ ] Agregaciones: `annotate`, `aggregate`, `Count`, `Sum`
- [ ] Migraciones: `makemigrations`, `migrate`, revisar el archivo antes de aplicar
- [ ] 🧪 **Práctica:** Modelos Usuario de negocio, Proyecto y Tarea (1:N y N:M) con tres migraciones seguidas.

## Fase 3: Vistas, URLs, templates y admin

> **Meta:** Publicar pantallas simples y usar el admin como herramienta interna, no como el producto final.

- [ ] Function views y class-based views (`ListView`, `DetailView`, `CreateView`)
- [ ] `path`, `include`, nombres de ruta y `reverse`
- [ ] Templates: herencia con `{% extends %}`, `{% block %}`, contexto
- [ ] Formularios `ModelForm` y validación
- [ ] Admin: `list_display`, `search_fields`, `list_filter`, inlines
- [ ] 🧪 **Práctica:** CRUD HTML de tareas más un admin usable para cargar datos de prueba.

## Fase 4: Django REST Framework

> **Meta:** Exponer el mismo dominio como API JSON, con validación y paginación.

- [ ] `APIView` vs `ViewSet` + routers
- [ ] Serializers: `ModelSerializer`, campos de solo lectura, `create` / `update` custom
- [ ] Paginación, filtros (`django-filter`) y búsqueda
- [ ] Códigos de estado y `ValidationError`
- [ ] Versionado simple: `/api/v1/`
- [ ] 🧪 **Práctica:** API REST del CRUD de la fase 3, con paginación y un filtro por estado.

## Fase 5: Auth, permisos y configuración

> **Meta:** Separar quién entra y qué puede hacer.

- [ ] Usuario de Django vs perfil de dominio (`OneToOne`)
- [ ] Session auth para el admin y token o JWT para la API
- [ ] Permisos: `IsAuthenticated`, permisos por objeto, grupos
- [ ] CORS cuando un frontend (React o Dash) vive en otro origen
- [ ] Variables de entorno con `django-environ` o equivalente
- [ ] 🧪 **Práctica:** Registro, login y endpoints donde cada usuario solo ve sus tareas.

## Fase 6: Pruebas y despliegue

> **Meta:** Que un cambio de modelo no rompa la API en silencio.

- [ ] `TestCase` y `APIClient`: camino feliz y 401/403/400
- [ ] Base de datos de prueba y fixtures mínimas
- [ ] `collectstatic`, `ALLOWED_HOSTS`, base de datos PostgreSQL
- [ ] Gunicorn + un reverse proxy, o un PaaS
- [ ] 🧪 **Práctica:** Suite que cubra el CRUD y un `Dockerfile` que levante la app.

## Proyectos integradores

1. **Tablero interno de solicitudes** — modelos, admin para el equipo y API para un dashboard.
2. **Catálogo de datasets** — dueño, fuente, frescura y un endpoint de búsqueda.

## Recursos

| Recurso | Uso |
|---|---|
| [Tutorial oficial de Django](https://docs.djangoproject.com/en/stable/intro/tutorial01/) | Proyecto, modelos, admin |
| [Django REST framework](https://www.django-rest-framework.org/tutorial/quickstart/) | APIs |
| [Consultas ORM](https://docs.djangoproject.com/en/stable/topics/db/queries/) | `select_related` y agregaciones |

## Criterios de avance

| Fase | La dominas cuando... |
|---|---|
| 1 | Explicas el camino de una URL hasta la vista sin abrir el código |
| 2 | Agregas un campo con datos existentes y la migración aplica limpia |
| 3 | El admin sirve para operar y la pantalla no duplica esa lógica a ciegas |
| 4 | Un `ViewSet` entrega lista paginada y detalle con validación |
| 5 | Un usuario no puede leer ni editar lo de otro |
| 6 | Los tests fallan si quitas un permiso y el contenedor arranca solo |
