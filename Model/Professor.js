const Banco = require('./Banco');

class Professor {
    constructor() {
        this._idProfessor = null;
        this._nomeProfessor = "";
        this._telefone = "";
        this._cpf = "";
        this._especialidade = "";
        this._escolas_idEscola = null;
    }

    create = async () => {
        const SQL = 'INSERT INTO professores (nomeProfessor, telefone, cpf, especialidade, escolas_idEscola) VALUES (?,?,?,?,?);';

        try {
            const conexao = Banco.getConexao();

            const [resposta] = await conexao.promise().execute(SQL, [this.nomeProfessor, this.telefone, this.cpf, this.especialidade, this.escolas_idEscola]);
            this.idProfessor = resposta.insertId;

            return resposta.affectedRows > 0;
        } catch (error) {
            console.error('Erro ao inserir o professor', error);

            return false;
        }
    }

    delete = async () => {
        const SQL = 'DELETE FROM professores WHERE idProfessor = ?;';

        try {
            const conexao = Banco.getConexao();

            const [resposta] = await conexao.promise().execute(SQL, [this.idProfessor]);

            return resposta.affectedRows > 0;
        } catch (error) {
            console.error('Erro ao excluír o professor', error);

            return false;
        }
    }

    update = async () => {
        const SQL = 'UPDATE professores SET nomeProfessor = ?, telefone = ?, cpf = ?, especialidade = ?, escolas_idEscola = ? WHERE idProfessor = ?;';

        try {
            const conexao = Banco.getConexao();

            const [resposta] = await conexao.promise().execute(SQL, [this.nomeProfessor, this.telefone, this.cpf, this.especialidade, this.escolas_idEscola, this.idProfessor]);

            return resposta.affectedRows > 0;
        } catch (error) {
            console.error('Erro ao atualizar professor', error);

            return false;
        }
    }

    isProfessor = async () => {
        const SQL = 'SELECT COUNT(*) AS qtd FROM professores WHERE nomeProfessor = ? OR telefone = ? OR cpf = ?;';

        try {
            const conexao = Banco.getConexao();

            const [resposta] = await conexao.promise().execute(SQL, [this.nomeProfessor, this.telefone, this.cpf]);

            return resposta[0].qtd > 0;
        } catch (error) {
            console.error('Erro ao verificar o professor', error);

            return false;
        }
    }

    readAll = async () => {
        const SQL = 'SELECT * FROM professores ORDER BY nomeProfessor;';

        try {
            const conexao = Banco.getConexao();

            const [matrizRespostas] = await conexao.promise().execute(SQL);

            return matrizRespostas;
        } catch (error) {
            console.error('Erro ao ler os professores:', error);

            return [];
        }
    }

    readById = async () => {
        const SQL = 'SELECT * FROM professores WHERE idProfessor = ?;';

        try {
            escola
            const conexao = Banco.getConexao();

            const [matrizRespostas] = await conexao.promise().execute(SQL, [this.idProfessor]);

            return matrizRespostas;
        } catch (error) {
            console.error('Erro ao ler o professor');

            return [];
        }
    }

    get idProfessor() {
        return this._idProfessor;
    }

    set idProfessor(newIdProfessor) {
        this._idProfessor = newIdProfessor;
    }

    get nomeProfessor() {
        return this._nomeProfessor;
    }

    set nomeProfessor(newNomeProfessor) {
        this._nomeProfessor = newNomeProfessor;
    }

    get telefone() {
        return this._telefone;
    }

    set telefone(newTelefone) {
        this._telefone = newTelefone;
    }

    get cpf() {
        return this._cpf;
    }

    set cpf(newCpf) {
        this._cpf = newCpf;
    }

    get especialidade() {
        return this._especialidade;
    }

    set especialidade(newEspecialidade) {
        this._especialidade = newEspecialidade;
    }

    get escolas_idEscola() {
        return this._escolas_idEscola;
    }

    set escolas_idEscola(newEscolas_idEscola) {
        this._escolas_idEscola = newEscolas_idEscola;
    }
}

module.exports = Professor;