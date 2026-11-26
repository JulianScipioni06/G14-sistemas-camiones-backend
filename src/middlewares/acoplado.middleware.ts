import type { Request, Response, NextFunction } from 'express';

const ESTADOS_VALIDOS = ['Disponible', 'En viaje', 'En reparación'];
const REGEX_FECHA = /^\d{4}-\d{2}-\d{2}$/;

const camposTexto = ['patente', 'tipo', 'estado'];
const camposNumero = ['capacidad', 'tara'];
const camposFecha = ['vencimiento_vtv', 'vencimiento_seguro'];

export const validarAcoplado = (req: Request, res: Response, next: NextFunction) => {
    const body = req.body ?? {};
    const errores: string[] = [];

    for (const campo of camposTexto) {
        if (typeof body[campo] !== 'string' || body[campo].trim() === '') {
            errores.push(`${campo} es obligatorio y debe ser texto`);
        }
    }

    for (const campo of camposNumero) {
        if (!Number.isInteger(body[campo]) || body[campo] < 0) {
            errores.push(`${campo} es obligatorio y debe ser un entero >= 0`);
        }
    }

    for (const campo of camposFecha) {
        const valor = body[campo];
        if (typeof valor !== 'string' || !REGEX_FECHA.test(valor) || isNaN(Date.parse(valor))) {
            errores.push(`${campo} es obligatorio y debe tener formato YYYY-MM-DD`);
        }
    }

    if (typeof body.patente === 'string' && body.patente.length > 10) {
        errores.push('patente no puede superar 10 caracteres');
    }

    if (typeof body.tipo === 'string' && body.tipo.length > 30) {
        errores.push('tipo no puede superar 30 caracteres');
    }

    if (typeof body.estado === 'string' && !ESTADOS_VALIDOS.includes(body.estado)) {
        errores.push(`estado debe ser uno de: ${ESTADOS_VALIDOS.join(', ')}`);
    }

    if (errores.length > 0) {
        res.status(400).json({
            msg: 'Datos inválidos',
            code: 400,
            errores,
        });
        return;
    }

    req.body.patente = body.patente.trim().toUpperCase();

    next();
};