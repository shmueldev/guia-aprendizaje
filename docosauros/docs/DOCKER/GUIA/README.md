---
id: docker
title: Docker
sidebar_label: Docker
description: Plan de aprendizaje de Docker, desde contenedores e imágenes hasta Compose, imágenes de producción, CI y Swarm.
slug: /docker
---

# Plan de Aprendizaje Completo: Docker

> **Objetivo:** Crear, publicar y operar contenedores con criterio: una imagen pequeña, un Compose que levanta la app, y un flujo que no depende de tu máquina.
>
> **Metodología:** Las fases 1 a 5 cubren el curso de fundamentos. Las fases 6 a 10 cubren optimización, redes, CI/CD y orquestación. Cada fase cierra con algo que arranca en tu máquina. La fase 7 de [FastAPI](/docs/fastapi) reutiliza este plan para empaquetar API, dashboard y base de datos.

Tus apuntes van en [Mis notas](/docs/docker/notas).

## Índice

1. [Fase 1: Fundamentos y el entorno](#fase-1-fundamentos-y-el-entorno)
2. [Fase 2: Imágenes y contenedores](#fase-2-imágenes-y-contenedores)
3. [Fase 3: Volúmenes y redes](#fase-3-volúmenes-y-redes)
4. [Fase 4: Publicar y trasladar imágenes](#fase-4-publicar-y-trasladar-imágenes)
5. [Fase 5: Docker Compose](#fase-5-docker-compose)
6. [Fase 6: Imágenes de producción](#fase-6-imágenes-de-producción)
7. [Fase 7: Registros y Azure](#fase-7-registros-y-azure)
8. [Fase 8: Redes avanzadas y balanceo](#fase-8-redes-avanzadas-y-balanceo)
9. [Fase 9: CI/CD](#fase-9-cicd)
10. [Fase 10: Compose avanzado, Swarm y Kubernetes local](#fase-10-compose-avanzado-swarm-y-kubernetes-local)
11. [Proyectos integradores](#proyectos-integradores)

---

## Fase 1: Fundamentos y el entorno

> **Meta:** Explicar qué es un contenedor, instalar Docker y usar la CLI y Docker Desktop sin mezclar imagen, contenedor y registro.

### 1.1 Contenedores para desarrollo

- [ ] Qué problema resuelve: el mismo entorno en tu máquina, en CI y en el servidor
- [ ] Imagen (plantilla), contenedor (proceso en marcha) y registro (dónde se publican las imágenes)
- [ ] Un contenedor es un proceso aislado que usa el kernel del host

### 1.2 Máquinas virtuales y contenedores

- [ ] La VM virtualiza hardware y arrastra un sistema operativo completo
- [ ] El contenedor arranca en segundos y pesa lo que pesa la app más su base
- [ ] Cuándo una VM sigue teniendo sentido: otro kernel, o un aislamiento más fuerte que el del contenedor

### 1.3 Instalación en Windows, Mac y Linux

- [ ] Windows: Docker Desktop con backend WSL2
- [ ] Mac: Docker Desktop
- [ ] Linux: Docker Engine, sin necesidad de Desktop
- [ ] Comprobar con `docker version` y `docker info`
- [ ] Revisar si tu uso (personal o empresa) entra en la licencia de Docker Desktop

### 1.4 Docker Desktop

- [ ] Vistas de contenedores, imágenes, volúmenes y builds
- [ ] CPU, RAM y disco asignados al motor (en Windows viven dentro de WSL2)
- [ ] Logs y terminal de un contenedor desde la interfaz
- [ ] Kubernetes de Desktop queda para la fase 10: no lo enciendas todavía

### 1.5 Comandos esenciales y documentación

- [ ] `docker --help` y `docker <comando> --help` antes de buscar en internet
- [ ] [Documentación de Docker](https://docs.docker.com/) como referencia de cada comando
- [ ] Ciclo mínimo: `pull`, `run`, `ps`, `logs`, `stop`, `rm`
- [ ] 🧪 **Práctica:** `hello-world` y la imagen oficial de nginx sirviendo en `localhost`.

---

## Fase 2: Imágenes y contenedores

> **Meta:** Pasar de una imagen oficial a una imagen tuya, etiquetada, y saber apagarla, borrarla e inspeccionarla.

### 2.1 Contenedor web con Nginx

- [ ] Carpeta con un `index.html` y la imagen oficial `nginx`
- [ ] Publicar el puerto: `-p 8080:80`
- [ ] Ver el sitio en el navegador y los logs del contenedor
- [ ] Abrir el proyecto en el editor y volver a levantar el contenedor tras un cambio

### 2.2 Dockerfile y etiquetas

- [ ] Instrucciones de esta fase: `FROM`, `WORKDIR`, `COPY`, `RUN`, `EXPOSE`, `CMD`
- [ ] `docker build -t tu-usuario/app:1.0 .`
- [ ] Dos etiquetas de la misma imagen (`1.0` y un alias) con `docker tag`
- [ ] Leer el historial de capas con `docker image history`

### 2.3 De la imagen al servidor con `docker run`

- [ ] `-d` (segundo plano), `--name`, `-p`, `--rm`
- [ ] El proceso dentro del contenedor escucha en `0.0.0.0`, no en `127.0.0.1`
- [ ] Parar por nombre y comprobar que el puerto del host quedó libre

### 2.4 Gestión de imágenes y contenedores

- [ ] `docker images`, `docker ps`, `docker ps -a`
- [ ] `start`, `stop`, `restart`, `rm`, `rmi`
- [ ] Un contenedor parado sigue ocupando disco hasta que lo borras
- [ ] Borrar una imagen que todavía tiene un contenedor asociado: primero el contenedor

### 2.5 Administración del contenedor en marcha

- [ ] `docker logs -f`, `docker exec -it`, `docker inspect`, `docker stats`
- [ ] `docker top` para ver el proceso principal
- [ ] `--restart unless-stopped` cuando el contenedor debe volver tras un reinicio del daemon

### 2.6 API Flask

- [ ] App mínima con un endpoint y `requirements.txt`
- [ ] Dockerfile que instala dependencias y arranca Flask (o gunicorn) en el puerto 5000
- [ ] Probar con `curl` contra el puerto publicado en el host
- [ ] 🧪 **Práctica:** Una imagen propia de Flask etiquetada `1.0` y un HTML servido por nginx, ambos arrancados con `docker run`.

---

## Fase 3: Volúmenes y redes

> **Meta:** Que el código sobreviva a un cambio sin reconstruir, y que dos contenedores se encuentren por nombre.

### 3.1 Volúmenes para desarrollo web

- [ ] Lo que escribes dentro del contenedor desaparece al borrarlo
- [ ] Montar la carpeta del host para ver el HTML o el código sin un `build` nuevo
- [ ] `docker volume create`, `ls` e `inspect`
- [ ] Un volumen con nombre, gestionado por Docker, distinto de una ruta suelta del host (el detalle bind vs nombrado está en la fase 10)

### 3.2 Redes

- [ ] La red `bridge` por defecto y una red creada por ti
- [ ] `docker network create`, `connect`, `ls`, `inspect`
- [ ] Dos contenedores en la misma red se resuelven por `--name`
- [ ] 🧪 **Práctica:** Nginx y Flask en una red de usuario. El HTML llega por un volumen montado. Flask responde usando el nombre del contenedor, no `localhost`.

---

## Fase 4: Publicar y trasladar imágenes

> **Meta:** Sacar la imagen de tu máquina: al registro, o a un archivo cuando no hay registro.

### 4.1 Docker Hub

- [ ] Cuenta, `docker login` y el nombre `usuario/imagen:tag`
- [ ] `docker tag` al nombre del repositorio y `docker push`
- [ ] Borrar la imagen local y recuperarla con `docker pull`
- [ ] Repositorio público para esta práctica

### 4.2 Explorar el contenedor

- [ ] `exec` para recorrer el sistema de archivos, variables y el proceso principal
- [ ] Un cambio hecho con `exec` no queda en la imagen: hay que reconstruir
- [ ] `inspect` para ver red, montajes, puertos y comando de arranque

### 4.3 Exportar e importar por CLI

- [ ] `docker save` y `docker load`: la imagen, con capas e historial, en un `.tar`
- [ ] `docker export` y `docker import`: el sistema de archivos de un contenedor, sin historial de build
- [ ] Save/load para mover una imagen sin registro. Export/import cuando quieres un snapshot plano del contenedor
- [ ] 🧪 **Práctica:** Push a Docker Hub y, en la misma imagen, un `save` / `load` en otro directorio.

---

## Fase 5: Docker Compose

> **Meta:** Levantar frontend y backend con un archivo, no con una lista de `docker run`.

### 5.1 Gestionar varios contenedores

- [ ] `compose.yaml` describe servicios, no contenedores sueltos
- [ ] `docker compose up -d`, `ps`, `logs`, `stop`
- [ ] El nombre del proyecto prefija contenedores, red y volúmenes

### 5.2 Frontend y backend

- [ ] Servicio `web` (nginx) y servicio `api` (Flask), cada uno con su `build`
- [ ] La red de Compose es implícita: `web` llama a `http://api:5000`
- [ ] `ports` solo en lo que debe verse desde el host. La API puede quedar solo en la red interna
- [ ] Variables de entorno del servicio (`environment`)
- [ ] 🧪 **Práctica:** `docker compose up` deja el sitio y la API hablando entre sí. `docker compose stop` los apaga sin borrar el archivo.

---

## Fase 6: Imágenes de producción

> **Meta:** Dejar la imagen que usarías en un registro: más chica, con caché aprovechada, sin root y revisada.

### 6.1 Comandos de aprendizaje y uso productivo

- [ ] En aprendizaje vale `latest`, root y una imagen enorme. En una imagen que vas a publicar, no
- [ ] Imagen inmutable: la configuración cambia por variables de entorno, no editando el contenedor a mano
- [ ] Un proceso principal por contenedor

### 6.2 Multi-stage

- [ ] Etapa que compila o instala, y etapa final que solo corre
- [ ] El curso lo muestra con ASP.NET. Practica el mismo corte con Python: compiladores y cachés de pip se quedan en la etapa de build
- [ ] `COPY --from=` trae solo el artefacto a la imagen final
- [ ] Comparar el peso con `docker images` antes y después

### 6.3 Bajar de gigas a decenas de megas

- [ ] Alpine: el salto de tamaño del curso (del orden de 1 GB a cerca de 100 MB) y el costo en Python, porque muchas ruedas no existen para musl
- [ ] Cuando Alpine rompe el build de Python, `python:3.12-slim` es el punto medio
- [ ] Distroless: imagen mínima, sin shell. Menos superficie y un depurado distinto (`exec` con bash deja de existir)
- [ ] Menos capas: unir en un solo `RUN` los pasos que siempre van juntos, y dejar aparte la capa de dependencias para no perder la caché

### 6.4 Caché y build context

- [ ] Orden del Dockerfile: lo que cambia poco (base y dependencias) antes que el código
- [ ] Si una capa cambia, Docker reconstruye esa capa y las siguientes
- [ ] El build context es la carpeta que se envía al daemon, no “el Dockerfile”
- [ ] `docker build -f` cuando el Dockerfile no está en la raíz del contexto
- [ ] `.dockerignore`: `.git`, `venv`, `__pycache__`, `.env`, datos locales, `node_modules`. El secreto no debe entrar ni al contexto

### 6.5 Escaneo, usuario y prácticas de producción

- [ ] Escanear la imagen con Docker Scout o con Trivy y leer qué es crítico y qué es ruido de la base
- [ ] Usuario sin privilegios: crear el usuario en la imagen y terminar el Dockerfile con `USER`
- [ ] Permisos de los archivos que ese usuario tiene que leer o escribir
- [ ] Las 6 prácticas del curso para imágenes de producción: anótalas y marca cuáles ya quedaron hechas en esta fase

### 6.6 Limpiar el disco

- [ ] `docker system df` para ver imágenes, contenedores, volúmenes y caché de build
- [ ] `docker image prune`, `docker container prune`, `docker builder prune`
- [ ] `docker volume prune` borra datos. Mira la lista antes de confirmar
- [ ] `docker system prune` no sustituye saber qué estás borrando

### 6.7 Varias arquitecturas

- [ ] `linux/amd64` y `linux/arm64`: tu laptop y el servidor pueden no ser la misma
- [ ] `docker buildx build --platform linux/amd64,linux/arm64`
- [ ] Un tag que apunta a un manifiesto con ambas variantes
- [ ] 🧪 **Práctica:** La API de la fase 2 reconstruida en multi-stage, con usuario no root, `.dockerignore` y un escaneo. Anota el peso antes y después.

---

## Fase 7: Registros y Azure

> **Meta:** Publicar en un registro con límites claros y, si tienes suscripción, llevar esa imagen a Azure Container Apps.

### 7.1 Docker Hub para compartir en la nube

- [ ] Tags de versión (`1.2.3`) además del nombre de la imagen
- [ ] Repositorio público y privado, y una organización si la imagen no es tuya personal
- [ ] Planes vigentes de Hub: pulls, repos privados y retención. Léelos en la página actual. Un número memorizado se vuelve falso
- [ ] Cuándo Hub se queda corto: límite de pulls en CI, o una imagen que la empresa no quiere en un registro público

### 7.2 Azure Container Registry

- [ ] Crear el registro y copiar el login server (`*.azurecr.io`)
- [ ] `az acr login` (o el usuario admin solo si estás en un ejercicio aislado)
- [ ] `docker tag` y `docker push` hacia ese login server

### 7.3 Del registro a Container Apps

- [ ] Crear la Container App desde la imagen del ACR
- [ ] El puerto de ingreso de la app alineado con el puerto del proceso
- [ ] Logs del servicio para ver el mismo arranque que ya viste en local
- [ ] 🧪 **Práctica:** La imagen de la fase 6 en Docker Hub con un tag de versión. Si tienes Azure, la misma imagen en ACR y una Container App que responda. Si no tienes suscripción, deja ACR y Container Apps anotados y cierra Hub.

---

## Fase 8: Redes avanzadas y balanceo

> **Meta:** Elegir el modelo de red y poner nginx delante de varias réplicas.

### 8.1 Los cinco modelos

- [ ] `bridge`: el de todos los días en un solo host
- [ ] `host`: el contenedor comparte la red del host. Sin mapeo de puertos, y con menos aislamiento
- [ ] `none`: sin red. Sirve para un trabajo que no debe salir
- [ ] `overlay`: varios hosts. La vas a usar en Swarm
- [ ] `macvlan`: el contenedor aparece como otra máquina en la red física
- [ ] En desarrollo y en Compose de un solo servidor, quédate en `bridge` hasta que el escenario pida otra

### 8.2 Puertos

- [ ] Puerto del contenedor (donde escucha el proceso) y puerto del host (donde entras desde fuera)
- [ ] `-p 8080:80` publica en todas las interfaces. `-p 127.0.0.1:8080:80` solo en tu máquina
- [ ] `EXPOSE` documenta el puerto. Quien publica es `-p` o la clave `ports` de Compose
- [ ] Dos contenedores no pueden ocupar el mismo puerto del host

### 8.3 Balanceo con NGINX

- [ ] Varias réplicas de la misma app, cada una con su nombre
- [ ] `upstream` y `proxy_pass` en nginx
- [ ] Una página o un header que muestre el hostname, para ver que las peticiones se reparten
- [ ] 🧪 **Práctica:** Tres réplicas y nginx delante. Diez peticiones seguidas no caen todas en el mismo contenedor.

---

## Fase 9: CI/CD

> **Meta:** Que un push construya, pruebe y publique la imagen sin hacerlo a mano.

### 9.1 `RUN` y scripts en el Dockerfile

- [ ] Un `RUN` largo e ilegible se muda a un script copiado en la imagen
- [ ] El script falla en el primer error (`set -e`) y limpia la caché del gestor de paquetes en la misma capa
- [ ] `ARG` para la versión de la imagen base
- [ ] Un secreto en `ARG` o en `ENV` queda en el historial de la imagen. No lo pongas ahí

### 9.2 GitHub Actions

- [ ] Workflow en `.github/workflows/` que hace `docker build` en cada push
- [ ] Login al registro con secrets del repo
- [ ] Push de la imagen solo en la rama principal o en un tag, no en cada experimento
- [ ] Leer el log del run cuando el build falla: suele ser el mismo error que en local

### 9.3 Pruebas automáticas

- [ ] Tests de la app antes de publicar la imagen
- [ ] Smoke test: el contenedor arranca y el puerto responde
- [ ] Si el test falla, el job no hace push

### 9.4 Despliegue en Azure

- [ ] El workflow publica en ACR y actualiza la Container App
- [ ] El tag que despliegas es el del commit o el de la versión, para poder volver atrás
- [ ] 🧪 **Práctica:** Push a `main` construye, corre el test y publica en Docker Hub. Si tienes Azure, el mismo workflow sigue hacia ACR y Container Apps. Si no, ese tramo queda escrito en el workflow y sin secretos falsos.

---

## Fase 10: Compose avanzado, Swarm y Kubernetes local

> **Meta:** Cerrar Compose con criterio (volúmenes, apagado, réplicas) y ver Swarm y Kubernetes de Desktop como el siguiente escalón, no como otro curso entero.

### 10.1 Plantilla de Compose

- [ ] Claves que vas a usar siempre: `services`, `image` o `build`, `ports`, `environment`, `volumes`, `networks`, `depends_on`
- [ ] La clave `version` ya no hace falta en Compose actual
- [ ] Un archivo que otra persona levanta con `docker compose up` sin instrucciones orales

### 10.2 Volúmenes bind y nombrados

- [ ] Bind mount: una ruta de tu máquina. Sirve en desarrollo, para el código
- [ ] Volumen nombrado: lo guarda Docker. Sirve para datos (uploads, una base)
- [ ] El nombrado sobrevive a `docker compose down`
- [ ] `docker compose down -v` sí borra los volúmenes del proyecto

### 10.3 `docker compose down` y Ctrl+C

- [ ] Ctrl+C corta Compose si está en primer plano y detiene los contenedores de esa sesión
- [ ] `docker compose down` elimina contenedores y la red del proyecto
- [ ] `down` sin `-v` deja los volúmenes. Úsalo cuando los datos importan
- [ ] `stop` deja contenedores y red creados, listos para `start`

### 10.4 Balanceo con Compose

- [ ] `docker compose up --scale api=3` (el servicio no puede fijar un `container_name` ni un puerto de host repetido)
- [ ] Nginx de la fase 8, ahora definido en el mismo Compose, repartiendo hacia las réplicas
- [ ] `deploy.replicas` cuando el curso lo muestre en la plantilla orientada a Swarm

### 10.5 Docker Swarm

- [ ] `docker swarm init` y la idea de manager y worker (`join`)
- [ ] `docker service create` con réplicas de nginx
- [ ] Red `overlay` para que el servicio exista en el clúster, no solo en un contenedor
- [ ] `docker service ls`, `scale` y `rm`
- [ ] Swarm completa este curso. Los clústeres nuevos del mercado suelen ir a Kubernetes: no hace falta fingir que son lo mismo

### 10.6 Kubernetes en Docker Desktop

- [ ] Activarlo en Settings y esperar a que el nodo esté listo
- [ ] `kubectl config` apunta al contexto `docker-desktop`
- [ ] `kubectl get nodes` muestra el nodo
- [ ] Esto enciende un clúster local. Los manifiestos (Deployment, Service, Ingress) son otro plan

### 10.7 Costos ocultos

- [ ] Réplicas encendidas todo el día, aunque nadie llame a la app
- [ ] Imagen enorme: almacenamiento y tiempo de pull en cada despliegue (por eso la fase 6)
- [ ] Logs sin rotación y discos de volúmenes que nadie borra
- [ ] CPU y RAM pedidas de más, y tráfico que sale de la red del proveedor
- [ ] 🧪 **Práctica:** Un Compose con volumen nombrado que sigue ahí después de `down` (sin `-v`). Después, tres réplicas: con `docker service` en Swarm o, si Swarm no está disponible en tu Desktop, con `docker compose up --scale`.

---

## Proyectos integradores

1. **Sitio de dos servicios** — nginx y una API Flask (o FastAPI) en Compose, con volumen de código en desarrollo y la API solo en la red interna.
2. **Imagen que se puede publicar** — multi-stage, usuario no root, `.dockerignore`, tag de versión, escaneo y un workflow de GitHub Actions que publica.
3. **Réplicas detrás de nginx** — el balanceo de la fase 8, más una nota del peso de la imagen y de qué costo evita.

## Recursos

| Recurso | Uso |
|---|---|
| [Docker — Get Started](https://docs.docker.com/get-started/) | Imagen, contenedor y el primer Compose |
| [Referencia del Dockerfile](https://docs.docker.com/reference/dockerfile/) | Cada instrucción |
| [Docker Compose](https://docs.docker.com/compose/) | Archivo y CLI |
| [Multi-stage builds](https://docs.docker.com/build/building/multi-stage/) | Etapa de build y etapa final |
| [Docker Scout](https://docs.docker.com/scout/) | Vulnerabilidades de la imagen |
| [Buildx](https://docs.docker.com/build/building/multi-platform/) | Varias arquitecturas |
| [Kubernetes en Desktop](https://docs.docker.com/desktop/features/kubernetes/) | Encender el clúster local |
| [Azure Container Apps](https://learn.microsoft.com/azure/container-apps/) | De la imagen al servicio |
| [docker/build-push-action](https://github.com/docker/build-push-action) | Build y push en GitHub Actions |

## Criterios de avance

| Fase | La dominas cuando... |
|---|---|
| 1 | Diferencias imagen, contenedor y registro, y levantas nginx oficial sin mirar el comando |
| 2 | Tu Dockerfile de Flask construye, publica el puerto y lo paras, borras e inspeccionas por nombre |
| 3 | Dos contenedores se hablan por nombre y un cambio de HTML se ve sin reconstruir |
| 4 | Haces push a Hub y también mueves la imagen con `save` / `load` |
| 5 | `docker compose up` levanta frontend y backend, y se encuentran por el nombre del servicio |
| 6 | La imagen bajó de peso, no corre como root, tiene `.dockerignore` y el escaneo ya lo leíste |
| 7 | Hay un tag de versión en un registro. Si tienes Azure, esa imagen responde en Container Apps |
| 8 | Explicas los cinco modelos en una frase cada uno y nginx reparte entre réplicas |
| 9 | Un push a `main` construye, prueba y publica sin que tú ejecutes `docker build` |
| 10 | Sabes qué borra `down`, qué borra `down -v`, y enciendes Swarm o las réplicas de Compose a voluntad |

## Fuera de estos dos cursos

El temario que pegaste cierra en los planes de Docker Hub y deja la palabra “Develop” sin clases. Estos temas no están en el plan de arriba. Conviene agregarlos si la guía tiene que servir para las APIs y los datos de esta ruta:

- **Instrucciones que el Dockerfile usa y las clases no separan:** `ENTRYPOINT` frente a `CMD`, `COPY` frente a `ADD`, `ARG` frente a `ENV` en el día a día, y `HEALTHCHECK`.
- **Secretos:** archivos `.env`, `env_file` en Compose, y secretos de BuildKit. El plan solo dice que un secreto no va en `ARG`.
- **Healthcheck y `depends_on`:** que Compose espere a que la API responda, no solo a que el contenedor haya arrancado. Hace falta para Postgres + FastAPI.
- **Límites de CPU y memoria** (`--memory`, `--cpus`, y las mismas claves en Compose). Encajan con los costos de la fase 10 y no tienen clase propia.
- **Logs en serio:** driver, rotación y qué pasa cuando `docker logs` llena el disco.
- **Tag y digest:** fijar la imagen base por versión y, en producción, por digest.
- **Compose Watch** (`develop` / `watch`): recarga al guardar. Puede ser la sección “Develop” que quedó cortada.
- **Señales y PID 1:** por qué el proceso no se entera del Ctrl+C y qué hace un init mínimo. La fase 10 cubre `down` frente a Ctrl+C, no el proceso de adentro.
- **Datos:** un volumen para PostgreSQL y una forma de respaldarlo. El curso se queda en volúmenes de una web.
- **Socket de Docker y registro privado genérico:** no publicar el socket, y `docker login` a un registro que no sea Hub ni ACR.
- **Kubernetes de verdad:** Desktop solo enciende el nodo. Deployment, Service e Ingress no vienen en estos cursos.
- **Caché de BuildKit en GitHub Actions** (`cache-from` / `cache-to`). El curso separa la caché local y el workflow, sin la caché del build en CI.
- **Licencia de Docker Desktop en la empresa**, distinta de instalar Engine en un Linux.
