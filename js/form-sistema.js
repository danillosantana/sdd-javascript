var sistema = {};
var tiposSituacoes = [];

/**
 * Retorna sistema de acordo com o id informado.
 * 
 * @param {*} idSistema 
 */
function buscarSistemaPorId(idSistema) {
    definirVisibilidadeElementosParaAlteracao();

    if (idSistema != null && idSistema != "") {
        httpGet('sistema/getSistemaPorId/'+idSistema)
        .then(data => {
            sistema = data;
            let idTipoSituacao = sistema.controleSistemas[0].tipoSituacao.id;
            montarSelectStatus(idTipoSituacao);
            setarPropriedadesFormSistema(sistema);
        }, error => {
            adicionaMensagemErro(error);
        })
    }
}

/**
 * Define quais elementos devem ser apresentados.
 */
function definirVisibilidadeElementosParaAlteracao() {
    $("#filtroSistema").addClass("invisivel");
    $("#listaSistema").addClass("invisivel");
    $("#sistema").removeClass("invisivel");
    $("#sistema").find('#alterarSistema').removeClass("invisivel");
    $("#sistema").find('#salvarSistema').addClass("invisivel");
}

/**
 * Define os valores da propriedades do formulário de sistema
 * 
 * @param {*} sistema 
 */
function setarPropriedadesFormSistema(sistema) {
    $('#sistema').find('#descricao').val(sistema.descricao);
    $('#sistema').find('#sigla').val(sistema.sigla);
    $('#sistema').find('#email').val(sistema.email);
    $('#sistema').find('#responsavel').val(sistema.controleSistemas[0].usuarioResponsavel);
    $('#sistema').find('#ultimaJustificativa').val(sistema.controleSistemas[0].justificativa);
    
    console.log(moment(sistema.controleSistemas[0].dataAlteracao));
    let dataFormatada = getDataFormatada(sistema.controleSistemas[0].dataAlteracao, FORMATO_YYYY_MM_DD);
    $('#sistema').find('#dataAlteracao').val(dataFormatada);
}

/**
 * Executa a ação do botão de voltar sistema.
 */
$("#voltarFormSistema").on('click', function(event) {
    voltar();
 });
/**
 * Executa a ação de voltar ao filtro de pesquisa
 */
function voltar() {
    $("#filtroSistema").removeClass("invisivel");
    $("#listaSistema").addClass("invisivel");
    $("#sistema").addClass("invisivel");
}

/**
 * Constroi o select para escolha do status do sistema.
 */
function montarSelectStatus(idTipoSituacao) {
    httpGet('sistema/getTiposSituacoes').then(
        data =>{
            let selectStatus = $('#sistema').find('#status');
            tiposSituacoes = data;
            definirOption(selectStatus,{id : '', descricao : 'Selecione'});

            tiposSituacoes.forEach(tiposSituacao => {
                definirOption(selectStatus, tiposSituacao, idTipoSituacao);
            });
        },
        error => {
            adicionaMensagemErro(error);
        }
    );
}

/**
 * Define a opção do input select.
 * 
 * @param {*} select 
 * @param {*} data 
 */
function definirOption(select, data, idSelecionado) {
    let option = $('<option>');
    option.text(data.descricao);
    option.attr('value', data.id);
    if (data.id == idSelecionado) {
        option.attr('selected', 'selected');
    }

    select.append(option);
}

/**
 * 
 * 
 */
$('#sistema').find('#status').change(function(){
    var id = $(this).val();
    if (id != null && id != "" && tiposSituacoes.length > 0) {
        tiposSituacoes.forEach(tipoSituacao => {
            if (tipoSituacao.id == id) {
                sistema.controleSistemas[0].tipoSituacao = tipoSituacao;
            }
        });
    }
}); 
    
/**
 * 
 */
$('#sistema').find('#dataAlteracao').change(function(){
    var data = $(this).val();
    sistema.controleSistemas[0].dataAlteracao = getDataFormatada(data, FORMTAO_ISO8601);
});

/**
 * Altera o sistema.
 */
$('#sistema').find('#alterarSistema').on('click', function() {
    httpPost('sistema/alterar', sistema).then(data => {
        sistema = {};
        adicionaMensagemSucesso(data);
        voltar();
    }, error =>{
        adicionaMensagemErro(error);
    });
})