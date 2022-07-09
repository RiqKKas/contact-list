const User = require('../models/UserModel');

function index(req, res) {
  res.render('login');
}

async function register(req, res) {
  try {
    const user = new User(req.body);
    const isRegistered = await user.register();

    if (!isRegistered) {
      req.flash('errors', user.errors);
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
    const user = new User(req.body);
    const isRegistered = await user.login();

    if (!isRegistered) {
      req.flash('errors', user.errors);
      req.session.save(function () {
        return res.redirect('back');
      });

      return;
    }

    req.flash('success', 'Usuário logado.');
    req.session.user = user.document;
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