import type { Request, Response } from 'express';
import { Op } from 'sequelize';
import { Usuario } from '../models/Usuario.js';

export const getUsuarios = async (req: Request, res: Response) => {
    try {
        let page = 1;
        if (req.query.page) {
            page = Number(req.query.page);
        }

        let limit = 10;
        if (req.query.limit) {
            limit = Number(req.query.limit);
        }

        let sortBy = 'id_usuario';
        if (req.query.sortBy) {
            sortBy = String(req.query.sortBy);
        }

        let order = 'DESC';
        if (req.query.order && String(req.query.order).toUpperCase() === 'ASC') {
            order = 'ASC';
        }

        const offset = (page - 1) * limit;
        const where: Record<string, unknown> = {};

        if (req.query.search) {
            const search = String(req.query.search);
            where[Op.or as unknown as string] = [
                { usuario: { [Op.iLike]: `%${search}%` } },
                { rol: { [Op.iLike]: `%${search}%` } },
            ];
        }

        const { count, rows } = await Usuario.findAndCountAll({
            where,
            limit,
            offset,
            order: [[sortBy, order]],
            attributes: { exclude: ['contrasena'] },
        });

        res.status(200).json({
            msg: 'Ok',
            code: 200,
            total: count,
            page,
            limit,
            data: rows,
        });
    } catch (error) {
            res.status(500).json({
            msg: 'Error al obtener los usuarios',
            code: 500,
            error,
        });
    }
};

export const getUsuarioById = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const usuario = await Usuario.findByPk(id, {
            attributes: { exclude: ['contrasena'] },
        });

        if (!usuario) {
            res.status(404).json({
                msg: 'Usuario no encontrado',
                code: 404,
            });
            return;
        }

        res.status(200).json({
            msg: 'Ok',
            code: 200,
            data: usuario,
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Error al obtener el usuario',
            code: 500,
            error,
        });
    }
};

export const createUsuario = async (req: Request, res: Response) => {
    try {
        const { usuario, contrasena, rol } = req.body;

        if (!usuario || !contrasena || !rol) {
            res.status(400).json({
                msg: 'Faltan campos obligatorios (usuario, contrasena, rol)',
                code: 400,
            });
            return;
        }

        const nuevoUsuario = await Usuario.create({
            usuario,
            contrasena,
            rol,
        });

        res.status(201).json({
            msg: 'Usuario creado correctamente',
            code: 201,
            data: {
                id_usuario: nuevoUsuario.getDataValue('id_usuario'),
                usuario: nuevoUsuario.getDataValue('usuario'),
                rol: nuevoUsuario.getDataValue('rol'),
            },
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Error al crear el usuario',
            code: 500,
            error,
        });
    }
};

export const updateUsuario = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const usuarioExistente = await Usuario.findByPk(id);

        if (!usuarioExistente) {
            res.status(404).json({
                msg: 'Usuario no encontrado',
                code: 404,
            });
            return;
        }

        const { usuario, contrasena, rol } = req.body;
        await usuarioExistente.update({ usuario, contrasena, rol });

        res.status(200).json({
            msg: 'Usuario actualizado correctamente',
            code: 200,
            data: {
                id_usuario: usuarioExistente.getDataValue('id_usuario'),
                usuario: usuarioExistente.getDataValue('usuario'),
                rol: usuarioExistente.getDataValue('rol'),
            },
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Error al actualizar el usuario',
            code: 500,
            error,
        });
    }
};

export const deleteUsuario = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const usuarioExistente = await Usuario.findByPk(id);

        if (!usuarioExistente) {
            res.status(404).json({
                msg: 'Usuario no encontrado',
                code: 404,
            });
            return;
        }

        await usuarioExistente.destroy();

        res.status(200).json({
            msg: 'Usuario eliminado correctamente',
            code: 200,
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Error al eliminar el usuario',
            code: 500,
            error,
        });
    }
};