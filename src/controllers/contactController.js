const Contact = require('../models/ContactModel');

function index(req, res) {
  res.render('contact', { contact: {} });
}

async function register(req, res) {
  try {
    const contact = new Contact(req.body, req.session.user._id);
    const isRegistered = await contact.register();

    if (!isRegistered) {
      req.flash('errors', contact.errors);
      req.session.save(function () {
        return res.redirect('back');
      });

      return;
    }

    req.flash('success', 'Contato registrado.');
    req.session.save(function () {
      return res.redirect('/');
    });
  } catch (error) {
    console.log(error);
    return res.render('404');
  }
}


async function editIndex(req, res) {
  if (!req.params.id) return res.render('404');

  const contact = await Contact.findByIndex(req.params.id);

  if (!contact) return res.render('404');

  res.render('contact', { contact });
}

async function edit(req, res) {
  try {
    if (!req.params.id) return res.render('404');
    const contact = new Contact(req.body, req.session.user._id);
    const isUpdated = await contact.edit(req.params.id);

    if (!isUpdated) {
      req.flash('errors', contact.errors);
      req.session.save(function () {
        return res.redirect('back');
      });

      return;
    }

    req.flash('success', 'Contato atualizado.');
    req.session.save(function () {
      return res.redirect('/');
    });
  } catch (error) {
    console.log(error);
    return res.render('404');
  }
}

async function deleteByIndex(req, res) {
  try {
    if (!req.params.id) return res.render('404');

    const contact = Contact.deleteByIndex(req.params.id);
    if (!contact) return res.render('404');

    req.flash('success', 'Contato deletado.');
    req.session.save(function () {
      return res.redirect('back');
    });
  } catch (error) {
    console.log(error);
    return res.render('404');
  }
}

module.exports = { index, register, editIndex, edit, deleteByIndex };