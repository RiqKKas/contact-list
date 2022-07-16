const mongoose = require('mongoose'); //modulo para manipulacao da base de dados mongodb
const { DB_USERNAME, DB_PASSWORD, DB_HOSTNAME, DB_PORT, DB_DATABASE } = process.env; //definidos no arquivo .env

mongoose.connection.on('open', () => {
  console.log('Conectado com sucesso ao banco de dados.');
});

mongoose.connection.on('error', () => {
  throw new Error('Nao foi possivel conectar ao MongoDB.');
});

const uri = `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOSTNAME}:${DB_PORT}/${DB_DATABASE}?authSource=admin`;

const config = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

module.exports = { connect: () => mongoose.connect(uri, config), uri };