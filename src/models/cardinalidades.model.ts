import { Ingreso } from './ingresos.model.js';

export const establecerCardinalidad = () => {
    // Viaje <-> Ingreso (1:N)
    // TODO: descomentar cuando esten mergeados Viaje y Cliente
    // Viaje.hasMany(Ingreso, { foreignKey: 'id_viaje', as: 'ingresos' });
    // Ingreso.belongsTo(Viaje, { foreignKey: 'id_viaje', as: 'viaje' });

    
};

export {
    Ingreso,
}