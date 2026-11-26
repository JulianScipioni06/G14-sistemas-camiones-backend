import type { Request, Response, NextFunction } from 'express';

export const validarCrearGasto = (req: Request, res: Response, next: NextFunction) => {
    const { categoria, monto, fecha, estado } = req.body;

    if (!categoria || typeof categoria !== 'string' || categoria.trim() === '') {
    res.status(400).json({ msg: 'La categoría es obligatoria', code: 400 });
    return;
    }

    if (monto === undefined || isNaN(Number(monto)) || Number(monto) <= 0) {
    res.status(400).json({ msg: 'El monto debe ser un número mayor a 0', code: 400 });
    return;
    }

    if (!fecha || typeof fecha !== 'string') {
    res.status(400).json({ msg: 'La fecha es obligatoria (DD-MM-YYYY)', code: 400 });
    return;
    }

    if (!fecha) {
    return res.status(400).json({ msg: 'La fecha es obligatoria (YYYY-MM-DD)', code: 400 });
    }

    if (!estado || typeof estado !== 'string' || estado.trim() === '') {
    res.status(400).json({ msg: 'El estado es obligatorio', code: 400 });
    return;
    }

    next();
};