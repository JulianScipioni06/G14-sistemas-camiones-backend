import express, { type Express } from 'express';
import cors from 'cors';
import usuarioRoutes from './routes/usuario.routes.js';
import choferRoutes from './routes/chofer.route.js';

const app: Express = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/usuarios', usuarioRoutes);
app.use('/api/v1/choferes', choferRoutes);

app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', message: 'API Sistema de Camiones funcionando' });
});

export default app;