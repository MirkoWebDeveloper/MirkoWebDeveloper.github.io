//Ricerca
search.addEventListener("input", function () {
    const testoRicerca = search.value.toLowerCase();
    const cards_search = document.querySelectorAll(".ricetta"); // qui dentro

    cards_search.forEach(function (card) {
        const titolo = card.querySelector("h3").textContent.toLowerCase();

        if (titolo.includes(testoRicerca)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
});


// cards hero
const hero_cards = [
    {
        titolo: "Bigoli in salsa di olio e acciughe",
        tempo: "1 ora e 35 minuti",
        difficolta: "Molto facile",
        categoria: "Primo",
        immagine: "immagini/bigoli.jpg",
        link: "bigoli.html"
    },

    {
        titolo: "Cotoletta alla milanese",
        tempo: "1 ora e 35 minuti",
        difficolta: "Molto facile",
        categoria: "Secondo",
        immagine: "immagini/ricetta.jpg",
        link: "#"
    },

    {
        titolo: "Tiramisù",
        tempo: "1 ora e 35 minuti",
        difficolta: "Molto facile",
        categoria: "Dolce",
        immagine: "immagini/ricetta.jpg",
        link: "#"
    }
];

//funzione per mostrare le cards nella home
function cardsHero()
{
    const card = document.querySelector(".cards-evid");
    if (!card) return; // se non esiste, esci dalla funzione
    for (let ricetta of hero_cards)
    {
        card.innerHTML += `
            <div class="ricetta col-12 col-md-3">
                <img class="img-ricetta" src="${ricetta.immagine}">
        
                <div class="info">
                    <h3 class="ricetta-tit">
                        <a href="${ricetta.link}">
                            ${ricetta.titolo}
                        </a>
                    </h3>

                    <p class="param-ricetta">
                        Tempo: ${ricetta.tempo}<br>
                        Difficoltà: ${ricetta.difficolta}<br>
                        <span>${ricetta.categoria}</span>
                    </p>
                </div>
            </div>
        `;

    }
}

cardsHero();

//card ricette
const cards_ricette = [
    {
        titolo: "Bigoli in salsa di olio e acciughe",
        tempo: "1 ora e 35 minuti",
        difficolta: "Molto facile",
        categoria: "Primo",
        immagine: "immagini/bigoli.jpg",
        link: "bigoli.html"
    },

    {
        titolo: "Lasagne al forno",
        tempo: "1 ora e 35 minuti",
        difficolta: "Molto facile",
        categoria: "Primo",
        immagine: "immagini/ricetta.jpg",
        link: "#"
    },

    {
        titolo: "Risotto ai funghi",
        tempo: "1 ora e 35 minuti",
        difficolta: "Molto facile",
        categoria: "Primo",
        immagine: "immagini/ricetta.jpg",
        link: "#"
    },

    {
        titolo: "Spaghetti alla carbonara",
        tempo: "1 ora e 35 minuti",
        difficolta: "Molto facile",
        categoria: "Primo",
        immagine: "immagini/ricetta.jpg",
        link: "#"
    },

    {
        titolo: "Cotoletta alla milanese",
        tempo: "1 ora e 35 minuti",
        difficolta: "Molto facile",
        categoria: "Secondo",
        immagine: "immagini/ricetta.jpg",
        link: "#"
    },

    {
        titolo: "Pollo al forno con patate",
        tempo: "1 ora e 35 minuti",
        difficolta: "Molto facile",
        categoria: "Secondo",
        immagine: "immagini/ricetta.jpg",
        link: "#"
    },

    {
        titolo: "Orata al cartoccio",
        tempo: "1 ora e 35 minuti",
        difficolta: "Molto facile",
        categoria: "Secondo",
        immagine: "immagini/ricetta.jpg",
        link: "#"
    },

    {
        titolo: "Spezzatino di manzo",
        tempo: "1 ora e 35 minuti",
        difficolta: "Molto facile",
        categoria: "Secondo",
        immagine: "immagini/ricetta.jpg",
        link: "#"
    },

    {
        titolo: "Tiramisù",
        tempo: "1 ora e 35 minuti",
        difficolta: "Molto facile",
        categoria: "Dolce",
        immagine: "immagini/ricetta.jpg",
        link: "#"
    },

    {
        titolo: "Panna cotta",
        tempo: "1 ora e 35 minuti",
        difficolta: "Molto facile",
        categoria: "Dolce",
        immagine: "immagini/ricetta.jpg",
        link: "#"
    },

    {
        titolo: "Crostata di marmellata",
        tempo: "1 ora e 35 minuti",
        difficolta: "Molto facile",
        categoria: "Dolce",
        immagine: "immagini/ricetta.jpg",
        link: "#"
    },

    {
        titolo: "Cheesecake ai frutti di bosco",
        tempo: "1 ora e 35 minuti",
        difficolta: "Molto facile",
        categoria: "Dolce",
        immagine: "immagini/ricetta.jpg",
        link: "#"
    }
];

//funzione per mostrare le cards nella pagina ricette
function cards()
{
    const card = document.querySelector(".cards");
    if (!card) return; // se non esiste, esci dalla funzione
    for (let ricetta of cards_ricette)
    {
        card.innerHTML += `
            <div class="ricetta col-12 col-md-3">
                <img class="img-ricetta" src="${ricetta.immagine}">
        
                <div class="info">
                    <h3 class="ricetta-tit">
                        <a href="${ricetta.link}">
                            ${ricetta.titolo}
                        </a>
                    </h3>

                    <p class="param-ricetta">
                        Tempo: ${ricetta.tempo}<br>
                        Difficoltà: ${ricetta.difficolta}<br>
                        <span>${ricetta.categoria}</span>
                    </p>
                </div>
            </div>
        `;

    }
}

cards();