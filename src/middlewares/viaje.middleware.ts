import type { Request, Response, NextFunction } from 'express';
import type { Model } from 'sequelize';
import { Viaje } from '../models/Viaje.js';

export interface ViajeRequest extends Request {
    viaje?: Model;
}

export const validateViajeId = async (
    req: ViajeRequest,
    res: Response,
    next: NextFunction
    ) => {
    const id = Number(req.params.id);

    if (isNaN(id) || id <= 0) {
        res.status(400).json({
            msg: 'El ID del viaje debe ser un número válido',
            code: 400,
        });
        return;
    }

    try {
        const viaje = await Viaje.findByPk(id);

        if (!viaje) {
            res.status(404).json({
                msg: 'Viaje no encontrado',
                code: 404,
            });
            return;
        }

        req.viaje = viaje;
        next();
    } catch (error) {
        res.status(500).json({
            msg: 'Error al verificar el viaje',
            code: 500,
            error,
        });
    }
    };

    export const validateCreateViaje = (
        req: Request,
        res: Response,
        next: NextFunction
        ) => {
        const {
            fecha_carga,
            kgs,
            kms_recorridos,
            destino,
            id_camion,
            id_acoplado,
            id_chofer,
            id_cliente,
        } = req.body;

        if (!fecha_carga || !destino || !id_camion || !id_chofer || !id_cliente) {
            res.status(400).json({
                msg: 'Faltan campos obligatorios (fecha_carga, destino, id_camion, id_chofer, id_cliente)',
                code: 400,
                });
            return;
        }

        if (typeof destino !== 'string' || destino.trim() === '') {
            res.status(400).json({
                msg: 'El destino debe ser un texto válido',
                code: 400,
            });
            return;
        }

        if (
            isNaN(Number(id_camion)) ||
            isNaN(Number(id_chofer)) ||
            isNaN(Number(id_cliente))
        ) {
            res.status(400).json({
                msg: 'id_camion, id_chofer e id_cliente deben ser numéricos',
                code: 400,
            });
            return;
        }

        if (id_acoplado !== undefined && id_acoplado !== null && isNaN(Number(id_acoplado))) {
            res.status(400).json({
                msg: 'id_acoplado debe ser numérico',
                code: 400,
            });
            return;
        }

        if (kgs !== undefined && kgs !== null && isNaN(Number(kgs))) {
            res.status(400).json({
                msg: 'kgs debe ser un valor numérico',
                code: 400,
            });
            return;
        }

        if (
            kms_recorridos !== undefined &&
            kms_recorridos !== null &&
            isNaN(Number(kms_recorridos))
        ) {
            res.status(400).json({
                msg: 'kms_recorridos debe ser un valor numérico',
                code: 400,
            });
            return;
        }

        next();
        };

        export const validateUpdateViaje = (
        req: Request,
        res: Response,
        next: NextFunction
        ) => {
        const {
            kgs,
            kms_recorridos,
            destino,
            id_camion,
            id_acoplado,
            id_chofer,
            id_cliente,
        } = req.body;

        if (Object.keys(req.body).length === 0) {
            res.status(400).json({
                msg: 'Debe enviar al menos un campo para actualizar',
                code: 400,
            });
            return;
        }

        if (destino !== undefined && (typeof destino !== 'string' || destino.trim() === '')) {
            res.status(400).json({
                msg: 'El destino debe ser un texto válido',
                code: 400,
            });
            return;
        }

        if (id_camion !== undefined && isNaN(Number(id_camion))) {
            res.status(400).json({ msg: 'id_camion debe ser numérico', code: 400 });
            return;
        }

        if (id_chofer !== undefined && isNaN(Number(id_chofer))) {
            res.status(400).json({ msg: 'id_chofer debe ser numérico', code: 400 });
            return;
        }

        if (id_cliente !== undefined && isNaN(Number(id_cliente))) {
            res.status(400).json({ msg: 'id_cliente debe ser numérico', code: 400 });
            return;
        }

        if (id_acoplado !== undefined && id_acoplado !== null && isNaN(Number(id_acoplado))) {
            res.status(400).json({ msg: 'id_acoplado debe ser numérico', code: 400 });
            return;
        }

        if (kgs !== undefined && kgs !== null && isNaN(Number(kgs))) {
            res.status(400).json({ msg: 'kgs debe ser numérico', code: 400 });
            return;
        }

        if (
            kms_recorridos !== undefined &&
            kms_recorridos !== null &&
            isNaN(Number(kms_recorridos))
        ) {
            res.status(400).json({ msg: 'kms_recorridos debe ser numérico', code: 400 });
            return;
        }

        next();
};