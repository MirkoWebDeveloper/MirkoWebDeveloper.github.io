/*
  La tombola magica

  Scrivi un programma che dato:
  - un array di 10 elementi di numeri casuali interi (compresi tra 1 e 90 senza ripetizioni),
  - un array di 10 numeri interi a tuo piacimento (compresi tra 1 e 90 senza ripetizioni)
  
  Verifichi quanti numeri scelti da te sono presenti nell'array principale e restituisca un risultato del tipo:
    2 numeri uguali => ambo
    3 numeri uguali => terna
    4 numeri uguali => quaterna
    5 numeri uguali => cinquina
    tutti i numeri uguali => tombola

  In caso di vittoria dovrà essere stampato un messaggio "Hai fatto X",
  in caso di perdita dovrà essere mostrato il messaggio "Mi dispiace, hai perso!"  
*/

/*Dunque dunque ragioniamo un pochino 

Math.random() * (max - min) + min ---> IL MINIMO è INCLUSO IL MASSIMO ESCLUSO 

Math.random() * (max - min + 1) + min ---> IL MINIMO INCLUSO IL MASSIMO INCLUSO


Math.floor(Math.random() * 100); // da 0 a 99
Math.floor(Math.random() * 99) + 1; // da 1 a 99
Math.floor(Math.random() * 101); // da 0 a 100
Math.floor(Math.random() * 100) + 1; //da 1 a 100 
etc... etc... */

var cartella = [5, 12, 22, 31, 45, 58, 62, 70, 83, 89];
let pesca = [];
let temp = [];
let counter = 0;

console.log(cartella); //visualizziamo la cartella

for (let i = 0; i < cartella.length; i++) //generatore dell'array
{
  temp[i] = Math.floor(Math.random() * 90) + 1;
  if (pesca.includes(temp[i])) //se il valore generato è presente nell'array lo rigenero
  {
    do
    {
      temp[i] = Math.floor(Math.random() * 90) + 1; // se lo rigenero uguale, lo rifaccio fino a quando non mi da un numero diverso
    } while (pesca.includes(temp[i]))
    pesca[i] = temp[i];
  }
  else
  {
    pesca[i] = temp[i];
  }
}
console.log(pesca); //visualizziamo i numeri pescati

for (let i = 0; i < cartella.length; i++) //il counter incrementa se ci sono numeri uguali nella cartella e nella pesca
{
  for (let j = 0; j < pesca.length; j++)
  {
    if (cartella[i] === pesca[j])
    {
      counter++;
    }
  }
}

//abbiamo fatto tombola?
if (counter === 2)
{
  console.log('Hai fatto ambo');
}
else if (counter === 3)
{
  console.log('Hai fatto terna');
}
else if (counter === 4)
{
  console.log('Hai fatto quaterna');
}
else if (counter === 10)
{
  console.log('Hai fatto tombola');
}
else if (counter >= 5)
{
  console.log('Hai fatto cinquina');
}
else
{
  console.log('Mi dispiace, hai perso!')
}
