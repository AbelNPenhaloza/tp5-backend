const express = require('express');
const router = express.Router();
const socioCtrl = require('../../controllers/p1/socio.controller');

router.get('/', socioCtrl.getSocios);
router.get('/activo', socioCtrl.getSociosActivo);// /api/socio/activo
router.post('/', socioCtrl.createSocio);
router.put('/:id', socioCtrl.updateSocio);
router.delete('/:id', socioCtrl.deleteSocio);
router.patch('/:id/restore', socioCtrl.restoreSocio); // Restaurar soft delete

module.exports = router;