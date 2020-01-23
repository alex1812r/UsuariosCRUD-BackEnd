const mongoose = require('mongoose');

const user ="ArUsuariosCRUD";
const pass =  "788y6oQXI1gS8vKF";
const db = 'UsuariosCRUD'; 
const uri = 
  `mongodb+srv://${user}:${pass}@cluster0-zx4ma.mongodb.net/${db}?retryWrites=true&w=majority`;
  // `mongodb://localhost:27017/${db}`;

mongoose.connect(uri, { useNewUrlParser: true , useUnifiedTopology: true })
  .then( db => {
    console.log('Conectado a la Base de Datos');
  })
  .catch( error => {
    console.log('error: ', error);
  });

module.exports = mongoose;
