const mongoose = require('mongoose'); //modulo para manipulacao da base de dados mongodb

mongoose.connection.on('open', () => {
  console.log('Successfully connected to database.');
});

mongoose.connection.on('error', () => {
  throw new Error('Could not connect to MongoDB.');
});

const config = {
  uri: process.env.CONNECTION_MONGO,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
}

module.exports = { connect: () => mongoose.connect(config.uri, config.options) };