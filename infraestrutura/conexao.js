// arquivo que conecta com o banco
// obs, fazer npm install mysql2

// trazendo mysql 2 para constante
const mysql = require('mysql2');

// configurando conexão com servidor do workbench do mysql
const conexao = mysql.createConnection({
    host:'127.0.0.1',
    port: 3306,
    user:'root',
    password:'root',
    database:'agenda_petshop'
})

module.exports = conexao