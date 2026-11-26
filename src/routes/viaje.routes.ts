import { Router } from 'express';
import {
    getViajes,
    getViajeById,
    createViaje,
    updateViaje,
    deleteViaje,
} from '../controllers/viaje.controller.js';
import {
    validateViajeId,
    validateCreateViaje,
    validateUpdateViaje,
} from '../middlewares/viaje.middleware.js';

const router: Router = Router();

router.get('/', getViajes);
router.get('/:id', validateViajeId, getViajeById);
router.post('/', validateCreateViaje, createViaje);
router.put('/:id', validateViajeId, validateUpdateViaje, updateViaje);
router.patch('/:id', validateViajeId, validateUpdateViaje, updateViaje);
router.delete('/:id', validateViajeId, deleteViaje);

export default router;