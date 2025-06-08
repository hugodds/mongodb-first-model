require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');

// const connectionString = 'mongodb+srv://hugodmgs:Little-10@hgocluster.vdijz79.mongodb.net/BASEDEDADOS?retryWrites=true&w=majority&appName=hgocluster';
mongoose.connect(process.env.CONNECTIONSTRING)
  .then(() => {
    // console.log('Conectei à base de dados.');
    app.emit('pronto'); // Conexão com mongoose só vai existir quando o app.emit emitir esse aviso.
  })
  .catch(e => console.log(e));

const routes = require('./routes');
const path = require('path');
const { middlewareGlobal, outroMiddleware } = require('./src/middlewares/middleware'); // Via desestruturação

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, 'public')));

app.set('views', path.resolve(__dirname, 'src', 'views')); // Passando caminho relativo ou caminho absoluto.
app.set('view engine', 'ejs');

// Nossos próprios MIDDLEWARES
app.use(middlewareGlobal);
app.use(outroMiddleware);
app.use(routes);

app.on('pronto', () => {  // o app escuta na porta 3000
  app.listen(3000, () => {
    console.log('Acessar http://localhost:3000');
    console.log('Servidor executando na porta 3000');
  });
});

console.log('Teste');