const express = require('express');
const router = express.Router();
const empleadoCtrl = require('../../controllers/p3/empleado.controller');

// GET /api/empleado
router.get('/', (req, res) => {
    /* #swagger.tags = ['Empleados (P3)']
       #swagger.summary = 'Obtener todos los empleados'
       #swagger.description = 'Retorna un listado completo con todos los empleados registrados en el sistema.'
       #swagger.responses[200] = {
           description: 'Lista de empleados obtenida de forma exitosa.',
           schema: [{ $ref: '#/definitions/Empleado' }]
       }
    */
    empleadoCtrl.getEmpleados(req, res);
});

// GET /api/empleado/:id
router.get('/:id', (req, res) => {
    /* #swagger.tags = ['Empleados (P3)']
       #swagger.summary = 'Obtener un empleado por ID'
       #swagger.description = 'Recupera la información detallada de un empleado específico mediante su identificador numérico.'
       #swagger.parameters['id'] = {
           in: 'path',
           description: 'ID único del empleado que se desea consultar.',
           required: true,
           type: 'integer'
       }
       #swagger.responses[200] = {
           description: 'Empleado encontrado con éxito.',
           schema: { $ref: '#/definitions/Empleado' }
       }
    */
    empleadoCtrl.getEmpleado(req, res);
});

// POST /api/empleado
router.post('/', (req, res) => {
    /* #swagger.tags = ['Empleados (P3)']
       #swagger.summary = 'Crear un nuevo empleado'
       #swagger.description = 'Registra un empleado en el sistema con sus datos de contacto y legajo básico.'
       #swagger.parameters['body'] = {
           in: 'body',
           description: 'Estructura de datos para dar de alta al empleado.',
           required: true,
           schema: { $ref: '#/definitions/Empleado' }
       }
       #swagger.responses[201] = {
           description: 'Empleado registrado exitosamente.',
           schema: { $ref: '#/definitions/Empleado' }
       }
    */
    empleadoCtrl.createEmpleado(req, res);
});

// DELETE /api/empleado/:id
router.delete('/:id', (req, res) => {
    /* #swagger.tags = ['Empleados (P3)']
       #swagger.summary = 'Desactivar un empleado (Baja Lógica)'
       #swagger.description = 'Aplica un estado de inhabilitación (soft delete) sobre el registro del empleado especificado.'
       #swagger.parameters['id'] = {
           in: 'path',
           description: 'ID del empleado que será dado de baja lógica.',
           required: true,
           type: 'integer'
       }
       #swagger.responses[200] = {
           description: 'Empleado dado de baja exitosamente.'
       }
    */
    empleadoCtrl.deleteEmpleado(req, res);
});

// PATCH /api/empleado/:id/restore
router.patch('/:id/restore', (req, res) => {
    /* #swagger.tags = ['Empleados (P3)']
       #swagger.summary = 'Restaurar un empleado inactivo'
       #swagger.description = 'Revierte la baja lógica (soft delete) de un empleado registrado, volviendo a habilitar su cuenta.'
       #swagger.parameters['id'] = {
           in: 'path',
           description: 'ID del empleado que se desea rehabilitar.',
           required: true,
           type: 'integer'
       }
       #swagger.responses[200] = {
           description: 'Empleado reactivado con éxito.'
       }
    */
    empleadoCtrl.restoreEmpleado(req, res);
});

module.exports = router;