import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Ingreso = sequelize.define(
    'Ingreso',
    {
    id_ingreso: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_viaje: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    id_cliente: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    concepto: {
        type: DataTypes.STRING(150),
        allowNull: false,
    },
    monto: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
    },
    fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    metodo_pago: {
        type: DataTypes.STRING(30),
        allowNull: true,
    },
    estado: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
},
    {
    tableName: 'ingresos',
    timestamps: false,
}
);