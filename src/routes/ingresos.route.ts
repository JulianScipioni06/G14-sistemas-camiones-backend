import { Router } from 'express';
import {
    getIngresos,
    getIngresoById,
    createIngreso,
    updateIngreso,
    deleteIngreso,
} from '../controllers/ingresos.controller.js';
import { validarCrearIngreso } from '../middlewares/validarIngreso.js';

const router: Router = Router();

router.get('/', getIngresos);
router.get('/:id', getIngresoById);
router.post('/', validarCrearIngreso, createIngreso);
router.patch('/:id', updateIngreso);
router.delete('/:id', deleteIngreso);

export default router;