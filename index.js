//cria o meu aplicativo express
const express = require("express")
const app = express()

//configurar a porta do meu servidor
const HTTP_PORT = 8000

app.listen(HTTP_PORT, ()=>{
    console.log("Servidor rodando na Porta %PORTA%".replace("%PORTA%", HTTP_PORT))
});

//EndPoint raiz
app.get("/", (req, res, next) => {
    res.send("Olá, estou na home");
})

//Resposta padrão para qualquer outra solicitação
app.use(function(req, res){
    res.status(404);
})