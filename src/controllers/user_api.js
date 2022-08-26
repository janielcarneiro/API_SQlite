const db = require('../database/database');

exports.getHome = ((req, res, next) => {
    res.send("Olá, estou na home");
});

exports.get_user_all = ((req, res, next) => {
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
})

exports.get_user_one = ((req, res, next) => {
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

exports.post_user = ((req, res, next) => {
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
    db.run(sql, params, (err, result)=>{
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

exports.post_user_patch = ((req, res, next) => {
    const errors = [];

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

    const data = {
        name: req.body.name,
        email: req.body.email,
        password: md5(req.body.password)
    }

    const sql = 'INSERT INTO user (name, email, password) VALUES (?,?,?)'
    const params = [data.name, data.email, data.password]
    db.run(sql, params, (err, result)=>{
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

exports.delete_user = ((req, res, next) => {
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

    const sql = 'INSERT INTO user (name, email, password) VALUES (?,?,?)'
    const params = [data.name, data.email, data.password]
    db.run(sql, params, (err, result)=>{
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
