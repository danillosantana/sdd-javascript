/**
 * Classe que fornece os serviços de mensagem de alerta do sistema.
 */
class Mensagem {

    /**
     * Construtor padrão de classe.
     */
    constructor() {

    }

    /**
     * Adiciona a mesagem no diplay
     * 
     * @param {*} msg 
     * @param {*} classes 
     */
    adicionaMensagem(msg, classes) {
        var div = $('<div>');
        div.addClass(classes);
        div.text(msg);

        $("#mensagem").append(div);    
        $("#mensagem").find('div').fadeOut(3000);
    
        setTimeout(function() {
            $("#mensagem").find('div').remove();
        }, 4000);
    }

    /**
     * Adiciona a mensagem de erro.
     * 
     * @param {*} mensagem 
     */
    adicionaMensagemErro(msg) {
        this.adicionaMensagem(msg, 'alert alert-danger');
    }

    /**
     * Adiciona a mensagem de erro.
     * 
     * @param {*} mensagem 
     */
    adicionaMensagemSucesso(msg) {
        this.adicionaMensagem(msg, 'alert alert-success');
    }
}