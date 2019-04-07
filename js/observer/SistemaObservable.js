class SistemaObservable {

    /**
     * Construtor padrão de classe.
     * 
     * @param contexto
     * @param armadilha
     */
    constructor(sistemaView, listaView, filtroSistemaView) {
        this._sistemaView = new SistemaView(sistemaView);
        this._listaView = new ListaSistemaView(listaView);
        this._filtroSistemaView = new FiltroSistemaView(filtroSistemaView);

        this._sistema = {};
        this._sistemas = [];
        this._tiposSituacoes = []; 
        this._view;
    }

    /**
     * Notifica a a view de ssitema que deve ser apresentado o formulári para alteração.
     * 
     * @param {*} sistema 
     * @param {*} tiposSituacoes 
     */
    alterar(sistema, tiposSituacoes) {
        this._sistema = sistema;
        this._tiposSituacoes = tiposSituacoes;
        Reflect.apply(this._sistemaView.update, this._sistemaView, [this._sistema, this._tiposSituacoes]);
    }

    /**
     * Notifica a view de sistema que deve ser apresentada a lista de sistemas
     * 
     * @param sistemas
     */
    listar(sistemas) {
        this._sistemas.push(sistemas);
        Reflect.apply(this._listaView.update, this._listaView, this._sistemas);
    }

    /**
     * Notifica a view de sistema que deve a lista deve ser esvaziada.
     */
    limparLista() {
        this._sistemas = [];
        Reflect.apply(this._listaView.update, this._listaView, this._sistemas);
    }

    limpar() {
        this._sistema = null;
        this._tiposSituacoes == null;
        Reflect.apply(this._sistemaView.update, this._sistemaView, [this._sistema, this._tiposSituacoes]);
    }

    filtrar() {
       return Reflect.apply(this._filtroSistemaView.filtrar, this._filtroSistemaView, []);
    }

    limparFiltros() {
        Reflect.apply(this._filtroSistemaView.limparFiltros, this._filtroSistemaView, []);
    }

    esconderFiltro() {
        Reflect.apply(this._filtroSistemaView.esconderFiltro, this._filtroSistemaView, []);
    }

    aparecerFiltro() {
        Reflect.apply(this._filtroSistemaView.update, this._filtroSistemaView, []);
    }
}