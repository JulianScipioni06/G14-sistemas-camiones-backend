import express, { type Express } from 'express';
import cors from 'cors';
import usuarioRoutes from './routes/usuario.routes.js';
import choferRoutes from './routes/chofer.routes.js';
import ingresoRoutes from './routes/ingreso.routes.js';
import gastoRoutes from './routes/gasto.routes.js';
import authRoutes from './routes/auth.routes.js';
import viajeRoutes from './routes/viaje.routes.js';
import camionRoute from './routes/camion.routes.js';
import clienteRoutes from './routes/cliente.routes.js';
import acopladoRoutes from './routes/acoplado.routes.js';
import reparacionRoute from './routes/reparacion.routes.js';
import incidenciaRoutes from './routes/incidencia.routes.js'

const app: Express = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/usuarios', usuarioRoutes);
app.use('/api/v1/choferes', choferRoutes);
app.use('/api/v1/ingresos', ingresoRoutes);
app.use('/api/v1/gastos', gastoRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/viajes', viajeRoutes);
app.use('/api/v1/camiones', camionRoute);
app.use('/api/v1/acoplados', acopladoRoutes);
app.use('/api/v1/reparaciones', reparacionRoute);
app.use('/api/v1/incidencias', incidenciaRoutes)

app.use('/api/v1/clientes', clienteRoutes);

app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', message: 'API Sistema de Camiones funcionando' });
});

export default app;