var divSistema = document.querySelector("#sistema");
var formPesqusiarSistema = document.querySelector("#formPesquisarSistema");
var filtroSistema = document.querySelector("#filtroSistema");
var bodyTableSistema = document.querySelector("#bodyTableSistema");

var sistema = {};

/**
 * Retorna sistema de acordo com o id informado.
 * 
 * @param {*} idSistema 
 */
function buscarSistemaPorId(idSistema) {
    filtroSistema.classList.add("invisivel");
    listaSistema.classList.add("invisivel");
    bodyTableSistema.innerHTML = "";
    divSistema.classList.remove("invisivel");

    if (idSistema != null && idSistema != "") {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:8080/api-sdd/sistema/getSistemaPorId/"+idSistema, true);
        xhr.setRequestHeader("Content-Type", "application/json");
    
        xhr.addEventListener("load", function() {
            if (xhr.status == 200) {
                sistema = JSON.parse(xhr.responseText);
                console.log(sistemas);
            } else {
                adicionaMensagemErro(xhr.response);
            }
        });
    
        xhr.send();
    }
}

function montarStatus(tipoSituacao) {
    httpGet.then(res => console.log("The result is", res));
}