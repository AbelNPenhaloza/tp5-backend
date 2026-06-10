const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/database');

const Publicacion = sequelize.define('Publicacion', {
    titulo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El titulo es obligatorio'
            },
            len: {
                args: [10, 100],
                msg: 'El titulo debe tener entre 10 y 100 caracteres'
            }
        }
    },
    contenido: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El contenido es obligatorio'
            },
            len: {
                args: [10, 5000],
                msg: 'El contenido debe tener al menos 10 caracteres'
            }
        }
    },
    imagenAsociada: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Debe proporcionar una imagen'
            }            
        }
    },
    fechaPublicacion: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'La fecha de publicacion es obligatoria'
            }
        }
    },
    vigente: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    tableName: 'publicaciones',
    timestamps: true,
    paranoid: true // soft delete
});

// Relacion: Una publicacion pertenece a un Empleado
Publicacion.belongsTo(Empleado,{
    as: 'empleado',
    foreignKey: 'empleadoId'
});

module.exports = Publicacion;

