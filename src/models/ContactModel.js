const { Schema, model, isValidObjectId } = require('mongoose');
const validator = require('validator');

const ContactSchema = new Schema({
  nome: { type: String, required: true },
  sobrenome: { type: String, required: false, default: '' },
  email: { type: String, required: false, default: '' },
  telefone: { type: String, required: false, default: '' },
  user_id: { type: String, required: true },
  created_in: { type: Date, default: Date.now() }
});

const ContactModel = model('Contact', ContactSchema);

class Contact {
  constructor({ nome, sobrenome, email, telefone }, userId) {
    this.nome = this.cleanUp(nome);
    this.sobrenome = this.cleanUp(sobrenome);
    this.email = this.cleanUp(email);
    this.telefone = this.cleanUp(telefone);
    this.userId = this.cleanUp(userId);
    this.errors = [];
    this.contact = null;
  }

  async register() {
    this.validate();
    if (this.errors.length > 0) return false;

    this.contact = await ContactModel.create({
      nome: this.nome,
      sobrenome: this.sobrenome,
      email: this.email,
      telefone: this.telefone,
      user_id: this.userId
    });

    return true;
  }

  static async findByIndex(id) {
    if (typeof id !== 'string') return null;
    else return await ContactModel.findById(id);
  }

  static async findAllByIndex(id) {
    if (typeof id !== 'string') return null;
    else return await ContactModel.find({ user_id: id }).sort({ created_in: -1 });
  }

  async edit(id) {
    if (typeof id !== 'string') return false;
    this.validate();
    if (this.errors.length > 0) return false;

    this.contact = await ContactModel.findByIdAndUpdate(id, {
      nome: this.nome,
      sobrenome: this.sobrenome,
      email: this.email,
      telefone: this.telefone,
    }, { new: true });

    return true;
  }

  static async deleteByIndex(id) {
    if (typeof id !== 'string') return null;
    else return await ContactModel.findByIdAndDelete(id);
  }

  validate() {
    if (this.email && !validator.isEmail(this.email)) this.errors.push('E-mail inválido');
    if (!this.nome) this.errors.push('Nome é um campo obrigatório.');
    if (!this.email && !this.nome) this.errors.push('Um destes contatos deve ser informados: e-mail ou telefone.');
  }

  cleanUp(value) {
    if (typeof value !== 'string') return '';
    else return value;
  }
}

module.exports = Contact;