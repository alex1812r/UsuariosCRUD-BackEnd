const express = require('express');
const router = express.Router();
const RolesControllers = require('../controllers/Roles_Controller');

router.get('/', RolesControllers.getAll);

router.post('/', RolesControllers.create);

router.put('/', (req, res) => {
  res.send('PUT ROLES');
});

router.delete('/', (req, res) => {
  res.send('DELETE ROLES');
});

module.exports = router;