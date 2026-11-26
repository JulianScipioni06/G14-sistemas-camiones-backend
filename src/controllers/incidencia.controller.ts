import type { Request, Response } from 'express';
import { Op } from 'sequelize';
import { Incidencia } from '../models/Incidencia.js';
import type { IncidenciaRequest } from '../middlewares/incidencia.middleware.js';

export const getIncidencias = async (req: Request, res: Response) => {
    try {
        let page = 1;
        if (req.query.page) {
            page = Number(req.query.page);
        }

        let limit = 10;
        if (req.query.limit) {
            limit = Number(req.query.limit);
        }

        let sortBy = 'id_incidencia';
        if (req.query.sortBy) {
            sortBy = String(req.query.sortBy);
        }

        let order = 'DESC';
        if (req.query.order && String(req.query.order).toUpperCase() === 'ASC') {
            order = 'ASC';
        }

        const offset = (page - 1) * limit;
        const where: Record<string, unknown> = {};

        if (req.query.id_viaje) {
            where.id_viaje = Number(req.query.id_viaje);
        }

        if (req.query.search) {
            const search = String(req.query.search);
            where.descripcion = { [Op.iLike]: `%${search}%` };
        }

        const { count, rows } = await Incidencia.findAndCountAll({
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
        res.status(500).json({
            msg: 'Error al obtener las incidencias',
            code: 500,
            error,
        });
    }
};

export const getIncidenciaById = (req: IncidenciaRequest, res: Response) => {
    res.status(200).json({
        msg: 'Ok',
        code: 200,
        data: req.incidencia,
    });
};

export const createIncidencia = async (req: Request, res: Response) => {
    try {
        const { descripcion, fecha_hora, id_viaje } = req.body;

        const nuevaIncidencia = await Incidencia.create({
            descripcion,
            fecha_hora,
            id_viaje,
        });

        res.status(201).json({
            msg: 'Incidencia creada correctamente',
            code: 201,
            data: nuevaIncidencia,
        });
    } catch (error) {
        const err = error as { name?: string };
            if (err.name === 'SequelizeForeignKeyConstraintError') {
            res.status(400).json({
                msg: 'El viaje especificado no existe',
                code: 400,
            });
            return;
        }

        res.status(500).json({
            msg: 'Error al crear la incidencia',
            code: 500,
            error,
        });
    }
};

export const updateIncidencia = async (req: IncidenciaRequest, res: Response) => {
    try {
        const incidenciaExistente = req.incidencia!;
        const { descripcion, fecha_hora, id_viaje } = req.body;

        await incidenciaExistente.update({
            descripcion,
            fecha_hora,
            id_viaje,
        });

        res.status(200).json({
            msg: 'Incidencia actualizada correctamente',
            code: 200,
            data: incidenciaExistente,
        });
    } catch (error) {
        const err = error as { name?: string };
        if (err.name === 'SequelizeForeignKeyConstraintError') {
            res.status(400).json({
                msg: 'El viaje especificado no existe',
                code: 400,
            });
            return;
        }

        res.status(500).json({
            msg: 'Error al actualizar la incidencia',
            code: 500,
            error,
        });
    }
};

export const deleteIncidencia = async (req: IncidenciaRequest, res: Response) => {
    try {
        await req.incidencia!.destroy();

        res.status(200).json({
            msg: 'Incidencia eliminada correctamente',
            code: 200,
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Error al eliminar la incidencia',
            code: 500,
            error,
        });
    }
};