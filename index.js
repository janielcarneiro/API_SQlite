//cria o meu aplicativo express
const express = require("express")
const app = express()
const db = require('./database.js');

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


//Resposta padrão para qualquer outra solicitação
app.use(function(req, res){
    res.status(404);
})