import express, { type Express } from 'express';
import cors from 'cors';
import usuarioRoutes from './routes/usuario.routes.js';
import choferRoutes from './routes/chofer.route.js';
import ingresoRoutes from './routes/ingresos.route.js';
import authRoutes from './routes/auth.routes.js';
import viajeRoutes from './routes/viaje.routes.js';

const app: Express = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/usuarios', usuarioRoutes);
app.use('/api/v1/choferes', choferRoutes);
app.use('/api/v1/ingresos', ingresoRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/viajes', viajeRoutes);

app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', message: 'API Sistema de Camiones funcionando' });
});

export default app;