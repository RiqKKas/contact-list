function checkCsurfError(err, req, res, next) {
  if (err && err.code === 'EBADCSRFTOKEN') {
    return res.render('404');
  }
}

function includeVerificationToken(req, res, next) {
  res.locals.csrfToken = req.csrfToken();
  next();
}

module.exports = { checkCsurfError, includeVerificationToken };