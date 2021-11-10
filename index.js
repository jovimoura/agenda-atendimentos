//sobe app para servidor

// importando configs do express para constante
const customExpress = require('./config/customExpress.js');
// importando conexões para constante
const conexao = require('./infraestrutura/conexao');
// importanto tabelas para constante
const Tabelas = require('./infraestrutura/tabelas')

conexao.connect(erro => {
    if(erro){
        // se possuir algum erro, retornará erro no console
        console.log(erro)
    }  
    else{
        console.log('conectado com sucesso')

        //inicializando tabelas
        Tabelas.init(conexao)
        const app = customExpress()

        // o primeiro parametro de listen é o numero da porta em que o servidor será rodado e o segundo é uma function(nesse caso estamos usando a function para avisar que o servidor está funcionando)
        app.listen(3000,()=>console.log('servidor rodando'));
    }
})



//obs vc deve cancelar o servidor com ctrl+c no terminal e roda-lo novamente