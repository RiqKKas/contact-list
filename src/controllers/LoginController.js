const Login = require('../models/LoginModel');

function index(req, res) {
  res.render('login');
}

async function register(req, res) {
  try {
    const login = new Login(req.body);
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

async function login(req, res) {
  try {
    const login = new Login(req.body);
    const isRegistered = await login.login();

    if (!isRegistered) {
      req.flash('errors', login.errors);
      req.session.save(function () {
        return res.redirect('back');
      });

      return;
    }

    req.flash('success', 'Usuário logado.');
    req.session.user = login.user;
    req.session.save(function () {
      return res.redirect('/');
    });
  } catch (error) {
    console.log(error);
    return res.render('404');
  }
}

function logout(req, res) {
  req.session.destroy();
  res.redirect('/');
}

module.exports = { index, register, login, logout };