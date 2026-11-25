import type { Request, Response } from 'express';
import { Op, UniqueConstraintError, ForeignKeyConstraintError } from 'sequelize';
import { Camion } from '../models/camion.models.js';

//Busqueda general Camiones
export const getCamiones = async (req: Request, res: Response) => {
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

        let sortBy = 'id_camion';
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
                { marca: { [Op.iLike]: `%${search}%` } },
                { modelo: { [Op.iLike]: `%${search}%` } },
            ];
        }

        const { count, rows } = await Camion.findAndCountAll({
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
            msg: 'Error al obtener los camiones',
            code: 500,
        });
    }
};
//Buscar por Id
export const getCamionById = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const camion = await Camion.findByPk(id);

        if (!camion) {
            res.status(404).json({
                msg: 'Camión no encontrado',
                code: 404,
            });
            return;
        }

        res.status(200).json({
            msg: 'Ok',
            code: 200,
            data: camion,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error al obtener el camión',
            code: 500,
        });
    }
};
//Crear Camion
export const createCamion = async (req: Request, res: Response) => {
    try {
        const {
            patente,
            marca,
            modelo,
            capacidad,
            tara,
            estado,
            kms_recorridos,
            vencimiento_vtv,
            vencimiento_seguro,
        } = req.body;

        if (
            !patente ||
            !marca ||
            !modelo ||
            capacidad === undefined ||
            tara === undefined ||
            !estado ||
            kms_recorridos === undefined ||
            !vencimiento_vtv ||
            !vencimiento_seguro
        ) {
            res.status(400).json({
                msg: 'Faltan campos obligatorios (patente, marca, modelo, capacidad, tara, estado, kms_recorridos, vencimiento_vtv, vencimiento_seguro)',
                code: 400,
            });
            return;
        }

        const nuevoCamion = await Camion.create({
            patente,
            marca,
            modelo,
            capacidad,
            tara,
            estado,
            kms_recorridos,
            vencimiento_vtv,
            vencimiento_seguro,
        });

        res.status(201).json({
            msg: 'Camión creado correctamente',
            code: 201,
            data: nuevoCamion,
        });
    } catch (error) {
        if (error instanceof UniqueConstraintError) {
            res.status(409).json({ 
                msg: 'Ya existe un camión con esa patente', 
                code: 409 
            });
            return;
    }
        console.error(error);
        res.status(500).json({
            msg: 'Error al crear el camión',
            code: 500,
        });
    }
};
//Actualizar Camion
export const updateCamion = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const camionExistente = await Camion.findByPk(id);

        if (!camionExistente) {
            res.status(404).json({
                msg: 'Camión no encontrado',
                code: 404,
            });
            return;
        }

        const {
            patente,
            marca,
            modelo,
            capacidad,
            tara,
            estado,
            kms_recorridos,
            vencimiento_vtv,
            vencimiento_seguro,
        } = req.body;

        await camionExistente.update({
            patente,
            marca,
            modelo,
            capacidad,
            tara,
            estado,
            kms_recorridos,
            vencimiento_vtv,
            vencimiento_seguro,
        });

        res.status(200).json({
            msg: 'Camión actualizado correctamente',
            code: 200,
            data: camionExistente,
        });
    } catch (error ) {
        if (error instanceof UniqueConstraintError) {
            res.status(409).json({
                msg: 'Ya existe un camión con esa patente',
                code: 409,
            });
            return;
        }
        console.error(error);
        res.status(500).json({
            msg: 'Error al actualizar el camión',
            code: 500,
        });
    }
};
// Borrar camion
export const deleteCamion = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const camionExistente = await Camion.findByPk(id);

        if (!camionExistente) {
            res.status(404).json({
                msg: 'Camión no encontrado',
                code: 404,
            });
            return;
        }

        await camionExistente.destroy();

        res.status(200).json({
            msg: 'Camión eliminado correctamente',
            code: 200,
        });
    } catch (error) {
        if (error instanceof ForeignKeyConstraintError) {
        res.status(409).json({
            msg: 'No se puede eliminar: el camión tiene registros asociados',
            code: 409,
        });
        return;
    }
        console.error(error);
        res.status(500).json({
            msg: 'Error al eliminar el camión',
            code: 500,
        });
    }
};