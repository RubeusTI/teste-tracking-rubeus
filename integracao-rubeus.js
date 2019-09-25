function enviarContatoRubeus() {
    const data = {
        nome: document.getElementById("input_nome").value,
        emailPrincipal: document.getElementById("input_email").value,
        telefonePrincipal: document.getElementById("input_telefone").value
    };

    RBTracking.sendData(data, callbackSuccess, callbackError);
}

function callbackError() {
    const span = getSpan();
    span.className = "alert alert-danger";   
    span.innerText = "Falhou!";
}

function callbackSuccess() {
    const span = getSpan();
    span.innerText = "Funcionou!";
    span.className = "alert alert-success";
}

function getSpan() {
    const span = document.getElementById("response-span");
    span.hidden = false;
    return span;
}

function setHostClient() {
    document.getElementById(
        "rbtracking"
    ).src = "http://trackinglocal.com.br/libs/RBTracking.min.js?rbclicod=" +
    document.getElementById("hostclient").value;
}