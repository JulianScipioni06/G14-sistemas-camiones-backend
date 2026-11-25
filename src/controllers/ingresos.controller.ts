import type { Request, Response } from 'express';
import { Op } from 'sequelize';
import { Ingreso } from '../models/ingresos.model.js';

export const getIngresos = async (req: Request, res: Response) => {
    try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const sortBy = req.query.sortBy ? String(req.query.sortBy) : 'id_ingreso';
    const order = String(req.query.order).toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

    const offset = (page - 1) * limit;
    const where: Record<string, unknown> = {};

    if (req.query.search) {
        const search = String(req.query.search);
        where.concepto = { [Op.iLike]: `%${search}%` };
    }

    if (req.query.estado) {
        where.estado = String(req.query.estado);
    }

    const { count, rows } = await Ingreso.findAndCountAll({
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
    res.status(500).json({ msg: 'Error al obtener los ingresos', code: 500, error });
    }
};

export const getIngresoById = async (req: Request, res: Response) => {
    try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ msg: 'ID inválido', code: 400 });
        return;
    }

    const ingreso = await Ingreso.findByPk(id);
    if (!ingreso) {
        res.status(404).json({ msg: 'Ingreso no encontrado', code: 404 });
        return;
    }

    res.status(200).json({ msg: 'Ok', code: 200, data: ingreso });
    } catch (error) {
    res.status(500).json({ msg: 'Error al obtener el ingreso', code: 500, error });
    }
};

export const createIngreso = async (req: Request, res: Response) => {
    try {
    const nuevoIngreso = await Ingreso.create(req.body);
    res.status(201).json({
        msg: 'Ingreso creado correctamente',
        code: 201,
        data: nuevoIngreso,
    });
    } catch (error) {
    res.status(500).json({ msg: 'Error al crear el ingreso', code: 500, error });
    }
};

export const updateIngreso = async (req: Request, res: Response) => {
    try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ msg: 'ID inválido', code: 400 });
        return;
    }

    const ingreso = await Ingreso.findByPk(id);
    if (!ingreso) {
        res.status(404).json({ msg: 'Ingreso no encontrado', code: 404 });
        return;
    }

    await ingreso.update(req.body);

    res.status(200).json({
        msg: 'Ingreso actualizado correctamente',
        code: 200,
        data: ingreso,
    });
    } catch (error) {
    res.status(500).json({ msg: 'Error al actualizar el ingreso', code: 500, error });
    }
};

export const deleteIngreso = async (req: Request, res: Response) => {
    try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ msg: 'ID inválido', code: 400 });
        return;
    }

    const ingreso = await Ingreso.findByPk(id);
    if (!ingreso) {
        res.status(404).json({ msg: 'Ingreso no encontrado', code: 404 });
        return;
    }

    await ingreso.destroy();

    res.status(200).json({
        msg: 'Ingreso eliminado correctamente',
        code: 200,
        data: { id_ingreso: id },
    });
    } catch (error) {
    res.status(500).json({ msg: 'Error al eliminar el ingreso', code: 500, error });
    }
};