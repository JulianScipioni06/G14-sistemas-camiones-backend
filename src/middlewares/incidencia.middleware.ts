import type { Request, Response, NextFunction } from 'express';
import type { Model } from 'sequelize';
import { Incidencia } from '../models/Incidencia.js';

export interface IncidenciaRequest extends Request {
    incidencia?: Model;
}

export const validateIncidenciaId = async (
    req: IncidenciaRequest,
    res: Response,
    next: NextFunction
    ) => {
    const id = Number(req.params.id);

    if (isNaN(id) || id <= 0) {
        res.status(400).json({
            msg: 'El ID de la incidencia debe ser un número válido',
            code: 400,
        });
        return;
    }

    try {
        const incidencia = await Incidencia.findByPk(id);

        if (!incidencia) {
            res.status(404).json({
                msg: 'Incidencia no encontrada',
                code: 404,
            });
            return;
        }

        req.incidencia = incidencia;
        next();
    } catch (error) {
        res.status(500).json({
            msg: 'Error al verificar la incidencia',
            code: 500,
            error,
        });
    }
    };

    export const validateCreateIncidencia = (
    req: Request,
    res: Response,
    next: NextFunction
    ) => {
    const { descripcion, fecha_hora, id_viaje } = req.body;

    if (!descripcion || !fecha_hora || !id_viaje) {
        res.status(400).json({
            msg: 'Faltan campos obligatorios (descripcion, fecha_hora, id_viaje)',
            code: 400,
        });
        return;
    }

    if (typeof descripcion !== 'string' || descripcion.trim() === '') {
        res.status(400).json({
            msg: 'La descripción debe ser un texto válido',
            code: 400,
            });
        return;
    }

    if (isNaN(Date.parse(String(fecha_hora)))) {
        res.status(400).json({
            msg: 'fecha_hora debe tener un formato de fecha y hora válido',
            code: 400,
            });
        return;
    }

    if (isNaN(Number(id_viaje)) || Number(id_viaje) <= 0) {
        res.status(400).json({
            msg: 'id_viaje debe ser un número válido',
            code: 400,
            });
        return;
    }

    next();
    };

    export const validateUpdateIncidencia = (
    req: Request,
    res: Response,
    next: NextFunction
    ) => {
    const { descripcion, fecha_hora, id_viaje } = req.body;

    if (Object.keys(req.body).length === 0) {
        res.status(400).json({
            msg: 'Debe enviar al menos un campo para actualizar',
            code: 400,
        });
        return;
    }

    if (
        descripcion !== undefined &&
        (typeof descripcion !== 'string' || descripcion.trim() === '')
    ) {
        res.status(400).json({
            msg: 'La descripción debe ser un texto válido',
            code: 400,
        });
        return;
    }

    if (fecha_hora !== undefined && isNaN(Date.parse(String(fecha_hora)))) {
        res.status(400).json({
            msg: 'fecha_hora debe tener un formato de fecha y hora válido',
            code: 400,
        });
        return;
    }

    if (id_viaje !== undefined && (isNaN(Number(id_viaje)) || Number(id_viaje) <= 0)) {
        res.status(400).json({
            msg: 'id_viaje debe ser un número válido',
            code: 400,
        });
        return;
    }

    next();
};