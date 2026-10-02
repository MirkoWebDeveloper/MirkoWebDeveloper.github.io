/*
  Azzecca e azzera
  Scrivi un programma che dato un array di 100 elementi, lo riempia con numeri interi casuali da 1 a 50.
  Permetti all'utente di inserire un numero e azzera tutti i gli elementi nell'array principale che sono suoi multipli.
  Richiedi all'utente un altro numero e così via.
  Il programma termina quando tutti gli elementi dell'array principale sono uguali a zero.

  Consigli:  
  Per richiedere un numero all'utente puoi usare il comando prompt() 
*/

let n = 100; //numero elementi dell'array
let array = [];
let a;

for (let i = 0; i < n; i++)
{
  array[i] = Math.floor(Math.random() * 50) + 1; //numeri casuali da 1 a 50
}

console.log(array); //visualizzo l'array generato

do {
  a = parseInt(prompt('inserisci un numero'));

  for (let i = 0; i < array.length; i++)
  {
    if (array[i] !== 0 && array[i] % a == 0)
    {
      array[i] = 0;
    }
  }

  console.log(array); //visualizziamo gli elementi dell'array che si azzerano

} while (array.some(x => x !== 0));

