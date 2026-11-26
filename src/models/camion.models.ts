import { DataTypes,  } from "sequelize";
import { sequelize } from "../config/database.js";

export const Camion = sequelize.define(
    'Camion',
    {
        id_camion: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        patente: {
            type: DataTypes.STRING(10),
            allowNull: false,
            unique: true,
        },
        marca: {
            type: DataTypes.STRING(40),
            allowNull:false,
        },
        modelo: {
            type: DataTypes.STRING(50),
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
        kms_recorridos: {
            type: DataTypes.INTEGER,
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
        tableName: 'camiones',
        timestamps: false,
    }
);