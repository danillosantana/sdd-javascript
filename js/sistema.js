var sistema = {};
var tiposSituacoes = [];

var sistemaController =  new SistemaController();
var mensagem = new Mensagem();
var listaSistemaView = new ListaSistemaView("#listaSistema");
var filtroSistemaView = new FiltroSistemaView("#filtroSistema");

filtroSistemaView.update();

/**
 * Executa a ação do botão de pesquisa de sistemas.
 */
function pesquisar() {
    let filtroSistemaBean = filtroSistemaView.getFiltroSistemaBean();
    sistemaController.pesquisar(filtroSistemaBean).then(
        data => {
            let sistemasTO = data;
            listaSistemaView.update(sistemasTO);
        }, error => {
           mensagem.adicionaMensagemErro(error);
        }
    );
};


/**
 * Executa a ação do botão de limpar.
 */
function limparPesquisa() {
    listaSistemaView.reset();
    filtroSistemaView.limparFiltros();
};


/**
 * Chama o formulário para alteração do sistema.
 */
function alterar(idSistema) {
    limparPesquisa();
    definirVisibilidadeElementos(false);
    sistemaController.buscarSistemaPorId(idSistema).then(
        data => {
            sistema = data;
            let idTipoSituacao = sistema.controleSistemas[0].tipoSituacao.id;
            montarSelectStatus(idTipoSituacao);
            setarPropriedadesFormSistema(sistema);
        }, error => {
            mensagem.adicionaMensagemErro(error);
        }
    );
}
/**
 * Define quais elementos devem ser apresentados.
 */
function definirVisibilidadeElementos(isInclusao) {
    filtroSistemaView.reset();
    listaSistemaView.reset();
    $("#sistema").removeClass("invisivel");

    if (isInclusao) {
        $("#sistema").find('#salvarSistema').removeClass("invisivel");
        $("#sistema").find('#alterarSistema').addClass("invisivel");
        $("#sistema").find('#filedControleSistema').addClass("invisivel");
        filedControleSistema
    } else {
        $("#sistema").find('#salvarSistema').addClass("invisivel");
        $("#sistema").find('#alterarSistema').removeClass("invisivel");
        $("#sistema").find('#filedControleSistema').removeClass("invisivel");
    }
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

    let dataFormatada = DateTimeUtil.getDataFormatada(sistema.controleSistemas[0].dataAlteracao, FORMATO_YYYY_MM_DD);
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
    filtroSistemaView.update();
    listaSistemaView.reset();
    $("#sistema").addClass("invisivel");
}

/**
 * Constroi o select para escolha do status do sistema.
 */
function montarSelectStatus(idTipoSituacao) {
    sistemaController.getTiposSituacoes().then(
        data => {
            let selectStatus = $('#sistema').find('#status');
            tiposSituacoes = data;
            definirOption(selectStatus,{id : '', descricao : 'Selecione'});

            tiposSituacoes.forEach(tiposSituacao => {
                definirOption(selectStatus, tiposSituacao, idTipoSituacao);
            });
        }, error => {
            mensagem.adicionaMensagemErro(error);
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
    sistema.controleSistemas[0].dataAlteracao = DateTimeUtil.getDataFormatada(data, FORMTAO_ISO8601);
});

/**
 * Altera o sistema.
 */
$('#sistema').find('#alterarSistema').on('click', function() {
    sistema.controleSistemas[0].novaJustificativa = $('#sistema').find('#novaJustificativa').val();
    sistema.controleSistemas[0].usuarioResponsavel = $('#sistema').find('#responsavel').val();
    sistemaController.alterar(sistema).then(
        data => {
            sistema = {};
            mensagem.adicionaMensagemSucesso(data);
            voltar();
        }, error => {
            mensagem.adicionaMensagemErro(error);
        }
    );
});

/**
 * Salva o sistema.
 */
function salvar() {
    sistema = getNovoSistema();
    sistemaController.salvar(sistema).then(
        data =>{
            mensagem.adicionaMensagemSucesso(data);
            limparNovoSistema();
            voltar();
        }, error => {
            mensagem.adicionaMensagemErro(error);
        }
    );
}

/**
 * Chama formulário para adicionar novo sistema.
 */
function adicionarNovo() {
    definirVisibilidadeElementos(true);
}

/**
 * Retorna uma nova instância de sistema.
 */
function getNovoSistema() {
    let sistema = {
        sigla : $('#sistema').find('#descricao').val(),
        descricao : $('#sistema').find('#sigla').val(),
        email : $('#sistema').find('#email').val()
    };

    return sistema;
}

/**
 * Reseta formulário novo sistema.
 */
function limparNovoSistema() {
    $('#sistema').find('#descricao').val("");
    $('#sistema').find('#sigla').val("");
    $('#sistema').find('#email').val("");
}


