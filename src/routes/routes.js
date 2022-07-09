const express = require('express');
const router = express.Router();

const { loginRequired } = require('../middlewares/authentication');

//controllers
const homeController = require('../controllers/homeController');
const loginController = require('../controllers/userController');
const contactController = require('../controllers/contactController');

router.get('/', homeController.index);

//rotas de user
router.get('/user/index', loginController.index);
router.post('/user/register', loginController.register);
router.post('/user/login', loginController.login);
router.get('/user/logout', loginController.logout);

//rotas de contact
router.get('/contact/index', loginRequired, contactController.index);
router.post('/contact/register', loginRequired, contactController.register);
router.get('/contact/index/:id', loginRequired, contactController.editIndex);
router.post('/contact/edit/:id', loginRequired, contactController.edit);
router.get('/contact/delete/:id', loginRequired, contactController.deleteByIndex);

module.exports = router;