const LoginModel = require('../models/LoginModel');

function index(req, res) {
  res.render('login');
}

async function register(req, res) {
  try {
    const login = new LoginModel(req.body);
    const isRegistered = await login.register();

    if (!isRegistered) {
      req.flash('errors', login.errors);
      req.session.save(function () {
        return res.redirect('back');
      });

      return;
    }

    req.flash('success', 'Usuário registrado com sucesso.');
    req.session.save(function () {
      return res.redirect('back');
    });
  } catch (error) {
    console.log(error);
    return res.render('404');
  }
}

module.exports = { index, register };