const Banco = require('./Banco');

class Escola {
    constructor() {
        this._idEscola = null;
        this._nomeEscola = '';
        this._email = '';
    }

    create = async () => {
        const SQL = 'INSERT INTO escolas (nomeEscola, email) VALUES (?,?);';

        try {
            const conexao = Banco.getConexao();

            const [resposta] = await conexao.promise().execute(SQL, [this.nomeEscola, this.email]);
            this.idEscola = resposta.insertId;

            return resposta.affectedRows > 0;
        } catch (error) {
            console.error('Erro ao inserir a escola:', error);

            return false;
        }
    }

    delete = async () => {
        const SQL = 'DELETE FROM escolas WHERE idEscola = ?;';

        try {
            const conexao = Banco.getConexao();

            const [resposta] = await conexao.promise().execute(SQL, [this.idEscola]);

            return resposta.affectedRows > 0;
        } catch (error) {
            console.error('Erro ao excluir a escola:', error);

            return false;
        }
    }

    update = async () => {

        const SQL = 'UPDATE escolas SET nomeEscola = ?, email = ? WHERE idEscola = ?;'; // Query SQL para atualizar o nome e email de uma escola.
        try {
            const conexao = Banco.getConexao();

            const [resposta] = await conexao.promise().execute(SQL, [this.nomeEscola, this.email, this.idEscola]); // Executa a query de atualização.

            return resposta.affectedRows > 0; // Retorna true se a atualização afetou alguma linha.
        } catch (error) {
            console.error('Erro ao atualizar a escola:', error); // Exibe erro no console se houver falha.

            return false; // Retorna false caso ocorra um erro.
        }
    }

    isEscola = async () => {
        const SQL = 'SELECT COUNT(*) AS qtd FROM escolas WHERE nomeEscola = ? OR email = ?;'; // Query SQL para contar escolas com o mesmo nome.

        try {
            const conexao = Banco.getConexao();

            const [resposta] = await conexao.promise().execute(SQL, [this.nomeEscola, this.email]); // Executa a query.

            return resposta[0].qtd > 0; // Retorna true se houver alguma escola com o mesmo nome ou mesmo email.
        } catch (error) {
            console.error('Erro ao verificar a escola:', error); // Exibe erro no console se houver falha.

            return false; // Retorna false caso ocorra um erro.
        }
    }

    isEscola_idEscola = async () => {
        const SQL = 'SELECT COUNT(*) AS qtd FROM escolas WHERE idEscola = ?;';

        try {
            const conexao = Banco.getConexao();

            const [resposta] = await conexao.promise().execute(SQL, [this.idEscola]);

            return resposta[0].qtd > 0;
        } catch (error) {
            console.error('Erro ao verificar a escola por id:', error);

            return false;
        }
    }

    readAll = async () => {
        const SQL = 'SELECT * FROM escolas ORDER BY nomeEscola;'; // Query SQL para selecionar todos as escolas ordenados pelo nome.

        try {
            const conexao = Banco.getConexao();

            const [matrizRespostas] = await conexao.promise().execute(SQL); // Executa a query de seleção.

            return matrizRespostas; // Retorna a lista de escolas.
        } catch (error) {
            console.error('Erro ao ler as escolas:', error); // Exibe erro no console se houver falha.

            return []; // Retorna uma lista vazia caso ocorra um erro.
        }
    }

    readById = async () => {
        const SQL = 'SELECT * FROM escolas WHERE idEscola = ?;'; // Query SQL para selecionar uma escola pelo ID.

        try {
            const conexao = Banco.getConexao();

            const [matrizRespostas] = await conexao.promise().execute(SQL, [this.idEscola]); // Executa a query de seleção.

            return matrizRespostas; // Retorna a escola correspondente ao ID.
        } catch (error) {
            console.error('Erro ao ler escola pelo ID:', error); // Exibe erro no console se houver falha.

            return []; // Retorna null caso ocorra um erro.
        }
    }

    // Getter para obter o valor de idEscola.
    get idEscola() {
        return this._idEscola;
    }

    // Setter para definir o valor de idEscola.
    set idEscola(newIdEscola) {
        this._idEscola = newIdEscola;
    }

    // Getter para obter o valor de nomeEscola.
    get nomeEscola() {
        return this._nomeEscola;
    }

    // Setter para definir o valor de nomeEscola.
    set nomeEscola(newNomeEscola) {
        this._nomeEscola = newNomeEscola;
    }

    // Getter para obter o valor de email.
    get email() {
        return this._email;
    }

    // Setter para definir o valor de email.
    set email(newEmail) {
        this._email = newEmail;
    }
}

// Exporta a classe Escola para que possa ser utilizada em outros módulos.
module.exports = Escola;
