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

        this._sistemaProxy = SistemaFactory.create(new SistemaObservable(this, function(sistema, tiposSituacoes) {
                this._sistemaView.update(sistema, tiposSituacoes);
            }, function(sistemas) {
                this._listaSistemaView.update(sistemas);
            }),['listar', 'limparLista', 'alterar', 'limpar']);
        
        this._filtroSistemaProxy = new Proxy(new FiltroSistemaView("#filtroSistema"), {
            get : function(target, prop, receiver) {
                if ( (prop == 'update' || prop == 'reset' || 'limparFiltros') 
                        && typeof(target[prop]) == typeof(Function)){
                    return function() {    
                        return Reflect.apply(target[prop], target, arguments);       
                    }
                }
                return Reflect.get(target, prop, receiver);
            }
        });
    }    

    /**Inicializa as dependencias do caso de uso. */
    init() {
        this._filtroSistemaProxy.update();
    }

    /**
     * Recupera os sistemas pelo filtro informado.
     */
    pesquisar() {
        let filtroSistemaBean = this._filtroSistemaProxy.getFiltroSistemaBean();
        this.httpService.post('http://localhost:8080/api-sdd/sistema/getSistemasTOPorFiltro', filtroSistemaBean).then(data => {
            let sistemasTO = data;
            this._sistemaProxy.listar(sistemasTO);
        }, error => {
            this._mensagem.adicionaMensagemErro(error);
        });
    }

    /**
     * Executa a ação do botão de limpar.
     */
    limparPesquisa() {
        this._sistemaProxy.limparLista();
        this._filtroSistemaProxy.limparFiltros();
        this.status = {};
    };

    /**
     * Chama o formulário para alteração do sistema.
     */
    atualizar(idSistema) {
        this.limparPesquisa();
        if (idSistema != null && idSistema != "") {
            this.httpService.get('http://localhost:8080/api-sdd/sistema/getSistemaPorId/'+idSistema)
            .then(sistema => {
                this.getTiposSituacoes().then(
                    tiposSituacoes => {
                        this._sistemaProxy.alterar(sistema, tiposSituacoes);
                        this._filtroSistemaProxy.reset();    
                    }, error => {
                       this._mensagem.adicionaMensagemErro(error);
                });
            }, error => {
                this._mensagem.adicionaMensagemErro(error);
            })
        }
    }


    /**
     * Altera o sistema.
     */
    alterar() {
        // return new Promise((resolve, reject) => {
        //     this.httpService.post('sistema/alterar', sistema).then(data => {
        //         resolve(data);
        //     }, error =>{
        //         reject(data);
        //     });
        // });
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
        this._sistemaProxy.limpar();
        this._filtroSistemaProxy.reset();
        this._filtroSistemaProxy.update();
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
}