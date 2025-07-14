

# Kanban Board Full-Stack

<p align="center">
  Un tablero Kanban completo con backend NestJS y frontend React.
</p>

---

### 🚀 Cómo Empezar

Necesitas **Node.js** (v18+), **npm** y **MongoDB**.

1.  **Clona el proyecto:**

    ```bash
    git clone [https://github.com/tu-usuario/nombre-del-repo.git](https://github.com/tu-usuario/nombre-del-repo.git)
    cd nombre-del-repo
    ```

2.  **Configura el Backend:**

    Navega a `kanban-backend`:
    ```bash
    cd kanban-backend
    ```
    Crea `.env` (copia `.env.template` si existe) y añade:
    ```env
    DATABASE_URL=tu_url_de_conexion_mongodb
    JWT_SECRET=tu_secreto_jwt_seguro_y_largo
    ```
    Instala y arranca:
    ```bash
    npm install
    npm run start:dev
    ```

3.  **Configura el Frontend:**

    Abre otra terminal y navega a `kanban-frontend`:
    ```bash
    cd ../kanban-frontend
    ```
    Instala y arranca:
    ```bash
    npm install
    npm run dev
    ```

---

### 👨‍💻 Uso

1.  Abre `http://localhost:5173`.
2.  Regístrate o inicia sesión.
3.  Empieza a usar el tablero: crea, mueve y elimina tareas.
4.  Prueba la colaboración en tiempo real abriendo otra pestaña.
