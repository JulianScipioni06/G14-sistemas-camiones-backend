import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Reparacion = sequelize.define(
    'Reparacion',
    {
        id_reparacion: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        fecha_ingreso: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        fecha_reparado: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        costo: {
            type: DataTypes.DECIMAL(12, 2),
            allowNull: true,
        },
        descripcion: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        estado: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        id_camion: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        id_acoplado: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    },
    {
        tableName: 'reparaciones',
        timestamps: false,
    }
);