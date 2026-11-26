import type { Request, Response, NextFunction } from 'express';

export const validarCrearChofer = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    dni,
    nombre_completo,
    telefono,
    domicilio,
    email,
    vencimiento_carnet,
    id_usuario,
  } = req.body;

  if (!dni || typeof dni !== 'string' || dni.trim() === '') {
    return res.status(400).json({ msg: 'El DNI es obligatorio', code: 400 });
  }

  if (
    !nombre_completo ||
    typeof nombre_completo !== 'string' ||
    nombre_completo.trim() === ''
  ) {
    return res
      .status(400)
      .json({ msg: 'El nombre completo es obligatorio', code: 400 });
  }

  if (!telefono || typeof telefono !== 'string' || telefono.trim() === '') {
    return res
      .status(400)
      .json({ msg: 'El teléfono es obligatorio', code: 400 });
  }

  if (
    !domicilio ||
    typeof domicilio !== 'string' ||
    domicilio.trim() === ''
  ) {
    return res
      .status(400)
      .json({ msg: 'El domicilio es obligatorio', code: 400 });
  }

  if (!email || typeof email !== 'string' || email.trim() === '') {
    return res.status(400).json({ msg: 'El email es obligatorio', code: 400 });
  }

  if (!vencimiento_carnet) {
    return res.status(400).json({
      msg: 'El vencimiento del carnet es obligatorio (YYYY-MM-DD)',
      code: 400,
    });
  }

  if (
    id_usuario === undefined ||
    id_usuario === null ||
    isNaN(Number(id_usuario)) ||
    Number(id_usuario) <= 0
  ) {
    return res
      .status(400)
      .json({ msg: 'El id_usuario debe ser un número mayor a 0', code: 400 });
  }

  next();
};