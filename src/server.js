require('dotenv').config(); //modulo para uso de arquivo .env, como dados sensiveis

const express = require('express');
const app = express();

const path = require('path');
const { sessionOptions, addGlobalVariables } = require('./middlewares/authentication');
const flash = require('connect-flash');
const csurf = require('csurf');
const { checkCsurfError, includeVerificationToken } = require('./middlewares/security');

const routes = require('./routes/routes');
const database = require('./config/db.config');

//body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//configs do server
app.use(express.static(path.resolve(__dirname, '..', 'public'))); //conteudo estatico servido de public/
app.set('views', path.resolve(__dirname, 'views')); //diretorio das views
app.set('view engine', 'ejs'); //engine ejs usada para redenrizacao 

//configs da sessao
app.use(sessionOptions()); //sessao salva
app.use(flash()); //mensagens gravadas e apagadas apos serem exibidas ao usuario
app.use(addGlobalVariables); //variaveis globais a disposicao

//configs de seguranca
app.use(csurf()); //ativacao de validacao de token CSRF
app.use(includeVerificationToken); //inclusao de token CSRF
app.use(checkCsurfError); //checagem de token CSRF

//rotas do app
app.use(routes);

//server iniciado apos a coneccao com o BD ser iniciada
database.connect().then(() => {
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Acesse o servidor em: http://localhost:${PORT}`);
  });
});