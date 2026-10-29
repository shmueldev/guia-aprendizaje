---
id: fase-1
title: Fase 1 · Fundamentos de Git
sidebar_label: 1. Fundamentos
description: "Apuntes de la fase 1: commits, ramas, reset/revert, tags, conflictos y Git en el editor."
slug: /git-github/notas/fase-1
---

# Fase 1: Fundamentos de Git

Fase 1 cerrada: fundamentos locales, conflictos de merge y uso básico en el editor.

El plan completo está en la [guía de Git y GitHub](/docs/git-github).

## 1.1 Control de versiones

### Qué problema resuelve Git

Git guarda **historial**. Cada commit es una foto del proyecto en un momento. Sirve para:

- Volver atrás sin miedo (un cambio malo no borra lo anterior).
- Ver qué cambió, cuándo y por qué (con un buen mensaje).
- Trabajar en paralelo (ramas) y luego unir.

Sin Git, “la versión buena” suele ser una carpeta `proyecto-final-v3-ahora-si`.

### Repositorio local vs. remoto

| | Dónde vive | Para qué |
|---|---|---|
| **Local** | Tu máquina (carpeta `.git`) | Trabajar offline, commits, ramas |
| **Remoto** | Servidor (GitHub, etc.) | Backup, colaboración, PRs |

En esta fase casi todo es **local**. El remoto entra fuerte en la fase 2.

### Working directory, staging e historial

Tres capas:

1. **Working directory** — los archivos que ves y editas.
2. **Staging area (index)** — lo que elegiste para la próxima foto (`git add`).
3. **Historial (commits)** — fotos ya guardadas.

```text
editar archivo  →  working directory
git add         →  staging
git commit      →  historial
```

### Cuándo hacer un commit (y cuándo no)

**Sí:** un cambio con sentido propio (“agrega validación de email”, “arregla el cálculo del total”).

**No:** un commit gigante con 20 cosas distintas, ni un commit solo porque “pasaron 10 minutos”. Tampoco subas `.env`, `venv/` ni secretos (eso lo refuerza `.gitignore` en 1.3).

---

## 1.2 Configuración y comandos básicos

Ayuda de cualquier comando:

```bash
git --help
git status -h
```

### Rama por defecto: `main` (no `master`)

Hoy la rama principal se llama `main`. Para que cada `git init` nuevo la cree así:

```bash
git config --global init.defaultBranch main
```

Si el repo ya existía con `master` y quieres renombrar la rama actual:

```bash
git branch -m main
```

`-m` = move/rename. Úsalo cuando inicializaste **antes** de configurar el default.

### Usuario y correo

Git firma cada commit con nombre y email:

```bash
git config --global user.name "shmueldev"
git config --global user.email "ruizdavid0506@gmail.com"
git config --list
```

- `--global` → toda la máquina.
- Sin `--global` → solo el repo actual (útil si en el trabajo usas otro correo).

### `git init`, `status`, `add`, `commit`

```bash
git init      # crea .git y empieza a vigilar el proyecto
git status    # ¿qué cambió? ¿qué está en staging?
git add .     # (o un archivo) pasa al staging
git commit -m "Mensaje claro"
```

**Qué te dice `git status`:**

| Color / bloque | Significado |
|---|---|
| On branch `main` | Rama actual |
| Untracked (rojo) | Archivo nuevo; Git aún no lo vigila |
| Changes not staged (rojo) | Ya lo conocía; lo modificaste y aún no está en staging |
| Changes to be committed (verde) | En staging, listo para el commit |

Sacar un archivo del staging **sin borrar el archivo**:

```bash
git restore --staged nombre-archivo
# equivalente clásico:
git rm --cached nombre-archivo
```

> `git rm --cached` quita del índice. Cuidado con `git rm` sin `--cached`: eso sí puede borrar el archivo del disco.

### Mensajes de commit claros

Mal: `fix`, `asdf`, `cambios`.

Bien: qué hiciste y por qué, en una línea:

```bash
git commit -m "Corrige el total del carrito cuando hay descuento"
```

### `git log`

```bash
git log              # historial completo
git log --oneline    # una línea por commit (ideal para día a día)
```

Ejemplo de salida `--oneline`:

```text
a1b2c3d Corrige el total del carrito cuando hay descuento
f0e1d2c Agrega página de inicio
```

---

## 1.3 Flujo de trabajo diario

### Ciclo básico

```text
editar → git status → git add → git commit → (repetir)
```

### `git diff`: ver el cambio antes de guardarlo

```bash
git diff              # working directory vs staging (lo rojo)
git diff --staged     # staging vs último commit (lo verde)
```

