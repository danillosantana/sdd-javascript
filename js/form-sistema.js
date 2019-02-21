var sistema = {};

/**
 * Retorna sistema de acordo com o id informado.
 * 
 * @param {*} idSistema 
 */
function buscarSistemaPorId(idSistema) {
    $("#filtroSistema").addClass("invisivel");
    $("#listaSistema").addClass("invisivel");
    $("#sistema").removeClass("invisivel");

    if (idSistema != null && idSistema != "") {
        httpGet('sistema/getSistemaPorId/'+idSistema)
        .then(data =>{
            sistema = data;
        }, error => {
            adicionaMensagemErro(error);
        })
    }
}

function montarStatus(tipoSituacao) {
    
}