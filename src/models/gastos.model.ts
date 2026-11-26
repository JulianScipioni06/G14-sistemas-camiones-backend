import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Gasto = sequelize.define(
    'Gasto',
        {
    id_gasto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        },
    categoria: {
        type: DataTypes.STRING(50),
        allowNull: false,
        },
    descripcion: {
        type: DataTypes.STRING(255),
        allowNull: true,
        },
    monto: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
        },
    fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        },
    estado: {
        type: DataTypes.STRING(20),
        allowNull: false,
        },
    id_camion: {
        type: DataTypes.INTEGER,
        allowNull: true,
        },
    id_viaje: {
        type: DataTypes.INTEGER,
        allowNull: true,
        },
    id_acoplado: {
        type: DataTypes.INTEGER,
        allowNull: true,
        },
    id_reparacion: {
        type: DataTypes.INTEGER,
        allowNull: true,
        },
    },
        {
        tableName: 'gastos',
        timestamps: false,
    }
);
