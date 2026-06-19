const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/database');

const Transaccion = sequelize.define('Transaccion', {
    idiomaOrigen: {
        type: DataTypes.STRING,
        allowNull: false
    },
    textoOrigen: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    idiomaDestino: {
        type: DataTypes.STRING,
        allowNull: false
    },
    textoDestino: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    emailCliente: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: { msg: 'Email invalido' }
        }
    }
}, {
    tableName: 'transacciones',
    timestamps: true,
    paranoid: true // softdelete
});

module.exports = Transaccion;