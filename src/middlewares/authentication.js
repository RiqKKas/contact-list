const session = require('express-session'); //modulo para salvar sessao na memoria
const MongoStore = require('connect-mongo'); //armazenamento de sessao no MongoDB

function sessionOptions() {
  return session({
    secret: 'freeze',
    store: MongoStore.create({ mongoUrl: process.env.CONNECTION_MONGO }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, //24hrs
      httpOnly: true
    }
  });
}

function loginRequired(req, res, next) {
  if (!req.session.user) {
    req.flash('erros', 'Login necessário para esta ação.');
    req.session.save(() => { res.redirect('/') });
    return;
  }

  next();
}

function addGlobalVariables(req, res, next) {
  res.locals.errors = req.flash('errors');
  res.locals.success = req.flash('success');
  res.locals.user = req.session.user;
  next();
}

module.exports = { loginRequired, sessionOptions, addGlobalVariables };