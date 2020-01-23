const UsersModel = require('../models/Users_Model');

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user  = await UsersModel.findOne({ username });

  if (!user) {
    return res.status(404).json({ 
      error: { status: 404 }, 
      msg: 'El usuario no existe'
    });
  }

  if (user.password !== password) {
    return res.status(401).json({ 
      error: { status: 401 },
      msg: 'password incorrecta'
    });
  }
  
  res.json({ Ok: { status: 200 } });
};

exports.logged = (req, res) => {
  res.json({ Ok: { status: 200 } });
};


exports.logout = (req, res) => {
  
  res.json({ Ok: { status: 200 } });
};
