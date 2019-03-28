/**
 * Classe que representa a lista de sistemas.
 */
class ListaSistemaView extends View {
    
    /**
     * Construtor padrão da classe.
     * 
     * @param {*} seletor 
     */
    constructor(seletor) {
        super(seletor);
    }

    template(sistemas) {
        return  `<div class="table-responsive" >
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
                                                <a title="Alterar Sistema" class="btn btn-link" onclick="sistemaController.atualizar(${sistema.id})" role="button">
                                                    <img alt="alterar" src="img/alterar.png"></img>
                                                </a>
                                            </td></tr>`
                                }).join('')}    
                        </tbody>
                    </table>
                </div>`;
    }

    update(sistemas) {
        this.reset();
        if (Array.isArray(sistemas) && sistemas.length > 0) {
            let template = this.template(sistemas);
            this._elemento.html(template);
        } 
    }
}