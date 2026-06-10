require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT || 'postgres',
        logging: false
    }
);
//Probar conexion
sequelize.authenticate()
    .then(() => console.log('la DB esta conectada a PostgreSQL'))
    .catch(err => console.error('Error al conectar a PostgreSQL: ', err));

module.exports = sequelize;


