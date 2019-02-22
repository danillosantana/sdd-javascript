/**
 * Executa a ação do botão de pesquisa de sistemas.
 */
$("#pesquisarSistema").on('click', function(event) {
   let filtroSistemaBean = getFiltroSistemaBean($('#formPesquisarSistema'));
    pesquisar(filtroSistemaBean);
});

/**
 * Executa a ação do botão de limpar.
 */
$("#limparSistema").on('click', function(event) {
    limpar();
 });

/**
 * Retorna uma nova instância de FiltroSistemaBean
 * 
 * @param {*} form 
 */
function getFiltroSistemaBean(form) {
    let filtroSistemaBean = {
      descricao : form.find('#descricao').val(),
      sigla : form.find('#sigla').val(),
      email : form.find('#email').val()
    };
  
    return filtroSistemaBean
  };  

/**
 * Recupera os sistemas pelo filtro informado.
 * 
 * @param {*} filtroSistemaBean 
 */
function pesquisar(filtroSistemaBean) {
    httpPost('sistema/getSistemasTOPorFiltro', filtroSistemaBean).then(data =>{
        $("#listaSistema").removeClass('invisivel');
        let sistemasTO = data;
        montarTrsSistema(sistemasTO);
    }, error =>{
        adicionaMensagemErro(error);
    });
}

/**
 * Monta os trs da lista de sistema.
 * 
 * @param {*} sistemasTO 
 */
function montarTrsSistema(sistemasTO) {
    $('#bodyTableSistema').text("");
    sistemasTO.forEach(sistemaTO => {
        let sistemaTr = montaTrSistema(sistemaTO);
        $('#bodyTableSistema').append(sistemaTr);
    });
}

/**
 * Define o tr da lista de sistema.
 * 
 * @param {*} sistemaTO 
 */
function montaTrSistema(sistemaTO) {
    let sistemaTr = $('<tr>');

    let descricao = montaTd(sistemaTO.descricao);
    sistemaTr.append(descricao);

    let sigla = montaTd(sistemaTO.sigla);
    sistemaTr.append(sigla);
    
    let email = montaTd(sistemaTO.email);
    sistemaTr.append(email);

    let url = montaTd(sistemaTO.url);
    sistemaTr.append(url);

    let acoes = montaTd(sistemaTO.status)
    sistemaTr.append(acoes);

    var tdAcoes = montaTd("")
    sistemaTr.append(montarAcoesTd(tdAcoes, sistemaTO));

    return sistemaTr;
}

/**
 * Define o td da lista de sistema.
 * 
 * @param {*} dado 
 */
function montaTd(dado) {
    var td = $('<td>');
    td.addClass('text-center');
    td.text(dado);

    return td;
}

/**
 * Monta as ações da tabela de sistema.
 * 
 * @param {*} td 
 */
function montarAcoesTd(td, sistemaTO) {
    montarAcaoAlterar(td, sistemaTO);
    return td;
}

/**
 * Monta a ação de alteção de sistema.
 */
function montarAcaoAlterar(td, sistemaTO) {
    let acaoAlterar = $('<a>');
    acaoAlterar.addClass('btn');
    acaoAlterar.addClass('btn-link');

    acaoAlterar.attr('onclick', 'alterar('+sistemaTO.id+')');
    acaoAlterar.attr('role', 'button');
    acaoAlterar.attr('title', 'Alterar Sistema');

    let imgAlterar = $('<img>');
    imgAlterar.attr('alt', 'alterar');
    imgAlterar.attr('src', 'img/alterar.png');

    acaoAlterar.append(imgAlterar);
    td.append(acaoAlterar);
}

/**
 * Chama o formulário para alteração do sistema.
 */
function  alterar(idSistema) {
    limpar();
    buscarSistemaPorId(idSistema);
}

/**
 * Reseta os filtros de pesquisa e a tabela de sistema;
 */
function limpar() {
    $('#listaSistema').text("");
    $('#bodyTableSistema').text("");
    $('#formPesquisarSistema').find('#descricao').val("") ;
    $('#formPesquisarSistema').find('#sigla').val("");
    $('#formPesquisarSistema').find('#email').val("");
}