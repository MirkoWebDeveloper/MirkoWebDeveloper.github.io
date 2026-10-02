/*
  Ti ricordi le tabelline?
  Scrivi un programma che dato un numero stampi la tabellina corrispondente.

  Esempio:
    Input: 5
    Output: 0 5 10 15 20 25 30 35 40 45 50 
*/

/*Come funziona una tabellina? si prende un numero e lo si moltiplica per i valori che vanno da 0 a 10
seguendo l'esempio si fa 5 * 0 = 0; 5 * 1 = 5; 5 * 2 = 10; ecc ecc, quindi cioè che cambia è sempre il moltiplicatore, mentre il
moltiplicando lo impostiamo dall'inizio. perciò chi devo gestire col ciclo è proprio il moltiplicatore */

var moltiplicando = 5;
var prodotto = "";

for (let moltiplicatore = 0; moltiplicatore <= 10; moltiplicatore++)
{
  prodotto += (moltiplicando * moltiplicatore) + " "; //stringa che si aggiorna, alla faccia tua esercizio di prima.
}

console.log(prodotto); //un solo log, alla faccia tua di nuovo.