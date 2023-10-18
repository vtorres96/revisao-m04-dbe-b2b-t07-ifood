const express = require('express');
require('dotenv').config()

const rotas = require('./rotas/rotas');

const app = express();

app.use(express.json());
app.use(rotas);

app.listen(process.env.PORT, () => {
    console.log(`Servidor rodando na porta http://localhost:${process.env.PORT}`)
});
