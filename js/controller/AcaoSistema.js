class AcaoSistema {

    _acaoVigente = undefined;
    
    /**Construtor padrão de classe */
    constructor() {

    }

    /**
     * Defiena a ação do sistema inclusão.
     */
    acaoIncluir() {
        this._acaoVigente = ACAO_SISTEMA.INCLUIR;
    }

    /**
     * Retorna que a ação do sistema é incluir.
     */
    isAcaoIncluir() {
        return this._acaoVigente == ACAO_SISTEMA.INCLUIR;
    }

    /**
     * Define a ação do sistema como listar.
     */
    acaoListar() {
        this._acaoVigente = ACAO_SISTEMA.LISTAR;
    }

    /**
     * Retorna que a ação do sistema é listar.
     */
    isAcaoListar() {
        return this._acaoVigente == ACAO_SISTEMA.LISTAR;
    }

    acaoLimpar() {
        this._acaoVigente = ACAO_SISTEMA.LIMPAR;
    }

    isAcaoLimpar() {
        return this._acaoVigente == ACAO_SISTEMA.LIMPAR;
    }
}

const ACAO_SISTEMA = {
    INCLUIR : 'incluir',
    ALTERAR : 'aterar',
    LISTAR  : 'listar',
    EXCLUIR  : 'excluir',
    LIMPAR  : 'limpar',
    LIMPAR_LISTA : 'limparLista',
    FILTRAR : 'filtrar',
}