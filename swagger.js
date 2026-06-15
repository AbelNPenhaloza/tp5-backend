const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'API de Gestión Integrada - TP5',
    description: 'Documentación interactiva de las APIs para Socios, Transacciones (Traducciones), Empleados y Publicaciones de la cátedra.',
    version: '1.0.0'
  },
  host: 'localhost:3000',
  basePath: '/',
  schemes: ['http'],
  
  tags: [
    {
      name: 'Socios (P1)',
      description: 'Operaciones para dar de alta, listar, actualizar, dar de baja lógica y restaurar Socios.'
    },
    {
      name: 'Transacciones (P2)',
      description: 'Registro de transacciones de traducción de idiomas y consultas por email o idioma.'
    },
    {
      name: 'Empleados (P3)',
      description: 'Gestión administrativa de empleados con borrado lógico.'
    },
    {
      name: 'Publicaciones (P3)',
      description: 'Publicaciones digitales de los empleados con filtros de vigencia y título.'
    }
  ],

  definitions: {
    Socio: {
      nombre: 'Juan',
      apellido: 'Perez',
      foto: 'https://i.pravatar.cc/300',
      dni: '12345678',
      numeroSocio: 5,
      activo: true
    },
    SocioUpdate: {
      nombre: 'Facundo',
      apellido: 'Alarcon'
    },
    Transaccion: {
      idiomaOrigen: 'es-español',
      textoOrigen: 'Hola mundo',
      idiomaDestino: 'en-english',
      textoDestino: 'Hello world',
      emailCliente: 'juan@mail.com'
    },
    Empleado: {
      apellido: 'Cachi',
      nombre: 'Mariana',
      dni: '36345678',
      email: 'mcachi@mail.com'
    },
    Publicacion: {
      titulo: 'Mi título 2',
      contenido: 'Las sociedades en la era de la IA',
      imagenAsociada: 'base64...',
      fechaPublicacion: '2026-03-12',
      empleadoId: 2,
      vigente: true
    },
    PublicacionUpdate: {
      titulo: 'Nuevo Titulo'
    }
  }
};

const outputFile = './swagger_output.json';
// Indicamos a swagger-autogen que analice nuestro index.js
const endpointsFiles = ['./index.js']; 

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log('¡Documentación de Swagger generada con éxito en swagger_output.json!');
});