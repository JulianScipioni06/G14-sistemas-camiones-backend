import { Router } from "express";
import {
    getCamiones,
    getCamionById,
    createCamion,
    updateCamion,
    deleteCamion,
} from '../controllers/camion.controller.js';
import { validarId } from "../middlewares/validarId.js";
import { validarCamion } from "../middlewares/validarCamion.js";

const router: Router = Router();

router.get('/', getCamiones);
router.get('/:id', validarId, getCamionById);
router.post('/', validarCamion, createCamion);
router.put('/:id', validarId, validarCamion, updateCamion);
router.delete('/:id', validarId, deleteCamion);

export default router;