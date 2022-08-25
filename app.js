//cria o meu aplicativo express
const express = require("express")
const app = express()
const db = require('./src/database/database.js');
const api_user = require('./src/routes/api_user');

// pré-processamento extra para analisar o corpo das solicitações POST
var bodyParser = require("body-parser");
const md5 = require("md5");
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());



app.use('/api', api_user);

module.exports = app;