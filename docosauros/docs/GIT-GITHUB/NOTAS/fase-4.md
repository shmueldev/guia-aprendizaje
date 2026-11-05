---
id: fase-4
title: Fase 4 · Codespaces y editor web
sidebar_label: 4. Codespaces
description: "Apuntes de Codespaces, Dev Containers, Live Share y el editor web de GitHub."
slug: /git-github/notas/fase-4
---

# Fase 4: GitHub Codespaces y editor web

Fase 4 cerrada: desarrollar en la nube cuando el entorno local no está listo (o no conviene armarlo).

El plan completo está en la [guía de Git y GitHub](/docs/git-github).

## 4.1 Codespaces

Un **Codespace** es un entorno de desarrollo en la nube: una **VM** + editor (VS Code en el navegador, o conectado desde el escritorio).

En la práctica: abres el repo en GitHub → **Code** → pestaña **Codespaces** → **Create codespace on main** (o la rama que elijas).

### Ciclo de vida

| Acción | Qué implica |
|---|---|
| **Crear / abrir** | Arranca la máquina y el editor con el repo clonado |
| **Detener (Stop)** | Apagas la VM; el disco del Codespace se conserva un tiempo |
| **Borrar (Delete)** | Eliminas el entorno; no borra el repo en GitHub |

Trabajas igual que en local: terminal, extensiones, `git add` / `commit` / `push`, abrir PR.

### Cuándo conviene frente a la máquina local

| Codespaces | Máquina local |
|---|---|
| PC limitado, viaje, o “solo quiero abrir el repo ya” | Día a día con todo instalado |
| Onboarding: mismo entorno para todo el equipo | Control total de hardware y GPU |
| Demo o revisión rápida sin clonar | Sin depender de cuota/minutos en la nube |

### Costos (panorama)

La cuenta **Free** tiene una cuota mensual de uso de Codespaces. Si dejas la VM encendida, consume. Habito sano: **Stop** cuando terminas la sesión. Lo exacto de minutos y tipos de máquina cambia con el plan; míralo en billing/settings de GitHub cuando lo uses en serio.

---

## 4.2 Plantillas y Dev Container

La idea de un **Dev Container** es: *el entorno va en el repo*, no solo en tu cabeza o en tu laptop.

Carpeta típica:

```text
.repo/
└── .devcontainer/
    └── devcontainer.json
```

### Qué define `devcontainer.json` (idea)

| Pieza | Para qué |
|---|---|
| **Imagen** | Base (Python, Node, etc.) |
| **Extensiones** | Las que VS Code/Codespaces instala al abrir |
| **post-create / post-start** | Scripts: `pip install`, `npm i`, etc. |
| **Puertos** | Forward del servidor de desarrollo |

Así, al crear un Codespace (o abrir el repo en VS Code con Dev Containers), todos parten del **mismo** Python, mismas deps y mismas extensiones.

GitHub ofrece **plantillas** (Django, Node, etc.) ya armadas: creas el repo desde la plantilla y el Codespace arranca listo. Sirve para aprender el flujo sin escribir el JSON a mano el primer día.

---

## 4.3 Pair programming con Live Share

**Live Share** permite compartir la sesión del editor: otra persona ve el mismo código, el cursor y, si quieres, la terminal.

| Rol | Quién es |
|---|---|
| **Host** | Quien inicia la sesión (su Codespace o VS Code local) |
| **Guest** | Quien entra con el link de la sesión |

Buenas prácticas:

- No pegues **secretos**, tokens ni `.env` en el chat de la sesión.
- Acuerda si el guest puede editar o solo mirar.
- Cierra la sesión cuando terminan; el link no debe quedar “vivo” por días.

Sirve para revisar un bug juntos o explicar un flujo sin “pásame tu pantalla” a ciegas. No sustituye el PR: el cambio formal sigue entrando por review.

---

## 4.4 Editor web de GitHub

Sin Codespace: en cualquier archivo del repo → icono de lápiz (**Edit this file**).

Flujo típico:

1. Editas en el navegador.
2. Abajo eliges **Commit directly to `main`** o **Create a new branch** + propuesta de PR.
3. Mensaje de commit → **Commit changes**.

### Límites

| Bien para | Mal para |
|---|---|
| Typo en el README, una línea de config, un label | Refactor grande, muchos archivos, depurar con debugger |
| Hotfix mínimo documentado | Instalar deps, correr tests complejos, Docker local |

Si el cambio crece, baja a Codespace o a tu máquina.

### Práctica de cierre (fase 4)

1. Abre un **Codespace** (o el editor web si la cuota no alcanza).
2. Haz un commit limpio en una rama.
3. Ábrelo en un **Pull Request** y ciérralo (merge o cierra a mano si era solo práctica).
