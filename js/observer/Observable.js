/**
 * Classe que representa mudança e estado do modelo.
 */
class Observable {

    /**
     * Construtor padrão de classe.
     * 
     * @param {*} contexto 
     * @param {*} view 
     * @param {*} listaView 
     * @param {*} filtroView 
     */
    constructor(contexto, view, listaView, filtroView) {
        this._contexto = contexto;
        
        this._view = view;
        this._listaView = listaView;
        this._filtroView = filtroView;

        this._model = {};
        this._models = [];
    }

    /**
     * Notifica a view que deve ser apresentado o formulário de alteração do modelo.
     * @param {*} model 
     */
    alterar(model) {
        this._model = model;
        Reflect.apply(this._view, this._contexto, this._model);
    }

    /**
     * Notifica a view que deve ser apresentado o formulário de incluisão do modelo.
     * @param {*} model 
     */
    incluir(model) {
        this._model = model;
        Reflect.apply(this._view, this._contexto, this._model);
    }

    /**
     * Notifica a view de sistema que deve ser apresentada a listagem do modelo.
     * 
     * @param models
     */
    listar(models) {
        this._models.push(models);
        Reflect.apply(this._listaView, this._contexto, this._models);
    }

    /**
     * Notifica a view de sistema que deve a lista deve ser esvaziada.
     */
    limparLista() {
        this._models = [];
        Reflect.apply(this._listaView, this._contexto, this._models);
    }

    limpar() {
        this._model = null;
        Reflect.apply(this._view, this._contexto, this._model);
    }
}