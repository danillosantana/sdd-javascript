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
    }

    /**
     * Recupera os sistemas pelo filtro informado.
     * 
     * @param {*} filtroSistemaBean 
     */
    pesquisar(filtroSistemaBean) {
        return new Promise((resolve, reject) => {
            this.httpService.post('sistema/getSistemasTOPorFiltro', filtroSistemaBean).then(data =>{
                resolve(data);
            }, error =>{
                reject(error);
            });
        });
    }

 
    /**
     * Retorna sistema de acordo com o id informado.
     * 
     * @param {*} idSistema 
     */
    buscarSistemaPorId(idSistema) {
        return new Promise((resolve, reject) => {
            if (idSistema != null && idSistema != "") {
                this.httpService.get('sistema/getSistemaPorId/'+idSistema)
                .then(data => {
                    resolve(data);
                }, error => {
                    reject(error);
                })
            }
        });
    }

    /**
     * Altera o sistema.
     */
    alterar(sistema) {
        return new Promise((resolve, reject) => {
            this.httpService.post('sistema/alterar', sistema).then(data => {
                resolve(data);
            }, error =>{
                reject(data);
            });
        });
    }

    /**
     * Retorna os tipos de situações
     */
    getTiposSituacoes() {
        return new Promise((resolve, reject) => {
            this.httpService.get('sistema/getTiposSituacoes').then(
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