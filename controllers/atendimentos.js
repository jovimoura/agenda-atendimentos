//arquivo de controle de atendimentos

const Atendimentos = require('../models/atendimentos')

module.exports = app => {
    // o express devolve duas coisas(req=requisição q estamos recebendo e a res=oq agt envia)
    app.get('/atendimentos',(req,res)=>{
        Atendimentos.lista(res)
    })// get recebe dados

    app.get('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id);
        console.log(id)
        Atendimentos.buscaPorId(id, res);
    })

    // envia dados para o servidor
    app.post('/atendimentos', (req, res)=> {
        //corpo da api
        const atendimento = req.body;
        // add corpo a tabela de atendimentos
        Atendimentos.adiciona(atendimento,res);
    })
    // altera dados do objeto, diferente do put que altera o objeto todo
    app.patch('/atendimentos/:id',(req, res) =>{
        // altera string para number
        const id = parseInt(req.params.id);
        const valores = req.body;

        Atendimentos.altera(id,valores,res)
    });
    // deleta dados
    app.delete('/atendimentos/:id',(req, res) =>{
        const id = parseInt(req.params.id);
        Atendimentos.deleta(id,res)
    })
}
