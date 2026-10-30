---
id: fase-2
title: Fase 2 · Introducción a GitHub
sidebar_label: 2. Introducción a GitHub
description: "Apuntes de GitHub: cuenta, repos, SSH, forks y sync con push/fetch/pull."
slug: /git-github/notas/fase-2
---

# Fase 2: Introducción a GitHub

Apunte hasta `push` / `fetch` / `pull`. Issues (2.9) y Pull requests (2.10) siguen pendientes.

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

Todavía en estudio. Cuando lo cierres: bug vs. feature, labels y plantillas en `.github/ISSUE_TEMPLATE/`.

## 2.10 Pull requests

Todavía en estudio. Cuando lo cierres: abrir PR desde rama o fork, review, merge y borrar la rama remota.
