var msg = document.querySelector("#mensagem");

/**
 * Adiciona a mensagem de erro.
 * 
 * @param {*} mensagem 
 */
function adicionaMensagemErro(mensagem) {
    this.msg.innerHTML = ""
    var div = document.createElement("div");
    div.classList.add("alert");
    div.classList.add("alert-danger");
    div.textContent = mensagem;

    this.msg.appendChild(div);

    setTimeout(function() {
        this.msg.innerHTML = ""
    }, 2000);
}

/**
 * Adiciona a mensagem de erro.
 * 
 * @param {*} mensagem 
 */
function adicionaMensagemSucesso(mensagem) {
    this.msg.innerHTML = ""
    var div = document.createElement("div");
    div.classList.add("alert");
    div.classList.add("alert-success");
    div.textContent = mensagem;

    this.msg.appendChild(div);

    setTimeout(function() {
        this.msg.innerHTML = ""
    }, 2000);
}