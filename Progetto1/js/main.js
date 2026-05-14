function goToSlide(index) {
  const car_rec = document.getElementById('car_rec');
  const pallini = document.querySelectorAll('.pallino');
  
  car_rec.style.transform = `translateX(-${index * 100}%)`;
 
  pallini.forEach(function(pall) {
    pall.classList.remove('active');
  });
  pallini[index].classList.add('active');
}

const menu = [
  //Antipasti
  {
    nome: "Antipasto 1",
    prezzo: 0.00,
    descrizione: "Breve descrizione del piatto o ingredienti usati",
    categoria: "antipasto"
  },
  {
    nome: "Antipasto 2",
    prezzo: 0.00,
    descrizione: "Breve descrizione del piatto o ingredienti usati",
    categoria: "antipasto"
  },
  {
    nome: "Antipasto 3",
    prezzo: 0.00,
    descrizione: "Breve descrizione del piatto o ingredienti usati",
    categoria: "antipasto"
  },
  {
    nome: "Antipasto 4",
    prezzo: 0.00,
    descrizione: "Breve descrizione del piatto o ingredienti usati",
    categoria: "antipasto"
  },
  {
    nome: "Antipasto 5",
    prezzo: 0.00,
    descrizione: "Breve descrizione del piatto o ingredienti usati",
    categoria: "antipasto"
  },
  {
    nome: "Antipasto 6",
    prezzo: 0.00,
    descrizione: "Breve descrizione del piatto o ingredienti usati",
    categoria: "antipasto"
  },
  {
    nome: "Antipasto 7",
    prezzo: 0.00,
    descrizione: "Breve descrizione del piatto o ingredienti usati",
    categoria: "antipasto"
  },
  //primi
  {
    nome: "Primo 1",
    prezzo: 0.00,
    descrizione: "Breve descrizione del piatto o ingredienti usati",
    categoria: "primo"
  },
  {
    nome: "Primo 2",
    prezzo: 0.00,
    descrizione: "Breve descrizione del piatto o ingredienti usati",
    categoria: "primo"
  },
  {
    nome: "Primo 3",
    prezzo: 0.00,
    descrizione: "Breve descrizione del piatto o ingredienti usati",
    categoria: "primo"
  },
  {
    nome: "Primo 4",
    prezzo: 0.00,
    descrizione: "Breve descrizione del piatto o ingredienti usati",
    categoria: "primo"
  },
  {
    nome: "Primo 5",
    prezzo: 0.00,
    descrizione: "Breve descrizione del piatto o ingredienti usati",
    categoria: "primo"
  },
  {
    nome: "Primo 6",
    prezzo: 0.00,
    descrizione: "Breve descrizione del piatto o ingredienti usati",
    categoria: "primo"
  },
  //secondi
  {
    nome: "Secondo 1",
    prezzo: 0.00,
    descrizione: "Breve descrizione del piatto o ingredienti usati",
    categoria: "secondo"
  },
  {
    nome: "Secondo 2",
    prezzo: 0.00,
    descrizione: "Breve descrizione del piatto o ingredienti usati",
    categoria: "secondo"
  },
  {
    nome: "Secondo 3",
    prezzo: 0.00,
    descrizione: "Breve descrizione del piatto o ingredienti usati",
    categoria: "secondo"
  },
  {
    nome: "Secondo 4",
    prezzo: 0.00,
    descrizione: "Breve descrizione del piatto o ingredienti usati",
    categoria: "secondo"
  },
  {
    nome: "Secondo 5",
    prezzo: 0.00,
    descrizione: "Breve descrizione del piatto o ingredienti usati",
    categoria: "secondo"
  },
  {
    nome: "Secondo 6",
    prezzo: 0.00,
    descrizione: "Breve descrizione del piatto o ingredienti usati",
    categoria: "secondo"
  },
  //dolci
  {
    nome: "Dolce 1",
    prezzo: 0.00,
    descrizione: "Breve descrizione del piatto o ingredienti usati",
    categoria: "dolce"
  },
  {
    nome: "Dolce 2",
    prezzo: 0.00,
    descrizione: "Breve descrizione del piatto o ingredienti usati",
    categoria: "dolce"
  },
  {
    nome: "Dolce 3",
    prezzo: 0.00,
    descrizione: "Breve descrizione del piatto o ingredienti usati",
    categoria: "dolce"
  },
  {
    nome: "Dolce 4",
    prezzo: 0.00,
    descrizione: "Breve descrizione del piatto o ingredienti usati",
    categoria: "dolce"
  },
  //bevande
  {
    nome: "Bevanda 1",
    prezzo: 0.00,    
    categoria: "bevanda"
  },
  {
    nome: "Bevanda 2",
    prezzo: 0.00,    
    categoria: "bevanda"
  },
  {
    nome: "Bevanda 3",
    prezzo: 0.00,    
    categoria: "bevanda"
  },
  {
    nome: "Bevanda 4",
    prezzo: 0.00,    
    categoria: "bevanda"
  },
  {
    nome: "Bevanda 5",
    prezzo: 0.00,    
    categoria: "bevanda"
  },
  {
    nome: "Bevanda 6",
    prezzo: 0.00,    
    categoria: "bevanda"
  }
];

