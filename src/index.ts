import dotenv from 'dotenv';
import app from './app.js';
import { sequelize } from './config/database.js';

dotenv.config();

let port = 3000;
if (process.env.PORT) {
  port = Number(process.env.PORT);
}

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a Neon (PostgreSQL) exitosa.');

    app.listen(port, () => {
      console.log(`Servidor corriendo en http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error);
    process.exit(1);
  }
};

startServer();