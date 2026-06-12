require('dotenv').config();

const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');

const app = express();

//Middlewares
app.use(express.json({limit: '1mb'})); //Para imagenes base64
app.use(express.urlencoded({extended: true}));
app.use(cors({ origin: 'http://localhost:4200'}));

//Logging
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Rutas - P1 Socios
app.use('/api/socio', require('./src/routes/p1/socio.route'));

// Rutas - P2 Transacciones
app.use('/api/transaccion', require('./src/routes/p2/transaccion.route'));

//Rutas - P3 Empleados y Publicaciones
app.use('/api/empleado', require('./src/routes/p3/empleado.route'));
app.use('/api/publicacion', require('./src/routes/p3/publicacion.route'));

// Manejador 404
app.use(( req, res ) => {
    res.status(404).json({
        success: false,
        message: `Ruta ${req.method} ${req.url} no encontrada`
    });
});

// Setting
app.set('port', process.env.PORT || 3001);

// Sincronizar base de datos y arrancar servidor
sequelize.sync({ force: false, alter: false})
    .then(() => {
        console.log('Tablas de PostgreSQL sincronizadas');
        app.listen(app.get('port'), () => {
            console.log(`Servidor corriendo en http://localhost:${app.get('port')}`);
            console.log(`Socios: http://localhost:${app.get('port')}/api/socio`);
            console.log(`Transacciones: http://localhost:${app.get('port')}/api/transaccion`);
            console.log(`Empleados: http://localhost:${app.get('port')}/api/empleado`);
            console.log(`Publicaciones: http://localhost:${app.get('port')}/api/publicacion`);
        });
        })
        .catch(err => {
            console.error('Error al sincronizar: ', err);
        })
   