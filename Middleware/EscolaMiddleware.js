const Escola = require('../Model/Escola');

class EscolaMiddleware {

    validar_nomeEscola = async (request, response, next) => {
        const nomeEscola = request.body.escolas.nomeEscola;
        if (nomeEscola.length < 3) {
            const objResposta = {
                status: false,
                msg: "O nome deve possuir pelo menos 3 caracteres"
            }
            response.status(400).send(objResposta);
        } else {
            next();
        }
    }

    validar_email = async (request, response, next) => {
        const email = request.body.escolas.email;
        // Verifica se o e-mail contém "@" e "."
        const posicaoArroba = email.indexOf('@');
        // LastIndex pois o email pode conter "." antes do "@"
        const ultPosicaoPonto = email.lastIndexOf('.');
        // Verifica se o "@" vem antes do ".", se ambos existem e se há caracteres suficientes antes e depois
        if (posicaoArroba < 1 || ultPosicaoPonto < posicaoArroba + 2 || ultPosicaoPonto + 2 >= email.length) {
            const objResposta = {
                status: false,
                msg: "E-mail inválido. Por favor, insira um e-mail válido."
            };
            return response.status(400).send(objResposta);
        }
        // Se todas as verificações passarem, o e-mail é considerado válido
        next();
    }

    existe_escola_cadastrada = async (request, response, next) => {
        const nomeEscola = request.body.escolas.nomeEscola;
        const email = request.body.escolas.email;
        const escola = new Escola();
        escola.nomeEscola = nomeEscola
        escola.email = email;
        const escolaExiste = await escola.isEscola();

        if (escolaExiste == true) {
            const objResposta = {
                status: false,
                msg: "Já existe uma escola cadastrada com este nome ou email"
            }
            response.status(400).send(objResposta);
        } else {
            next();
        }
    }
}

module.exports = EscolaMiddleware;
