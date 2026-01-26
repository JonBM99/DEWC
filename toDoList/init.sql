-- ===========================================
-- Crear tabla de usuarios
-- ===========================================
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- ===========================================
-- Crear tabla de tareas
-- ===========================================
CREATE TABLE IF NOT EXISTS tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status ENUM('pending', 'in_progress', 'done') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ===========================================
-- Usuario inicial
-- Contraseña: 123456 (bcrypt hash)
-- ===========================================
INSERT INTO users (name, email, password)
VALUES ('admin', 'admin@example.com', '$2b$10$KIX/3Rpp1uYtDl0kTZsA1uV4WOTxCeZkG1U39xlPR3jV1jz2s2daK');

-- ===========================================
-- Tareas de ejemplo para el usuario admin
-- ===========================================
INSERT INTO tasks (user_id, title, description, status)
VALUES 
(1, 'Comprar leche', 'Ir al supermercado a comprar leche', 'pending'),
(1, 'Aprender Angular', 'Seguir tutoriales de Angular v21', 'in_progress'),
(1, 'Hacer ejercicio', '30 minutos de cardio', 'done');
