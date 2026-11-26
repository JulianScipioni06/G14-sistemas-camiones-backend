import type { Request, Response, NextFunction } from 'express';

export const validarCrearIngreso = (req: Request, res: Response, next: NextFunction) => {
    const { concepto, monto, fecha, estado } = req.body;

    if (!concepto || typeof concepto !== 'string' || concepto.trim() === '') {
    return res.status(400).json({ msg: 'El concepto es obligatorio', code: 400 });
    }

    if (monto === undefined || isNaN(Number(monto)) || Number(monto) <= 0) {
    return res.status(400).json({ msg: 'El monto debe ser un número mayor a 0', code: 400 });
    }

    if (!fecha) {
    return res.status(400).json({ msg: 'La fecha es obligatoria (YYYY-MM-DD)', code: 400 });
    }

    if (!estado) {
    return res.status(400).json({ msg: 'El estado es obligatorio', code: 400 });
    }

    next();
};