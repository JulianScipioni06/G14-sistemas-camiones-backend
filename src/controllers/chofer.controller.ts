import type { Request, Response } from 'express';
import { Op } from 'sequelize';
import { Chofer } from '../models/chofer.model.js';

export const getChoferes = async (req: Request, res: Response) => {
  try {
    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 10;
    const sortBy = req.query.sortBy ? String(req.query.sortBy) : 'id_chofer';
    const order =
      req.query.order && String(req.query.order).toUpperCase() === 'ASC'
        ? 'ASC'
        : 'DESC';

    const offset = (page - 1) * limit;
    const where: Record<string, unknown> = {};

    if (req.query.search) {
      const search = String(req.query.search);
      where[Op.or as unknown as string] = [
        { dni: { [Op.iLike]: `%${search}%` } },
        { nombre_completo: { [Op.iLike]: `%${search}%` } },
        { email: { [Op.iLike]: `%${search}%` } },
      ];
    }

    const { count, rows } = await Chofer.findAndCountAll({
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
      msg: 'Error al obtener los choferes',
      code: 500,
      error,
    });
  }
};

export const getChoferById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const chofer = await Chofer.findByPk(id);

    if (!chofer) {
      res.status(404).json({
        msg: 'Chofer no encontrado',
        code: 404,
      });
      return;
    }

    res.status(200).json({
      msg: 'Ok',
      code: 200,
      data: chofer,
    });
  } catch (error) {
    res.status(500).json({
      msg: 'Error al obtener el chofer',
      code: 500,
      error,
    });
  }
};

export const createChofer = async (req: Request, res: Response) => {
  try {
    const {
      dni,
      nombre_completo,
      telefono,
      domicilio,
      email,
      vencimiento_carnet,
      id_usuario,
    } = req.body;

    if (
      !dni ||
      !nombre_completo ||
      !telefono ||
      !domicilio ||
      !email ||
      !vencimiento_carnet ||
      !id_usuario
    ) {
      res.status(400).json({
        msg: 'Faltan campos obligatorios (dni, nombre_completo, telefono, domicilio, email, vencimiento_carnet, id_usuario)',
        code: 400,
      });
      return;
    }

    const nuevoChofer = await Chofer.create({
      dni,
      nombre_completo,
      telefono,
      domicilio,
      email,
      vencimiento_carnet,
      id_usuario: Number(id_usuario),
    });

    res.status(201).json({
      msg: 'Chofer creado correctamente',
      code: 201,
      data: nuevoChofer,
    });
  } catch (error) {
    res.status(500).json({
      msg: 'Error al crear el chofer',
      code: 500,
      error,
    });
  }
};

export const updateChofer = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const choferExistente = await Chofer.findByPk(id);

    if (!choferExistente) {
      res.status(404).json({
        msg: 'Chofer no encontrado',
        code: 404,
      });
      return;
    }

    const {
      dni,
      nombre_completo,
      telefono,
      domicilio,
      email,
      vencimiento_carnet,
      id_usuario,
    } = req.body;

    await choferExistente.update({
      dni,
      nombre_completo,
      telefono,
      domicilio,
      email,
      vencimiento_carnet,
      id_usuario,
    });

    res.status(200).json({
      msg: 'Chofer actualizado correctamente',
      code: 200,
      data: choferExistente,
    });
  } catch (error) {
    res.status(500).json({
      msg: 'Error al actualizar el chofer',
      code: 500,
      error,
    });
  }
};

export const deleteChofer = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const choferExistente = await Chofer.findByPk(id);

    if (!choferExistente) {
      res.status(404).json({
        msg: 'Chofer no encontrado',
        code: 404,
      });
      return;
    }

    await choferExistente.destroy();

    res.status(200).json({
      msg: 'Chofer eliminado correctamente',
      code: 200,
    });
  } catch (error) {
    res.status(500).json({
      msg: 'Error al eliminar el chofer',
      code: 500,
      error,
    });
  }
};
