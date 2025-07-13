

Proyecto Kanban Board Full-Stack
Este es un proyecto completo de una aplicación Kanban Board que incluye un backend robusto en NestJS (Node.js) con MongoDB y WebSockets, y un frontend interactivo en React (Vite) con TypeScript y Tailwind CSS. Permite a múltiples usuarios registrarse, iniciar sesión, y colaborar en un tablero compartiendo columnas y tarjetas, con actualizaciones en tiempo real y notificaciones entre usuarios.

🚀 Características Destacadas
Backend (NestJS)
Autenticación JWT Segura: Gestión de usuarios con registro e inicio de sesión protegidos por JSON Web Tokens.

Autorización Basada en Roles: Control de acceso a las rutas para asegurar la privacidad de los datos.

MongoDB Persistente: Almacenamiento eficiente de columnas y tarjetas en una base de datos NoSQL.

WebSockets en Tiempo Real: Sincronización instantánea del estado del tablero entre todos los usuarios conectados.

Validación de Datos Sólida: Protección contra datos inválidos o maliciosos.

API RESTful Completa: Operaciones CRUD para columnas y tarjetas, incluyendo movimientos avanzados de arrastrar y soltar.

Frontend (React + Vite)
Experiencia de Usuario Moderna: Desarrollado con React, TypeScript y Vite para un rendimiento y DX (Developer Experience) óptimos.

Estilo Atractivo con Tailwind CSS: Diseño rápido y personalizable para una interfaz limpia.

Navegación Intuitiva: Gestión de rutas con react-router-dom para una experiencia de usuario fluida.

Colaboración en Vivo: Comunicación WebSocket para ver los cambios de otros usuarios al instante.

Notificaciones Persistentes: Un sistema de notificaciones que permite a los usuarios ver los mensajes de cambios recientes y marcarlos como leídos.

Interfaz Interactiva: Funcionalidad de arrastrar y soltar (Drag and Drop) para reorganizar fácilmente columnas y tarjetas.

🛠️ Requisitos Previos
Antes de configurar el proyecto, asegúrate de tener instalados los siguientes programas en tu sistema:

Node.js: Versión 18 o superior recomendada.

npm: El gestor de paquetes de Node.js, incluido con Node.js.

MongoDB: Puedes instalar una instancia local (MongoDB Community Server) o, para una configuración más rápida y en la nube, usar MongoDB Atlas.

Git: Para clonar el repositorio.

📦 Configuración del Proyecto
Sigue estos pasos para poner en marcha tanto el backend como el frontend de la aplicación.

1. Clonar el Repositorio
Primero, clona este repositorio en tu máquina local:

Bash

git clone https://github.com/tu-usuario/nombre-del-repo.git
cd nombre-del-repo # Navega a la carpeta raíz del proyecto
(Nota: Reemplaza https://github.com/tu-usuario/nombre-del-repo.git con la URL real de tu repositorio y nombre-del-repo con el nombre de tu carpeta de proyecto).

2. Configuración del Backend
Navega a la carpeta del backend (kanban-backend):

Bash

cd kanban-backend
2.1. Variables de Entorno
Crea un archivo .env en la raíz de la carpeta kanban-backend y añade las siguientes variables:

Fragmento de código

# URL de conexión a tu base de datos MongoDB
# Ejemplo local: mongodb://localhost:27017/kanban_db_auth
# Ejemplo Atlas: mongodb+srv://<user>:<password>@cluster.mongodb.net/kanban_db_auth?retryWrites=true&w=majority
DATABASE_URL=tu_url_de_conexion_mongodb

# Secreto para firmar y verificar los JWT. ¡Cámbialo por una cadena larga, compleja y aleatoria!
JWT_SECRET=tu_secreto_jwt_muy_seguro_y_aleatorio_aqui!@#$12345
2.2. Instalar Dependencias y Ejecutar
Bash

npm install
npm run start:dev
El backend se iniciará en modo desarrollo, escuchando en http://localhost:3000.

3. Configuración del Frontend
Abre una nueva terminal. Desde la raíz del proyecto, navega a la carpeta del frontend (kanban-frontend):

Bash

cd ../kanban-frontend # O si ya estás en la raíz del proyecto, solo: cd kanban-frontend
3.1. Instalar Dependencias y Ejecutar
Bash

npm install
npm run dev
El frontend se iniciará y se abrirá automáticamente en tu navegador (generalmente en http://localhost:5173).

🚀 Uso de la Aplicación
Acceder: Abre tu navegador y navega a http://localhost:5173.

Registro / Login: La aplicación te redirigirá a la página de registro/inicio de sesión.

Regístrate con un nuevo email, nombre de usuario y contraseña.

Una vez registrado, inicia sesión con tus credenciales.

Tablero Kanban: Tras iniciar sesión, accederás al tablero.

Crea nuevas columnas y tarjetas.

Arrastra y suelta tarjetas entre columnas o dentro de la misma columna para reordenarlas.

Edita y elimina tarjetas o columnas.

Colaboración en Tiempo Real:

Abre una segunda pestaña del navegador (o un navegador diferente) e inicia sesión con el mismo usuario o con uno distinto.

Realiza cambios en una de las pestañas (ej. añade una tarjeta). Observa cómo los cambios se reflejan instantáneamente en la otra pestaña.

Haz clic en el botón "Notifications" en la parte superior derecha para ver la lista de notificaciones de cambios recientes y marcarlas como leídas.

📂 Estructura del Proyecto
.KANBN BOARDFULL-STACK
├── kanban-backend/                  # Repositorio del Backend (NestJS)
│   ├── src/                         # Código fuente del backend
│   ├── .env.example                 # Plantilla para las variables de entorno
│   ├── package.json                 # Dependencias y scripts del backend
│   └── README.md                    # Documentación específica del backend (próximamente)
│
└── kanban-frontend/                 # Repositorio del Frontend (React/Vite)
    ├── src/                         # Código fuente del frontend
    │   ├── auth/                    # Lógica y contexto de autenticación
    │   ├── components/              # Componentes de UI reutilizables
    │   ├── pages/                   # Páginas principales de la aplicación
    │   ├── types/                   # Definiciones de tipos para TypeScript
    │   ├── App.tsx                  # Componente principal de la aplicación y rutas
    │   └── index.css                # Estilos globales y personalizados
    ├── public/                      # Archivos estáticos (ej. Fondo2.png)
    │   └── Fondo2.png
    ├── package.json                 # Dependencias y scripts del frontend
    └── README.md                    # Documentación específica del frontend (próximamente)
🤝 Contacto
Si tienes alguna pregunta, sugerencia o encuentras algún problema, no dudes en abrir un issue en este repositorio.