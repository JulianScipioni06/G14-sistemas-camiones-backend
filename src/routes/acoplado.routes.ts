import { Router } from 'express';
import {
    getAcoplados,
    getAcopladoById,
    createAcoplado,
    updateAcoplado,
    deleteAcoplado,
} from '../controllers/acoplado.controller.js';
import { validarId } from '../middlewares/validarId.js';
import { validarAcoplado } from '../middlewares/acoplado.middleware.js';

const router:Router = Router();

router.get('/', getAcoplados);
router.get('/:id', validarId, getAcopladoById);
router.post('/', validarAcoplado, createAcoplado);
router.put('/:id', validarId, validarAcoplado, updateAcoplado);
router.delete('/:id', validarId, deleteAcoplado);

export default router;