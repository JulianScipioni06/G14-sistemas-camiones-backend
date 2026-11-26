import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Acoplado = sequelize.define(
    'Acoplado',
    {
        id_acoplado: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        patente: {
            type: DataTypes.STRING(10),
            allowNull: false,
            unique: true,
        },
        tipo: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        capacidad: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        tara: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        estado: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        vencimiento_vtv: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        vencimiento_seguro: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
    },
    {
        tableName: 'acoplados',
        timestamps: false,
    }
);