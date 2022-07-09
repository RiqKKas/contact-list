function loginRequired(req, res, next) {
  if (!req.session.user) {
    req.flash('erros', 'Login necessário para esta ação.');
    req.session.save(() => { res.redirect('/') });
    return;
  }

  next();
}

module.exports = { loginRequired };