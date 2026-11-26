import type { Request, Response, NextFunction } from 'express';

const ESTADOS_VALIDOS = ['Pendiente', 'En proceso', 'Finalizada'];
const REGEX_FECHA = /^\d{4}-\d{2}-\d{2}$/;

const fechaValida = (valor: unknown): boolean =>
    typeof valor === 'string' && REGEX_FECHA.test(valor) && !isNaN(Date.parse(valor));

const esIdValido = (valor: unknown): boolean =>
    Number.isInteger(valor) && (valor as number) > 0;

export const validarReparacion = (req: Request, res: Response, next: NextFunction) => {
    const body = req.body ?? {};
    const errores: string[] = [];

    if (!fechaValida(body.fecha_ingreso)) {
        errores.push('fecha_ingreso es obligatoria y debe tener formato YYYY-MM-DD');
    }

    const tieneFechaReparado = body.fecha_reparado !== undefined && body.fecha_reparado !== null;
    if (tieneFechaReparado && !fechaValida(body.fecha_reparado)) {
        errores.push('fecha_reparado debe tener formato YYYY-MM-DD');
    }

    if (
        fechaValida(body.fecha_ingreso) &&
        tieneFechaReparado &&
        fechaValida(body.fecha_reparado) &&
        body.fecha_reparado < body.fecha_ingreso
    ) {
        errores.push('fecha_reparado no puede ser anterior a fecha_ingreso');
    }

    if (body.costo !== undefined && body.costo !== null) {
        if (typeof body.costo !== 'number' || !Number.isFinite(body.costo) || body.costo < 0) {
            errores.push('costo debe ser un número >= 0');
        }
    }

    if (body.descripcion !== undefined && body.descripcion !== null) {
        if (typeof body.descripcion !== 'string') {
            errores.push('descripcion debe ser texto');
        } else if (body.descripcion.length > 255) {
            errores.push('descripcion no puede superar 255 caracteres');
        }
    }

    if (typeof body.estado !== 'string' || !ESTADOS_VALIDOS.includes(body.estado)) {
        errores.push(`estado es obligatorio y debe ser uno de: ${ESTADOS_VALIDOS.join(', ')}`);
    }

    const tieneCamion = body.id_camion !== undefined && body.id_camion !== null;
    const tieneAcoplado = body.id_acoplado !== undefined && body.id_acoplado !== null;

    if (!tieneCamion && !tieneAcoplado) {
        errores.push('Debe indicar al menos uno: id_camion o id_acoplado');
    }
    if (tieneCamion && !esIdValido(body.id_camion)) {
        errores.push('id_camion debe ser un entero positivo');
    }
    if (tieneAcoplado && !esIdValido(body.id_acoplado)) {
        errores.push('id_acoplado debe ser un entero positivo');
    }

    if (errores.length > 0) {
        res.status(400).json({
            msg: 'Datos inválidos',
            code: 400,
            errores,
        });
        return;
    }

    next();
};