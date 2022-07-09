const express = require('express');
const router = express.Router();

const { loginRequired } = require('./src/middlewares/authentication');

//controllers
const homeController = require('./src/controllers/HomeController');
const loginController = require('./src/controllers/LoginController');
const contactController = require('./src/controllers/ContactController');

router.get('/', homeController.index);

router.get('/login/index', loginController.index);
router.post('/login/register', loginController.register);
router.post('/login/login', loginController.login);
router.get('/login/logout', loginController.logout);

router.get('/contact/index', loginRequired, contactController.index);
router.post('/contact/register', loginRequired, contactController.register);
router.get('/contact/index/:id', loginRequired, contactController.editIndex);
router.post('/contact/edit/:id', loginRequired, contactController.edit);
router.get('/contact/delete/:id', loginRequired, contactController.deleteByIndex);

module.exports = router;