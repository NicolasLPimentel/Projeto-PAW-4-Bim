const express = require('express');
const EscolaControl = require('../Control/EscolaControl');
const EscolaMiddleware = require('../Middleware/EscolaMiddleware');

class EscolaRoteador {
    constructor() {
        this._router = express.Router();
        this._escolaMiddleware = new EscolaMiddleware();
        this._escolaControl = new EscolaControl();
    }

    criarRotasEscola = () => {

        this.router.get('/',
            this.escolaControl.escola_control_read_all
        );

        this.router.get('/:idEscola',
            this.escolaControl.escola_control_read_by_id
        );

        this.router.post('/',
            this.escolaMiddleware.validar_nomeEscola,
            this.escolaMiddleware.validar_email,
            this.escolaMiddleware.existe_escola_cadastrada,
            this.escolaControl.escola_control_create
        );

        this.router.delete('/:idEscola',
            this.escolaControl.escola_control_delete
        );

        this.router.put('/:idEscola',
            this.escolaMiddleware.validar_nomeEscola,
            this.escolaMiddleware.validar_email,
            this.escolaMiddleware.existe_escola_cadastrada,
            this.escolaControl.escola_control_update
        );

        return this.router;
    }

    get router() {
        return this._router;
    }

    // Setter para _router
    set router(newRouter) {
        this._router = newRouter;
    }

    // Getter para _EscolaControl
    get escolaControl() {
        return this._escolaControl;
    }

    // Setter para _EscolaControl
    set escolaControl(newEscolaControl) {
        this._escolaControl = newEscolaControl;
    }

    // Getter para _escolaMiddleware
    get escolaMiddleware() {
        return this._escolaMiddleware;
    }

    // Setter para _escolaMiddleware
    set escolaMiddleware(newEscolaMiddleware) {
        this._escolaMiddleware = newEscolaMiddleware;
    }
}

module.exports = EscolaRoteador;