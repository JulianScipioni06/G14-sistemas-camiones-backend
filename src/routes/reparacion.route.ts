import { Router } from 'express';
import {
    getReparaciones,
    getReparacionById,
    createReparacion,
    updateReparacion,
    deleteReparacion,
} from '../controllers/reparacion.controller.js';
import { validarId } from '../middlewares/validarId.js';
import { validarReparacion } from '../middlewares/validarReparacion.js';

const router:Router = Router();

router.get('/', getReparaciones);
router.get('/:id', validarId, getReparacionById);
router.post('/', validarReparacion, createReparacion);
router.put('/:id', validarId, validarReparacion, updateReparacion);
router.delete('/:id', validarId, deleteReparacion);

export default router;