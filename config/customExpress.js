//arquivo de configuração de rotas

// importando framework de criação e uso de servidores
const express = require('express');
// trazendo lib cosign(utilizada para inclusão) para constante
const consign = require('consign');
// importando lib body-parser(utilizada para traduzir o corpo da api, que pode vir de vários formatos diferentes, ex: como json)
const bodyParser = require('body-parser')

module.exports = () => {
    const app = express();
    // rodando a porta 3000

    app.use(bodyParser.urlencoded({extended:true}))//use é um método de express que serve para usar outras libs, como a body-parser
    app.use(bodyParser.json())
    //o body possui vários tipos de arquivos


    consign()//configura
        .include('controllers')//incluindo tudo da pasta controllers
        .into(app)// em app

    return app
}


