const express = require('express');
const ProfessorControl = require('../Control/ProfessorControl');
const ProfessorMiddleware = require('../Middleware/ProfessorMiddleware');

class ProfessorRoteador {
    constructor() {
        this._router = express.Router();
        this._professorControl = new ProfessorControl();
        this._professorMiddleware = new ProfessorMiddleware();
    }

    criarRotasProfessor = () => {

        this.router.get('/',
            this.professorControl.professor_control_read_all
        );

        this.router.get('/:idProfessor',
            this.professorControl.professor_control_read_by_id
        );

        this.router.post('/',
            this.professorMiddleware.validar_nomeProfessor,
            this.professorMiddleware.validar_telefone,
            this.professorMiddleware.validar_cpf,
            this.professorMiddleware.validar_escolas_idEscola,
            this.professorMiddleware.existe_professor_cadastrado,
            this.professorControl.professor_control_create
        );

        this.router.delete('/:idProfessor',
            this.professorControl.professor_control_delete
        );

        this.router.put('/:idProfessor',
            this.professorMiddleware.validar_nomeProfessor,
            this.professorMiddleware.validar_telefone,
            this.professorMiddleware.validar_cpf,
            this.professorMiddleware.validar_escolas_idEscola,
            this.professorMiddleware.existe_professor_cadastrado,
            this.professorControl.professor_control_update
        );

        return this.router;
    }

    get router() {
        return this._router;
    }

    set router(newRouter) {
        this._router = newRouter;
    }

    get professorControl() {
        return this._professorControl;
    }

    set professorControl(newProfessorControl) {
        this._professorControl = newProfessorControl;
    }

    get professorMiddleware() {
        return this._professorMiddleware;
    }

    set professorMiddleware(newProfessorMiddleware) {
        this._professorMiddleware = newProfessorMiddleware;
    }
}

module.exports = ProfessorRoteador;