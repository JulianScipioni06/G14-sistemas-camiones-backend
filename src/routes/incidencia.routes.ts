import { Router } from 'express';
import {
    getIncidencias,
    getIncidenciaById,
    createIncidencia,
    updateIncidencia,
    deleteIncidencia,
} from '../controllers/incidencia.controller.js';
import {
    validateIncidenciaId,
    validateCreateIncidencia,
    validateUpdateIncidencia,
} from '../middlewares/incidencia.middleware.js';

const router: Router = Router();

router.get('/', getIncidencias);
router.get('/:id', validateIncidenciaId, getIncidenciaById);
router.post('/', validateCreateIncidencia, createIncidencia);
router.put('/:id', validateIncidenciaId, validateUpdateIncidencia, updateIncidencia);
router.patch('/:id', validateIncidenciaId, validateUpdateIncidencia, updateIncidencia);
router.delete('/:id', validateIncidenciaId, deleteIncidencia);

export default router;