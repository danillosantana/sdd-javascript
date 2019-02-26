/**
 * Classe responsável por disponibilizar os serviçoes de requisiçoes http.
 * 
 * @author Danillo Santana
 */
class HttpService {

    /**
     * Construtor padrão de classe.
     */
    constructor() {

    }

    /**
     * Realiza a requisição GET. 
     * 
     * @param {*} url 
     */
    get(url) {
        return new Promise((resolve, reject) => {
            $.ajax({
                method : 'GET',
                url: url,
                contentType:  'application/json',
                dataType: "json",
            }).done(function(data) {
                resolve(data);
            })
            .fail(function(data) {
                reject(data.responseText)
            });
        });
    }

    /**
     * Realiza a requisição POST.
     * 
     * @param {*} url 
     * @param {*} data 
     */
    post(url, data) {
        return new Promise((resolve, reject) => {
            $.ajax({
                method : 'POST',
                url: url,
                data: JSON.stringify(data),
                contentType:  'application/json',
                dataType: "json",
            }).done(function(data) {
                resolve(data);
            })
            .fail(function(data) {
                reject(data.responseText)
            });
        });
    }
}