function mostra_menu()
{
  let countAntipasti = 0;
  let countPrimi = 0;
  let countSecondi = 0;
  let countDolci = 0;
  let countBevande = 0;
  const antipasto_sx = document.querySelector(".antipasto_sx");
  const antipasto_dx = document.querySelector(".antipasto_dx");
  const primo_sx = document.querySelector(".primo_sx");
  const primo_dx = document.querySelector(".primo_dx");
  const secondo_sx = document.querySelector(".secondo_sx");
  const secondo_dx = document.querySelector(".secondo_dx");  
  const dolce_dx = document.querySelector(".dolce_dx");
  const bevanda_sx = document.querySelector(".bevanda_sx");
  const bevanda_dx = document.querySelector(".bevanda_dx");
  for (let piatto of menu)
  {    
    if (piatto.categoria === 'antipasto') //antipasto
    {
      countAntipasti++;

      //struttura HTML del piatto
      let html =
        `<div class="piatto">
          <div class="nome_prezzo">
            <h5>${piatto.nome}</h5>
            <h5>${piatto.prezzo.toFixed(2)} €</h5>
          </div>
          <p class="desc_pietanze">
            ${piatto.descrizione}                                
          </p>
        </div>`;

      if (countAntipasti <= 5 && antipasto_sx)
      {
        antipasto_sx.innerHTML += html;        
      }
      else if (antipasto_dx)
      {
        antipasto_dx.innerHTML += html;
      }
    }    
    
    if (piatto.categoria === "primo") //primo
    {
      countPrimi++;

      //struttura HTML del piatto
      let html =
        `<div class="piatto">
          <div class="nome_prezzo">
            <h5>${piatto.nome}</h5>
            <h5>${piatto.prezzo.toFixed(2)} €</h5>
          </div>
          <p class="desc_pietanze">
            ${piatto.descrizione}                                
          </p>
        </div>`;
      
      if (countPrimi <= 3 && primo_sx)
      {
        primo_sx.innerHTML += html;        
      }
      else if (primo_dx)
      {
        primo_dx.innerHTML += html;
      }
    }

    if (piatto.categoria === "secondo") //secondo
    {
      countSecondi++;

      //struttura HTML del piatto
      let html =
        `<div class="piatto">
          <div class="nome_prezzo">
            <h5>${piatto.nome}</h5>
            <h5>${piatto.prezzo.toFixed(2)} €</h5>
          </div>
          <p class="desc_pietanze">
            ${piatto.descrizione}                                
          </p>
        </div>`;
      
      if (countSecondi <= 5 && secondo_sx)
      {
        secondo_sx.innerHTML += html;        
      }
      else if (secondo_dx)
      {
        secondo_dx.innerHTML += html;
      }
    }

    if (piatto.categoria === "dolce") //dolce
    {
      countDolci++;

      //struttura HTML del piatto
      let html =
        `<div class="piatto">
          <div class="nome_prezzo">
            <h5>${piatto.nome}</h5>
            <h5>${piatto.prezzo.toFixed(2)} €</h5>
          </div>
          <p class="desc_pietanze">
            ${piatto.descrizione}                                
          </p>
        </div>`;
      
      if (countDolci <= 4 && dolce_dx)
      {
        dolce_dx.innerHTML += html;        
      }      
    }

    if (piatto.categoria === "bevanda") //bevanda
    {
      countBevande++;

      //struttura HTML del piatto
      let html =
        `<div class="piatto">
          <div class="nome_prezzo">
            <h5>${piatto.nome}</h5>
            <h5>${piatto.prezzo.toFixed(2)} €</h5>
          </div>          
        </div>`;
      
      if (countBevande <= 3 && bevanda_sx)
      {
        bevanda_sx.innerHTML += html;        
      }
      else if (bevanda_dx)
      {
        bevanda_dx.innerHTML += html;
      }      
    }
  }
}

mostra_menu();

//TIMELINE

const lineaTemp = [
  {
    anno: 1984,
    evento: "Inaugurazione"
  },
  {
    anno: 1988,
    evento: "Primo riconoscimento"
  },
  {
    anno: 1995,
    evento: "Espansione e Nuovo Look"
  },
  {
    anno: 2002,
    evento: "Passaggio di testimone"
  },
  {
    anno: 2010,
    evento: "La Cantina del Gusto"
  },
  {
    anno: 2015,
    evento: "Sostenibilità e Km 0"
  },
  {
    anno: 2024,
    evento: "40 Anniversario"
  },
  {
    anno: 2026,
    evento: "Una nuova visione"
  }
];

