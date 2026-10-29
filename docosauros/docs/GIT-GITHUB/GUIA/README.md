---
id: git-github
title: Git y GitHub
sidebar_label: Git y GitHub
description: Plan de aprendizaje de Git y GitHub, desde el control de versiones hasta releases, seguridad y automatización.
slug: /git-github
---

# Plan de Aprendizaje Completo: Git y GitHub

> **Objetivo:** Usar Git y GitHub como herramienta de trabajo diaria: historial claro, ramas seguras, colaboración con pull requests y buenas prácticas de seguridad.
>
> **Metodología:** Cada fase cierra con un repo de práctica. No avances si no puedes repetir el flujo sin mirar la guía.

## Índice

1. [Fase 1: Fundamentos de Git](#fase-1-fundamentos-de-git)
2. [Fase 2: Introducción a GitHub](#fase-2-introducción-a-github)
3. [Fase 3: Herramientas de colaboración](#fase-3-herramientas-de-colaboración)
4. [Fase 4: GitHub Codespaces y editor web](#fase-4-github-codespaces-y-editor-web)
5. [Fase 5: Seguridad y buenas prácticas](#fase-5-seguridad-y-buenas-prácticas)
6. [Fase 6: Administración de GitHub](#fase-6-administración-de-github)
7. [Fase 7: Pull requests y fusiones](#fase-7-pull-requests-y-fusiones)
8. [Fase 8: Releases y empaquetado](#fase-8-releases-y-empaquetado)
9. [Fase 9: Cierre y tips profesionales](#fase-9-cierre-y-tips-profesionales)
10. [Proyectos integradores](#proyectos-integradores)

---

## Fase 1: Fundamentos de Git

> **Meta:** Entender el control de versiones local y moverte con seguridad entre commits y ramas.

### 1.1 Control de versiones: de básico a avanzado

- [ ] Qué problema resuelve Git: historial, colaboración y volver atrás sin miedo
- [ ] Repositorio local vs. remoto
- [ ] Working directory, staging area e historial (`commit`)
- [ ] Cuándo un cambio debe ser un commit y cuándo no

### 1.2 Configuración y comandos básicos

- [ ] Instalar Git y comprobar la versión
- [ ] `git config` de usuario y correo (global y por repo)
- [ ] `git init`, `git status`, `git add`, `git commit`
- [ ] Mensajes de commit claros (qué y por qué, no solo “fix”)
- [ ] `git log` y `git log --oneline`

### 1.3 Flujo de trabajo diario

- [ ] Ciclo: editar → `status` → `add` → `commit`
- [ ] `git diff` (sin stage y ya en stage)
- [ ] Deshacer un archivo en staging: `git restore --staged` / `git reset HEAD`
- [ ] Ignorar archivos locales que no deben ir al repo (idea de `.gitignore`)

### 1.4 Ramas: crear, fusionar y eliminar

- [ ] Rama `main` / `master` y ramas de trabajo
- [ ] `git branch`, `git switch` / `git checkout -b`
- [ ] Fusionar con `git merge`
- [ ] Eliminar ramas ya fusionadas (`git branch -d`)
- [ ] Flujo simple: feature → merge a main

### 1.5 Deshacer commits: `reset` vs `revert`

- [ ] `git reset`: mueve el puntero; cuándo es seguro (solo local, no compartido)
- [ ] Soft, mixed y hard: qué toca el staging y el working tree
- [ ] `git revert`: crea un commit nuevo que deshace otro (seguro en ramas compartidas)
- [ ] Regla práctica: si ya hiciste `push`, prefiere `revert`

### 1.6 Tags y checkout sin romper el proyecto

- [ ] Tags ligeros y anotados (`git tag`, `git tag -a`)
- [ ] Marcar una versión (`v1.0.0`)
- [ ] `git checkout` de un commit o tag (estado “detached HEAD”) y cómo volver a una rama
- [ ] Cuándo un tag sirve y cuándo una rama es mejor

### 1.7 Conflictos de merge

- [ ] Por qué aparecen (mismo archivo, mismas líneas, dos historias)
- [ ] Cómo se ve un conflicto en el archivo (`<<<<<<<`, `=======`, `>>>>>>>`)
- [ ] Resolver a mano, `git add` y completar el merge
- [ ] Abortar un merge que salió mal (`git merge --abort`)

### 1.8 Git en Visual Studio Code / Cursor

- [ ] Panel Source Control: stage, commit, sync
- [ ] Diff visual y resolución de conflictos en el editor
- [ ] Extensiones útiles (GitLens u equivalentes) a nivel de panorama
- [ ] 🧪 **Práctica:** Repo local con dos ramas, un merge con conflicto resuelto, un tag `v0.1.0` y un `revert` de un commit.

---

## Fase 2: Introducción a GitHub

> **Meta:** Publicar y sincronizar trabajo en GitHub con una cuenta segura.

### 2.1 Colaboración y desarrollo seguro

- [ ] Qué es GitHub frente a Git solo
- [ ] Modelos de colaboración: colaborador directo vs. fork
- [ ] Buenas prácticas mínimas: no subir secretos, ramas protegidas, revisiones

### 2.2 Cuenta de GitHub

- [ ] Crear la cuenta y verificar el correo
- [ ] Autenticación de dos factores (2FA)
- [ ] Perfil público: nombre, bio, pin de repos

### 2.3 Creación y revisión de repositorios

- [ ] Crear un repo vacío o con README
- [ ] Visibilidad: público vs. privado
- [ ] README, licencia y `.gitignore` al crear
- [ ] Revisar commits, archivos y historial en la web

### 2.4 Crear y clonar el primer repo

- [ ] `git remote add origin`
- [ ] Primer `git push -u origin main`
- [ ] `git clone` de un repo existente
- [ ] Diferencia entre clonar y descargar ZIP

### 2.5 Planes y productos de GitHub

- [ ] Free, Pro, Team, Enterprise: idea de límites
- [ ] Qué está disponible en la cuenta gratuita para un estudiante o portfolio
- [ ] Features que suelen pedir plan de pago (a nivel panorama)

### 2.6 SSH en Windows, Linux y Mac

- [ ] Generar clave SSH (`ssh-keygen`)
- [ ] Agregar la clave pública en GitHub
- [ ] Probar conexión (`ssh -T git@github.com`)
- [ ] HTTPS vs. SSH: cuándo usar cada uno
- [ ] En Windows: OpenSSH y el agente de claves

### 2.7 Forks y estrellas

- [ ] Star: marcar un repo de referencia
- [ ] Fork: copia bajo tu cuenta para contribuir
- [ ] Flujo fork → cambios → pull request al repo original
- [ ] Mantener el fork al día (`upstream`)

### 2.8 `pull`, `push` y `fetch`

- [ ] `git push`: subir commits locales
- [ ] `git fetch`: traer referencias sin fusionar
- [ ] `git pull`: fetch + merge (o rebase, si lo configuras)
- [ ] Cuándo un `pull` crea un merge commit y cómo leerlo
- [ ] 🧪 **Práctica:** Repo en GitHub con SSH, clone en otra carpeta, un push y un pull entre dos clones.

### 2.9 Issues y plantillas

- [ ] Crear un issue: bug vs. feature
- [ ] Labels, assignees y milestones a nivel básico
- [ ] Plantillas de issues (`.github/ISSUE_TEMPLATE/`)
- [ ] Buenas descripciones: pasos, esperado vs. actual

### 2.10 Pull requests

- [ ] Abrir un PR desde una rama o desde un fork
- [ ] Descripción, reviewers y checklist
- [ ] Conversación, commits nuevos en la misma rama
- [ ] Merge del PR y borrar la rama remota
- [ ] 🧪 **Práctica:** Issue + rama + PR mergeado en tu propio repo.

---

## Fase 3: Herramientas de colaboración

> **Meta:** Organizar trabajo en equipo y documentar en el mismo ecosistema.

### 3.1 GitHub Projects

- [ ] Board de tareas (To do / In progress / Done)
- [ ] Vincular issues y PRs a un Project
- [ ] Campos útiles: estado, prioridad, iteración

### 3.2 Automatizar Projects con workflows

- [ ] Idea de workflow: al abrir un issue, moverlo al board
- [ ] Triggers básicos ligados a Projects
- [ ] Cuándo automatizar y cuándo no

### 3.3 Markdown para documentación

- [ ] Títulos, listas, enlaces, código en bloque
- [ ] Tablas e imágenes
- [ ] README efectivo: qué hace el proyecto, cómo instalarlo, cómo usarlo

### 3.4 Portada de perfil en GitHub

- [ ] Repo especial `username/username`
- [ ] README de perfil con Markdown
- [ ] Pins de repos y una bio clara

### 3.5 Wikis

- [ ] Activar y editar una wiki del repo
- [ ] Cuándo wiki vs. docs en el repo (`/docs`)
- [ ] Límites: versionado y PRs frente a wiki clásica

### 3.6 GitHub Gist

- [ ] Crear un gist público o secreto
- [ ] Compartir un snippet o un archivo suelto
- [ ] Revisar y versionar gists a nivel básico

### 3.7 GitHub Pages

- [ ] Publicar un sitio estático desde una rama o desde `/docs`
- [ ] Dominio `usuario.github.io` / `usuario.github.io/repo`
- [ ] Casos de uso: portfolio, docs de un proyecto, Docusaurus
- [ ] 🧪 **Práctica:** README de perfil + Pages con una página mínima (o el link de este Docusaurus).

---

## Fase 4: GitHub Codespaces y editor web

> **Meta:** Desarrollar en la nube cuando el entorno local no está listo.

### 4.1 Codespaces

- [ ] Qué es un Codespace (VM + editor en el navegador)
- [ ] Crear, abrir, detener y borrar un Codespace
- [ ] Cuándo conviene frente a la máquina local
- [ ] Costos y cuotas a nivel panorama

### 4.2 Plantillas y `devcontainer`

- [ ] Idea de Dev Container: el entorno va en el repo
- [ ] Plantilla con Django (u otro stack) ya configurada
- [ ] Archivo `devcontainer.json`: imagen, extensiones, post-create

### 4.3 Pair programming con Live Share

- [ ] Compartir sesión en Codespaces / VS Code
- [ ] Roles: host y guest
- [ ] Buenas prácticas: no compartir secretos en la sesión

### 4.4 Editor web de GitHub

- [ ] Editar un archivo en la UI y commitear
- [ ] Crear una rama desde el editor web
- [ ] Límites: cambios chicos, no un refactor grande
- [ ] 🧪 **Práctica:** Abrir un Codespace (o el editor web), hacer un commit y abrirlo en un PR.

---

## Fase 5: Seguridad y buenas prácticas

> **Meta:** Que el repo no filtre secretos y que las dependencias no se pudran en silencio.

### 5.1 Tokens de acceso

- [ ] Personal Access Token (classic vs. fine-grained, a nivel concepto)
- [ ] Permisos mínimos (least privilege)
- [ ] Guardar el token fuera del código (credential manager / variables de entorno)
- [ ] Revocar un token comprometido

### 5.2 Secret scanning

- [ ] Qué detecta GitHub (claves, tokens en el historial)
- [ ] Alertas y qué hacer si sale un secreto
- [ ] Límites: no sustituye revisar el diff antes del push

### 5.3 Dependabot

- [ ] Alertas de dependencias vulnerables
- [ ] PRs automáticos de actualización
- [ ] Idea general (aunque el curso use .NET: el flujo es el mismo en Python/`pip`/`npm`)
- [ ] Revisar y mergear un PR de Dependabot con criterio

### 5.4 Repos privados y `.gitignore`

- [ ] Cuándo privado y cuándo público
- [ ] `.gitignore` para Python, Node, entornos (`.env`, `venv`, `__pycache__`)
- [ ] Qué nunca debe entrar: claves, dumps, datos personales
- [ ] Si un secreto ya entró: rotar + limpiar historial (idea; el procedimiento exacto se estudia con cuidado)
- [ ] 🧪 **Práctica:** Repo con `.gitignore` correcto, sin `.env`, y Dependabot o secret scanning revisados en Settings.

---

## Fase 6: Administración de GitHub

> **Meta:** Administrar repos y automatizar lo repetible.

### 6.1 Gestión de repositorios

- [ ] Settings: nombre, visibilidad, default branch
- [ ] Colaboradores y permisos (read / write / admin)
- [ ] Branch protection: exigir PR, reviews, status checks
- [ ] Archivar o transferir un repo

### 6.2 GitHub Actions (introducción)

- [ ] Qué es un workflow (YAML en `.github/workflows/`)
- [ ] Trigger: `push`, `pull_request`, `schedule`
- [ ] Ejemplo simple: test o actualizar perfil automáticamente
- [ ] Secrets del repo para Actions
- [ ] Ver el run: logs y fallos

### 6.3 CLI `gh`

- [ ] Instalar e iniciar sesión (`gh auth login`)
- [ ] `gh repo create`, `gh pr create`, `gh issue list`
- [ ] Revisar un PR desde la terminal
- [ ] 🧪 **Práctica:** Crear un PR con `gh` y un workflow mínimo que corra en cada push.

---

## Fase 7: Pull requests y fusiones

> **Meta:** Integrar cambios con una estrategia clara y sin miedo a los conflictos.

### 7.1 Configurar un proyecto con Git y GitHub

- [ ] Estructura inicial: README, `.gitignore`, rama default
- [ ] Convención de ramas (`feature/`, `fix/`, `docs/`)
- [ ] Commits atómicos y PRs chicos

### 7.2 Conflictos en VS Code / Cursor

- [ ] Vista de conflicto en el editor
- [ ] Aceptar current / incoming / ambos
- [ ] Verificar con tests o smoke check antes de commitear la resolución

### 7.3 Estrategias de fusión

- [ ] Merge commit: conserva la historia de la rama
- [ ] Squash: un solo commit en main
- [ ] Rebase: historia lineal (cuándo evitarlo en ramas públicas)
- [ ] Elegir una estrategia por equipo y no mezclar sin criterio
- [ ] 🧪 **Práctica:** Tres PRs: uno merge, uno squash, uno con conflicto resuelto en el editor.

---

## Fase 8: Releases y empaquetado

> **Meta:** Publicar una versión usable y, si aplica, un paquete instalable.

### 8.1 GitHub Releases

- [ ] Crear un release desde un tag
- [ ] Notas de la versión (changelog)
- [ ] Adjuntar binarios o artefactos si hace falta
- [ ] Pre-release vs. release estable

### 8.2 Instalar un paquete pip desde GitHub

- [ ] `pip install git+https://github.com/org/repo.git`
- [ ] Instalar un tag o una rama concreta
- [ ] Cuándo publicar en PyPI vs. instalar desde GitHub
- [ ] 🧪 **Práctica:** Tag `v0.1.0`, Release en GitHub y (opcional) instalar el repo como dependencia en un venv de prueba.

---

## Fase 9: Cierre y tips profesionales

> **Meta:** Cerrar el ciclo con hábitos que evitan dolores en equipo.

- [ ] Commits pequeños y mensajes útiles
- [ ] Nunca forzar `push` a `main` compartida sin acuerdo
- [ ] Proteger `main`, exigir PR
- [ ] Templates de PR e issue
- [ ] Revisar el diff antes de pushear (secretos, archivos grandes)
- [ ] Tips del curso: atajos de la UI, búsqueda en repos, saved replies, etc.
- [ ] 🧪 **Práctica:** Checklist personal de “antes de abrir un PR” pegada en el README del repo de práctica.

---

## Proyectos integradores

1. **Repo de portfolio** — README de perfil, Pages opcional, Issues/PR de una mejora real, branch protection en `main`.
2. **Flujo de equipo simulado** — dos clones (o dos usuarios), fork o ramas, PR con review, release `v1.0.0`.

---

## Recursos

| Recurso | Uso |
|---|---|
| [Git — Book](https://git-scm.com/book/es/v2) | Fundamentos oficiales |
| [GitHub Docs](https://docs.github.com/es) | PR, Actions, seguridad, Pages |
| [gh CLI](https://cli.github.com/) | GitHub desde la terminal |
| [Pro Git — Branching](https://git-scm.com/book/es/v2/Ramificaciones-en-Git-Qué-es-una-rama) | Ramas y merges |
| [Ignoring files](https://docs.github.com/es/get-started/getting-started-with-git/ignoring-files) | `.gitignore` |

---

## Criterios de avance

| Fase | La dominas cuando... |
|---|---|
| 1 | Creas ramas, resuelves un conflicto y eliges entre `reset` y `revert` con una frase |
| 2 | Clonas por SSH, abres un PR y no subes un `.env` |
| 3 | Tienes un Project o al menos Issues + README claro + (opcional) Pages |
| 4 | Editas en Codespaces o en el editor web y dejas un commit limpio |
| 5 | El repo tiene `.gitignore`, 2FA y ningún secreto en el historial reciente |
| 6 | Creas un PR con `gh` y un Action mínimo corre en el push |
| 7 | Explicas merge vs. squash vs. rebase y cuándo usar cada uno |
| 8 | Publicas un Release con tag y notas |
| 9 | Tu checklist de PR evita los errores que ya te pasaron una vez |
