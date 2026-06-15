const express = require('express');
const router = express.Router();
const publicacionCtrl = require('../../controllers/p3/publicacion.controller');

// GET /api/publicacion
router.get('/', (req, res) => {
    /* #swagger.tags = ['Publicaciones (P3)']
       #swagger.summary = 'Obtener todas las publicaciones'
       #swagger.description = 'Retorna una lista con todas las publicaciones almacenadas en el sistema (activas e inactivas).'
       #swagger.responses[200] = {
           description: 'Lista de publicaciones obtenida correctamente.',
           schema: [{ $ref: '#/definitions/Publicacion' }]
       }
    */
    publicacionCtrl.getPublicaciones(req, res);
});

// GET /api/publicacion/buscar
router.get('/buscar', (req, res) => {
    /* #swagger.tags = ['Publicaciones (P3)']
       #swagger.summary = 'Buscar publicaciones por título y vigencia'
       #swagger.description = 'Filtra las publicaciones utilizando un término de búsqueda en el título y/o su estado de vigencia actual.'
       #swagger.parameters['titulo'] = {
           in: 'query',
           description: 'Parte del título de la publicación a buscar (ej: título)',
           required: false,
           type: 'string'
       }
       #swagger.parameters['vigencia'] = {
           in: 'query',
           description: 'Filtro por estado de vigencia (true o false)',
           required: false,
           type: 'string'
       }
       #swagger.responses[200] = {
           description: 'Publicaciones filtradas recuperadas con éxito.',
           schema: [{ $ref: '#/definitions/Publicacion' }]
       }
    */
    publicacionCtrl.getPublicacionesTituloVigencia(req, res);
});

// POST /api/publicacion
router.post('/', (req, res) => {
    /* #swagger.tags = ['Publicaciones (P3)']
       #swagger.summary = 'Crear una nueva publicación'
       #swagger.description = 'Crea y asocia una nueva publicación digital a un empleado autor.'
       #swagger.parameters['body'] = {
           in: 'body',
           description: 'Datos necesarios para la publicación (soporta imagenAsociada en Base64).',
           required: true,
           schema: { $ref: '#/definitions/Publicacion' }
       }
       #swagger.responses[201] = {
           description: 'Publicación creada y guardada con éxito.',
           schema: { $ref: '#/definitions/Publicacion' }
       }
    */
    publicacionCtrl.createPublicacion(req, res);
});

// PUT /api/publicacion/:id
router.put('/:id', (req, res) => {
    /* #swagger.tags = ['Publicaciones (P3)']
       #swagger.summary = 'Actualizar una publicación'
       #swagger.description = 'Permite modificar propiedades específicas o totales de una publicación existente mediante su ID.'
       #swagger.parameters['id'] = {
           in: 'path',
           description: 'ID de la publicación a modificar.',
           required: true,
           type: 'integer'
       }
       #swagger.parameters['body'] = {
           in: 'body',
           description: 'Atributos que se desean actualizar (ej. el título).',
           required: true,
           schema: { $ref: '#/definitions/PublicacionUpdate' }
       }
       #swagger.responses[200] = {
           description: 'Publicación actualizada correctamente.',
           schema: { $ref: '#/definitions/Publicacion' }
       }
    */
    publicacionCtrl.updatePublicacion(req, res);
});

// DELETE /api/publicacion/:id
router.delete('/:id', (req, res) => {
    /* #swagger.tags = ['Publicaciones (P3)']
       #swagger.summary = 'Baja lógica de una publicación'
       #swagger.description = 'Establece de forma lógica el estado inactivo para la publicación indicada por ID (soft delete).'
       #swagger.parameters['id'] = {
           in: 'path',
           description: 'ID de la publicación que se desea inhabilitar.',
           required: true,
           type: 'integer'
       }
       #swagger.responses[200] = {
           description: 'Publicación dada de baja lógicamente con éxito.'
       }
    */
    publicacionCtrl.deletePublicacion(req, res);
});

// PATCH /api/publicacion/:id/restore
router.patch('/:id/restore', (req, res) => {
    /* #swagger.tags = ['Publicaciones (P3)']
       #swagger.summary = 'Restaurar una publicación inactiva'
       #swagger.description = 'Revierte el borrado lógico de una publicación, devolviéndole su vigencia u operatividad en el sistema.'
       #swagger.parameters['id'] = {
           in: 'path',
           description: 'ID de la publicación a restaurar.',
           required: true,
           type: 'integer'
       }
       #swagger.responses[200] = {
           description: 'Publicación restaurada con éxito.'
       }
    */
    publicacionCtrl.restorePublicacion(req, res);
});

module.exports = router;