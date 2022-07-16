const Contact = require('../models/ContactModel');

async function index(req, res) {
  const userId = req.session.user ? req.session.user._id : null;
  const contacts = await Contact.findAllByIndex(userId); // lista dos contatos do usuario logado
  res.render('index', { contacts });
}

module.exports = { index };