function mostra_timeline() {
  const timeline = document.querySelector(".timeline");
  if (!timeline) return;  
  for (let tempo of lineaTemp)
  {
    let html = `
        <div class="col-12 col-md">
          <div class="corpo_timeline">
            <div class="anno"><h5>${tempo.anno}</h5></div>
            <div class="evento"><p>${tempo.evento}</p></div>
          </div>
        </div>`;
    timeline.innerHTML += html;
  }    
}

mostra_timeline();

const form = document.querySelector("form");

if (form) {
  form.addEventListener("submit", function (event) {
    event.preventDefault(); //blocco l'invio dei dati

    let valido = true; //variabile per selezionare se il form può essere inviato

    const nome = form.querySelector('[name="nome"]'); //campo nome
    const cognome = form.querySelector('[name="cognome"]'); //campo cognome
    const mail = form.querySelector('[name="mail"]'); //campo email
    const persone = form.querySelector('[name="persone"]'); //campo numero di persone
    const data = form.querySelector('[name="data"]'); //campo data
    const ora = form.querySelector('input[name="ora"]'); //campo ora

    const regexCaratteri = /^[a-zA-ZàèéìòùÀÈÉÌÒÙ\s'-]+$/; //caratteri consentiti
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; //formato email valido

    // valori (solo se esistono)
    let numeroPersone = null;
    if (persone) {
      numeroPersone = parseInt(persone.value.trim()); //numero persone inserite
    }

    const oggi = new Date(); //data di oggi
    oggi.setHours(0, 0, 0, 0); //reset orario

    let dataInserita = null;
    if (data && data.value) {
      dataInserita = new Date(data.value); //data inserita dall'utente
    }

    let orarioInserito = null;
    if (ora) {
      orarioInserito = ora.value; //orario inserito dall'utente
    }

    const settimana = dataInserita && dataInserita.getDay() >= 1 && dataInserita.getDay() <= 5; //lunedì - venerdì
    const sabato = dataInserita && dataInserita.getDay() === 6; //sabato
    const domenica = dataInserita && dataInserita.getDay() === 0; //domenica

    // verifiche
    if (nome && !regexCaratteri.test(nome.value.trim())) {
      alert("Nome non valido");
      valido = false;
    }

    if (cognome && !regexCaratteri.test(cognome.value.trim())) {
      alert("Cognome non valido");
      valido = false;
    }

    if (mail && !regexEmail.test(mail.value.trim())) {
      alert("E-mail non valida");
      valido = false;
    }

    if (persone) {
      if (isNaN(numeroPersone)) {
        alert("Inserisci un numero valido");
        valido = false;
      } else if (numeroPersone < 1 || numeroPersone > 8) {
        alert("Inserisci un numero tra 1 e 8");
        valido = false;
      }
    }

    if (data) {
      if (!data.value) {
        alert("Inserisci una data");
        valido = false;
      } else if (dataInserita && !isNaN(dataInserita)) {
        if (dataInserita < oggi) {
          alert("Non puoi selezionare una data passata");
          valido = false;
        } else if (domenica) {
          alert("Chiuso la domenica");
          valido = false;
        }
      }
    }

    if (ora) {
      if (orarioInserito === "") {
        alert("Inserisci un orario");
        valido = false;
      } else {
        const [h, m] = orarioInserito.split(':').map(Number);
        const oraDecimale = h + (m / 60); //Convertiamo l'orario in un numero (es. "12:30" -> 12.5) per confrontarlo facilmente

        const orarioSabatoValido = (oraDecimale >= 18 && oraDecimale < 23); //sabato dalle 18:00 alle 23:00
        const orarioSettimanaValido = (oraDecimale >= 11 && oraDecimale < 23); //durante la settimana dalle 11:00 alle 23:00

        if (sabato && !orarioSabatoValido) {
          alert("Il sabato lavoriamo dalle 18:00 alle 23:00");
          valido = false;
        } else if (settimana && !orarioSettimanaValido) {
          alert("Durante la settimana lavoriamo dalle 11:00 alle 23:00");
          valido = false;
        }
      }
    }

    if (valido) {
      form.submit();
    }
  });
}

//Lightbox
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

const images = document.querySelectorAll(".gallery-img");

images.forEach(img => {
  img.addEventListener("click", function () {
    lightbox.style.display = "flex";
    lightboxImg.src = this.src;
  });
});

// chiusura cliccando fuori
lightbox.addEventListener("click", function () {
  lightbox.style.display = "none";
});

