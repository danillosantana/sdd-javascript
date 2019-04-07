/**
 * Classe que representa o formulário de cadastro de sistema.  
 */
class SistemaView extends View {

    /**
     * Construtor padrão da classe.
     * 
     * @param {*} seletor 
     */
    constructor(seletor) {
        super(seletor);
    }

    template(sistema, tiposSituacoes) {
        let controleSistema = sistema.controleSistemas[0];
        let apresentarBtnSalvar = sistema == null || sistema.id == null ? "" : "invisivel"
        let apresentarBtnAlterar = sistema != null && sistema.id != null ? "" : "invisivel";

        return `
        <form class="form-horizontal" id="formSistema" >

        <fieldset >
            <legend>Dados do Sistema</legend>
            
            <div class="row row-mg-2" >
        
                        <div class="form-group" >
                            <label class="col-lg-2 control-label required" for="descricao" >Descrição:</label>
                            <div class="col-lg-9" >
                                <input id="descricao" type="text" name="descricao" 
                                        class="form-control" title="Descrição" 
                                        value="${sistema != null ? sistema.descricao : ""}">
                            </div>
                        </div>

                        <div class="form-group" >
                            <label class="col-lg-2 control-label required" for="sigla" >Sigla:</label>
                            <div class="col-lg-9" >
                                <input id="sigla" type="text" name="sigla" 
                                        class="form-control" title="Sigla" 
                                        value="${sistema != null ? sistema.sigla : ""}">
                            </div>
                        </div>

                        <div class="form-group" >
                            <label class="col-lg-2 control-label" for="email" >E-mail de atendimento do sistema:</label>
                            <div class="col-lg-9" >
                                <input id="email" type="text" name="email" 
                                        class="form-control" title="Email" 
                                        value="${sistema != null ? sistema.email : ""}">
                            </div>
                        </div>
            </div>
            
        </fieldset>
        
        <fieldset>
                <legend>Controle do Sistema</legend>
                
                <div class="row row-mg-2" >
            
                    <div class="form-group" >
                        <label class="col-lg-2 control-label required" for="status" >Status:</label>
                        <div class="col-lg-9" >
                            <select id="status" name="status" class="form-control" title="Status" >
                               ${tiposSituacoes != null ? tiposSituacoes.map(tipoSituacao =>{
                                   return `<option value="${tipoSituacao.id}" 
                                            ${sistema =! null 
                                                        && controleSistema.tipoSituacao.id == tipoSituacao.id 
                                                    ? "selected='selected'" : "" }">
                                            ${tipoSituacao.descricao}
                                           </option>`
                               }).join('') : ''} 
                            </select>
                        </div>
                    </div>

                    <div class="form-group" >
                        <label class="col-lg-2 control-label" for="responsavel" >Usuário responsável pela última alteração:</label>
                        <div class="col-lg-9" >
                            <input id="responsavel" type="text" name="responsavel" 
                                    class="form-control" title="Responsavel" 
                                    value="${sistema != null && controleSistema.usuarioResponsavel != null && controleSistema.usuarioResponsavel != "" 
                                            ? controleSistema.usuarioResponsavel 
                                            : ""}">
                        </div>
                    </div>

                    <div class="form-group" >
                        <label class="col-lg-2 control-label" for="dataAlteracao" >Data da última alteração:</label>
                        <div class="col-lg-9" >
                            <input id="dataAlteracao" type="date" name="dataAlteracao" 
                                    class="form-control" title="Data Alteracao"  format="dd/MM/yyyy"
                                    value="${sistema != null  
                                        ? DateTimeUtil.getDataFormatada(controleSistema.dataAlteracao, FORMATO_YYYY_MM_DD) 
                                        : ""}">
                        </div>
                    </div>
                    
                    <div class="form-group" >
                        <label class="col-lg-2 control-label" for="ultimaJustificativa" >Justificativa da última alteração:</label>
                        <div class="col-lg-9" >
                            <textarea id="ultimaJustificativa" type="text" name="ultimaJustificativa" 
                                    class="form-control" title="Justificativa da última alteração" disabled="disabled"
                                    value="${sistema != null  
                                        ? controleSistema.justificativa 
                                        : ""}">
                            </textarea>		
                        </div>
                    </div>
                    
                    <div class="form-group" >
                        <label class="col-lg-2 control-label required" for="novaJustificativa" >Nova justificativa de alteração:</label>
                        <div class="col-lg-9" >
                            <textarea id="novaJustificativa" type="text" name="novaJustificativa" 
                                    class="form-control" title="Nova justificativa de alteração">
                                </textarea>		
                        </div>
                    </div>

                </div>
            </fieldset>
            <div class="row" >
                            
                <div class="col-lg-12 text-center" >
                
                    <a  class="btn btn-default" onclick="sistemaController.voltar()">
                        <img class="icon-img" alt="Voltar" src="img/return.png" />
                        <span>Voltar</span>
                    </a>
            
                    <a title="Salvar" class="btn btn-default ${apresentarBtnSalvar}"  onclick="salvar()" >
                        <img class="icon-img" alt="Salvar" src="img/icon_save.png" />
                        <span>Salvar</span>
                    </a>

                    <a title="Alterar" class="btn btn-default ${apresentarBtnAlterar}" onclick="sistemaController.alterar()" >
                        <img class="icon-img" alt="Alterar" src="img/icon_save.png" />
                        <span>Alterar</span>
                    </a>
                
                </div>
                
            </div>
        </form>
        `;
    }

    update(sistema, tiposSituacoes) {
        this._elemento.text("");
        if (sistema != null && tiposSituacoes != null) {
            this._tiposSituacoes = tiposSituacoes;
            let template = this.template(sistema, tiposSituacoes);
            this._elemento.html(template);
        }
    }

    getSistema() {
        return "";
    }
}