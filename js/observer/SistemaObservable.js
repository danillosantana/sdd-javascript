class SistemaObservable {

    /**
     * Construtor padrão de classe.
     * 
     * @param contexto
     * @param armadilha
     */
    constructor(contexto, sistemaView, listaView) {
        this._sistemaView = sistemaView;
        this._listaView = listaView;
        this._sistema = {};
        this._sistemas = [];
        this._tiposSituacoes = [];
        this._contexto = contexto;
    }

    alterar(sistema, tiposSituacoes) {
        this._sistema = sistema;
        this._tiposSituacoes = tiposSituacoes;
        Reflect.apply(this._sistemaView, this._contexto, [this._sistema, this._tiposSituacoes]);
    }

    /**
     * Notifica a view de sistema que deve ser apresentada a lista de sistemas
     * 
     * @param sistemas
     */
    listar(sistemas) {
        this._sistemas.push(sistemas);
        Reflect.apply(this._listaView, this._contexto, this._sistemas);
    }

    /**
     * Notifica a view de sistema que deve a lista deve ser esvaziada.
     */
    limparLista() {
        this._sistemas = [];
        Reflect.apply(this._listaView, this._contexto, this._sistemas);
    }

    limpar() {
        this._sistema = null;
        this._tiposSituacoes == null;
        Reflect.apply(this._sistemaView, this._contexto, [this._sistema, this._tiposSituacoes]);
    }
}