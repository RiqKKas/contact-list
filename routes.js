const express = require('express');
const router = express.Router();

//controllers
const homeController = require('./src/controllers/HomeController');
const loginController = require('./src/controllers/LoginController');

router.get('/', homeController.index);

router.get('/login/index', loginController.index);
router.post('/login/register', loginController.register);

module.exports = router;