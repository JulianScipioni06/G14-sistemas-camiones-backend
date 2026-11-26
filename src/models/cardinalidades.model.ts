import { Usuario } from './Usuario.js';
import { Camion } from './Camion.js';
import { Acoplado } from './Acoplado.js';
import { Cliente } from './Cliente.js';
import { Chofer } from './Chofer.js';
import { Reparacion } from './Reparacion.js';
import { Viaje } from './Viaje.js';
import { Ingreso } from './Ingreso.js';
import { Gasto } from './Gasto.js';
import { Incidencia } from './Incidencia.js';


// Usuario <-> Chofer (1:1)
Usuario.hasOne(Chofer, { foreignKey: 'id_usuario', as: 'chofer' });
Chofer.belongsTo(Usuario, { foreignKey: 'id_usuario', as: 'usuario' });

// Camion <-> Reparacion (1:N)
Camion.hasMany(Reparacion, { foreignKey: 'id_camion', as: 'reparaciones' });
Reparacion.belongsTo(Camion, { foreignKey: 'id_camion', as: 'camion' });

// Acoplado <-> Reparacion (1:N)
Acoplado.hasMany(Reparacion, { foreignKey: 'id_acoplado', as: 'reparaciones' });
Reparacion.belongsTo(Acoplado, { foreignKey: 'id_acoplado', as: 'acoplado' });

// Camion <-> Viaje (1:N)
Camion.hasMany(Viaje, { foreignKey: 'id_camion', as: 'viajes' });
Viaje.belongsTo(Camion, { foreignKey: 'id_camion', as: 'camion' });

// Acoplado <-> Viaje (1:N)
Acoplado.hasMany(Viaje, { foreignKey: 'id_acoplado', as: 'viajes' });
Viaje.belongsTo(Acoplado, { foreignKey: 'id_acoplado', as: 'acoplado' });

// Chofer <-> Viaje (1:N)
Chofer.hasMany(Viaje, { foreignKey: 'id_chofer', as: 'viajes' });
Viaje.belongsTo(Chofer, { foreignKey: 'id_chofer', as: 'chofer' });

// Cliente <-> Viaje (1:N)
Cliente.hasMany(Viaje, { foreignKey: 'id_cliente', as: 'viajes' });
Viaje.belongsTo(Cliente, { foreignKey: 'id_cliente', as: 'cliente' });

// Viaje <-> Ingreso (1:N)
Viaje.hasMany(Ingreso, { foreignKey: 'id_viaje', as: 'ingresos' });
Ingreso.belongsTo(Viaje, { foreignKey: 'id_viaje', as: 'viaje' });

// Cliente <-> Ingreso (1:N)
Cliente.hasMany(Ingreso, { foreignKey: 'id_cliente', as: 'ingresos' });
Ingreso.belongsTo(Cliente, { foreignKey: 'id_cliente', as: 'cliente' });

// Camion <-> Gasto (1:N)
Camion.hasMany(Gasto, { foreignKey: 'id_camion', as: 'gastos' });
Gasto.belongsTo(Camion, { foreignKey: 'id_camion', as: 'camion' });

// Viaje <-> Gasto (1:N)
Viaje.hasMany(Gasto, { foreignKey: 'id_viaje', as: 'gastos' });
Gasto.belongsTo(Viaje, { foreignKey: 'id_viaje', as: 'viaje' });

// Acoplado <-> Gasto (1:N)
Acoplado.hasMany(Gasto, { foreignKey: 'id_acoplado', as: 'gastos' });
Gasto.belongsTo(Acoplado, { foreignKey: 'id_acoplado', as: 'acoplado' });

// Reparacion <-> Gasto (1:N)
Reparacion.hasMany(Gasto, { foreignKey: 'id_reparacion', as: 'gastos' });
Gasto.belongsTo(Reparacion, { foreignKey: 'id_reparacion', as: 'reparacion' });

// Viaje <-> Incidencia (1:N)
Viaje.hasMany(Incidencia, { foreignKey: 'id_viaje', as: 'incidencias' });
Incidencia.belongsTo(Viaje, { foreignKey: 'id_viaje', as: 'viaje' });

export {
    Usuario,
    Camion,
    Acoplado,
    Cliente,
    Chofer,
    Reparacion,
    Viaje,
    Ingreso,
    Gasto,
    Incidencia,
};