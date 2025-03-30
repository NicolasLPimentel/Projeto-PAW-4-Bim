const Professor = require('../Model/Professor');

module.exports = class ProfessorControl {
    professor_control_create = async (request, response) => {
        var professor = new Professor();
        professor.nomeProfessor = request.body.professores.nomeProfessor;
        professor.telefone = request.body.professores.telefone;
        professor.cpf = request.body.professores.cpf;
        professor.especialidade = request.body.professores.especialidade;
        professor.escolas_idEscola = request.body.professores.escolas_idEscola;

        const objResposta = {
            status: true,
            msg: "Professor adicionado com sucesso"
        }

        const criou = await professor.create();

        if (criou === false) {
            objResposta.status = false;
            objResposta.msg = "Erro ao adicionar o professor";
            response.status(500).send(objResposta);
        } else {
            response.status(200).send(objResposta);
        }
    }

    professor_control_delete = async (request, response) => {
        var professor = new Professor();
        professor.idProfessor = request.params.idProfessor;

        const objResposta = {
            status: true,
            msg: "Professor excluído com sucesso"
        }

        const removeu = await professor.delete();

        if (removeu === false) {
            objResposta.status = false,
                objResposta.msg = "Erro ao excluir professor";
            response.status(500).send(objResposta);
        } else {
            response.status(200).send(objResposta);
        }
    }

    professor_control_update = async (request, response) => {
        var professor = new Professor();
        professor.nomeProfessor = request.body.professores.nomeProfessor;
        professor.telefone = request.body.professores.telefone;
        professor.cpf = request.body.professores.cpf;
        professor.especialidade = request.body.professores.especialidade;
        professor.escolas_idEscola = request.body.professores.escolas_idEscola;

        const objResposta = {
            status: true,
            msg: "Professor atualizado com sucesso"
        }

        const atualizado = await professor.update();

        if (atualizado === false) {
            objResposta.status = false;
            objResposta.msg = "Erro ao atualizar professor";
            response.status(500).send(objResposta);
        } else {
            response.status(200).send(objResposta);
        }
    }

    professor_control_read_all = async (request, response) => {
        var professor = new Professor();

        const resultados = await professor.readAll();
        const objResposta = {
            status: true,
            msg: "Executado com sucesso",
            professores: resultados
        };

        if (!resultados || resultados.length === 0) {
            objResposta.msg = "Nenhuma escola cadastrada";
        }

        response.status(200).send(objResposta);
    }

    professor_control_read_by_id = async (request, response) => {
        var professor = new Professor();
        professor.idProfessor = request.params.idProfessor;

        const resultados = await professor.readById();

        const objResposta = {
            status: true,
            msg: "Professor encontrado",
            professor: resultados
        };

        if (!resultados || resultados.length === 0) {
            objResposta.status = false;
            objResposta.msg = "Professor não encontrado";
            response.status(404).send(objResposta);
        } else {
            response.status(200).send(objResposta);
        }
    }
};