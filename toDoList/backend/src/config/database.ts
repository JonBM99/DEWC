import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

// Conexión
export const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Convertir a promesas para poder usar async/await
export const dbPromise = db.promise();

// Verificar conexión
db.getConnection((err, connection) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err.message);
    } else {
        console.log('Conexión a MySQL establecida');
        connection.release();
    }
});