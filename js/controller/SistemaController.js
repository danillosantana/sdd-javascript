/**
 * Classe Controller responsável por manipular as informações de sistema.
 * 
 */
class SistemaController {

    /**
     * Construtor padrão de classe.
     */
    constructor() {
        this.httpService = new HttpService();
        this._mensagem = new Mensagem();
        this._filtroSistemaView = new FiltroSistemaView("#filtroSistema");
        this._listaSistemaView = new ListaSistemaView("#listaSistema");
        this._sistemaView = new SistemaView("#sistema");
        this._sistema = {};
        this._sistemaObservable = new SistemaObservable(this, function(model) {
            this._listaSistemaView.update(model);
        });
    }    

    /**Inicializa as dependencias do caso de uso. */
    init() {
        this._filtroSistemaView.update();
    }

    /**
     * Recupera os sistemas pelo filtro informado.
     */
    pesquisar() {
        let filtroSistemaBean = this._filtroSistemaView.getFiltroSistemaBean();
        this.httpService.post('http://localhost:8080/api-sdd/sistema/getSistemasTOPorFiltro', filtroSistemaBean).then(data => {
            let sistemasTO = data;
            this._sistemaObservable.listar(sistemasTO);
        }, error => {
            this._mensagem.adicionaMensagemErro(error);
        });
    }

    /**
     * Executa a ação do botão de limpar.
     */
    limparPesquisa() {
        this._sistemaObservable.limpar();
        this._filtroSistemaView.limparFiltros();
        this.status = {};
    };

    /**
     * Chama o formulário para alteração do sistema.
     */
    atualizar(idSistema) {
        this.limparPesquisa();
        if (idSistema != null && idSistema != "") {
            this.httpService.get('http://localhost:8080/api-sdd/sistema/getSistemaPorId/'+idSistema)
            .then(data => {
                // this.getTiposSituacoes().then(
                    // tiposSituacoes => {
                        let sistema = data;
                
                        this._filtroSistemaView.reset();
                        this._sistemaView.update(sistema, null);    
                    }, error => {
                       this._mensagem.adicionaMensagemErro(error);
                // });
            }, error => {
                this._mensagem.adicionaMensagemErro(error);
                console.log(error);
            })
        }
    }


    /**
     * Altera o sistema.
     */
    alterar() {
        console.log('sistema',this._sistema);
        /*return new Promise((resolve, reject) => {
            this.httpService.post('sistema/alterar', sistema).then(data => {
                resolve(data);
            }, error =>{
                reject(data);
            });
        });*/
    }

    /**
     * Retorna os tipos de situações
     */
    getTiposSituacoes() {
        return new Promise((resolve, reject) => {
            this.httpService.get('http://localhost:8080/api-sdd/sistema/getTiposSituacoes').then(
                data =>{
                    resolve(data);    
                },
                error => {
                    reject(error);
                }
            );
        });
    }

    /**
     * Executa a ação de voltar ao filtro de pesquisa
     */
    voltar() {
        this._sistemaView.reset();
        this._filtroSistemaView.update();
    }

    /**
     * Altera o sistema.
     */
    salvar(sistema) {
        return new Promise((resolve, reject) => {
            this.httpService.post('sistema/salvar', sistema).then(data => {
                resolve(data);
            }, error =>{
                reject(error);
            });
        });
    }
    
    mudarStatus() {
        this._sistemaView.mudarTipoSituacao();
    }

    atualizarModelo() {
        let sistema = this._sistemaView.getSistema();
        console.log('sistema',sistema);
    }
}