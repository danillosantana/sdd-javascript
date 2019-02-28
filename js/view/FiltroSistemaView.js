/**
 * Classe que representa o filtro de pesquisa de sistema.
 */
class FiltroSistemaView {

    /**
     * Construtor padrão da classe.
     * 
     * @param {*} seletor 
     */
    constructor(seletor) {
        this._filtroView = $(seletor);
    }

    template() {
        return `<div class="panel-collapse panel-wrapper"   >
        <div class="panel panel-default">
            <div id="panelHeadingFiltros" class="panel-heading">
                <div class="row">
                    <div class="col-lg-8">
                        <span class="panel-subtitle">Pesquisar Sistemas</span>
                    </div>
                
                    <div class="col-lg-2 text-right">
                        <span data-ng-collapse-toggle="panelFiltros" data-active="true" data-heading="panelHeadingFiltros"></span>
                    </div>
                </div>
            </div>
        
            <div id="panelFiltros" class="panel-body">	
                                
                <form class="form-horizontal" id="formPesquisarSistema" >
    
                    <div class="form-group" >
                        <label class="col-lg-2 control-label" for="descricao" >Descrição:</label>
                        <div class="col-lg-10" >
                            <input id="descricao" type="text" name="descricao" 
                                    class="form-control" title="Descrição" >
                        </div>
                    </div>

                    <div class="form-group" >
                        <label class="col-lg-2 control-label" for="sigla" >Sigla:</label>
                        <div class="col-lg-10" >
                            <input id="sigla" type="text" name="sigla" 
                                    class="form-control" title="Sigla" >
                        </div>
                    </div>

                    <div class="form-group" >
                        <label class="col-lg-2 control-label" for="email" >E-mail de atendimento do sistema:</label>
                        <div class="col-lg-10" >
                            <input id="email" type="text" name="email" 
                                    class="form-control" title="Email" >
                        </div>
                    </div>
                        
                </form>
                
                <div class="row" >
                    
                    <div class="col-lg-12 text-center" >
                    
                        <a  class="btn btn-default" onclick="pesquisar()">
                            <img class="icon-img" alt="Pequisar" src="img/search.png" />
                            <span>Pesquisar</span>
                        </a>
                
                        <a title="Limpar" class="btn btn-default" onclick="limparPesquisa()">
                            <img class="icon-img" alt="Limpar" src="img/clear.png" />
                            <span>Limpar</span>
                        </a>
                        
                        <a class="btn btn-default" onclick="adicionarNovo()" title="Novo Sistema" class="btn-link" >
                            <span class="icon-plus"></span>
                             <span>Novo Sistema</span>
                       </a>
                    
                    </div>
                    
                </div>
                
            </div>
            
        </div>
    </div>`;
    }

    update(sistema) {
        this._filtroView.text("");
        let template = this.template();
        this._filtroView.html(template);
    }

    reset() {
        this._filtroView.text("");
    }

    /**
     * Retorna uma nova instância de FiltroSistemaBean
     * 
     * @param {*} form 
     */
    getFiltroSistemaBean() {
        let form = $('#formPesquisarSistema');
        let filtroSistemaBean = {
        descricao : form.find('#descricao').val(),
        sigla : form.find('#sigla').val(),
        email : form.find('#email').val()
        };

        return filtroSistemaBean;
    };

    /**
     * Limpa os filtros de pesquisa.
     */
    limparFiltros() {
        $('#formPesquisarSistema').find('#descricao').val("") ;
        $('#formPesquisarSistema').find('#sigla').val("");
        $('#formPesquisarSistema').find('#email').val("");
    }
}