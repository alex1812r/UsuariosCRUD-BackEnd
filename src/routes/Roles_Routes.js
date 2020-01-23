const express = require('express');
const router = express.Router();
const RolesControllers = require('../controllers/Roles_Controller');

router.get('/:id', RolesControllers.get);

router.get('/', RolesControllers.getAll);

router.post('/', RolesControllers.create);

router.put('/:id', RolesControllers.update);

router.delete('/:id', RolesControllers.delete);

module.exports = router;