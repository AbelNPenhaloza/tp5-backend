Trabajo Práctico N° 5: Programación y Servicios Web — Backend con Express & ORM

Institución: Universidad Nacional de Jujuy (UNJu)

Facultad: Facultad de Ingeniería

Asignatura: Programación y Servicios Web

Cátedra: Ing. Espinoza Alfredo Rolando

Estudiante: Abel N. Peñaloza

Estructura de la Entrega: tp5-penaloza-abel-backend

Objetivo de la Práctica

Diseñar, implementar y documentar una arquitectura de Servicios Web RESTful utilizando Node.js y Express, estableciendo la persistencia de datos relacionales mediante PostgreSQL administrada a través del ORM Sequelize. Asimismo, se integra el testeo exhaustivo de endpoints mediante Postman y la auto-generación de especificaciones interactivas bajo el estándar OpenAPI 3.0 (Swagger).

Arquitectura y Estructura del Directorio

El proyecto sigue una arquitectura monolítica limpia y modularizada por puntos de consigna (p1, p2, p3), aislando de forma estricta los Modelos, Rutas y Controladores para asegurar una alta cohesión y bajo acoplamiento:

tp5-penaloza-abel-backend/
├── config/                  # Configuración de base de datos y pool de Sequelize
│   └── database.js
├── postman/                 # Colecciones JSON de Postman para pruebas de la cátedra
│   ├── api-socio.postman_collection.json
│   ├── api-transacciones.postman_collection.json
│   ├── api-empleados.postman_collection.json
│   └── api-publicaciones.postman_collection.json
├── src/
│   ├── controllers/         # Controladores (Lógica de control y respuestas HTTP)
│   │   ├── p1/
│   │   │   └── socio.controller.js
│   │   ├── p2/
│   │   │   └── transaccion.controller.js
│   │   └── p3/
│   │       ├── empleado.controller.js
│   │       └── publicacion.controller.js
│   ├── models/              # Modelos de definición Sequelize (Entidades)
│   │   ├── p1/
│   │   │   └── socio.model.js
│   │   ├── p2/
│   │   │   └── transaccion.model.js
│   │   └── p3/
│   │       ├── empleado.model.js
│   │       └── publicacion.model.js
│   └── routes/              # Ruteadores Express con metadatos OpenAPI anotados
│       ├── p1/
│       │   └── socio.route.js
│       ├── p2/
│       │   └── transaccion.route.js
│       └── p3/
│           ├── empleado.route.js
│           └── publicacion.route.js
├── .env                     # Variables de entorno críticas
├── index.js                 # Bootstrapping y arranque de Express
├── package.json             # Manifiesto del sistema y scripts npm
├── swagger.js               # Generador automatizado de OpenAPI 3.0
└── swagger_output.json      # Especificación JSON compilada para Swagger UI

Modelos de Datos y Relaciones

PTO 1) Módulo de Socios

Representa a los miembros activos o pasivos de la organización.

Modelo: Socio

## Atributos:

id: INTEGER (Autoincremental, PK)

nombre: VARCHAR(255)

apellido: VARCHAR(255)

foto: TEXT (URL de la imagen de perfil)

dni: VARCHAR(50) (Único)

numeroSocio: INTEGER

activo: BOOLEAN (Establece el estado de pago del socio)

PTO 2) Módulo de Transacciones (Logs de Traducción)

Representa el registro inalterable (log) de operaciones ejecutadas por una API de traducción.

Modelo: Transaccion

## Atributos:

id: INTEGER (Autoincremental, PK)

idiomaOrigen: VARCHAR(100)

textoOrigen: TEXT

idiomaDestino: VARCHAR(100)

textoDestino: TEXT

emailCliente: VARCHAR(255)

PTO 3) Módulo de Empleados y Publicaciones (Relación $1:N$)

Se modela la relación de cardinalidad donde un empleado puede redactar o poseer múltiples publicaciones digitales, pero una publicación pertenece estrictamente a un único empleado redactor.


\text{Empleado} \xrightarrow{1\ :\ N} \text{Publicacion}


Físicamente, esto se resuelve inyectando la llave foránea (empleadoId) dentro de la entidad Publicacion.

Modelo: Empleado

id: INTEGER (PK)

apellido: VARCHAR(255)

nombre: VARCHAR(255)

dni: VARCHAR(50)

email: VARCHAR(255)

Modelo: Publicacion

id: INTEGER (PK)

titulo: VARCHAR(255)

contenido: TEXT

imagenAsociada: TEXT (Formato de almacenamiento Base64 para adjuntos de imagen)

fechaPublicacion: VARCHAR(100) (Gestionado como String bajo consigna de cátedra)

vigente: BOOLEAN

empleadoId: INTEGER (FK conectada al modelo Empleado)

Tabla General de Ruteo de Endpoints (API REST)

