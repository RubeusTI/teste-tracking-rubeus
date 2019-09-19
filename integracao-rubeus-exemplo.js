/**
 * Para esse código funcionar o script de monitoramento
 * de páginas do Rubeus precisa estar instalado na página.
 */

/**
 * Link documentação para instalação
 * https://docs.rubeus.com.br/monitoramento/instalacao/
 */

/**
 * Método de envio do contato para o Rubeus
 * Link documentação estrutura completa de dados do contato 
 * https://docs.rubeus.com.br/api_crm/contato/
 * 
 * Atenção: obrigatório informar o token e a origem. 
 * Para encontrar o seu token e origem acesso o menu configurações->integrações->Canais/API
 */

function enviarContatoRubeus() {
    const data = {
        nome: document.getElementById("input_nome").value,
        emailPrincipal: document.getElementById("input_email").value,
        telefonePrincipal: document.getElementById("input_telefone").value,
        token: "SEUTOKEN",
        origem: 99 // Subistituir pela origem referente ao token
    };

    RBTracking.sendData(data, callbackPessoa, callbackError);
}

/**
 * Método de envio de evento para um contato existente no Rubeus
 * Link documentação estrutura completa de evento
 * https://docs.rubeus.com.br/api_crm/evento/
 * 
 * Atenção: obrigatório informar o token e a origem. 
 * Para encontrar o seu token e origem acesso o menu configurações->integrações->Canais/API 
 */
function callbackPessoa(resposta) {

    const codPessoa = resposta.data.id; // Não é necessário
    const nome = document.getElementById("input_nome").value;
    const email = document.getElementById("input_email").value;
    const telefone = document.getElementById("input_telefone").value;

    const evento = {
        eventData: {
            descricao: "<p><b style=\"padding-top: 10px\">Nome: </b>" +
                nome + "<br><b style=\"padding-top: 10px\">E-mail: </b>" +
                email + "<br><b style=\"padding-top: 10px\">Telefone: </b>" +
                telefone + "<br></p>",
            codCurso: 1, // codigo curso no Rubeus
            codOferta: 1, // codigo oferta de curso no Rubeus
            pessoa: { id: codPessoa }, // não é necessário, mas pode ser utilizado
            token: "SEUTOKEN",
            origem: 99, // Subistituir pela origem referente ao token
            camposPersonalizados: {
                localdecaptacao_compl: "Site"
            }
        },

        /**
         * o campo eventType é para ser passado o id do evento,
         * já o codEventType é para o código, que caso seja utilizado
         * deverá ser passado a origem e o token
         * respectivos ao tipo do evento.
         */
        eventType: "99"
    };

    RBTracking.sendEvent(evento, callbackEvento, callbackError);
}

function callbackEvento() {
    setResponseSuccess();
    console.log("Evento cadastrado com sucesso!")
}

function callbackError() {
    const popup = document.getElementById("response-span");
    popup.innerText = "Não funcionou!";
    popup.className = "alert alert-danger";
    popup.hidden = false;
}

function setResponseSuccess() {
    const popup = document.getElementById("response-span");
    popup.innerText = "Funcionou!";
    popup.className = "alert alert-success";
    popup.hidden = false;
}