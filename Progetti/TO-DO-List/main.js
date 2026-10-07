function aggiornaContatore() {
        const daFare = document.querySelectorAll('li:not(.completata)');
        const cont = daFare.length;  
        const paragrafo = document.getElementById('attivitaRimaste');
        const testo = "Sono rimaste " + cont + " attività";
        paragrafo.textContent = testo;
}

const dati = [];
function salvaDati() {
    dati.length = 0;
    const tutteLeAttivita = document.querySelectorAll('li');
    tutteLeAttivita.forEach(function (li) {
        const testo = li.firstChild.textContent;
        const stato = li.classList.contains('completata'); //restituisce vero o falso a seconda che la classe ci sia o non ci sia
              
        dati.push({ testoAtt: testo, statoAtt: stato });
    });

    const stringaDati = JSON.stringify(dati);
    localStorage.setItem('salvataggio', stringaDati);
}

function caricaDati() {
    const stringa = localStorage.getItem('salvataggio');

    if (stringa === null) {
        return;
    }

    const datiSalvati = JSON.parse(stringa);
    const lista = document.getElementById('listaAttivita');

    datiSalvati.forEach(function (attivita) {

        const nuovoLi = document.createElement('li');

        nuovoLi.textContent = attivita.testoAtt;

        if (attivita.statoAtt) {
            nuovoLi.classList.add('completata');
        }

        nuovoLi.addEventListener('click', function () {
            nuovoLi.classList.toggle('completata');
            salvaDati();
            aggiornaContatore();
        });

        const bottoneX = document.createElement('button');
        bottoneX.textContent = "X";

        bottoneX.addEventListener('click', function (event) {
            event.stopPropagation();
            bottoneX.parentElement.remove();
            salvaDati();
            aggiornaContatore();
        });

        nuovoLi.appendChild(bottoneX);
        lista.appendChild(nuovoLi);
    });

    aggiornaContatore();
}
    

const form = document.querySelector("form");

form.addEventListener("submit", function (event) {
    event.preventDefault(); //blocco l'invio dei dati        
      
    const nuovo = form.querySelector('[name="punto"]'); //campo inserisci attività        

    if (nuovo.value.trim()==="") {
        alert("inserisci un'attività");
        return;
    }

    const lista = document.getElementById('listaAttivita');
    const nuovoLi = document.createElement('li');
    nuovoLi.addEventListener('click', function () { 
        nuovoLi.classList.toggle('completata');
        salvaDati();
        aggiornaContatore();
    });
    nuovoLi.textContent = nuovo.value;
    const bottoneX = document.createElement('button');
    bottoneX.addEventListener('click', function (event) { 
        event.stopPropagation();
        bottoneX.parentElement.remove();
        salvaDati();
        aggiornaContatore();
    });
    bottoneX.textContent = "X";
    nuovoLi.appendChild(bottoneX);
    lista.appendChild(nuovoLi);
    salvaDati();
    aggiornaContatore();
    nuovo.value = '';    
});

caricaDati();
aggiornaContatore();
