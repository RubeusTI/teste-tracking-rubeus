function sendContactRubeus() {
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

    document.getElementById(
        "rbtracking"
    ).onload = function () {
        if (RBTracking.getHostClient() !== '') {
            setButtonSuccess();
        } else {
            setButtonFail();
            unsetScriptTracking();
        }
    };
}
function setButtonSuccess() {
    document.getElementById('hostclientButton').className = 'btn btn-success';
    const fieldHostClient = document.getElementById("hostclient");
    fieldHostClient.setAttribute('placeholder', fieldHostClient.value);
    fieldHostClient.value = null;
}

function setButtonFail() {
    document.getElementById('hostclientButton').className = 'btn btn-danger';
}

function unsetScriptTracking() {
    script = document.getElementById(
        "rbtracking"
    );
    script.parentNode.removeChild(script);
    script.removeAttribute('src');
    document.head.appendChild(script);
}

function validateNome() {
    const nomeField = document.getElementById("input_nome");
    const regexNome = /^(?![ ])(?!.*[ ]{2})((?:e|da|do|das|dos|de|d'|D'|la|las|el|los)\s*?|(?:[A-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð'][^\s]*\s*?)(?!.*[ ]$))+$/;

    changeBorderField(regexNome, nomeField);
}

function validateEmail() {
    const regexEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi;
    const emailField = document.getElementById("input_email");
    
    changeBorderField(regexEmail, emailField);
}

function validateTelefone() {
    const regexTelefone = /^(?:\+)[0-9]{2}\s?(?:\()[0-9]{2}(?:\))\s?[0-9]{4,5}(?:-)[0-9]{4}$/;
    const telefoneField = document.getElementById("input_telefone");
    
    changeBorderField(regexTelefone, telefoneField);
}

function changeBorderField(regex, field) {
    field.className = 'form-control border border-danger'
    if (!!field.value.match(regex)) {
        field.className = 'form-control border border-success'
    }
}
