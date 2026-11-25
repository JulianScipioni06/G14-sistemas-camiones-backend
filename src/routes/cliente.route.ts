import { Router, type Router as ExpressRouter } from 'express';
import {
    getClientes,
    getClienteById,
    createCliente,
    updateCliente,
    deleteCliente,
} from '../controllers/cliente.controller.js';
import { validarCrearCliente } from '../middlewares/cliente.middleware.js';

const router: ExpressRouter = Router();

router.get('/', getClientes);
router.get('/:id', getClienteById);
router.post('/', validarCrearCliente, createCliente);
router.put('/:id', updateCliente);
router.delete('/:id', deleteCliente);

export default router;