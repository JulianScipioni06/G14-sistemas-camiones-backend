import type { Request, Response } from 'express';
import { Op } from 'sequelize';
import { Viaje } from '../models/Viaje.js';
import type { ViajeRequest } from '../middlewares/viaje.middleware.js';

export const getViajes = async (req: Request, res: Response) => {
    try {
        let page = 1;
        if (req.query.page) {
            page = Number(req.query.page);
        }

        let limit = 10;
        if (req.query.limit) {
            limit = Number(req.query.limit);
        }

        let sortBy = 'id_viaje';
        if (req.query.sortBy) {
            sortBy = String(req.query.sortBy);
        }

        let order = 'DESC';
        if (req.query.order && String(req.query.order).toUpperCase() === 'ASC') {
            order = 'ASC';
        }

        const offset = (page - 1) * limit;
        const where: Record<string, unknown> = {};

        if (req.query.estado) {
            where.estado = String(req.query.estado);
        }

        if (req.query.id_camion) {
            where.id_camion = Number(req.query.id_camion);
        }

        if (req.query.id_chofer) {
            where.id_chofer = Number(req.query.id_chofer);
        }

        if (req.query.id_cliente) {
            where.id_cliente = Number(req.query.id_cliente);
        }

        if (req.query.search) {
        const search = String(req.query.search);
            where[Op.or as unknown as string] = [
                { destino: { [Op.iLike]: `%${search}%` } },
                { remito: { [Op.iLike]: `%${search}%` } },
                { estado: { [Op.iLike]: `%${search}%` } },
            ];
        }

        const { count, rows } = await Viaje.findAndCountAll({
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
            msg: 'Error al obtener los viajes',
            code: 500,
            error,
        });
    }
};

export const getViajeById = (req: ViajeRequest, res: Response) => {
    res.status(200).json({
        msg: 'Ok',
        code: 200,
        data: req.viaje,
    });
};

export const createViaje = async (req: Request, res: Response) => {
    try {
        const {
            fecha_carga,
            remito,
            kgs,
            kms_recorridos,
            destino,
            estado,
            id_camion,
            id_acoplado,
            id_chofer,
            id_cliente,
        } = req.body;

        let estadoViaje = 'pendiente';
        if (estado) {
            estadoViaje = String(estado);
        }

        const nuevoViaje = await Viaje.create({
            fecha_carga,
            remito,
            kgs,
            kms_recorridos,
            destino,
            estado: estadoViaje,
            id_camion,
            id_acoplado,
            id_chofer,
            id_cliente,
        });

        res.status(201).json({
            msg: 'Viaje creado correctamente',
            code: 201,
            data: nuevoViaje,
        });
    } catch (error) {
        const err = error as { name?: string };
        if (err.name === 'SequelizeForeignKeyConstraintError') {
            res.status(400).json({
                msg: 'El camión, acoplado, chofer o cliente especificado no existe',
                code: 400,
            });
            return;
        }

        res.status(500).json({
            msg: 'Error al crear el viaje', 
            code: 500,
        error,
        });
    }
};
export const updateViaje = async (req: ViajeRequest, res: Response) => {
    try {
        const viajeExistente = req.viaje!;
        const {
            fecha_carga,
            remito,
            kgs,
            kms_recorridos,
            destino,
            estado,
            id_camion,
            id_acoplado,
            id_chofer,
            id_cliente,
        } = req.body;

        await viajeExistente.update({
            fecha_carga,
            remito,
            kgs,
            kms_recorridos,
            destino,
            estado,
            id_camion,
            id_acoplado,
            id_chofer,
            id_cliente,
        });

        res.status(200).json({
            msg: 'Viaje actualizado correctamente',
            code: 200,
            data: viajeExistente,
        });
    } catch (error) {
        const err = error as { name?: string };
        if (err.name === 'SequelizeForeignKeyConstraintError') {
            res.status(400).json({
                msg: 'El camión, acoplado, chofer o cliente especificado no existe',
                code: 400,
            });
            return;
        }

        res.status(500).json({
            msg: 'Error al actualizar el viaje', 
            code: 500,
            error,
        });
    }
};

export const deleteViaje = async (req: ViajeRequest, res: Response) => {
    try {
        await req.viaje!.destroy();

        res.status(200).json({
            msg: 'Viaje eliminado correctamente',
            code: 200,
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Error al eliminar el viaje',
            code: 500,
            error,
        });
    }
};