import { Router } from 'express';
import {
    getUsuarios,
    getUsuarioById,
    createUsuario,
    updateUsuario,
    deleteUsuario,
} from '../controllers/usuario.controller.js';

const router: Router = Router();

router.get('/', getUsuarios);
router.get('/:id', getUsuarioById);
router.post('/', createUsuario);
router.put('/:id', updateUsuario);
router.patch('/:id', updateUsuario);
router.delete('/:id', deleteUsuario);

export default router;