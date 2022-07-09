function checkCsurfError(err, req, res, next) {
  if (err) return res.render('404');
  next();
}

function includeVerificationToken(req, res, next) {
  res.locals.csrfToken = req.csrfToken();
  next();
}

module.exports = { checkCsurfError, includeVerificationToken };