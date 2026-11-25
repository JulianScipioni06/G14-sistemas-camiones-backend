import { Router } from 'express';
import {
    getGastos,
    getGastoById,
    createGasto,
    updateGasto,
    deleteGasto,
} from '../controllers/gastos.controller.js';
import { validarCrearGasto } from '../middlewares/validarGasto.js';

const router: Router = Router();

router.get('/', getGastos);
router.get('/:id', getGastoById);
router.post('/', validarCrearGasto, createGasto);
router.patch('/:id', updateGasto);
router.delete('/:id', deleteGasto);

export default router;