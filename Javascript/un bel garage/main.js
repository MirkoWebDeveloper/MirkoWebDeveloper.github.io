/*
  Un bel garage
  Scrivi un programma per la gestione di un garage.
  Definisci un oggetto che rappresenti un automobile, dovrà contenere almeno marca del veicolo e nome del modello.
  Scrivi una funzione che prenda in input una marca e stampi i modelli presenti nel garage di quella stessa marca.

  Consigli:
  Puoi usare un array come base per salvare le automobili.  
*/


function automobile(marca, modello)
{
  this.marcaAuto = marca;
  this.modelloAuto = modello;
}

let garage = new Array();
garage[0] = new automobile('Fiat', '500');
garage[1] = new automobile('Fiat', 'Panda');
garage[2] = new automobile('Fiat', 'Punto');
garage[3] = new automobile('Toyota', 'Yaris');
garage[4] = new automobile('Toyota', 'Corolla');
garage[5] = new automobile('Toyota', 'RAV4');
garage[6] = new automobile('Tesla', 'Model 3');
garage[7] = new automobile('Tesla', 'Model Y');
garage[8] = new automobile('Tesla', 'Model S');

function stampaAuto(marca)
{
  for (let i = 0; i < garage.length; i++)
  {
    if (garage[i].marcaAuto === marca)
    {
      console.log(garage[i].modelloAuto);
    }
  }
}

stampaAuto('Fiat');
stampaAuto('Toyota');
stampaAuto('Tesla');