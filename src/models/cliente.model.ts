import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Cliente = sequelize.define(
  'Cliente',
  {
    id_cliente: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    razon_social: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    cuit: {
      type: DataTypes.STRING(13),
      allowNull: false,
      unique: true,
    },
    direccion: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    telefono: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  },
  {
    tableName: 'clientes',
    timestamps: false,
  }
);
