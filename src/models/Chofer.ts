import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Chofer = sequelize.define(
  'Chofer',
  {
    id_chofer: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    dni: {
      type: DataTypes.STRING(15),
      allowNull: false,
      unique: true,
    },
    nombre_completo: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    telefono: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    domicilio: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    vencimiento_carnet: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'choferes',
    timestamps: false,
  }
);