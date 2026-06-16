const express = require('express');
const router = express.Router();
const transaccionCtrl = require('../../controllers/p2/transaccion.controller');

// GET /api/transaccion
router.get('/', (req, res) => {
    /* #swagger.tags = ['Transacciones (P2)']
       #swagger.summary = 'Obtener todas las transacciones'
       #swagger.description = 'Retorna la lista completa de todas las transacciones de traducción registradas.'
       #swagger.responses[200] = {
           description: 'Lista de transacciones obtenida con éxito.',
           schema: [{ $ref: '#/definitions/Transaccion' }]
       }
    */
    transaccionCtrl.getTransacciones(req, res);
});

// GET /api/transaccion/email
router.get('/email', (req, res) => {
    /* #swagger.tags = ['Transacciones (P2)']
       #swagger.summary = 'Buscar transacciones por correo electrónico'
       #swagger.description = 'Filtra y devuelve las transacciones registradas que correspondan a un correo electrónico de cliente específico.'
       #swagger.parameters['email'] = {
           in: 'query',
           description: 'Correo electrónico del cliente a buscar (ej: juan@mail.com)',
           required: true,
           type: 'string'
       }
       #swagger.responses[200] = {
           description: 'Lista de transacciones del cliente obtenida correctamente.',
           schema: [{ $ref: '#/definitions/Transaccion' }]
       }
    */
    transaccionCtrl.getTransaccionesEmail(req, res);
});

// GET /api/transaccion/filtrar/origen/:origen/destino/:destino
router.get('/filtrar/origen/:origen/destino/:destino', (req, res) => {
    /* #swagger.tags = ['Transacciones (P2)']
       #swagger.summary = 'Buscar transacciones por idioma de origen y destino'
       #swagger.description = 'Retorna las transacciones filtradas por los idiomas de origen y destino indicados en la ruta.'

       #swagger.parameters['origen'] = {
           in: 'path',
           description: 'Idioma de origen de la traducción (ej: es-español)',
           required: true,
           type: 'string'
       }

       #swagger.parameters['destino'] = {
           in: 'path',
           description: 'Idioma de destino de la traducción (ej: en-inglés)',
           required: true,
           type: 'string'
       }

       #swagger.responses[200] = {
           description: 'Transacciones filtradas por idioma de origen y destino obtenidas correctamente.',
           schema: [{ $ref: '#/definitions/Transaccion' }]
       }

       #swagger.responses[404] = {
           description: 'No se encontraron transacciones para los idiomas especificados.'
       }

       #swagger.responses[500] = {
           description: 'Error interno del servidor.'
       }
    */
    transaccionCtrl.getTransaccionesOrigenDestinoParams(req, res);
});

// POST /api/transaccion
router.post('/', (req, res) => {
    /* #swagger.tags = ['Transacciones (P2)']
       #swagger.summary = 'Registrar una nueva transacción'
       #swagger.description = 'Guarda el registro de una nueva traducción realizada por un cliente.'
       #swagger.parameters['body'] = {
           in: 'body',
           description: 'Datos de la traducción a registrar.',
           required: true,
           schema: { $ref: '#/definitions/Transaccion' }
       }
       #swagger.responses[201] = {
           description: 'Transacción de traducción registrada correctamente.',
           schema: { $ref: '#/definitions/Transaccion' }
       }
    */
    transaccionCtrl.createTransaccion(req, res);
});

module.exports = router;