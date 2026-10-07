const form = document.querySelector("form");
const nome = form.querySelector('[name="nome"]'); //campo nome    
const mail = form.querySelector('[name="mail"]'); //campo email
const password = form.querySelector('[name="password"]'); //campo password
const conferma = form.querySelector('[name="conferma"]'); //campo conferma password
const successo = document.querySelector("#successo");

form.addEventListener("submit", function (event) {
    event.preventDefault(); //blocco l'invio dei dati
    const nomeOk = validaNome();
    const mailOk = validaMail();
    const passOk = validaPassword();
    const confOk = validaConferma();
    if (nomeOk && mailOk && passOk && confOk) {
        form.hidden = true;
        successo.textContent = "Registrazione completata con successo! Benvenuto " + nome.value;        
        successo.hidden = false;
    }
});

const mostra = document.getElementById('mostraPassword');
mostra.addEventListener("click", function () {
    if (password.type === "password") {
        password.type = "text";
        mostra.textContent = "nascondi";
    }
    else {
        password.type = "password";
        mostra.textContent = "mostra";
    }        
});

nome.addEventListener("input", validaNome);
mail.addEventListener("input", validaMail);
password.addEventListener("input", validaPassword);
conferma.addEventListener("input", validaConferma);

function validaNome() {    
    const errorNome = form.querySelector("#errorNome");
    if (nome.value.length < 3) {
        errorNome.textContent = "errore inserisci almeno 3 caratteri";
        nome.classList.add("errore");
        nome.classList.remove("valido");
        return false;
    }
    else {
        errorNome.textContent = "";
        nome.classList.remove("errore");
        nome.classList.add("valido");
        return true;
    }    
}

function validaMail() {
    const errorMail = form.querySelector("#errorMail");
    if (mail.value.includes("@") && mail.value.includes(".")) {
        const indexCh = mail.value.indexOf("@");
        const indexPun = mail.value.lastIndexOf(".");
        
        if (indexCh > 0 && indexPun > indexCh) {
            errorMail.textContent = "";
            mail.classList.add("valido");
            mail.classList.remove("errore");
            return true;
        }
        else {
            errorMail.textContent = "errore E-mail non valida";
            mail.classList.add("errore");
            mail.classList.remove("valido");
            return false;
        }
    }
    errorMail.textContent = "errore E-mail non valida";
    mail.classList.add("errore");
    mail.classList.remove("valido");
    return false;    
}

function validaPassword() {
    const errorPass = form.querySelector("#errorPass");
    if (password.value.length < 8) {
        errorPass.textContent = "errore inserisci almeno 8 caratteri";
        password.classList.add("errore");
        password.classList.remove("valido");
        return false;        
    }
    if (password.value.length >= 8 && /\d/.test(password.value)) {
        errorPass.textContent = "";
        password.classList.add("valido");
        password.classList.remove("errore");
        return true;        
    }
    errorPass.textContent = "errore inserisci almeno un numero";
    password.classList.add("errore");
    password.classList.remove("valido");
    return false;
}

function validaConferma() {
    const errorConf = form.querySelector("#errorConf");
    if (password.value === conferma.value) {
        errorConf.textContent = "";
        conferma.classList.add("valido");
        conferma.classList.remove("errore");
        return true;
    }
    else {
        errorConf.textContent = "errore le due password sono diverse";
        conferma.classList.add("errore");
        conferma.classList.remove("valido");
        return false;
    }    
}