Úsalo antes del commit: así no se te cuela un `console.log` o un secreto.

### Deshacer staging

```bash
git restore --staged archivo.txt
# o, estilo antiguo:
git reset HEAD archivo.txt
```

El archivo vuelve a “modificado / no staged”; el contenido no se pierde.

### Idea de `.gitignore`

Archivo en la raíz del repo. Git deja de proponer esos paths:

```gitignore
.env
venv/
__pycache__/
*.pyc
node_modules/
.DS_Store
```

Si ya habías hecho `git add` de un archivo sensible, el `.gitignore` solo no lo saca del historial: hay que quitarlo del índice (`git rm --cached`) y, si hubo push, rotar el secreto.

**Ejemplo mínimo de día a día:**

```bash
# 1. Editas app.py
git status
git diff
git add app.py
git diff --staged
git commit -m "Valida que el email no esté vacío"
git log --oneline -5
```

---

## 1.4 Ramas: crear, fusionar y eliminar

### Ver y crear

```bash
git branch                 # lista ramas; * = la actual
git switch -c feature/amin # crea y entra a la rama nueva (recomendado)
# equivalente clásico:
git checkout -b feature/amin
```

| Comando | Qué hace |
|---|---|
| `git switch amin` | Cambia a una rama que **ya existe** |
| `git switch -c amin` | **Crea** y cambia |
| `git checkout amin` | Cambia a una rama existente |
| `git checkout -b amin` | Crea y cambia |

> Error fácil: `git checkout -b main` para “volver a main”. Eso intenta **crear** `main`. Para volver: `git switch main` o `git checkout main` (sin `-b`).

### Fusionar a `main`

```bash
git switch main
git merge feature/amin
```

### Borrar la rama de trabajo

```bash
git branch -d feature/amin   # seguro: solo si ya está mergeada
git branch -D feature/amin   # fuerza el borrado (aunque no esté mergeada)
```

Preferí `-d` en el día a día. `-D` cuando estás seguro de descartar esa línea de trabajo.

### Flujo simple feature → main

```bash
git switch main
git switch -c feature/login
# ... editas, add, commit ...
git switch main
git merge feature/login
git branch -d feature/login
```

---

## 1.5 Deshacer commits: `reset` vs `revert`

### Idea general

| Comando | Qué hace | Cuándo |
|---|---|---|
| `git reset` | Mueve el puntero de la rama (reescribe historial local) | Solo local, **antes** de compartir |
| `git revert` | Crea un **commit nuevo** que deshace otro | Seguro si ya hubo `push` |

Regla práctica: **si ya hiciste push a una rama compartida, prefiere `revert`.**

### Los tres `reset` (sobre `HEAD~1` = un commit atrás)

```bash
git log --oneline          # elige a dónde volver
git reset --soft HEAD~1    # quita el commit; deja todo en staging (verde)
git reset --mixed HEAD~1   # quita el commit; saca del staging (rojo). Es el default
git reset --hard HEAD~1    # quita el commit y descarta los cambios del working tree
```

También puedes apuntar a un hash:

```bash
git reset --hard a1b2c3d
```

| Modo | Commit | Staging | Working directory |
|---|---|---|---|
| `--soft` | Se “deshace” | Se mantiene | Se mantiene |
| `--mixed` | Se “deshace” | Se limpia | Se mantiene |
| `--hard` | Se “deshace” | Se limpia | **Se pierde** el trabajo no commiteado ahí |

`--hard` es el más destructivo: úsalo solo si ese código no sirve y no lo necesitas.

**Ejemplo `--soft`:** commitaste demasiado pronto y quieres rearmar el mensaje o partir en dos commits. Soft deja los archivos listos en verde para volver a `commit`.

### `git revert`

No borra historia. Añade un commit que aplica lo inverso:

```bash
git log --oneline
git revert a1b2c3d
# Git abre editor o usas:
git revert a1b2c3d --no-edit
```

Si el commit tocaba muchas cosas y hay conflictos, los resuelves como en un merge (eso lo profundizas en 1.7).

---

## 1.6 Tags y checkout sin romper el proyecto

### Qué es un tag

Una **etiqueta** fija en un commit (suele marcar versiones: `v1.0.0`). No es una rama: no “avanza” con nuevos commits.

```bash
git tag                    # lista
git tag v0.1.0             # tag ligero en el commit actual
git tag -a v1.0.0 -m "Primera versión estable"   # anotado (recomendado para releases)
git show v1.0.0            # detalle del tag / commit
git tag -d v0.1.0          # borra el tag local (no borra el commit)
```

