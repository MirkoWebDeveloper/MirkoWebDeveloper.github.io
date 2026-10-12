const elDomande = [
    {
        testo: "Quale videogioco detiene il record per il maggior numero di copie vendute nella storia?",
        risposte: ["GTA V", "Super Mario Bros", "Tetris", "Minecraft"],
        giusta: 3
    },

    {
        testo: "In quale anno è stato pubblicato il primo capitolo della serie The Legend of Zelda in Giappone?",
        risposte: ["1986", "1991", "1989", "1983"],
        giusta: 0
    },

    {
        testo: "Qual è il vero nome del protagonista del franchise Halo, noto come Master Chief?",
        risposte: ["Marcus-104", "James-005", "John-117", "David-058"],
        giusta: 2
    },

    {
        testo: "Quale motore grafico è stato sviluppato da Epic Games ed è ampiamente utilizzato nell'industria dei videogiochi?",
        risposte: ["Frostbite", "Unreal Engine", "CryEngine", "Unity"],
        giusta: 1
    },

    {
        testo: "In Dark Souls, qual è il nome dell'NPC che insegna la celebre posa: Loda il Sole (Praise the Sun)?",
        risposte: ["Lautrec di Carim", "Ostrava di Boletaria", "Siegmeyer di Catarina", "Solaire di Astora"],
        giusta: 3
    }
];

let counter = 0;
let punteggio = 0;

const multipla = document.querySelector("#rispMultipla");
const risultato = multipla.querySelector("#risultato");
const indicatore = multipla.querySelector("#indicatore");
const domande = multipla.querySelector("#domande");
const domanda = multipla.querySelector("#domanda"); 
const errore = multipla.querySelector("#errore");
const ricomincia = document.getElementById("ricomincia");

ricomincia.addEventListener("click", function () {
    counter = 0;
    punteggio = 0;
    risultato.hidden = true;
    domande.hidden = false;
    indicatore.hidden = false;
    prossima.classList.remove("nascosto");
    swapDomande(counter);    
});

const prossima = document.getElementById("prossima");
prossima.addEventListener("click", function () {
    const rispostaSelezionata = domande.querySelector(".corretto, .sbagliato"); //contiene tutti i bottoni che hanno come classe quelle indicate

    if (!rispostaSelezionata) {
        errore.textContent = "Seleziona una risposta prima di continuare!"; //cosa succede se premo prossima senza aver selezionato una risposta
        return;
    }

    errore.textContent = "";

    if (counter === elDomande.length - 1) {
        risultato.textContent =
                                "Hai terminato il quiz! Il tuo punteggio è " +
                                punteggio + " su " + elDomande.length + ".";
        risultato.hidden = false;
        domande.hidden = true;
        indicatore.hidden = true;
        prossima.classList.add("nascosto");
        ricomincia.classList.remove("nascosto");
        return;
    }

    counter++;
    swapDomande(counter);
});



function swapDomande(n) {

    if (n === 0) {
        ricomincia.classList.add("nascosto");
    }

    const bottoni = domande.querySelectorAll("button"); //seleziono tutti i bottoni (se ci sono)

    bottoni.forEach(function(bottone) {
        bottone.remove(); //cancello tutti i bottoni (se ci sono)
    });

    domanda.textContent = elDomande[n].testo; //Inserisco il testo della domanda
    indicatore.textContent = "Domanda " + (n + 1) + " di " + elDomande.length; //testo dell'indicatore

    if (n === elDomande.length - 1) {
        prossima.textContent = "Fine";
    }
    else {
        prossima.textContent = "Prossima";
    }

    elDomande[n].risposte.forEach(function(risposta, index) {
        const nuovoBottone = document.createElement("button");
        nuovoBottone.addEventListener("click", function () {

            const bottoniDaBloccare = domande.querySelectorAll("button");
            bottoniDaBloccare.forEach(function (bottone) {
                bottone.disabled = true;
            });

            if (index === elDomande[n].giusta) {
                nuovoBottone.classList.add("corretto");
                punteggio++;
            }
            else {
                nuovoBottone.classList.add("sbagliato");
                bottoniDaBloccare[elDomande[n].giusta].classList.add("corretto");
            }            
        });
        nuovoBottone.textContent = risposta;
        domande.appendChild(nuovoBottone); //creo i vari bottoni delle risposte
    });    
};

swapDomande(counter);
