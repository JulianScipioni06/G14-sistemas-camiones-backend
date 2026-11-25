import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({
            msg: 'Acceso denegado: token no proporcionado',
            code: 401,
        });
        return;
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        res.status(401).json({
            msg: 'Acceso denegado: token no proporcionado',
            code: 401,
        });
        return;
    }

    let secret = 'clave_super_secreta_g14_2026';
    if (process.env.JWT_SECRET) {
        secret = process.env.JWT_SECRET;
    }

    try {
        const decoded = jwt.verify(token, secret);
        (req as Request & { user?: unknown }).user = decoded;
        next();
    } catch {
        res.status(401).json({
            msg: 'Token inválido o expirado',
            code: 401,
        });
    }
};