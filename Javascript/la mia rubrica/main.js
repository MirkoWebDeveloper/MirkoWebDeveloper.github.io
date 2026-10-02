/*
  La mia rubrica
  Scrivi un programma per la gestione di una rubrica telefonica.

  Definisci un oggetto che rappresenti un contatto e, visto che stai diventando bravo, le proprietà dell'oggetto sono a tua discrizione.
  L'unico vincolo che hai è di inserire almeno il nome e il numero di telefono come stringhe.

  Definisci un altro oggetto che rappresenti la lista dei contatti, quindi sarà formato da un array di contatti.
  Implementa i metodi dell'oggetto per le seguenti operazioni:
      - Visualizzazione dell'intera lista contatti
      - Inserimento di un nuovo contatto
      - Modifica di uno contatto passando in input l'indice dell'array
      - Cancellazione di un contatto passando in input l'indice dell'array
      - Ricerca passando il nome e restituendo il singolo contatto.

  Variante:
  Migliora i metodi di Modifica e Cancellazione, al posto di prendere in input l'indice dell'array passa in input il nome
  e ricava l'indice sul quale applicare l'operazione.  
*/

console.log(`Rubrica Telefonica 
             1. Visualizza contatti
             2. Inserisci contatto
             3. Modifica contatto
             4. Elimina contatto
             5. Cerca contatto
             0. Esci`);


function contatto(nome, telefono)
{
  this.nomeContatto = nome;
  this.telefonoContatto = telefono;
}

const rubrica = new Array();
rubrica[0] = new contatto('Giulia', '73826195465');
rubrica[1] = new contatto('Marco', '3817492658');
rubrica[2] = new contatto('Sofia', '49258371696');
rubrica[3] = new contatto('Luca', '9251378462');
rubrica[4] = new contatto('Elena', '2583716943');
rubrica[5] = new contatto('Alessandro', '1649258371');

let menu;

do 
{
  menu = parseInt(prompt("Digita il numero relativo all'azione da compiere"));
  switch (menu) {
    case 1:
      visualizza();
      break;
  
    case 2:
      let nuovoNome = prompt("Inserisci un nome");
      let nuovoTelefono = prompt("Inserisci un numero di telefono");
      inserisci(nuovoNome, nuovoTelefono);
      console.log("Operazione completata");
      break;
  
    case 3:
      let nomeModifica = prompt("Inserisci un nome");
      modifica(nomeModifica);
      console.log("Operazione completata");
      break;
  
    case 4:
      let nomeElimina = prompt("Inserisci un nome");
      elimina(nomeElimina);
      console.log("Operazione completata");
      break;
  
    case 5:
      let nomeCerca = prompt("Inserisci un nome");
      cerca(nomeCerca);
      break;

    case 0:
      console.log('uscita programma');
      break;
  }
} while (menu !== 0);


function visualizza()
{
  for (let i = 0; i < rubrica.length; i++)
  {
    console.log('Nome: '+rubrica[i].nomeContatto+' Telefono: '+rubrica[i].telefonoContatto);
  }
}

function inserisci(nome, telefono)
{
  let nuovo = new contatto(nome, telefono);
  rubrica.push(nuovo);
}

function modifica(nome)
{
  let scelta = parseInt(prompt('Digita 1 per modificare il nome, digita 2 per modificare il numero'));
  switch (scelta)
  {
    case 1:
      let nuovoNome = prompt("Inserisci un nome");
      for (let i = 0; i < rubrica.length; i++)
      {
        if (rubrica[i].nomeContatto === nome)
        {
          rubrica[i].nomeContatto = nuovoNome;
        }
      }      
      break;
    
    case 2:
      let nuovoTelefono = prompt("Inserisci un numero di telefono");
      for (let i = 0; i < rubrica.length; i++)
      {
        if (rubrica[i].nomeContatto === nome)
        {
          rubrica[i].telefonoContatto = nuovoTelefono;
        }
      }      
      break;
  
    default:
      break;
  }
}

function elimina(nome)
{
  for (let i = 0; i < rubrica.length; i++)
  {
    if (rubrica[i].nomeContatto === nome)
    {
      rubrica.splice(i, 1);
      i--;
    }
  }
}

function cerca(nome)
{
  for (let i = 0; i < rubrica.length; i++)
  {
    if (rubrica[i].nomeContatto === nome)
    {
      console.log('Nome: ' + rubrica[i].nomeContatto + ' Telefono: ' + rubrica[i].telefonoContatto);
    }
  }
}