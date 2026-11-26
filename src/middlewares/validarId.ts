import type { Request, Response, NextFunction } from "express";

export const validarId = (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id);

    if(!Number.isInteger(id) || id <= 0){
        res.status(400).json({
            msg: 'El id debe ser un entero positivo',
            code: 400,
        });
        return;
    }

    next();
};
