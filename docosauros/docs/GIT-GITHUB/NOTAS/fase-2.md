---
id: fase-2
title: Fase 2 · Introducción a GitHub
sidebar_label: 2. Introducción a GitHub
description: "Apuntes de GitHub: cuenta, repos, SSH, forks, sync, Issues y Pull requests."
slug: /git-github/notas/fase-2
---

# Fase 2: Introducción a GitHub

Fase 2 cerrada: cuenta, repos, SSH, forks, sync con remoto, Issues y Pull requests.

El plan completo está en la [guía de Git y GitHub](/docs/git-github).

## 2.1 Colaboración y desarrollo seguro

**Git** es la herramienta local (historial, ramas, commits).  
**GitHub** es la plataforma en la nube que usa Git como núcleo: guarda remotes, Issues, PRs, Actions, etc.

| Modelo | Cómo trabajas |
|---|---|
| **Colaborador directo** | Te dan permiso en el repo; creas ramas y PRs ahí |
| **Fork** | Copias el repo a tu cuenta, cambias, y abres PR al original |

Buenas prácticas mínimas:

- No subir secretos (`.env`, tokens, claves).
- Proteger `main` (exigir PR / reviews cuando el equipo crece).
- Revisar el diff antes de pushear.

---

## 2.2 Cuenta de GitHub

1. Crear cuenta y **verificar el correo**.
2. Activar **2FA** (autenticación de dos factores): Settings → Password and authentication.
3. Perfil público: nombre, bio y **pins** de repos (hasta 6) para el portfolio.

---

## 2.3 Creación y revisión de repositorios

Al crear un repo en la web puedes elegir:

| Opción | Para qué |
|---|---|
| README | Descripción inicial del proyecto |
| `.gitignore` | Plantilla (Python, Node, etc.) |
| Licencia | MIT, Apache, etc. (opcional) |
| Público / privado | Visible para todos o solo para ti (y colaboradores) |

Después, en la web revisas: archivos, commits, branches e Insights a nivel básico.

**Vacío vs. con README:** si ya tienes un repo local con commits, a veces conviene crear el remoto **sin** README para evitar un primer `pull`/`merge` raro; si empiezas solo en la web, el README ayuda.

---

## 2.4 Crear y clonar el primer repo

### Subir un repo que ya tienes en local

```bash
git remote add origin git@github.com:USUARIO/REPO.git
git push -u origin main
```

- `origin` — nombre habitual del remoto.
- `-u` — guarda el tracking: después basta `git push` / `git pull`.

### Clonar un repo existente

```bash
git clone git@github.com:USUARIO/REPO.git
cd REPO
```

| | Qué trae |
|---|---|
| **`git clone`** | Archivos + historial completo (carpeta `.git`) |
| **Descargar ZIP** | Solo una foto de los archivos; **sin** Git |

---

## 2.5 Planes y productos (panorama)

| Plan | Idea |
|---|---|
| **Free** | Repos públicos/privados, Actions con cuota, bien para estudiante y portfolio |
| **Pro** | Más Actions/Codespaces y extras de cuenta personal |
| **Team / Enterprise** | Orgs, SSO, políticas y auditoría a escala empresa |

Para aprender y portfolio, **Free** alcanza. Lo de pago suele aparecer cuando necesitas más minutos de CI, Codespaces o controles de organización.

---

## 2.6 SSH en Windows, Linux y Mac

HTTPS pide token a menudo. **SSH** usa un par de llaves: pública en GitHub, privada en tu máquina.

### Generar la clave

```bash
ssh-keygen -t ed25519 -C "tu_correo@ejemplo.com"
```

| Parte | Significado |
|---|---|
| `ssh-keygen` | Crea el par de llaves |
| `-t ed25519` | Algoritmo moderno (más corto y preferible frente a RSA antiguo) |
| `-C "..."` | Comentario / etiqueta (suele ser tu correo) |

Cuando pregunte la ruta, Enter usa el default: `~/.ssh/id_ed25519` (+ `.pub` la pública).

### Agente y `ssh-add`

El **ssh-agent** guarda la llave privada en memoria para no teclear la passphrase en cada `push`.

**Git Bash / Linux / Mac:**

```bash
eval "$(ssh-agent -s)"
# responde algo como: Agent pid 15324
ssh-add ~/.ssh/id_ed25519
```

