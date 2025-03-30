const Professor = require('../Model/Professor');
const Escola = require('../Model/Escola');

class ProfessorMiddleware {

    validar_nomeProfessor = async (request, response, next) => {
        const nomeProfessor = request.body.professores.nomeProfessor;
        if (nomeProfessor.length < 3) {
            const objResposta = {
                status: false,
                msg: "O nome deve possuir pelo menos 3 caracteres"
            }
            response.status(400).send(objResposta);
        } else {
            next();
        }
    }

    validar_telefone = async (request, response, next) => {
        const telefone = request.body.professores.telefone;
        const regexTel = /^\(?\d{2}[\) ]?\d{4,5}[- ]?\d{4}$/;

        if (!regexTel.test(telefone)) {
            const objResposta = {
                status: false,
                msg: "O telefone inserido é invalido"
            }
            response.status(400).send(objResposta);
        } else {
            next();
        }
    }

    validar_cpf = async (request, response, next) => {
        const cpf = request.body.professores.cpf;
        const regexFormato = /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/; //regex verifica o formato e digitos do cpf
        const regexIguais = /^(\d)\1*$/; // regex verifica se os digitos sao iguais

        const digito_verificador = (cpf) => {
            let cpfteste = cpf.replace(/[^\d]/g, "");
            let soma1, soma2, digito1, digito2, resto1, resto2;

            if (regexIguais.test(cpfteste)) {
                return false;
            }

            cpfteste = parseInt(cpfteste);

            for (let x = 0; x < 9; x++) {
                soma1 += cpfteste[x] * (10 - x);
                soma2 += cpfteste[x] * (11 - x);
            }

            resto1 = soma1 % 11;

            digito1 = resto < 2 ? 0 : 11 - resto;

            soma2 += digito1 * 2;

            resto2 = soma2 % 11;

            digito2 = resto2 < 2 ? 0 : 11 - resto2;

            return cpfteste[10] == digito1 && cpfteste[11] == digito2;
        };

        if (regexFormato.test(cpf) && digito_verificador(cpf)) {
            next();
        } else {
            const objResposta = {
                status: false,
                msg: "O cpf é invalido ou está no formato incorreto"
            }
            response.status(400).send(objResposta);
        }
    }

    validar_especialidade = async (request, response, next) => {
        const especialidade = request.body.professores.especialidade;

        if (especialidade.length < 3) {
            const objResposta = {
                status: false,
                msg: "A especialidade deve possuir pelo menos 3 caracteres"
            }
            response.status(400).send(objResposta);
        } else {
            next();
        }
    }

    validar_escolas_idEscola = async (request, response, next) => {
        const escola = new Escola();
        escola.idEscola = request.body.professores.escolas_idEscola;
        const escolaExiste = await escola.isEscola_idEscola();

        if (escolaExiste === false) {
            const objResposta = {
                status: false,
                msg: "O campo escolas_idEscola deve conter um id de uma escola existente"
            }
            response.status(400).send(objResposta);
        } else {
            next();
        }

    }

    existe_professor_cadastrado = async (request, response, next) => {
        const nomeProfessor = request.body.professores.nomeProfessor;
        const telefone = request.body.professores.telefone;
        const cpf = request.body.professores.cpf;
        const professor = new Professor();
        professor.nomeProfessor = nomeProfessor;
        professor.telefone = telefone;
        professor.cpf = cpf;
        const professorExiste = await professor.isProfessor();

        if (professorExiste === false) {
            const objResposta = {
                status: false,
                msg: "Já existe um professor cadastrado com este nome, telefone ou cpf"
            }
            response.status(400).send(objResposta);
        } else {
            next();
        }
    }
}

module.exports = ProfessorMiddleware;