const UsersModel = require('../models/Users_Model');

exports.login = async (req, res) => {
  const { username, password } = req.body;
  if(!username || !password) {
    return res.json({ 
      error: { 
        status: 500,
        msg: 'username y password son obligatorios'
      }, 
      
    });
  }

  const user  = await UsersModel.findOne({ username });
  
  if (!user) {
    return res.json({ 
      error: { 
        status: 500,
        msg: 'El usuario no existe'
      }, 
      
    });
  }

  if (user.password !== password) {
    return res.json({ 
      error: { 
        status: 500, 
        msg: 'password incorrecta'
      },
    });
  }
  
  res.json({ Ok: { status: 200 }, user });
};