const UsersModel = require('../models/Users_Model');
const RolesModel = require('../models/Roles_Model');
const jwt = require('jsonwebtoken');
const config = require('../config');

exports.getAll = async (req, res) => {
  const users = await UsersModel.find();
  if (!users){ 
    return res.json({ 
      error: { 
        status: 500, 
        msg: 'error de conexion a la base de datos' 
      }});
  }
  res.json({ Ok: { status: 200,  }, users});
};

exports.get = async(req, res) => {
  const { id } = req.params;
  if(!id) {
    return res.json({
      error: {
        status: 500,
        msg: 'USUARIO NO VALIDO'
      }
    });
  }

  try {
    const user = await UsersModel.findById(id);
    if(!user) {
      return res.json({
        error: {
          status: 500,
          msg: 'Usuario no encontrado'
        }
      });
    }
  
    res.json({
      Ok: {
        status: 200,
        user
      }
    });

  } catch(error) {
    console.log('ERROR : ', error)
    res.json({
      error: {
        status: 500,
        msg: 'Error al buscar usuario'
      }
    });
  }

};

exports.create = async (req, res) => {
  const { username, password, rolId, status } = req.body;
  if (!username || !password || !rolId || status === undefined || status === null){
    return res.json({
      error: { 
        status: 500, 
        msg: 'username, password, rol, status son obligatorios' 
    }});
  }
  
  const rol = await RolesModel.findById(rolId, { users: 0 });
  if(!rol) {
    console.log('El rol no existe')
    return res.json({
      error: {
        status: 500,
        msg: 'el rol no existe'
      }
    });
  }

  const user = new UsersModel({ 
    username,
    password,
    rol,
    status
  });
  
  const token = await jwt.sign({ id: user._id }, config.secretToken, { expiresIn: 60 * 60 * 72 });
  user.access_token = token;

  try {
    await user.save();
    res.status(200).json({ Ok: { status: 200 }, user});
    
  } catch(error) {
    console.error('\n\n\n', error);

    res.json({ 
      error: { status: 500 }, 
      msg: 'error al guardar en la base de datos' 
    });

  };
  
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { username, password, rolId, status} = req.body;
  if (!id || !username || !password || !rolId || status === undefined || status === null){
    return res.json({
      error: { 
        status: 500, 
        msg: 'id, username, password, rol y status son obligatorios' 
    }});
  }

  const user = await UsersModel.findById(id);
  if(!user) {
    return res.json({
      error: {
        status: 500,
        msg: 'Usuario no encontrado'
      }
    });
  }

  const rol = await RolesModel.findById(rolId);
  if(!rol) {
    return res.json({
      error: {
        status: 500,
        msg: 'El Rol no existe'
      }
    });
  }

  user.username = username;
  user.password = password;
  user.rol = rol;
  user.status = status;

  try {
    await user.save();
    res.json({ Ok: { status: 200 }, user });

  } catch(error) {
    console.log(error);
    res.json({ 
      error: { 
        status: 500, 
        msg: 'ERROR AL ACTUALIZAR'
      } 
    })
  }

};

exports.delete = async (req, res) => {
  console.log('req.params : ', req.params);
  const id = req.params.id;
  if(!id) {
    return res.json({ error: { status: 500, msg: 'registro sin especificar' } });
  }

  try {
    await UsersModel.findByIdAndRemove(id);
    res.json({ Ok: { status: 200 } });
  } catch(error) {
    console.log(error);
    res.json({ error: { status: 500, msg: 'no se pudo eliminar el registro' } });
  }
};