require('dotenv').config(); //modulo para uso de arquivo .env, como dados sensiveis

const express = require('express');
const app = express();

const path = require('path');
const { sessionOptions, addGlobalVariables } = require('./middlewares/authentication');
const flash = require('connect-flash'); //mensagens gravadas e apagadas apos serem exibidas ao usuario
const csurf = require('csurf');
const { checkCsurfError, includeVerificationToken } = require('./middlewares/security');

const routes = require('./routes/routes');
const database = require('./config/db.config');

//body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//configs do server
app.use(express.static(path.resolve(__dirname, '..', 'public')));
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');

//configs da sessao
app.use(sessionOptions());
app.use(flash());
app.use(addGlobalVariables); //variaveis globais a disposicao

//configs de seguranca
app.use(csurf()); //ativacao de validacao de token CSRF
app.use(includeVerificationToken);
app.use(checkCsurfError);

//rotas do app
app.use(routes);

//server iniciado apos a coneccao com o BD ser iniciada
database.connect().then(() => {
  const { SERVER_PORT, SERVER_HOST } = process.env;
  app.listen(SERVER_PORT, SERVER_HOST, () => {
    console.log(`Acesse o servidor em: http://localhost:${SERVER_PORT}`);
  });
});