**PowerShell (Windows), idea general:**

```powershell
Get-Service ssh-agent | Set-Service -StartupType Manual
Start-Service ssh-agent
ssh-add $env:USERPROFILE\.ssh\id_ed25519
```

### Copiar la clave **pública** a GitHub

```bash
# Git Bash / Linux / Mac
cat ~/.ssh/id_ed25519.pub
# o con nano:
nano ~/.ssh/id_ed25519.pub
```

```powershell
Get-Content $env:USERPROFILE\.ssh\id_ed25519.pub
```

Verás una línea del estilo:

```text
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIK... tu_correo@ejemplo.com
```

GitHub → **Settings** → **SSH and GPG keys** → **New SSH key** → pegas **solo** la `.pub` (nunca la privada sin `.pub`).

### Probar

```bash
ssh -T git@github.com
# Hi USUARIO! You've successfully authenticated...
```

| | Cuándo |
|---|---|
| **SSH** | Día a día en tu máquina (después de configurar una vez) |
| **HTTPS** | Máquinas ajenas, CI simple, o si aún no tienes SSH |

---

## 2.7 Forks y estrellas

| | Qué es |
|---|---|
| **Star** | Marca un repo de referencia / “favorito” de alto valor |
| **Fork** | Copia del repo de otra cuenta **bajo la tuya**, para contribuir |

### Flujo típico de contribución

```text
Fork → clone de TU fork → rama → commits → push → Pull Request al repo original
```

### Mantener el fork al día (`upstream`)

```bash
git remote add upstream git@github.com:ORIGINAL/REPO.git
git fetch upstream
git switch main
git merge upstream/main
# o: git rebase upstream/main
git push origin main
```

- `origin` → tu fork.  
- `upstream` → el repo original.

---

## 2.8 `pull`, `push` y `fetch`

Imagina GitHub como la oficina central y tu carpeta local como la oficina en casa.

### `git push` — subir

```bash
git add .
git commit -m "Mensaje claro"
git push -u origin main   # la primera vez con -u
git push                  # las siguientes
```

Sube tus commits locales al remoto.

### `git fetch` — el cartero deja el reporte (sin mezclar)

Va a GitHub, trae lo nuevo a referencias remotas (`origin/main`, etc.) y **no** toca tus archivos de trabajo.

```bash
git fetch origin
git log main..origin/main --oneline   # qué hay en remoto que aún no tienes en main
```

Si te convence, mezclas a mano:

```bash
git merge origin/main
```

> No es `git origin/main`. El merge es: `git merge origin/main`.

Sirve para **mirar sin tocar** antes de integrar.

### `git pull` — fetch + merge (en un paso)

```bash
git pull
# equivalente habitual:
# git fetch
# git merge origin/main   (si estás en main trackeando origin/main)
```

**Fórmula:**

```text
git pull  ≈  git fetch  +  git merge
```

(Si configuras pull con rebase: `fetch` + `rebase`.)

Si tu `main` local y `origin/main` divergieron, el `pull` (con merge) puede crear un **merge commit**. Con `git log --oneline --graph` se ve la unión de las dos líneas.

### Cuándo usar cada uno

| Situación | Comando |
|---|---|
| Subir tu trabajo | `git push` |
| Solo inspeccionar qué hay en remoto | `git fetch` + `git log ...` |
| Actualizar local y mezclar ya | `git pull` |
| Remoto más nuevo que local y quieres igualarte | `git pull` (con la rama correcta) |

### Práctica sugerida

1. Repo en GitHub con SSH.
2. Clone en otra carpeta.
3. Commit + `push` desde una.
4. `fetch` / `pull` en la otra.

---

## 2.9 Issues y plantillas

Los **Issues** son tickets del proyecto: organizan, debaten y hacen seguimiento de tareas (bugs, features, dudas).

Imagina un tablero de notas: cada Issue es una nota con título, descripción y conversación.

### Para qué se usan

| Uso | Ejemplo |
|---|---|
| **Bug** | “El login falla en Android” |
| **Feature** | “Agregar modo oscuro” |
| **Tarea** | “Actualizar textos legales” |
| **Discusión** | Acordar enfoque antes de codear |

### Anatomía básica en GitHub

