import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from '../config/database';
import { UserRegister, UserLogin } from '../models/userModel';

const JWT_SECRET = process.env.JWT_SECRET || 'secret_key';

// Registrar usuario
export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, password }: UserRegister = req.body;
        if (!name || !email || !password) { // Validaciones
        res.status(400).json({ error: 'Todos los campos son obligatorios' });
        return;
    }
    // Verificar si el email ya existe
    db.query('SELECT id FROM users WHERE email = ?', [email], async (err, results: any) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (results.length > 0) {
            res.status(409).json({ error: 'El email ya está registrado' }); // Si exite error 409 y return
            return;
        }
        // Hash de la contraseña
        const hashedPassword = await bcrypt.hash(password, 10); // Encriptamos la contraseña
        // Insertar usuario
        const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
        db.query(query, [name, email, hashedPassword], (err, result: any) => {
            if (err) {
            res.status(500).json({ error: err.message });
            return;
            }
        const token = jwt.sign( // Generamos el bearer token
            { userId: result.insertId, email },
            JWT_SECRET,
            { expiresIn: '7d' } // Puedo ponerlo asi en vez de en segundos
        );
        res.status(201).json({
            message: 'Usuario registrado exitosamente',
            token,
            user: {
                id: result.insertId,
                name,
                email
            }
            });
        });
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
// Login de usuario
export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        // Verificamos que esta poniendo todos los campos
        const { email, password }: UserLogin = req.body;
        if (!email || !password) {
        res.status(400).json({ error: 'El email y la contraseña son obligatorios' });
        return;
        }
        const query = 'SELECT * FROM users WHERE email = ?';
        db.query(query, [email], async (err, results: any) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (results.length === 0) {
            res.status(401).json({ error: 'Credenciales inválidas' });
            return;
        }
        const user = results[0];
        // Verificamos la contraseña
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            res.status(401).json({ error: 'Credenciales inválidas' });
            return;
        }
        // Generamos el bearer token
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            JWT_SECRET,
            { expiresIn: '7d' }
        );
        res.json({
            message: 'Login',
            token,
            user: {
            id: user.id,
            name: user.name,
            email: user.email
            }
        });
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
    };
    // Obtener usuario actual
    export const getMe = (req: Request, res: Response): void => {
    const authReq = req as any; 
    const query = 'SELECT id, name, email FROM users WHERE id = ?';
    db.query(query, [authReq.user.userId], (err, results: any) => {
        if (err) {
        res.status(500).json({ error: err.message });
        return;
        }

        if (results.length === 0) {
        res.status(404).json({ error: 'Usuario no encontrado' });
        return;
        }
        res.json(results[0]);
    });
};