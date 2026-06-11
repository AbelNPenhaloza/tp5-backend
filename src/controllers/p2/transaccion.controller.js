const Transaccion = require('../../models/p2/transaccion.model');
const { Op } = require('sequelize');

const transaccionCtrl = {};

// Crear transacción
transaccionCtrl.createTransaccion = async (req, res) => {
    try {
        const nuevaTransaccion = await Transaccion.create(req.body);
        res.status(201).json({
            status: '1',
            msg: 'Transacción creada correctamente',
            data: nuevaTransaccion
        });
    } catch (error) {
        res.status(400).json({
            status: '0',
            msg: 'Error al crear la transacción'
        });
    }
};

// Obtener TODAS las transacciones
transaccionCtrl.getTransacciones = async (req, res) => {
    try {
        const transacciones = await Transaccion.findAll({
            order: [['createdAt', 'DESC']]
        });
        res.status(200).json(transacciones);
    } catch (error) {
        res.status(400).json({
            status: '0',
            msg: 'Error al obtener las transacciones'
        });
    }
};

// Obtener transacciones por email del cliente
transaccionCtrl.getTransaccionesEmail = async (req, res) => {
    try {
        const { email } = req.query;
        
        if (!email) {
            return res.status(400).json({
                status: '0',
                msg: 'Email es requerido como parámetro'
            });
        }
        
        const transacciones = await Transaccion.findAll({
            where: { emailCliente: email },
            order: [['createdAt', 'DESC']]
        });
        
        res.status(200).json(transacciones);
    } catch (error) {
        res.status(400).json({
            status: '0',
            msg: 'Error al obtener las transacciones por email'
        });
    }
};

// Obtener transacciones por idioma (origen o destino)
transaccionCtrl.getTransaccionesIdioma = async (req, res) => {
    try {
        const { idioma } = req.params;
        
        const transacciones = await Transaccion.findAll({
            where: {
                [Op.or]: [
                    { idiomaOrigen: idioma },
                    { idiomaDestino: idioma }
                ]
            },
            order: [['createdAt', 'DESC']]
        });
        
        res.status(200).json(transacciones);
    } catch (error) {
        res.status(400).json({
            status: '0',
            msg: 'Error al obtener transacciones por idioma'
        });
    }
};

module.exports = transaccionCtrl;