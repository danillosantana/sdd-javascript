/**
 * Classe responsável por notificar a view quando a uma mudança
 * de estado no modelo de sistema.
 * 
 * @author Danillo Santana
 */
class SistemaObservable {

    /**
     * Construtor padrão de classe.
     * 
     * @param contexto
     * @param armadilha
     */
    constructor(contexto, alvo) {
        this._alvo = alvo;
        this._sistemas = [];
        this._contexto = contexto;
    }

    /**
     * Notifica a view de sistema que deve ser apresentada a
     * lista de sistemas
     * 
     * @param sistemas
     */
    listar(sistemas) {
        this._sistemas.push(sistemas);
        Reflect.apply(this._alvo, this._contexto, this._sistemas);
    }

    /**
     * Notifica a view de sistema que deve a lista deve ser esvaziada.
     */
    limpar() {
        this._sistemas = [];
        Reflect.apply(this._alvo, this._contexto, this._sistemas);
    }

}