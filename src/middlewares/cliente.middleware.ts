import type { Request, Response, NextFunction } from 'express';

export const validarCrearCliente = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { razon_social, cuit, direccion, telefono, email } = req.body;

  if (
    !razon_social ||
    typeof razon_social !== 'string' ||
    razon_social.trim() === ''
  ) {
    return res
      .status(400)
      .json({ msg: 'La razón social es obligatoria', code: 400 });
  }

  if (!cuit || typeof cuit !== 'string' || cuit.trim() === '') {
    return res.status(400).json({ msg: 'El CUIT es obligatorio', code: 400 });
  }

  if (!telefono || typeof telefono !== 'string' || telefono.trim() === '') {
    return res
      .status(400)
      .json({ msg: 'El teléfono es obligatorio', code: 400 });
  }

  if (direccion !== undefined && direccion !== null && typeof direccion !== 'string') {
    return res
      .status(400)
      .json({ msg: 'La dirección debe ser un texto válido', code: 400 });
  }

  if (email !== undefined && email !== null && typeof email !== 'string') {
    return res
      .status(400)
      .json({ msg: 'El email debe ser un texto válido', code: 400 });
  }

  next();
};