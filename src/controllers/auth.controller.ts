import type { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Usuario } from '../models/Usuario.js';

export const login = async (req: Request, res: Response) => {
    try {
        const { usuario, contrasena } = req.body;

        if (!usuario || !contrasena) {
            res.status(400).json({
                msg: 'Debe ingresar usuario y contraseña',
                code: 400,
            });
            return;
        }

        const usuarioEncontrado = await Usuario.findOne({ where: { usuario } });

        if (!usuarioEncontrado) {
            res.status(401).json({
                msg: 'Credenciales inválidas',
                code: 401,
            });
            return;
        }

        const passwordGuardada = String(usuarioEncontrado.getDataValue('contrasena'));
        const esValida = await bcrypt.compare(contrasena, passwordGuardada);

        if (!esValida) {
            res.status(401).json({
                msg: 'Credenciales inválidas',
                code: 401,
            });
            return;
        }

        const idUsuario = usuarioEncontrado.getDataValue('id_usuario');
        const rolUsuario = usuarioEncontrado.getDataValue('rol');

        let secret = 'clave_super_secreta_g14_2026';
        if (process.env.JWT_SECRET) {
            secret = process.env.JWT_SECRET;
        }

        const token = jwt.sign(
            { id_usuario: idUsuario, usuario, rol: rolUsuario },
            secret,
            { expiresIn: '8h' }
        );

        res.status(200).json({
            msg: 'Login exitoso',
            code: 200,
            data: {
                token,
                usuario: {
                    id_usuario: idUsuario,
                    usuario,
                    rol: rolUsuario,
                },
            },
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Error interno al iniciar sesión',
            code: 500,
            error,
        });
    }
};