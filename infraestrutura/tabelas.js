// arquivo para criação e/ou manipulação de tabelas

class Tabelas {
    init(conexao){
        this.conexao = conexao;
        this.criarAtendimentos();
    }
    // criando tabela de atendimentos
    criarAtendimentos() {
        const sql = 'CREATE TABLE IF NOT EXISTS Atendimentos (id int NOT NULL AUTO_INCREMENT, cliente varchar(50) NOT NULL, pet varchar(20), servico varchar(20) NOT NULL,data datetime NOT NULL,dataCriacao datetime NOT NULL, status varchar(20) NOT NULL, observacoes text, PRIMARY KEY(id))';
        // query é uma função da lib mysql2(uma das libs instaladas no projeto)
        this.conexao.query(sql, erro => {
            if(erro) {
                console.log(erro)
            } else {
                console.log('Tabela de Atendimentos criada com sucesso!')
                // obs, verifique no workbench se a tabela foi realmente criada
            }
        })
    }
}

module.exports = new Tabelas