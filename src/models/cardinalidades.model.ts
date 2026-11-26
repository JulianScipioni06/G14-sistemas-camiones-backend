import { Ingreso } from './ingresos.model.js';
import { Camion } from './camion.models.js';
import { Acoplado } from './Acoplado.model.js';
import { Reparacion } from './Reparacion.model.js';

export const establecerCardinalidad = () => {
    // Viaje <-> Ingreso (1:N)
    // TODO: descomentar cuando esten mergeados Viaje y Cliente
    // Viaje.hasMany(Ingreso, { foreignKey: 'id_viaje', as: 'ingresos' });
    // Ingreso.belongsTo(Viaje, { foreignKey: 'id_viaje', as: 'viaje' });
    //Camion.hasMany(Reparacion, { foreignKey: 'id_camion', as: 'reparaciones' });
    //Reparacion.belongsTo(Camion, { foreignKey: 'id_camion', as: 'camion' });

    //Acoplado.hasMany(Reparacion, { foreignKey: 'id_acoplado', as: 'reparaciones' });
    //Reparacion.belongsTo(Acoplado, { foreignKey: 'id_acoplado', as: 'acoplado' });

    
};

export {
    Ingreso,
    Camion,
    Acoplado,
    Reparacion,
}