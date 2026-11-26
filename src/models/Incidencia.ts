import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Incidencia = sequelize.define(
    'Incidencia',
    {
        id_incidencia: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        descripcion: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        fecha_hora: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        id_viaje: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        tableName: 'incidencias',
        timestamps: false,
    }
);