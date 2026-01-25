import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret_key';

// Interface extendida como request para poder añadir user
export interface AuthRequest extends Request {
    user?: {
        userId: number;
        email: string;
    };
}

export const authenticateToken = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): void => {
    const authHeader = req.headers['authorization'];    // Extraemos el token del header authorization
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
        res.status(401).json({ error: 'Token no proporcionado' });
        return;
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {   // Verificamos el token
        if (err) {
        res.status(403).json({ error: 'Token inválido o expirado' });
        return;
        }

        req.user = decoded as { userId: number; email: string };// Si es valido añade los datos de usuario a req.user
        next();
    });
};