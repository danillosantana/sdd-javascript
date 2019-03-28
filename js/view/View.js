/**
 * Classe que representa as Views do sistema.
 */
class View {

    /**
     * Construtor padrão de classe.
     * 
     * @param {*} seletor 
     */
    constructor(seletor) {
        this._elemento = $(seletor);
    }

    /**
     * Retorna o template da view.
     * 
     * @param {*} model 
     */
    template(model) {
        return model.texto ? `<p class="alert alert-info">${model.texto}</p>` : '<p></p>';
    }

    /**
     * Atualiza a view.
     * 
     * @param {*} model 
     */
    update(model) {
        this._elemento.html(this.template(model));
    }

    /**
     * Reseta o template da view.
     */
    reset() {
        this._elemento.text("");
    }
}