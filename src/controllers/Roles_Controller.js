const RolesModel = require('../models/Roles_Model');

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
    })
  }
}; 