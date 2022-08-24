let sqlite3 = require('sqlite3').verbose()
let md5 = require('md5')

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err)=> {
    if(err){
        console.log(err.message)
    }else{
        db.run(`CREATE TABLE user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text, 
            email text UNIQUE, 
            password text, 
            CONSTRAINT email_unique UNIQUE (email)
        )`,
        (err) => {
            if(err){
                console.log("Tabela já foi criada");
            }else{
                // A tabela acabou de ser criada, criando algumas linhas
                var insert = 'INSERT INTO user (name, email, password) VALUES (?,?,?)'
                db.run(insert, ["admin","admin@example.com",md5("admin123456")])
                db.run(insert, ["user","user@example.com",md5("user123456")])
            }
        });
    }
})

module.exports = db;