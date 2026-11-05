---
id: fase-3
title: Fase 3 · Herramientas de colaboración
sidebar_label: 3. Colaboración
description: "Apuntes de Projects, Markdown, perfil, Wikis, Gists y GitHub Pages."
slug: /git-github/notas/fase-3
---

# Fase 3: Herramientas de colaboración

Fase 3 cerrada: organizar trabajo en equipo y documentar en el mismo ecosistema de GitHub.

El plan completo está en la [guía de Git y GitHub](/docs/git-github).

## 3.1 GitHub Projects

Un **Project** es el tablero de planificación y seguimiento del trabajo. No reemplaza al repo: organiza Issues y PRs encima.

### Board de tareas (To do / In progress / Done)

Al crear un Project desde GitHub puedes elegir la plantilla **Board** (To do / In progress / Done):

1. Creas **items** (tareas).
2. Los mueves entre columnas según el avance.
3. En **Backlog** / vista de lista defines prioridad, campos y asignados.

### Vincular a un repositorio (convertir en Issue)

Desde el backlog, en los tres puntos de un item, puedes **asociarlo a un repositorio**. Así el item pasa a ser un **Issue** real del repo (comentarios, labels, cierre con PR).

En **My items** ves lo que está asignado a ti.

| Pieza | Rol |
|---|---|
| **Project** | Planificación y vista de trabajo |
| **Issue** | Ticket concreto en un repo |
| **PR** | Cambio de código ligado al Issue |

### Campos útiles

| Campo | Para qué |
|---|---|
| **Status** | To do / In progress / Done (o el flujo del equipo) |
| **Priority** | Qué atacar primero |
| **Iteration / Sprint** | Bloque de tiempo (si el equipo trabaja así) |
| **Assignees** | Quién es dueño de la tarea |

---

## 3.2 Automatizar Projects con workflows

Los **workflows de Projects** mueven items solos según eventos de GitHub.

Idea típica:

- Al **abrir un Issue** → aparece en el board (To do).
- Al **abrir un PR** → pasa a In progress.
- Al **cerrar el Issue / mergear el PR** → Done.

| Automatizar | No hace falta automatizar |
|---|---|
| Estados repetitivos (abrir → board, cerrar → Done) | Prioridad o estimación (eso es criterio humano) |
| Asignar al autor del Issue | Reglas raras que nadie entiende |

Empieza con 1–2 reglas. Si el board se mueve “solo” y nadie lo mira, la automatización sobra.

---

## 3.3 Markdown para documentación

GitHub renderiza Markdown en README, Issues, PRs y Wikis.

### Piezas que más usas

```markdown
# Título
## Subtítulo

- Lista
- Con viñetas

1. Lista
2. Numerada

[Texto del enlace](https://ejemplo.com)

`código en línea`
```

Bloque de código:

````markdown
```python
def hola():
    return "hola"
```
````

Tabla e imagen (sintaxis; la imagen es solo ejemplo):

```markdown
| Columna A | Columna B |
|---|---|
| dato | dato |

![texto alt](https://ejemplo.com/imagen.png)
```

### README efectivo

Un buen README responde en poco espacio:

1. **Qué hace** el proyecto (una frase).
2. **Cómo instalarlo** (comandos reales).
3. **Cómo usarlo** (ejemplo mínimo).
4. (Opcional) Licencia, cómo contribuir, link a docs.

Sin eso, el repo es una carpeta opaca aunque el código esté bien.

---

## 3.4 Portada de perfil en GitHub

### Repo especial `username/username`

Si creas un repo **público** con el **mismo nombre que tu usuario**, el `README.md` de la rama default se muestra en tu perfil.

```text
github.com/TU_USUARIO/TU_USUARIO
└── README.md   ← portada del perfil
```

### Qué poner

- Quién eres y en qué trabajas (datos, backend, etc.).
- Stack breve.
- Links a 2–4 repos fuertes.
- Contacto o portfolio si aplica.

Completa con:

- **Bio** clara en Settings → Profile.
- **Pins** (hasta 6 repos) para que lo importante no se pierda en la lista.

---

## 3.5 Wikis

Cada repo puede tener una **Wiki**: páginas Markdown editables desde la web (Settings → Features → Wikis).

| | Wiki | Docs en el repo (`/docs`) |
|---|---|---|
| Dónde vive | Separada del árbol de código | Dentro del repo (versionada con Git) |
| Review | Edición directa (poca fricción) | PRs, historial y revisión normal |
| Mejor para | Notas internas rápidas del equipo | Documentación que debe versionarse con el código |

**Límite:** la wiki clásica no pasa por el mismo flujo de PR que `/docs`. Si la doc es parte del producto (como este Docusaurus), mejor en el repo.

---

## 3.6 GitHub Gist

Un **Gist** es un fragmento de código (o archivo suelto) **sin** necesitar un repo completo.

| Tipo | Quién lo ve |
|---|---|
| **Público** | Visible y descubrible |
| **Secreto** | Solo quien tenga el link (no es cifrado ni “privado de empresa”) |

Sirve para:

- Compartir un script, un `.sql`, un snippet.
- Pegar en Issues/PRs un ejemplo reproducible.
- Versionar el gist a nivel básico (cada edición queda en el historial del gist).

No sustituye un repo: sin Issues formales, sin PRs de equipo, sin Pages del proyecto.

---

## 3.7 GitHub Pages

**Pages** publica un sitio **estático** desde el repo.

### Orígenes habituales

- Rama `main` (o `gh-pages`) en la raíz.
- Carpeta `/docs` de `main`.
- (Avanzado) un workflow que construye el sitio (Docusaurus, etc.).

### URL

| Tipo | Ejemplo |
|---|---|
| Usuario / org | `https://USUARIO.github.io` |
| Por proyecto | `https://USUARIO.github.io/NOMBRE-REPO` |

### Casos de uso

- Portfolio mínimo en HTML.
- Docs de un proyecto.
- Sitio generado (como esta guía en Docusaurus).

En el repo: **Settings** → **Pages** → eliges fuente (rama / carpeta) y guardas.

### Práctica de cierre (fase 3)

1. README de perfil en `username/username` (o mejorar el que ya tengas).
2. Un Project con al menos un Issue vinculado y movido en el board.
3. Pages con una página mínima **o** el link de este Docusaurus si ya lo publicas.
