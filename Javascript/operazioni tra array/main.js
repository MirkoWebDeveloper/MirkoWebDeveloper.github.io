/*
  Operazioni tra array
  Scrivi un programma che dati:
  - 2 array di 10 elementi interi casuali compresi tra 1 e 10,
  - il tipo di operazione aritmetica da effettuare, una delle seguenti:
    addizione
    sottrazione
    moltiplicazione
    divisione
  Esegua il calcolo tra ogni elemento dei due array, salvando ciascun risultato in un terzo array di appoggio.

  Esempio:
    Input: a = [3, 7, 2, 5, 8, 1, 2, 5, 6, 4], b = [9, 3, 1, 4, 7, 6, 5, 10, 1, 5], operazione = "addizione"
    Output: c = [12, 10, 3, 9, 15, 7, 7, 15, 7, 9]  
*/

/*Dunque dunque ragioniamo un pochino 

Math.random() * (max - min) + min ---> IL MINIMO è INCLUSO IL MASSIMO ESCLUSO 

Math.random() * (max - min + 1) + min ---> IL MINIMO INCLUSO IL MASSIMO INCLUSO


Math.floor(Math.random() * 100); // da 0 a 99
Math.floor(Math.random() * 99) + 1; // da 1 a 99
Math.floor(Math.random() * 101); // da 0 a 100
Math.floor(Math.random() * 100) + 1; //da 1 a 100 
etc... etc... */

let n = 10 //quanti valori ci sono nell'array
let arrayUno = []; 
let arrayDue = []; 
let arrayTre = [];
let operazione = 'addizione';

//creazione array randomici
for (let i = 0; i < n; i++)
{
  arrayUno[i] = Math.floor(Math.random() * 10) + 1;
  arrayDue[i] = Math.floor(Math.random() * 10) + 1;
}
console.log('a = [' + arrayUno + ']\nb = [' + arrayDue + ']');
console.log(operazione);

//esecuzione operazioni
switch (operazione)
{
  case 'addizione':
    for (let i = 0; i < n; i++)
    {
      arrayTre[i] = arrayUno[i] + arrayDue[i];      
    }
    console.log('c = [' + arrayTre + ']');
    break;
  
  case 'sottrazione':
    for (let i = 0; i < n; i++)
    {
      arrayTre[i] = arrayUno[i] - arrayDue[i];      
    }
    console.log('c = [' + arrayTre + ']');
    break;
  
  case 'moltiplicazione':
    for (let i = 0; i < n; i++)
    {
      arrayTre[i] = arrayUno[i] * arrayDue[i];      
    }
    console.log('c = [' + arrayTre + ']');
    break;
  
  case 'divisione':
    for (let i = 0; i < n; i++)
    {
      arrayTre[i] = arrayUno[i] / arrayDue[i];      
    }
    console.log('c = [' + arrayTre + ']');
    break;

  default:
    console.log('Non conosco questa operazione');
    break;
}