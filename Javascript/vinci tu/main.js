/*
  Vinci tu!
  Scrivi un programma che dato il numero dei tiri da effettuare per ciascun giocatore (N),
  simuli un gioco di dadi tra due utenti, stampando il giocatore che ha totalizza più punti.
  Supponendo che ogni dado abbia al massimo 6 facce.

  Ogni giocatore tirerà il dado N volte, ciò significa che verrà generato un numero casuale
  ad ogni tiro che sarà sommato ai precedenti per calcolare il punteggio del giocatore. 
  
*/

var n = 5;
let giocatoreUno = 0;
let giocatoreDue = 0;

for (let i = 1; i <= n; i++)
{
  giocatoreUno += Math.floor(Math.random() * 6) + 1;  
} 

for (let j = 1; j <= n; j++)
{
  giocatoreDue += Math.floor(Math.random() * 6) + 1;  
} 

if (giocatoreUno === giocatoreDue)
{
  console.log('Il giocatore uno e il giocatore due hanno pareggiato');
}
else if (giocatoreUno < giocatoreDue)
{
  console.log('Ha vinto il giocatore due con un punteggio di: ' + giocatoreDue);
}
else
{
  console.log('Ha vinto il giocatore uno con un punteggio di: ' + giocatoreUno);
}

/*SINTASSI 

Math.random() * (max - min) + min ---> IL MINIMO è INCLUSO IL MASSIMO ESCLUSO 

Math.random() * (max - min + 1) + min ---> IL MINIMO INCLUSO IL MASSIMO INCLUSO*/


//Math.floor(Math.random() * 100); // da 0 a 99
//Math.floor(Math.random() * 99) + 1; // da 1 a 99
//Math.floor(Math.random() * 101); // da 0 a 100
//Math.floor(Math.random() * 100) + 1; //da 1 a 100
