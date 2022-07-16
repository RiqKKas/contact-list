const express = require('express');
const router = express.Router();

const { loginRequired } = require('../middlewares/authentication');

//controllers
const homeController = require('../controllers/homeController');
const userController = require('../controllers/userController');
const contactController = require('../controllers/contactController');

//rota home
router.get('/', homeController.index);

//rotas user
router.get('/user/login', userController.index);
router.post('/user/login', userController.login);
router.get('/user/register', userController.registerIndex);
router.post('/user/register', userController.register);
router.get('/user/logout', userController.logout);

//rotas contact
router.get('/contact/index', loginRequired, contactController.index);
router.post('/contact/register', loginRequired, contactController.register);
router.get('/contact/index/:id', loginRequired, contactController.editIndex);
router.post('/contact/edit/:id', loginRequired, contactController.edit);
router.get('/contact/delete/:id', loginRequired, contactController.deleteByIndex);

module.exports = router;