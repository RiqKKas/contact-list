const { Schema, model } = require('mongoose');
const validator = require('validator');

const ContactSchema = new Schema({
  nome: { type: String, required: true },
  email: { type: String, required: false, default: '' },
  telefone: { type: String, required: false, default: '' },
  user_id: { type: String, required: true },
  created_in: { type: Date, default: Date.now() }
});

const ContactModel = model('Contact', ContactSchema);

class Contact {
  constructor({ nome, email, telefone }, userId) {
    this.nome = this.cleanUp(nome);
    this.email = this.cleanUp(email);
    this.telefone = this.cleanUp(telefone);
    this.userId = this.cleanUp(userId);
    this.errors = []; //feedbacks dos impedimentos
    this.document = null; //representacao dos dados salvos no bd da ocorrencia
  }

  async register() {
    this.validate();
    if (this.errors.length > 0) return false;

    this.document = await ContactModel.create({
      nome: this.nome,
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

    this.document = await ContactModel.findByIdAndUpdate(id, {
      nome: this.nome,
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
    if (this.email && !validator.isEmail(this.email)) this.errors.push('E-mail inválido.');
    if (!this.nome) this.errors.push('Nome é um campo obrigatório.');
    if (!this.email && !this.nome) this.errors.push('Um destes contatos deve ser informados: e-mail ou telefone.');
  }

  cleanUp(value) {
    if (typeof value !== 'string') return '';
    else return value;
  }
}

module.exports = Contact;