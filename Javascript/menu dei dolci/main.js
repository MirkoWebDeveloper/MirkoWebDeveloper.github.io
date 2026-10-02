/*
  Menu dei dolci
  Scrivi un programma che dato il seguente menu (log da stampare):
    MENU:
    1. Tiramisù
    2. Torta della nonna
    3. Cheesecake alla nutella
    4. Macedonia

  Prenda in input un valore numerico che rappresenti la scelta e restituisca:
    - se la scelta non è tra quelle elencate la scritta 'Dolce non disponibile',
    - altrimenti la scelta effettuata 'Hai scelto il dolce X'.


  Esempi:
    Input: scelta = 4
    Output: Hai scelto il dolce Macedonia

    Input: scelta = 7
    Output: Dolce non disponibile  
*/

/*è ovviamente uno switch, nulla da aggiungere XD, non so se si possa andare a capo nei log, quindi boh ne scrivo 5 per creare il menu*/

var scelta = 3;
let esito;
console.log('MENU');
console.log('1. Tiramisù');
console.log('2. Torta della nonna');
console.log('3. Cheesecake alla nutella');
console.log('4. Macedonia');

switch (scelta)
{
  case 1:
    esito = 'Hai scelto il dolce Tiramisù';
    break;
  
  case 2:
    esito = 'Hai scelto il dolce Torta della nonna';
    break;
  
  case 3:
    esito = 'Hai scelto il dolce Cheesecake alla nutella';
    break;
  
  case 4:
    esito = 'Hai scelto il dolce Macedonia';
    break;

  default:
    esito='Dolce non disponibile'
    break;
}
console.log(esito);