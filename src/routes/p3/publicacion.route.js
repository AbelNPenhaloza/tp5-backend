const express = require('express');
const router = express.Router();
const publicacionCrtl = require('../../controllers/p3/publicacion.controller');
const publicacionCtrl = require('../../controllers/p3/publicacion.controller');

router.get('/', publicacionCrtl.getPublicaciones);
router.get('/buscar', publicacionCtrl.getPublicacionesTituloVigencia); // /api/publicacion/buscar?titulo=hola&vigencia=true
router.post('/', publicacionCtrl.createPublicacion);
router.put('/:id', publicacionCtrl.updatePublicacion);
router.delete('/:id', publicacionCtrl.deletePublicacion);
router.patch('/:id/restore', publicacionCtrl.restorePublicacion);

module.exports = router;