1. **Título y descripción** — qué hay que resolver.
2. **Assignees** — quién es responsable.
3. **Labels** — `bug`, `enhancement`, `documentation`, etc.
4. **Milestones** — agrupar Issues en un entregable (v1.0, sprint, etc.).
5. **Comentarios** — hilo del equipo sobre esa tarea.

### Buena descripción (sobre todo en bugs)

- Pasos para reproducir.
- **Esperado** vs. **actual**.
- Entorno (versión, SO) y capturas si aplican.

### Flujo con Git

Cuando vas a resolver el Issue `#14`:

1. Lees el Issue en GitHub.
2. Creas una rama (`fix/login`, `feature/modo-oscuro`, …).
3. Commits + `push` de esa rama.
4. En el PR escribes `Closes #14` (o `Fixes #14`). Al mergear, GitHub **cierra el Issue** solo.

### Plantillas (`.github/ISSUE_TEMPLATE/`)

Obligan a quien abre un Issue a llenar un formulario (pasos, esperado, etc.) en lugar de un cuadro en blanco.

Estructura (nombres exactos, sensibles a mayúsculas):

```text
tu-proyecto/
└── .github/
    └── ISSUE_TEMPLATE/
        ├── bug_report.md
        └── feature_request.md
```

Ejemplo `bug_report.md`:

```markdown
---
name: Reporte de Error (Bug)
about: Crea un reporte para identificar y solucionar un fallo.
title: "[BUG]: "
labels: bug
assignees: ''
---

**Descripción del error**
Una descripción clara de lo que falla.

**Pasos para reproducir**
1. Ve a '...'
2. Haz clic en '...'
3. Mira el error

**Comportamiento esperado**
Qué debería pasar.

**Capturas**
Si aplica, adjunta capturas.
```

Ejemplo `feature_request.md`:

```markdown
---
name: Sugerir una mejora (Feature Request)
about: Propón una idea o nueva característica.
title: "[PROPUESTA]: "
labels: enhancement
assignees: ''
---

**¿Está relacionado con un problema?**
Describe el dolor actual.

**Solución que te gustaría**
Qué debería pasar.

**Alternativas consideradas**
Otras opciones que barajaste.
```

Subir las plantillas:

```bash
git add .github/
git commit -m "feat: agregar plantillas de issues"
git push origin main
```

Al hacer **New Issue**, GitHub ofrece elegir entre tus plantillas.

---

## 2.10 Pull requests

Subir directo a `main` en equipo es pintar varios sobre el mismo lienzo: alguien pisa el trabajo del otro. El flujo sano es **rama propia → revisión → merge**.

Un **Pull Request (PR)** no es un comando de Git: es la solicitud en GitHub de “revisen mi rama y, si está bien, mézclenla en `main`” (o en la rama base que elijas).

### Flujo paso a paso

**1. Rama de trabajo** (nadie codea en `main`):

```bash
git checkout -b feature/nueva-funcion
# o: git switch -c feature/nueva-funcion
```

**2. Commits y push de la rama** (no de `main`):

```bash
git add .
git commit -m "feat: agregar nueva funcion"
git push -u origin feature/nueva-funcion
```

**3. Abrir el PR en GitHub**

Desde la rama (o desde un fork): título, descripción, reviewers, checklist. Ligar el Issue: `Closes #14`.

**4. Review y commits nuevos**

Los comentarios van en el PR. Si hay que corregir, commits en **la misma rama** + `push`: el PR se actualiza solo.

**5. Merge y limpieza**

Cuando hay Approve (y checks en verde, si hay CI): **Merge**. Luego borra la rama remota desde la UI (o `git push origin --delete feature/nueva-funcion`) y en local:

```bash
git checkout main
git pull
git branch -d feature/nueva-funcion
```

### Por qué el PR es el filtro

| Protección | Qué hace |
|---|---|
| **Code review** | Diff línea a línea; comentarios antes de tocar `main` |
| **CI** | Tests/build automáticos; pueden bloquear el merge |
| **Conflictos** | GitHub avisa si choca con `main`; hay que resolver antes |

### Desde un fork

Mismo idea: push a **tu** fork y abres el PR hacia el repo original (base = upstream, compare = tu rama).

### Práctica de cierre (fase 2)

1. Crea un Issue (bug o feature) en tu repo.
2. Rama desde `main`, commits, `push`.
3. Abre el PR con `Closes #N`, mergea y borra la rama remota.
