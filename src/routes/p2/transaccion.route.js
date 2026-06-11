const express = require('express');
const router = express.Router();
const transaccionCtrl = require('../../controllers/p2/transaccion.controller');

router.get('/', transaccionCtrl.getTransacciones);
router.get('/email', transaccionCtrl.getTransaccionesEmail); // /api/transaccion/email?email= xxx
router.get('/idioma/:idioma', transaccionCtrl.getTransaccionesIdioma); // /api/transaccion/idioma/es-espaniol
router.post('/', transaccionCtrl.createTransaccion);

module.exports = router;