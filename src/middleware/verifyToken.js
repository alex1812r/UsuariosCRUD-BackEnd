const jwt = require('jsonwebtoken');
const config = require('../config');

function verifyToken(req ,res, next) {
  const token = req.headers['access_token'];
  if (!token){
    return res.status(401).json({
      error: { status: 401, msg: 'acceso denegado' }
    });
  }
  const decoded = jwt.verify(token, config.secretToken);
  req.userId = decoded.id;
  next();
}

module.exports = verifyToken;