| Tag ligero | Tag anotado (`-a`) |
|---|---|
| Solo el nombre → commit | Guarda mensaje, autor, fecha |
| Rápido / personal | Mejor para versiones que vas a publicar |

**Rama vs tag:** la rama es línea de trabajo que sigue creciendo; el tag es un pin “esta foto es la 1.0.0”.

### `checkout` a un commit: Detached HEAD

```bash
git log --oneline
git checkout a1b2c3d    # viajas a esa foto
# o:
git switch --detach a1b2c3d
```

Estás en **Detached HEAD**: puedes mirar y probar. No estás “sobre” `main`.

Volver al presente:

```bash
git switch main
# o:
git checkout main
```

### Si el experimento en el pasado te gustó

Si en detached HEAD haces commits y luego vuelves a `main` sin más, esos commits quedan flotando y son difíciles de encontrar. Lo profesional: **crear una rama antes de irte**.

```bash
# estás en el commit antiguo, ya hiciste add + commit del experimento
git switch -c experimento-exitoso
git switch main
# más tarde, si quieres unirlo:
git merge experimento-exitoso
```

Flujo completo:

1. `git checkout <hash>` — mirar el pasado.
2. Experimentar → `git add` → `git commit`.
3. `git switch -c mi-experimento` — anclar el trabajo.
4. `git switch main` — volver al presente.
5. Decidir: merge, dejar la rama como archivo, o borrarla.

---

## 1.7 Conflictos de merge

Aparecen cuando dos ramas tocaron **las mismas líneas** del mismo archivo y Git no puede elegir solo.

Se detectan al hacer `git merge` (o al abrir un PR en GitHub). El archivo queda con marcadores; lo abres en el editor (o con `nano archivo.txt`) y decides qué queda.

### Marcadores

```text
<<<<<<< HEAD
tu código actual (la rama donde estás)
=======
código que viene de la otra rama
>>>>>>> nombre-de-la-otra-rama
```

| Marcador | Significado |
|---|---|
| `<<<<<<< HEAD` | Empieza tu versión |
| `=======` | División entre las dos historias |
| `>>>>>>> otra-rama` | Termina la versión entrante |

### Resolver a mano

1. Borra los tres marcadores.
2. Deja solo el texto final (una opción, la otra, o un mix).
3. Guarda el archivo.
4. `git add archivo.txt`
5. `git commit` (si el merge no cerró solo; a veces Git deja el mensaje de merge listo).

**Ejemplo:** en `main` dice `hola` y en `feature` dice `hi` en la misma línea. Tras el merge:

```text
<<<<<<< HEAD
hola
=======
hi
>>>>>>> feature
```

Decides, por ejemplo, dejar `hola a todos`, quitas marcadores, `git add` y cierras el merge.

### Botón de pánico: abortar

Si saltan muchos conflictos y no quieres seguir:

```bash
git merge --abort
```

Cancela el merge y deja el repo **como antes** de intentar la fusión.

### Conflictos en un Pull Request (GitHub)

Si las ramas ya están en GitHub y abres un PR, GitHub bloquea el merge si hay conflicto.

Conflictos **simples** (texto / pocos archivos) se pueden resolver en la web:

1. **Resolve conflicts** dentro del PR.
2. Editor web con los mismos marcadores `<<<<<<<` / `=======` / `>>>>>>>`.
3. Editas a mano y borras marcadores.
4. **Mark as resolved**.
5. **Commit merge** → se habilita el botón verde de merge del PR.

> Si el conflicto es grande (muchos archivos o cambia arquitectura), GitHub te obliga a resolverlo **en local**, commitear y pushear de nuevo.

---

## 1.8 Git en Visual Studio Code / Cursor

### Dónde mirar

- **Esquina inferior izquierda:** rama actual (clic para cambiar o crear rama).
- **Icono de Source Control** (rama / puntos en la barra lateral): cambios, staging y commits sin terminal.

### Merge desde la UI

1. Ponte en la rama que debe **recibir** los cambios (casi siempre `main`).
2. Menú `…` (tres puntos) del panel Source Control → **Branch** → **Merge Branch…**
3. Eliges la rama a fusionar (por ejemplo `feature/amin`).
4. Si hay conflicto, el editor muestra diff con opciones: Current, Incoming o ambos; editas, guardas, haces stage y commit del merge.

### Práctica de cierre (fase 1)

En un repo solo local:

1. Dos ramas, un merge con conflicto resuelto.
2. Un tag `v0.1.0`.
3. Un `git revert` de un commit de prueba.
