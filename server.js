require('dotenv').config(); //modulo para uso de arquivo .env, como dados sensiveis

const express = require('express');
const app = express();

const mongoose = require('mongoose');
//coneccao com o BD antes de iniciar o server
mongoose.connect(process.env.CONNECTION_MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.emit('connectedDB'); //sinal enviado quando a conexao ocorrer
  })
  .catch((error) => { console.log(error) });

const session = require('express-session'); //modulo para salvar sessao na memoria
const MongoStore = require('connect-mongo'); //armazenamento de sessao no MongoDB
const flash = require('connect-flash'); //mensagens são gravadas no flash e apagadas após serem exibidas ao usuário

const routes = require('./routes');
const path = require('path');

//seguranca
const csurf = require('csurf');
const { checkCsurfError, includeVerificationToken } = require('./src/middlewares/security');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//servindo conteudo estatico de /public
app.use(express.static(path.resolve(__dirname, 'public')));

//iniciando uma middleare que cria uma sessao
const sessionOptions = session({
  secret: 'freeze',
  store: MongoStore.create({ mongoUrl: process.env.CONNECTION_MONGO }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true
  }
});

//usando middleare que cria sessao
app.use(sessionOptions);
app.use(flash());

//configuracoes do server
app.set('views', path.resolve(__dirname, 'src', 'views')); //pasta onde estao as views
app.set('view engine', 'ejs'); //engine pra renderizacao de ejs 

app.use(csurf());
app.use(includeVerificationToken);
app.use(checkCsurfError); 
app.use(routes);

app.on('connectedDB', () => {
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Acesse o servidor em: http://localhost:${PORT}`);
  });
});