Módulo de Socios (P1)

Método

Endpoint

Parámetros

Descripción

## POST

/api/socio

Body (JSON)

Da de alta un nuevo Socio

## GET

/api/socio

Ninguno

Recupera la lista completa de socios registrados

## GET

/api/socio/activo

Ninguno

Filtra y retorna solo los socios con activo: true

## PUT

/api/socio/:id

Path: :id | Body

Modifica las propiedades de un socio por ID

## DELETE

/api/socio/:id

Path: :id

Borrado lógico (Desactiva al socio cambiando activo: false)

## PATCH

/api/socio/:id/restore

Path: :id

Revierte la baja lógica del socio (activo: true)

Módulo de Transacciones (P2)

Método

Endpoint

Parámetros

Descripción

## POST

/api/transaccion

Body (JSON)

Registra el log de una nueva traducción

## GET

/api/transaccion

Ninguno

Recupera el histórico de transacciones totales

## GET

/api/transaccion/email

Query: ?email=xxx

Filtra el histórico de traducciones asociadas al email de un cliente

## GET

/api/transaccion/idioma/:idioma

Path: :idioma

Filtra transacciones cuyo idioma de origen coincide con el parámetro

Módulo de Empleados y Publicaciones (P3)

Método

Endpoint

Parámetros

Descripción

## POST

/api/empleado

Body (JSON)

Registra un nuevo Empleado

## GET

/api/empleado

Ninguno

Lista todos los empleados

## GET

/api/empleado/:id

Path: :id

Obtiene la ficha de un empleado por ID

## DELETE

/api/empleado/:id

Path: :id

Borrado lógico de un empleado

## PATCH

/api/empleado/:id/restore

Path: :id

Restaura a un empleado inhabilitado

## POST

/api/publicacion

Body (JSON)

Publica un post (referenciando empleadoId)

## GET

/api/publicacion

Ninguno

Lista publicaciones incluyendo información embebida de su Empleado creador

## PUT

/api/publicacion/:id

Path: :id | Body

Actualiza el contenido/título de una publicación

## DELETE

/api/publicacion/:id

Path: :id

Elimina lógicamente la publicación

## PATCH

/api/publicacion/:id/restore

Path: :id

Restaura la publicación inactiva

## GET

/api/publicacion/buscar

Query: ?titulo=t&vigencia=b

Ejecuta una búsqueda combinada donde el título no requiere coincidencia exacta

## Fórmula para la Búsqueda Combinada (P3):

El motor aplica un filtrado relacional definido de la siguiente forma:


\text{Resultado} = \left\{ p \in \text{Publicaciones} \ \middle|\ \text{p.titulo} \ \text{ILIKE} \ \%t\% \ \land \ \text{p.vigente} = b \right\}


Instalación, Despliegue y Primeros Pasos

1. Clonar e Instalar Dependencias

## Instale el árbol de dependencias necesarias del motor:

npm install

2. Configurar Base de Datos (.env)

Establezca las credenciales de PostgreSQL en la raíz del backend creando un archivo .env:

## PORT=3001
DB_NAME=postgres_tp5
DB_USER=postgres
DB_PASSWORD=tu_contrasenia_aqui
## DB_HOST=127.0.0.1

3. Generar Especificación de OpenAPI (Swagger)

Para compilar y sincronizar las descripciones analizadas de las rutas en el archivo estático JSON de Swagger:

npm run swagger

4. Lanzar Servidor en Modo de Desarrollo

Arranca el motor de Express integrado con Nodemon para monitorear cambios en caliente:

npm run dev

Estrategias de Validación e Inspección

Para facilitar la corrección y evaluación interactiva de este proyecto, la cátedra dispone de dos herramientas robustas:

Alternativa A: Swagger UI (Documentación Interactiva)

Inicie el servidor y acceda directamente desde un navegador web:
[http://localhost:3000/api/docs](http://localhost:3000/api/docs)

## Esta consola autogenerada permite:

Visualizar los esquemas e interfaces JSON esperadas por cada modelo.

Interactuar en vivo presionando el botón "Try it out", enviar parámetros y procesar respuestas en tiempo real desde la propia base de datos física.

Alternativa B: Colecciones de Postman (Recomendado)

Dentro del directorio /postman de este proyecto se han adjuntado los archivos que componen las pruebas unitarias y de integración de cada módulo:

Abra su cliente de Postman.

Presione el botón Import ubicado en el panel superior izquierdo.

## Arrastre o cargue los archivos dentro de la carpeta:

api-socio.postman_collection.json

api-transacciones.postman_collection.json

api-empleados.postman_collection.json

api-publicaciones.postman_collection.json

Se crearán automáticamente cuatro colecciones completamente estructuradas listas para enviar solicitudes, con payloads pre-configurados que aseguran la consistencia técnica de las pruebas de backend.