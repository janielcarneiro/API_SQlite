//cria o meu aplicativo express
const express = require("express")
const app = express()
const db = require('./database.js');

// pré-processamento extra para analisar o corpo das solicitações POST
var bodyParser = require("body-parser");
const md5 = require("md5");
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//configurar a porta do meu servidor
const HTTP_PORT = 8000

app.listen(HTTP_PORT, ()=>{
    console.log("Servidor rodando na Porta %PORTA%".replace("%PORTA%", HTTP_PORT))
});

//EndPoint raiz
app.get("/", (req, res, next) => {
    res.send("Olá, estou na home");
})

//pegando todas as informaçoẽs do banco de dados
app.get("/api/users", (req, res, next) => {
    var sql = "select * from user"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});

//pegar as informações pelo id
app.get("/api/user/:id", (req, res, next) => {
    var sql = "select * from user where id = ?"
    var params = [req.params.id]

    db.get(sql, params, (err, row) => {
        if(err){
            res.status(400).json({"error": err.message});
            return;
        }
        res.json({
            "message": "success",
            "data": row
        })
    })
})

//criando a minha rota para cadastra
app.post("/api/user/", (req, res, next) => {
    var errors = [];

    //middleware emprovisado
    if(!req.body.name)
        errors.push("Digete um nome")
    if(!req.body.password)
        errors.push("Nenhuma senha especificada")
    if(!req.body.email)
        errors.push("Nenhum email especificado")
    if(errors.length){
        res.status(400).json({"error": errors.join(",")})
    }

    var data = {
        name: req.body.name,
        email: req.body.email,
        password: md5(req.body.password)
    }

    var sql = 'INSERT INTO user (name, email, password) VALUES (?,?,?)'
    var params = [data.name, data.email, data.password]
    db.run(sql, params, function(err, result){
        if(err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id": this.lastID
        })
    })
})


//Resposta padrão para qualquer outra solicitação
app.use(function(req, res){
    res.status(404);
})