function checkCsurfError(err, req, res, next) {
  if (err) return res.render('404');
  next();
}

function includeVerificationToken(req, res, next) {
  res.locals.csrfToken = req.csrfToken();
  next();
}

function addGlobalVariables(req, res, next) {
  res.locals.errors = req.flash('errors');
  res.locals.success = req.flash('success');
  res.locals.user = req.session.user;
  next();
}

module.exports = { checkCsurfError, includeVerificationToken, addGlobalVariables };