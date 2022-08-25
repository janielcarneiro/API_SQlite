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



//EndPoint raiz
app.get("/", api_user.getHome);

//pegando todas as informaçoẽs do banco de dados
app.get("/api/users", api_user.get_user_all);

//pegar as informações pelo id
app.get("/api/user/:id", api_user.get_user_one);

//criando a minha rota para cadastra
app.post("/api/user/",api_user.post_user);

//Vamos atualizar os usuarios
app.patch("/api/user/:id", api_user.post_user_patch);

//para deletar o usuario
app.delete("/api/user/:id", api_user.delete_user);



//Resposta padrão para qualquer outra solicitação
app.use(function(req, res){
    res.status(404);
})

module.exports = app;