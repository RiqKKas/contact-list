function includeVerificationToken(req, res, next) {
  res.locals.csrfToken = req.csrfToken(); //csrfToken acessivel nas views
  next();
}

function checkCsurfError(err, req, res, next) {
  if (err) return res.render('404');
  next();
}

module.exports = { includeVerificationToken, checkCsurfError };