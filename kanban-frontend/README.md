
# Kanban Board Frontend (React + Vite)

Este es el componente de frontend de la aplicación Kanban Board, construido con React y Vite. Proporciona la interfaz de usuario interactiva para gestionar tableros Kanban, comunicarse con el backend a través de la API REST y WebSockets, y ofrecer una experiencia de usuario en tiempo real con autenticación y notificaciones.

---

## 🚀 Tecnologías Clave

* **React**: Librería JavaScript para construir interfaces de usuario interactivas.
* **Vite**: Un *build tool* y *dev server* de próxima generación que ofrece una experiencia de desarrollo frontend extremadamente rápida.
* **TypeScript**: Añade tipado estático a JavaScript, mejorando la robustez y mantenibilidad del código.
* **Tailwind CSS**: Un *framework* CSS de primera utilidad que permite construir diseños personalizados rápidamente directamente en tu marcado.
* **`react-router-dom`**: Para la gestión de rutas declarativa en tu aplicación React.
* **`axios`**: Cliente HTTP basado en promesas para realizar peticiones al API REST del backend.
* **`socket.io-client`**: La librería cliente de Socket.io para establecer y gestionar la conexión WebSocket con el backend.
* **React Context API**: Utilizada para la gestión global del estado de autenticación (usuario y token JWT).
* **`@hello-pangea/dnd`**: Librería para implementar la funcionalidad de arrastrar y soltar (Drag and Drop) en el tablero.
* **`uuid`**: Para generar identificadores únicos (UUIDs) para elementos como las notificaciones.

---

## 🛠️ Configuración y Ejecución

Sigue estos pasos para poner en marcha la aplicación frontend en tu entorno local.

### 1. Requisitos Previos

Antes de continuar, asegúrate de que el **backend esté corriendo y accesible** en `http://localhost:3000`. Si no es así, por favor, consulta el `README.md` en la carpeta `kanban-backend` para configurarlo primero.

Además, necesitas tener instalado:

* **Node.js** (versión 18 o superior).
* **npm** (Node Package Manager).

### 2. Instalación de Dependencias

Navega a la carpeta `kanban-frontend` en tu terminal y ejecuta el siguiente comando para instalar todas las dependencias del proyecto:

```bash
npm install


3. Ejecución del Cliente
Una vez instaladas las dependencias, puedes iniciar el servidor de desarrollo del frontend:

Bash

npm run dev
Vite iniciará el servidor de desarrollo y abrirá la aplicación en tu navegador predeterminado (generalmente en http://localhost:5173). Si no se abre automáticamente, visita esa URL en tu navegador.

🚀 Uso del Frontend
Una vez que la aplicación se cargue en tu navegador:

Página de Autenticación: Serás redirigido automáticamente a la página de login/registro.

Puedes registrar una nueva cuenta si no tienes una.

Luego, inicia sesión con tus credenciales.

Tablero Kanban: Tras un inicio de sesión exitoso, accederás al tablero.

Crear y Gestionar: Añade nuevas columnas y tarjetas, edítalas y elimínalas.

Arrastrar y Soltar: Reorganiza tus tareas fácilmente moviendo tarjetas entre columnas o reordenándolas. También puedes reordenar columnas completas.

Colaboración en Tiempo Real:

Si abres la aplicación en una segunda pestaña o en otro navegador e inicias sesión (con el mismo usuario o uno diferente), verás que los cambios que realices en una pestaña se reflejan instantáneamente en la otra.

Utiliza el botón "Notifications" en la parte superior para ver un registro de los cambios recientes realizados en el tablero (incluyendo los de otros usuarios). Puedes marcar las notificaciones como leídas para eliminarlas de la lista.
