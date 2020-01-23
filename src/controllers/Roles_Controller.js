const RolesModel = require('../models/Roles_Model');

exports.get = async (req, res) => {
  const { id } = req.params;
  if(!id) {
    return res.json({
      error: {
        status: 500,
        msg: 'rol no especificado'
      }
    });
  }

  try {
    const rol = await RolesModel.findById(id);
    if(!rol) {
      return res.json({
        error: {
          status: 500,
          msg: 'el rol no existe'
        }
      });
    }
    res.json({ Ok: { status: 200 }, rol });

  } catch(error) {
    console.log('error : ', error);
    res.json({
      error: {
        status: 500,
        msg: 'Error al buscar Rol'
      }
    });
  }
}


exports.getAll = async (req, res) => {
  const roles = await RolesModel.find();
  if (!roles) {
    return res.status(500).json({ 
      error: { 
        status: 500, 
        msg: 'error de conexion a la base de datos' 
      }});
  }
  res.json({ Ok: { status: 200,  }, roles});
}


exports.create = async (req, res) => {
  const { name, level } = req.body;
  if(!name || !level) {
    return res.json({
      error: {
        status: 500,
        msg: 'name y level son obligatorios'
      }
    });
  }
  const rol = new RolesModel({ name, level });
  try {
    await rol.save();
    res.json({
      Ok: {
        status: 200
      },
      rol
    });
  } catch(error) {
    res.json({
      error: {
        status: 500,
        msg: 'Error al guardar rol'
      }
    });
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { name, level } = req.body;

  if(!id || !name || !level) {
    return res.json({
      error: {
        status: 500,
        msg: 'id, name y level son requeridos'
      }
    });
  }

  const rol = await RolesModel.findById(id);
  if(!rol) {
    return res.json({
      error: {
        status: 500,
        msg: 'rol no encontrado '
      }
    });
  }

  rol.name = name;
  rol.level = level;
  
  try {
    await rol.save();
    res.json({ Ok: { status: 200 }, rol });
    
  } catch(error) {
    console.log('error : ', error);
    res.json({
      error: {
        status: 500,
        msg: 'error al actualizar rol'
      }
    });
  }

};

exports.delete = async (req, res) => {
  const { id } = req.params;
  if(!id) {
    return res.json({
      error: {
        status: 500,
        msg: 'Rol sin espcesificar'
      }
    });
  }

  try {
    await RolesModel.findByIdAndRemove(id);
    res.json({ Ok: { status: 200 } });

  } catch(error) {
    console.log('error : ', error);
    res.json({
      error: {
        status: 500,
        msg: 'Error al eliminar rol'
      }
    });

  }
};