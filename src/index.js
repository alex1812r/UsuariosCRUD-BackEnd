const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session');
require('./database');

// CREAR APLICACIÓN
const app = express();

// CONFIGURACIONES
app.set('port', process.env.PORT || 5000); // PUERTO DE LA APLICACIÓN

// MIDDLEWARES
app.use(morgan('dev')); // VER PETICIONES POR CONSOLA
app.use(cors()); // HABILITAR LOS CORS
app.use(express.json()); // ACEPTAR PETICIONES TIPO JSON
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'secrect',
  resave: false,
  saveUninitialized: false
}));

// RUTAS
app.use('/api/users', require('./routes/Users_Routes'));
app.use('/api/login', require('./routes/Login_Routes'));
app.use('/api/roles', require('./routes/Roles_Routes'));
app.use('/api/logs', require('./routes/Logs_Routes'));

// INICIAR APLICCION
app.listen(app.get('port'), () => {
  console.log('Server en Puerto : ', app.get('port'));
});