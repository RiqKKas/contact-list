const { Schema, model } = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true }
});

const UserModel = model('users', UserSchema);

class User {
  constructor({ email, password, passwordConfirmation }) {
    this.email = this.cleanUp(email);
    this.password = this.cleanUp(password);
    this.passwordConfirmation = this.cleanUp(passwordConfirmation);
    this.errors = [];
    this.document = null;
  }

  async register() {
    this.validate();

    if (this.errors.length > 0) return false;

    await this.userExists();

    if (this.errors.length > 0) return false;

    const salt = bcrypt.genSaltSync();
    this.password = bcrypt.hashSync(this.password, salt); //hash da senha
    this.document = await UserModel.create({ email: this.email, password: this.password });

    return true;
  }

  async login() {
    this.validate();
    if (this.errors.length > 0) return false;

    this.document = await UserModel.findOne({ email: this.email });

    if (
      !this.document ||
      !bcrypt.compareSync(this.password, this.document.password)
      ) {
      this.errors.push('Email ou senha inválidos.');
      return false;
    }

    return true;
  }

  validate() {
    if (!validator.isEmail(this.email)) this.errors.push('E-mail inválido.');
    if (
      this.password.length < 3
      || this.password.length > 50
    ) {
      this.errors.push('A senha precisa ter entre 3 e 50 caracteres.');
    } 
    if (this.passwordConfirmation && this.password !== this.passwordConfirmation) {
      this.errors.push('As senhas não coincidem.');
    }
  }

  async userExists() {
    const user = await UserModel.findOne({ email: this.email });
    if (user) this.errors.push('Usuário já existe.');
  }

  cleanUp(value) {
    if (typeof value !== 'string') return '';
    else return value;
  }
}

module.exports = User;