

# Kanban Board Backend (NestJS)

Este es el componente de backend para la aplicación Kanban Board. Desarrollado con NestJS, proporciona la API RESTful para la gestión de datos (columnas y tarjetas), autenticación de usuarios con JWT, y comunicación en tiempo real a través de WebSockets para la sincronización del tablero.

---

## 🚀 Tecnologías Clave

* **NestJS**: Un framework progresivo de Node.js que sigue patrones de diseño robustos como el de módulos, controladores y servicios.
* **TypeScript**: Mejora la calidad del código y la detección de errores con tipado estático.
* **MongoDB**: Base de datos NoSQL utilizada para almacenar la información de columnas y tarjetas.
* **Mongoose**: Librería de modelado de objetos (ODM) para MongoDB en Node.js, facilitando la interacción con la base de datos.
* **JWT (JSON Web Tokens)**: Implementado para una autenticación segura y un control de acceso basado en tokens.
* **Passport.js**: Middleware de autenticación modular para Node.js, integrado con JWT para la protección de rutas.
* **Socket.io**: Habilita la comunicación bidireccional en tiempo real (WebSockets) para mantener todos los clientes sincronizados.
* **Dotenv**: Gestiona las variables de entorno para una configuración flexible y segura.

---

## 🛠️ Configuración y Ejecución

Sigue estos pasos para poner en marcha el servidor de backend en tu entorno local.

### 1. Requisitos Previos

Asegúrate de tener instalado lo siguiente en tu sistema:

* **Node.js** (versión 18 o superior).
* **npm** (Node Package Manager, se instala con Node.js).
* **MongoDB**: Necesitarás una instancia de MongoDB accesible. Puedes usar:
    * Una instalación **local** de [MongoDB Community Server](https://www.mongodb.com/try/download/community).
    * Un servicio en la nube como [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (opción recomendada para empezar rápidamente).

### 2. Instalación de Dependencias

Navega a la carpeta `kanban-backend` en tu terminal y ejecuta el siguiente comando para instalar todas las dependencias del proyecto:

```bash
npm install


3. Variables de Entorno
Crea un archivo llamado .env en la raíz de la carpeta kanban-backend (kanban-backend/.env) y añade las siguientes variables:

Fragmento de código

# URL de conexión a tu base de datos MongoDB.
# Si usas MongoDB local: mongodb://localhost:27017/kanban_db_auth
# Si usas MongoDB Atlas: La cadena de conexión completa que te proporciona Atlas.
DATABASE_URL=tu_url_de_conexion_a_mongodb_aqui

# Secreto para firmar y verificar los JSON Web Tokens (JWT).
# Es CRUCIAL que uses una cadena larga, compleja y aleatoria para esto en producción.
JWT_SECRET=tu_secreto_jwt_seguro_y_largo_aqui
4. Ejecución del Servidor
Con las dependencias instaladas y las variables de entorno configuradas, puedes iniciar el servidor de backend en modo de desarrollo:

Bash

npm run start:dev
El servidor de NestJS se iniciará y estará escuchando en el puerto 3000. Verás un mensaje en tu consola indicando que la aplicación está corriendo, similar a:

[Nest] ... Application is running on http://localhost:3000
🌐 Endpoints de la API
El backend expone los siguientes endpoints principales:

Autenticación
POST /auth/signup: Registra un nuevo usuario en el sistema.

POST /auth/signin: Inicia sesión con credenciales existentes y devuelve un JWT para futuras solicitudes autenticadas.

Columnas (Requiere Autenticación JWT)
GET /columns: Obtiene una lista de todas las columnas.

POST /columns: Crea una nueva columna.

PATCH /columns/:id: Actualiza una columna existente por su ID.

DELETE /columns/:id: Elimina una columna por su ID (también elimina las tarjetas asociadas).

Tarjetas (Requiere Autenticación JWT)
GET /cards: Obtiene una lista de todas las tarjetas.

POST /cards: Crea una nueva tarjeta.

PATCH /cards/:id: Actualiza una tarjeta existente por su ID.

DELETE /cards/:id: Elimina una tarjeta por su ID.

PATCH /cards/:id/move: Mueve una tarjeta a una nueva columna o actualiza su orden dentro de la misma columna.

⚡ WebSockets (Tiempo Real)
El servidor WebSocket (Socket.io) se ejecuta en el mismo puerto que la API REST (http://localhost:3000). Se requiere un token JWT válido para establecer una conexión WebSocket autenticada.

Los clientes conectados recibirán actualizaciones en tiempo real sobre los siguientes eventos:

cardAdded: Cuando se crea una nueva tarjeta.

cardUpdated: Cuando una tarjeta existente es modificada.

cardDeleted: Cuando una tarjeta es eliminada.

boardCardsUpdated: Cuando se mueve una tarjeta, indicando el nuevo estado de todas las tarjetas.

columnAdded: Cuando se crea una nueva columna.

columnUpdated: Cuando una columna existente es modificada.

columnDeleted: Cuando una columna es eliminada.