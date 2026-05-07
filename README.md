# Gestor de Tareas - Parcial 1 Prog 3

## Requisitos Previos

- **Node.js**
- **MySQL**

---

## 1. Configuración de la Base de Datos

El backend usa una base de datos llamada `parcial_prog3`. 

1. Crea una base de datos llamada `parcial_prog3`.
2. Crea las tablas `Tareas` y `Categorias`.

```sql
CREATE DATABASE IF NOT EXISTS parcial_prog3;
USE parcial_prog3;

CREATE TABLE Categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

CREATE TABLE Tareas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    categoriaId INT,
    fechaVencimiento DATE,
    estado INT DEFAULT 0, -- 0 = Pendiente, 1 = Completada
    FOREIGN KEY (categoriaId) REFERENCES Categorias(id)
);
```

---

## 2. Configuración del Backend

```bash
cd api
npm install
npm run dev
```

---

## 3. Configuración del Frontend

```bash
cd frontend
npm install
npm run dev
```

El backend usa el puerto 3000 y el frontend el puerto 5173.
