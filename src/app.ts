import express, { type Express } from 'express';
import cors from 'cors';

const app: Express = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', message: 'API Sistema de Camiones funcionando' });
});

export default app;