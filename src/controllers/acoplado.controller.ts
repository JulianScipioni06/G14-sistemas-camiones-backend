import type { Request, Response } from 'express';
import { Op, UniqueConstraintError, ForeignKeyConstraintError } from 'sequelize';
import { Acoplado } from '../models/Acoplado.js';

export const getAcoplados = async (req: Request, res: Response) => {
    try {
        let page = Number(req.query.page);
        if (!Number.isInteger(page) || page < 1) {
            page = 1;
        }

        let limit = Number(req.query.limit);
        if (!Number.isInteger(limit) || limit < 1) {
            limit = 10;
        }
        if (limit > 100) {
            limit = 100;
        }

        let sortBy = 'id_acoplado';
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
                { patente: { [Op.iLike]: `%${search}%` } },
                { tipo: { [Op.iLike]: `%${search}%` } },
            ];
        }

        const { count, rows } = await Acoplado.findAndCountAll({
            where,
            limit,
            offset,
            order: [[sortBy, order]],
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
        console.error(error);
        res.status(500).json({
            msg: 'Error al obtener los acoplados',
            code: 500,
        });
    }
};

export const getAcopladoById = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const acoplado = await Acoplado.findByPk(id);

        if (!acoplado) {
            res.status(404).json({
                msg: 'Acoplado no encontrado',
                code: 404,
            });
            return;
        }

        res.status(200).json({
            msg: 'Ok',
            code: 200,
            data: acoplado,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error al obtener el acoplado',
            code: 500,
        });
    }
};

export const createAcoplado = async (req: Request, res: Response) => {
    try {
        const {
            patente,
            tipo,
            capacidad,
            tara,
            estado,
            vencimiento_vtv,
            vencimiento_seguro,
        } = req.body;

        if (
            !patente ||
            !tipo ||
            capacidad === undefined ||
            tara === undefined ||
            !estado ||
            !vencimiento_vtv ||
            !vencimiento_seguro
        ) {
            res.status(400).json({
                msg: 'Faltan campos obligatorios (patente, tipo, capacidad, tara, estado, vencimiento_vtv, vencimiento_seguro)',
                code: 400,
            });
            return;
        }

        const nuevoAcoplado = await Acoplado.create({
            patente,
            tipo,
            capacidad,
            tara,
            estado,
            vencimiento_vtv,
            vencimiento_seguro,
        });

        res.status(201).json({
            msg: 'Acoplado creado correctamente',
            code: 201,
            data: nuevoAcoplado,
        });
    } catch (error) {
        if (error instanceof UniqueConstraintError) {
            res.status(409).json({
                msg: 'Ya existe un acoplado con esa patente',
                code: 409,
            });
            return;
        }

        console.error(error);
        res.status(500).json({
            msg: 'Error al crear el acoplado',
            code: 500,
        });
    }
};

export const updateAcoplado = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const acopladoExistente = await Acoplado.findByPk(id);

        if (!acopladoExistente) {
            res.status(404).json({
                msg: 'Acoplado no encontrado',
                code: 404,
            });
            return;
        }

        const {
            patente,
            tipo,
            capacidad,
            tara,
            estado,
            vencimiento_vtv,
            vencimiento_seguro,
        } = req.body;

        await acopladoExistente.update({
            patente,
            tipo,
            capacidad,
            tara,
            estado,
            vencimiento_vtv,
            vencimiento_seguro,
        });

        res.status(200).json({
            msg: 'Acoplado actualizado correctamente',
            code: 200,
            data: acopladoExistente,
        });
    } catch (error) {
        if (error instanceof UniqueConstraintError) {
            res.status(409).json({
                msg: 'Ya existe un acoplado con esa patente',
                code: 409,
            });
            return;
        }

        console.error(error);
        res.status(500).json({
            msg: 'Error al actualizar el acoplado',
            code: 500,
        });
    }
};

export const deleteAcoplado = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const acopladoExistente = await Acoplado.findByPk(id);

        if (!acopladoExistente) {
            res.status(404).json({
                msg: 'Acoplado no encontrado',
                code: 404,
            });
            return;
        }

        await acopladoExistente.destroy();

        res.status(200).json({
            msg: 'Acoplado eliminado correctamente',
            code: 200,
        });
    } catch (error) {
        if (error instanceof ForeignKeyConstraintError) {
            res.status(409).json({
                msg: 'No se puede eliminar: el acoplado tiene registros asociados',
                code: 409,
            });
            return;
        }

        console.error(error);
        res.status(500).json({
            msg: 'Error al eliminar el acoplado',
            code: 500,
        });
    }
};