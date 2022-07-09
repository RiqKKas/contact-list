const Contact = require('../models/ContactModel');

async function index(req, res) {
  const id = req.session.user ? req.session.user._id : null;
  const contacts = await Contact.findAllByIndex(id);
  res.render('index', { contacts });
}

module.exports = { index };