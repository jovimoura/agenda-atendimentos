const moment = require('moment');

const conexao = require("../infraestrutura/conexao");

class Atendimento {
    adiciona(atendimento,res) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss');
        console.log(dataCriacao)
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');

        const dataEhValida = moment(data).isSameOrAfter(dataCriacao);
        const clienteEhValido = atendimento.cliente.length >=5;

        const validacoes = [
            {
                nome: 'data',
                valido: dataEhValida,
                mensagem: 'Data deve ser maior ou igual a data atual'
            },
            {
                nome: 'cliente',
                valido: clienteEhValido,
                mensagem:'Cliente deve ter pelo menos cinco caracteres'
            }
        ];
        // cria um array com false
        const erros = validacoes.filter(campo => !campo.valido);
        // se existir erros, o valor dee length será maior q 0, lembrando q 0 é considerado false, ou seja...
        const existemErros = erros.length;

        if(existemErros) {
            //entrega um json c erros
            res.status(400).json(erros);
        }else {
            const atendimentoDatado = {...atendimento, dataCriacao, data}

            const sql = 'INSERT INTO Atendimentos SET ?'

            conexao.query(sql, atendimentoDatado, (erro, resultados) => {
                if(erro) {
                    // para saber numeros e status visete site httpstatus
                    res.status(400).json(erro)
                } else {
                    res.status(201).json(resultados)
                }
            })
        }
    }

    lista(res) {
        const sql = 'SELECT * FROM Atendimentos';

        conexao.query(sql, (erro, resultados) =>{
            if(erro) {
                res.status(400).json(erro);
            } else {
                res.status(200).json(resultados)
            }
        })
    }

    buscaPorId(id, res) {
        const sql = `SELECT * FROM Atendimentos WHERE id = ${id}`;

        conexao.query(sql,(erro, resultados) => {
            // criando constante c lista de index 0 pois o json retornado é uma lista e p melhorar a visão, iremos retornar apenas o objeto
            const atendimento = resultados[0]
            if(erro) 
                res.status(400).json(erro);
            else
                res.status(200).json(atendimento);
        })
    }

    altera(id, valores, res) {
        // a lib mysql altera as ? pelos parametros ao usar o método query

        const sql = 'UPDATE Atendimentos SET ? WHERE id = ?';

        conexao.query(sql, [valores,id], (erro, resultados)=>{
            if(erro)
                res.status(400).json(erro);
            else
                res.status(200).json({...valores,id})
        })
    }

    deleta(id, res) {
        const sql = 'DELETE FROM Atendimentos WHERE id=?';

        conexao.query(sql,id,(erro,resultados) =>{
            if(erro)
                res.status(400).json(erro)
            else
                res.status(200).json({id})
        })
    }
}


module.exports = new Atendimento