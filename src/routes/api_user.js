const express = require('express');
const router = express.Router();

//pegando todas as informaçoẽs do banco de dados
const api_user = require('../../controllers/user_api');

//EndPoint raiz
router.get("/", api_user.getHome);

router.get("/users", api_user.get_user_all);

//pegar as informações pelo id
router.get("/user/:id", api_user.get_user_one);

//criando a minha rota para cadastra
router.post("/user/",api_user.post_user);

//Vamos atualizar os usuarios
router.patch("/user/:id", api_user.post_user_patch);

//para deletar o usuario
router.delete("/user/:id", api_user.delete_user);



//Resposta padrão para qualquer outra solicitação
router.use(function(req, res){
    res.status(404);
})

module.exports = router;