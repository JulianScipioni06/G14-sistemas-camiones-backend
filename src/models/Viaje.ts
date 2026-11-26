import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Viaje = sequelize.define(
    'Viaje',
    {
        id_viaje: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        fecha_carga: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        remito: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        kgs: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
        },
        kms_recorridos: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        destino: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        estado: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        id_camion: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        id_acoplado: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        id_chofer: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        id_cliente: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        tableName: 'viajes',
        timestamps: false,
    }
);