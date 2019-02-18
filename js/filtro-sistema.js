var formPesqusiarSistema = document.querySelector("#formPesquisarSistema");
var btnPesquisarSistema =  document.querySelector("#pesquisar-sistema");
var btnLimparSistema =  document.querySelector("#limparSistema");
var listaSistema = document.querySelector("#listaSistema");
var bodyTableSistema = document.querySelector("#bodyTableSistema");

/**
 * Executa a ação do botão de pesquisa de sistemas.
 */
btnPesquisarSistema.addEventListener("click", function(event) {
   let filtroSistemaBean = getFiltroSistemaBean(formPesqusiarSistema);
    pesquisar(filtroSistemaBean);
});

/**
 * Executa a ação do botão de limpar.
 */
btnLimparSistema.addEventListener("click", function(event) {
    limpar();
 });

/**
 * Retorna uma nova instância de FiltroSistemaBean
 * 
 * @param {*} form 
 */
function getFiltroSistemaBean(form) {
    let filtroSistemaBean = {
      descricao : form.descricao.value,
      sigla : form.sigla.value,
      email : form.email.value
    };
  
    return filtroSistemaBean
  };  

/**
 * Recupera os sistemas pelo filtro informado.
 * 
 * @param {*} filtroSistemaBean 
 */
function pesquisar(filtroSistemaBean) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8080/api-sdd/sistema/getSistemasTOPorFiltro", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.addEventListener("load", function() {
        if (xhr.status == 200) {
            listaSistema.classList.remove("invisivel");
            var sistemasTO = JSON.parse(xhr.responseText);
            montarTrsSistema(sistemasTO);
        } else {
            listaSistema.classList.add("invisivel");
            adicionaMensagemErro(xhr.response);
        }
    });

    var json = JSON.stringify(filtroSistemaBean);
    xhr.send(json);
}

/**
 * Monta os trs da lista de sistema.
 * 
 * @param {*} sistemasTO 
 */
function montarTrsSistema(sistemasTO) {
    bodyTableSistema.innerHTML = "";
    sistemasTO.forEach(sistemaTO => {
        var sistemaTr = montaTrSistema(sistemaTO);
        bodyTableSistema.appendChild(sistemaTr);
    });
}

/**
 * Define o tr da lista de sistema.
 * 
 * @param {*} sistemaTO 
 */
function montaTrSistema(sistemaTO) {
    var sistemaTr = document.createElement("tr");
    sistemaTr.appendChild(montaTd(sistemaTO.descricao));
    sistemaTr.appendChild(montaTd(sistemaTO.sigla));
    sistemaTr.appendChild(montaTd(sistemaTO.email));
    sistemaTr.appendChild(montaTd(sistemaTO.url));
    sistemaTr.appendChild(montaTd(sistemaTO.status));

    var tdAcoes = montaTd("")
    sistemaTr.appendChild(montarAcoesTd(tdAcoes, sistemaTO));

    return sistemaTr;
}

/**
 * Define o td da lista de sistema.
 * 
 * @param {*} dado 
 */
function montaTd(dado) {
    var td = document.createElement("td");
    td.classList.add("text-center");
    td.textContent = dado;

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
    let acaoAlterar = document.createElement("a");
    acaoAlterar.classList.add("btn");
    acaoAlterar.classList.add("btn-link");

    acaoAlterar.setAttribute("onclick", "alterar("+sistemaTO.id+")");
    acaoAlterar.setAttribute("role", "button");
    acaoAlterar.setAttribute("title", "Alterar Sistema");

    let imgAlterar = document.createElement("img");
    imgAlterar.setAttribute("alt", "alterar");
    imgAlterar.setAttribute("src", "img/alterar.png");

    acaoAlterar.appendChild(imgAlterar);
    td.appendChild(acaoAlterar);
}

/**
 * Chama o formulário para alteração do sistema.
 */
function  alterar(idSistema) {
    buscarSistemaPorId(idSistema);
}

/**
 * Reseta os filtros de pesquisa e a tabela de sistema;
 */
function limpar() {
    listaSistema.classList.add("invisivel");
    bodyTableSistema.innerHTML = "";
    formPesqusiarSistema.descricao.value = "";
    formPesqusiarSistema.sigla.value = "";
    formPesqusiarSistema.email.value = "";
}