/**
 * Adiciona a mesagem no diplay
 * 
 * @param {*} msg 
 * @param {*} classes 
 */
function adicionaMensagem(msg, classes) {
    var div = $('<div>');
    div.addClass(classes);
    div.text(msg);

    $("#mensagem").append(div);    

    setTimeout(function() {
        $("#mensagem").find('div').remove();
    }, 5000);
}

/**
 * Adiciona a mensagem de erro.
 * 
 * @param {*} mensagem 
 */
function adicionaMensagemErro(msg) {
    adicionaMensagem(msg, 'alert alert-danger');
}

/**
 * Adiciona a mensagem de erro.
 * 
 * @param {*} mensagem 
 */
function adicionaMensagemSucesso(msg) {
    adicionaMensagem(msg, 'alert alert-success');
}