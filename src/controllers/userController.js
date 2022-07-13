const User = require('../models/UserModel');

function loginIndex(req, res) {
  res.render('login');
}

function registerIndex(req, res) {
  res.render('register');
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

    req.flash('success', 'Usuário registrado.');
    req.session.save(function () {
      return res.redirect('/user/login');
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
  req.session.destroy(function (err) {
    res.redirect('/');
  });
}

module.exports = { loginIndex, registerIndex, register, login, logout };