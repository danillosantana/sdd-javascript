/**
 * Classe que representa a lista de sistemas.
 */
class ListaSistemaView {
    
    /**
     * Construtor padrão da classe.
     * 
     * @param {*} seletor 
     */
    constructor(seletor) {
        this._listaView = $(seletor);
    }

    template(sistemas) {
        return `<div class="table-responsive" >
                    <table class="table" >
                        <thead>
                            <tr>
                                <th>Descrição</th>
                                <th>Sigla</th>
                                <th>E-mail de atendimento</th>
                                <th>Status</th>
                                <th>Opções</th>
                            </tr>
                        </thead>
                        <tbody>
                                ${sistemas.map(sistema => {
                                    return `<tr><td class="text-center">${sistema.descricao}</td>
                                            <td class="text-center">${sistema.sigla}</td>
                                            <td class="text-center">${sistema.email}</td>
                                            <td class="text-center">${sistema.status}</td>
                                            <td class="text-center">
                                                <a title="Alterar Sistema" class="btn btn-link" onclick="alterar(${sistema.id})" role="button">
                                                    <img alt="alterar" src="img/alterar.png"></img>
                                                </a>
                                            </td></tr>`
                                }).join('')}    
                        </tbody>
                    </table>
                </div>`;
    }

    update(sistema) {
        this._listaView.text("");
        let template = this.template(sistema);
        this._listaView.html(template);
    }

    reset() {
        this._listaView.text("");
    }
}