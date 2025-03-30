const Escola = require('../Model/Escola');

module.exports = class EscolaControl {
    escola_control_create = async (request, response) => {
        const escola = new Escola();
        escola.nomeEscola = request.body.escolas.nomeEscola;
        escola.email = request.body.escolas.email;

        const objResposta = {
            status: true,
            msg: "Escola adicionada com sucesso"
        }

        const criou = await escola.create();

        if (criou === false) {
            objResposta.status = false;
            objResposta.msg = "Erro ao adicionar a escola";
            response.status(500).send(objResposta);
        } else {
            response.status(201).send(objResposta);
        }
    }

    escola_control_delete = async (request, response) => {
        const escola = new Escola();
        escola.idEscola = request.params.idEscola;

        const objResposta = {
            status: true,
            msg: "Escola excluída com sucesso"
        }

        const removeu = await escola.delete();

        if (removeu === false) {
            objResposta.status = false;
            objResposta.msg = "Erro ao excluir a escola";
            response.status(500).send(objResposta);
        } else {
            response.status(200).send(objResposta);
        }
    }

    escola_control_update = async (request, response) => {
        const escola = new Escola();
        escola.idEscola = request.params.idEscola;
        escola.nomeEscola = request.body.escolas.nomeEscola;
        escola.email = request.body.escolas.email;

        const objResposta = {
            status: true,
            msg: "Escola atualizada com sucesso"
        };

        const atualizado = await escola.update();

        if (atualizado === false) {
            objResposta.status = false;
            objResposta.msg = "Erro ao atualizar a escola";
            response.status(500).send(objResposta);
        } else {
            response.status(200).send(objResposta);
        }
    }

    escola_control_read_all = async (request, response) => {
        const escola = new Escola();

        const resultados = await escola.readAll();
        const objResposta = {
            status: true,
            msg: "Executado com sucesso",
            escolas: resultados
        };

        if (!resultados || resultados.length === 0) {
            objResposta.msg = "Nenhuma escola cadastrada";
        }

        response.status(200).send(objResposta);
    }

    escola_control_read_by_id = async (request, response) => {
        const escola = new Escola();
        escola.idEscola = request.params.idEscola;

        const resultados = await escola.readById();

        const objResposta = {
            status: true,
            msg: "Escola encontrada",
            escola: resultados
        };

        if (!resultados || resultados.length === 0) {
            objResposta.status = false;
            objResposta.msg = "Escola não encontrada";
            response.status(404).send(objResposta);
        } else {
            response.status(200).send(objResposta);
        }
    }
};