import type { Request, Response } from 'express';
import { Op, ForeignKeyConstraintError } from 'sequelize';
import { Reparacion, Camion, Acoplado } from '../models/cardinalidades.model.js';



const incluirRelaciones = [
    { model: Camion, as: 'camion', attributes: ['id_camion', 'patente', 'marca', 'modelo'] },
    { model: Acoplado, as: 'acoplado', attributes: ['id_acoplado', 'patente', 'tipo'] },
];

export const getReparaciones = async (req: Request, res: Response) => {
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

        let sortBy = 'id_reparacion';
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
                { descripcion: { [Op.iLike]: `%${search}%` } },
            ];
        }

        if (req.query.estado) {
            where.estado = String(req.query.estado);
        }

        if (req.query.id_camion) {
            where.id_camion = Number(req.query.id_camion);
        }

        if (req.query.id_acoplado) {
            where.id_acoplado = Number(req.query.id_acoplado);
        }

        const { count, rows } = await Reparacion.findAndCountAll({
            where,
            limit,
            offset,
            order: [[sortBy, order]],
            include: incluirRelaciones,
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
            msg: 'Error al obtener las reparaciones',
            code: 500,
        });
    }
};

export const getReparacionById = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const reparacion = await Reparacion.findByPk(id, {
            include: incluirRelaciones,
        });

        if (!reparacion) {
            res.status(404).json({
                msg: 'Reparación no encontrada',
                code: 404,
            });
            return;
        }

        res.status(200).json({
            msg: 'Ok',
            code: 200,
            data: reparacion,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error al obtener la reparación',
            code: 500,
        });
    }
};

export const createReparacion = async (req: Request, res: Response) => {
    try {
        const {
            fecha_ingreso,
            fecha_reparado,
            costo,
            descripcion,
            estado,
            id_camion,
            id_acoplado,
        } = req.body;

        if (id_camion) {
            const camion = await Camion.findByPk(id_camion);
            if (!camion) {
                res.status(404).json({
                    msg: 'El camión indicado no existe',
                    code: 404,
                });
                return;
            }
        }

        if (id_acoplado) {
            const acoplado = await Acoplado.findByPk(id_acoplado);
            if (!acoplado) {
                res.status(404).json({
                    msg: 'El acoplado indicado no existe',
                    code: 404,
                });
                return;
            }
        }

        const nuevaReparacion = await Reparacion.create({
            fecha_ingreso,
            fecha_reparado,
            costo,
            descripcion,
            estado,
            id_camion,
            id_acoplado,
        });

        res.status(201).json({
            msg: 'Reparación creada correctamente',
            code: 201,
            data: nuevaReparacion,
        });
    } catch (error) {
        if (error instanceof ForeignKeyConstraintError) {
            res.status(409).json({
                msg: 'El camión o acoplado indicado no existe',
                code: 409,
            });
            return;
        }

        console.error(error);
        res.status(500).json({
            msg: 'Error al crear la reparación',
            code: 500,
        });
    }
};

export const updateReparacion = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const reparacionExistente = await Reparacion.findByPk(id);

        if (!reparacionExistente) {
            res.status(404).json({
                msg: 'Reparación no encontrada',
                code: 404,
            });
            return;
        }

        const {
            fecha_ingreso,
            fecha_reparado,
            costo,
            descripcion,
            estado,
            id_camion,
            id_acoplado,
        } = req.body;

        if (id_camion) {
            const camion = await Camion.findByPk(id_camion);
            if (!camion) {
                res.status(404).json({
                    msg: 'El camión indicado no existe',
                    code: 404,
                });
                return;
            }
        }

        if (id_acoplado) {
            const acoplado = await Acoplado.findByPk(id_acoplado);
            if (!acoplado) {
                res.status(404).json({
                    msg: 'El acoplado indicado no existe',
                    code: 404,
                });
                return;
            }
        }

        // PUT reemplaza todo: lo que no viene se pone en null
        await reparacionExistente.update({
            fecha_ingreso,
            fecha_reparado: fecha_reparado ?? null,
            costo: costo ?? null,
            descripcion: descripcion ?? null,
            estado,
            id_camion: id_camion ?? null,
            id_acoplado: id_acoplado ?? null,
        });

        res.status(200).json({
            msg: 'Reparación actualizada correctamente',
            code: 200,
            data: reparacionExistente,
        });
    } catch (error) {
        if (error instanceof ForeignKeyConstraintError) {
            res.status(409).json({
                msg: 'El camión o acoplado indicado no existe',
                code: 409,
            });
            return;
        }

        console.error(error);
        res.status(500).json({
            msg: 'Error al actualizar la reparación',
            code: 500,
        });
    }
};

export const deleteReparacion = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const reparacionExistente = await Reparacion.findByPk(id);

        if (!reparacionExistente) {
            res.status(404).json({
                msg: 'Reparación no encontrada',
                code: 404,
            });
            return;
        }

        await reparacionExistente.destroy();

        res.status(200).json({
            msg: 'Reparación eliminada correctamente',
            code: 200,
        });
    } catch (error) {
        if (error instanceof ForeignKeyConstraintError) {
            res.status(409).json({
                msg: 'No se puede eliminar: la reparación tiene gastos asociados',
                code: 409,
            });
            return;
        }

        console.error(error);
        res.status(500).json({
            msg: 'Error al eliminar la reparación',
            code: 500,
        });
    }
};