import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Usuario = sequelize.define(
    'Usuario',
    {
        id_usuario: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        usuario: {
            type: DataTypes.STRING(150),
            allowNull: false,
            unique: true,
        },
            contrasena: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
            rol: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
    },
    {
        tableName: 'usuarios',
        timestamps: false,
    }
);