/*
  Il carcere di Gotham City
  Sei appena stato nominato direttore presso il carcere di Gotham City.
  Hai l'arduo compito di scrivere un programma che gestisca:
  - I dati anagrafici delle guardie
  - I dati anagrafici dei detenuti
  - I fascicoli personali dei detenuti, che devono contenere almeno queste informazioni:
      - Un identificativo del criminale
      - La data di carcerazione
      - La data di scarcerazione
      - Il crimine commesso

  Visto che sei tu il capo, decidi se usare lo stesso oggetto per gestire sia le guardie che i criminali.
  In ogni caso dovrai definire la banca dati della prigione: crea un array di guardie, uno di detenuti e uno per i fascicoli.

  Prevedi la possibilià di:
    - Assumere nuove guardie
    - Schedare nuovi carcerati
    - Aggiungere nuovi fascicoli
    - Visualizzare l'elenco per ciascuna categoria (guardie, criminali, fascicoli)
    - Effettuare ricerche nei fascicoli per nome del detenuto

  Nel carcere di Gothma City non tutti i detenuti arrivano alla data di scarcerazione,
  gestisci l’eventualità in cui un detenuto sia evaso e quella in cui sia deceduto.

  Scrivi una funzione di riepilogo dell'andamento del carcere e che stampi:
    - il numero delle guardie,
    - il numero di detenuti totali,
    - il numero di detenuti evasi,
    - il numero di detenuti deceduti all’interno della struttura. 
*/

function guardia(nome, cognome, eta)
{
  this.nomeGuardia = nome;
  this.cognomeGuardia = cognome;
  this.etaGuardia = eta;
}

function detenuto(nome, cognome, eta) //so che detenuto e guardia sono due oggetti uguali, me preferisco così per non confondermi
{
  this.nomeDetenuto = nome;
  this.cognomeDetenuto = cognome;
  this.etaDetenuto = eta;  
}

function fascicolo(id, criminale, carcerazione, scarcerazione, crimine, stato)
{
  this.idFascicolo = id;
  this.criminaleFascicolo = criminale;
  this.carcerazioneFascicolo = carcerazione;
  this.scarcerazioneFascicolo = scarcerazione;
  this.crimineFascicolo = crimine;
  this.statoFascicolo = stato;
}

const elencoGuardie = [];
const elencoDetenuti = [];
const elencoFascicoli = [];

elencoGuardie[0] = new guardia('Jamese', 'Gordon', 60);
elencoGuardie[1] = new guardia('Harvey', 'Bullock', 45);
elencoGuardie[2] = new guardia('Renee', 'Montoya', 33);

elencoDetenuti[0] = new detenuto('Joker', '???', 40);
elencoDetenuti[1] = new detenuto('Pinguino', '???', 55); //so che si chiama Oswald Cobblepot ma va bene così
elencoDetenuti[2] = new detenuto('Poison Ivy', '???', 30); //si lo so si chiama Pamela Isley, va bene così anche lei

elencoFascicoli[0] = new fascicolo(1, 'Joker', '12/04/1985', 'Ergastolo', 'Ogni crimine possibile','In carcere');
elencoFascicoli[1] = new fascicolo(2, 'Pinguino', '20/08/1985', '12/12/1985', 'Furto di gioielli', 'Deceduto');
elencoFascicoli[2] = new fascicolo(3, 'Poison Ivy', '13/09/1985', '07/01/1986', 'Crescita non autorizzata di piante carnivore', 'Evaso');

function aggiungiGuardia(nome, cognome, eta)
{
  let temp = new guardia(nome, cognome, eta);
  elencoGuardie.push(temp);
}

function aggiungiDetenuto(nome, cognome, eta)
{
  let temp = new detenuto(nome, cognome, eta);
  elencoDetenuti.push(temp);
}

function aggiungiFascicolo(id, criminale, carcerazione, scarcerazione, crimine, stato)
{
  let temp = new fascicolo(id, criminale, carcerazione, scarcerazione, crimine, stato);
  elencoFascicoli.push(temp);
}

function elenco(categoria)
{
  switch (categoria)
  {
    case 'guardie':
      for (let i = 0; i < elencoGuardie.length; i++)
      {
        console.log('Nome: ' + elencoGuardie[i].nomeGuardia +
          '\nCognome: ' + elencoGuardie[i].cognomeGuardia +
          '\neta: ' + elencoGuardie[i].etaGuardia + '\n\n');
      }
      break;
    
    case 'detenuti':
      for (let i = 0; i < elencoDetenuti.length; i++)
      {
        console.log('Nome: ' + elencoDetenuti[i].nomeDetenuto +
          '\nCognome: ' + elencoDetenuti[i].cognomeDetenuto +
          '\neta: ' + elencoDetenuti[i].etaDetenuto + '\n\n');
      }
      break;
    
    case 'fascicoli':
      for (let i = 0; i < elencoFascicoli.length; i++)
      {
        console.log('Id: ' + elencoFascicoli[i].idFascicolo +
          '\nDetenuto ' + elencoFascicoli[i].criminaleFascicolo +
          '\nData carcerazione: ' + elencoFascicoli[i].carcerazioneFascicolo +
          '\nData scarcerazione: ' + elencoFascicoli[i].scarcerazioneFascicolo +
          '\nCrimine: ' + elencoFascicoli[i].crimineFascicolo +
          '\nStato: ' + elencoFascicoli[i].statoFascicolo + '\n\n');
      }
      break;
  
    default:
      console.log('Categoria Errata');
      break;
  }
}

function ricerca(criminale)
{
  let trovato = false;
  for (let i = 0; i < elencoFascicoli.length; i++)
  {
    if (elencoFascicoli[i].criminaleFascicolo === criminale)
    {
      console.log('Id: ' + elencoFascicoli[i].idFascicolo +
        '\nDetenuto ' + elencoFascicoli[i].criminaleFascicolo +
        '\nData carcerazione: ' + elencoFascicoli[i].carcerazioneFascicolo +
        '\nData scarcerazione: ' + elencoFascicoli[i].scarcerazioneFascicolo +
        '\nCrimine: ' + elencoFascicoli[i].crimineFascicolo +
        '\nStato: ' + elencoFascicoli[i].statoFascicolo + '\n\n');
      
      trovato = true;
    }    
  }
  if (!trovato)
  {
    console.log('criminale non trovato');
  }
}

function riepilogo()
{
  let evasi = 0;
  let deceduti = 0;

  for (let i = 0; i < elencoFascicoli.length; i++)
  {
    if (elencoFascicoli[i].statoFascicolo === 'Evaso')
    {
      evasi++;
    }
    else if (elencoFascicoli[i].statoFascicolo === 'Deceduto')
    {
      deceduti++;
    }    
  }

  console.log('Numero guardie: ' + elencoGuardie.length +
    '\nNumero detenuti: ' + elencoDetenuti.length +
    '\nNumero evasi: ' + evasi +
    '\nNumero deceduti: ' + deceduti);
}

  
  