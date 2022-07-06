const { Schema, model } = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const LoginSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true }
});

const LoginModel = model('Login', LoginSchema);

class Login {
  constructor({ email, password }) {
    this.email = this.cleanUp(email);
    this.password = this.cleanUp(password);
    this.errors = [];
    this.user = null;
  }

  async register() {
    this.validate();

    if (this.errors.length > 0) return false;

    await this.userExists();

    if (this.errors.length > 0) return false;

    const salt = bcrypt.genSaltSync();
    this.password = bcrypt.hashSync(this.password, salt); //hash da senha

    try {
      this.user = await LoginModel.create({ email: this.email, password: this.password });
    } catch (err) {
      console.log(err);
    }

    return true;
  }

  validate() {
    if (!validator.isEmail(this.email)) this.errors.push('E-mail inválido');
    if (
      this.password.length < 3
      || this.password.length > 50
    ) {
      this.errors.push('A senha precisa ter entre 3 e 50 caracteres');
    }
  }

  async userExists() {
    const user = await LoginModel.findOne({ email: this.email });
    if(user) this.errors.push('Usuário já existe.');
  }

  cleanUp(value) {
    if (typeof value !== 'string') return '';
    else return value;
  }
}

module.exports = Login;