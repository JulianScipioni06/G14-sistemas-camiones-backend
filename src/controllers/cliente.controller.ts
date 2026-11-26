import type { Request, Response } from 'express';
import { Op } from 'sequelize';
import { Cliente } from '../models/cliente.model.js';

export const getClientes = async (req: Request, res: Response) => {
  try {
    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 10;
    const sortBy = req.query.sortBy ? String(req.query.sortBy) : 'id_cliente';
    const order =
      req.query.order && String(req.query.order).toUpperCase() === 'ASC'
        ? 'ASC'
        : 'DESC';

    const offset = (page - 1) * limit;
    const where: Record<string, unknown> = {};

    if (req.query.search) {
      const search = String(req.query.search);
      where[Op.or as unknown as string] = [
        { razon_social: { [Op.iLike]: `%${search}%` } },
        { cuit: { [Op.iLike]: `%${search}%` } },
        { email: { [Op.iLike]: `%${search}%` } },
      ];
    }

    const { count, rows } = await Cliente.findAndCountAll({
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
      msg: 'Error al obtener los clientes',
      code: 500,
      error,
    });
  }
};

export const getClienteById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const cliente = await Cliente.findByPk(id);

    if (!cliente) {
      res.status(404).json({
        msg: 'Cliente no encontrado',
        code: 404,
      });
      return;
    }

    res.status(200).json({
      msg: 'Ok',
      code: 200,
      data: cliente,
    });
  } catch (error) {
    res.status(500).json({
      msg: 'Error al obtener el cliente',
      code: 500,
      error,
    });
  }
};

export const createCliente = async (req: Request, res: Response) => {
  try {
    const { razon_social, cuit, direccion, telefono, email } = req.body;

    if (!razon_social || !cuit || !telefono) {
      res.status(400).json({
        msg: 'Faltan campos obligatorios (razon_social, cuit, telefono)',
        code: 400,
      });
      return;
    }

    const nuevoCliente = await Cliente.create({
      razon_social,
      cuit,
      direccion,
      telefono,
      email,
    });

    res.status(201).json({
      msg: 'Cliente creado correctamente',
      code: 201,
      data: nuevoCliente,
    });
  } catch (error) {
    res.status(500).json({
      msg: 'Error al crear el cliente',
      code: 500,
      error,
    });
  }
};

export const updateCliente = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const clienteExistente = await Cliente.findByPk(id);

    if (!clienteExistente) {
      res.status(404).json({
        msg: 'Cliente no encontrado',
        code: 404,
      });
      return;
    }

    const { razon_social, cuit, direccion, telefono, email } = req.body;

    await clienteExistente.update({
      razon_social,
      cuit,
      direccion,
      telefono,
      email,
    });

    res.status(200).json({
      msg: 'Cliente actualizado correctamente',
      code: 200,
      data: clienteExistente,
    });
  } catch (error) {
    res.status(500).json({
      msg: 'Error al actualizar el cliente',
      code: 500,
      error,
    });
  }
};

export const deleteCliente = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const clienteExistente = await Cliente.findByPk(id);

    if (!clienteExistente) {
      res.status(404).json({
        msg: 'Cliente no encontrado',
        code: 404,
      });
      return;
    }

    await clienteExistente.destroy();

    res.status(200).json({
      msg: 'Cliente eliminado correctamente',
      code: 200,
    });
  } catch (error) {
    res.status(500).json({
      msg: 'Error al eliminar el cliente',
      code: 500,
      error,
    });
  }
};