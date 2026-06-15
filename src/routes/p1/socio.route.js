const express = require('express');
const router = express.Router();
const socioCtrl = require('../../controllers/p1/socio.controller');

// GET /api/socio
router.get('/', (req, res) => {
    /* #swagger.tags = ['Socios (P1)']
       #swagger.summary = 'Obtener todos los socios'
       #swagger.description = 'Retorna una lista completa con todos los socios registrados en el sistema.'
       #swagger.responses[200] = {
           description: 'Lista de socios obtenida correctamente.',
           schema: [{ $ref: '#/definitions/Socio' }]
       }
    */
    socioCtrl.getSocios(req, res);
});

// GET /api/socio/activo
router.get('/activo', (req, res) => {
    /* #swagger.tags = ['Socios (P1)']
       #swagger.summary = 'Obtener socios activos'
       #swagger.description = 'Filtra y retorna únicamente la lista de aquellos socios que tienen su estado activo.'
       #swagger.responses[200] = {
           description: 'Lista de socios activos obtenida con éxito.',
           schema: [{ $ref: '#/definitions/Socio' }]
       }
    */
    socioCtrl.getSociosActivo(req, res);
});

// POST /api/socio
router.post('/', (req, res) => {
    /* #swagger.tags = ['Socios (P1)']
       #swagger.summary = 'Crear un nuevo socio'
       #swagger.description = 'Registra un nuevo socio en el sistema con todos los datos correspondientes.'
       #swagger.parameters['body'] = {
           in: 'body',
           description: 'Datos necesarios para la creación del socio.',
           required: true,
           schema: { $ref: '#/definitions/Socio' }
       }
       #swagger.responses[201] = {
           description: 'Socio creado y guardado con éxito.',
           schema: { $ref: '#/definitions/Socio' }
       }
    */
    socioCtrl.createSocio(req, res);
});

// PUT /api/socio/:id
router.put('/:id', (req, res) => {
    /* #swagger.tags = ['Socios (P1)']
       #swagger.summary = 'Actualizar datos de un socio'
       #swagger.description = 'Permite la modificación parcial o total de la información de un socio usando su ID como parámetro.'
       #swagger.parameters['id'] = {
           in: 'path',
           description: 'ID de registro del socio a actualizar',
           required: true,
           type: 'integer'
       }
       #swagger.parameters['body'] = {
           in: 'body',
           description: 'Propiedades del socio que se desean actualizar.',
           required: true,
           schema: { $ref: '#/definitions/SocioUpdate' }
       }
       #swagger.responses[200] = {
           description: 'Socio actualizado correctamente.',
           schema: { $ref: '#/definitions/Socio' }
       }
    */
    socioCtrl.updateSocio(req, res);
});

// DELETE /api/socio/:id
router.delete('/:id', (req, res) => {
    /* #swagger.tags = ['Socios (P1)']
       #swagger.summary = 'Desactivar un socio (Baja Lógica)'
       #swagger.description = 'Realiza un "soft delete" sobre el socio especificado por ID, cambiando su estado de activo a inactivo sin eliminar el registro físico.'
       #swagger.parameters['id'] = {
           in: 'path',
           description: 'ID del socio a dar de baja de manera lógica',
           required: true,
           type: 'integer'
       }
       #swagger.responses[200] = {
           description: 'Socio desactivado lógicamente con éxito.'
       }
    */
    socioCtrl.deleteSocio(req, res);
});

// PATCH /api/socio/:id/restore
router.patch('/:id/restore', (req, res) => {
    /* #swagger.tags = ['Socios (P1)']
       #swagger.summary = 'Restaurar un socio desactivado'
       #swagger.description = 'Revierte la baja lógica (soft delete) del socio especificado por ID, devolviéndole su estado activo.'
       #swagger.parameters['id'] = {
           in: 'path',
           description: 'ID del socio a restaurar en el sistema',
           required: true,
           type: 'integer'
       }
       #swagger.responses[200] = {
           description: 'Socio restaurado de manera exitosa.'
       }
    */
    socioCtrl.restoreSocio(req, res);
});

module.exports = router;