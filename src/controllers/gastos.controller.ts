import type { Request, Response } from 'express';
import { Op } from 'sequelize';
import { Gasto } from '../models/gastos.model.js';

export const getGastos = async (req: Request, res: Response) => {
    try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const sortBy = req.query.sortBy ? String(req.query.sortBy) : 'id_gasto';
    const order = String(req.query.order).toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

    const offset = (page - 1) * limit;
    const where: Record<string, unknown> = {};

    if (req.query.search) {
        const search = String(req.query.search);
        where[Op.or as unknown as string] = [
        { categoria: { [Op.iLike]: `%${search}%` } },
        { descripcion: { [Op.iLike]: `%${search}%` } },
        ];
    }

    if (req.query.estado) {
        where.estado = String(req.query.estado);
    }

    const { count, rows } = await Gasto.findAndCountAll({
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
    res.status(500).json({ msg: 'Error al obtener los gastos', code: 500, error });
    }
};

export const getGastoById = async (req: Request, res: Response) => {
    try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ msg: 'ID inválido', code: 400 });
        return;
    }

    const gasto = await Gasto.findByPk(id);
    if (!gasto) {
        res.status(404).json({ msg: 'Gasto no encontrado', code: 404 });
        return;
    }

    res.status(200).json({ msg: 'Ok', code: 200, data: gasto });
    } catch (error) {
    res.status(500).json({ msg: 'Error al obtener el gasto', code: 500, error });
    }
};

export const createGasto = async (req: Request, res: Response) => {
    try {
    const nuevoGasto = await Gasto.create(req.body);
    res.status(201).json({
        msg: 'Gasto creado correctamente',
        code: 201,
        data: nuevoGasto,
    });
    } catch (error) {
    res.status(500).json({ msg: 'Error al crear el gasto', code: 500, error });
    }
};

export const updateGasto = async (req: Request, res: Response) => {
    try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ msg: 'ID inválido', code: 400 });
        return;
    }

    const gasto = await Gasto.findByPk(id);
    if (!gasto) {
        res.status(404).json({ msg: 'Gasto no encontrado', code: 404 });
        return;
    }

    await gasto.update(req.body);

    res.status(200).json({
        msg: 'Gasto actualizado correctamente',
        code: 200,
        data: gasto,
    });
    } catch (error) {
    res.status(500).json({ msg: 'Error al actualizar el gasto', code: 500, error });
    }
};

export const deleteGasto = async (req: Request, res: Response) => {
    try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ msg: 'ID inválido', code: 400 });
        return;
    }

    const gasto = await Gasto.findByPk(id);
    if (!gasto) {
        res.status(404).json({ msg: 'Gasto no encontrado', code: 404 });
        return;
    }

    await gasto.destroy();

    res.status(200).json({
        msg: 'Gasto eliminado correctamente',
        code: 200,
        data: { id_gasto: id },
    });
    } catch (error) {
    res.status(500).json({ msg: 'Error al eliminar el gasto', code: 500, error });
    }
};