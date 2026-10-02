/*
  La calcolatrice
  Scrivi un programma che dati:
    - Due numeri
    - Una stringha che identifichi l'operazione da eseguire, es: "somma"
  Restituisca il valore ottenuto calcolando l'operazione tra i due numeri.

  Le operazioni supportate sono le suguenti:
    somma
    sottrazione
    moltiplicazione
    divisione
    modulo (solo tra interi)
    potenza
    media


  Esempi:
    Input: a = 5, b = 6, operazione = "somma"
    Output: 11

    Input: a = 5, b = 6, operazione = "media"
    Output: 5.5
*/

var a = 5;
var b = 0;
const operazione = 'divisione';
let risultato;
console.log('a = ' + a + ', b = ' + b + ', operazione = ' + operazione);

switch (operazione) {
  case 'somma':
    risultato = a + b;        
    break;
  
  case 'sottrazione':
    risultato = a - b;        
    break;
  
  case 'moltiplicazione':
    risultato = a * b;       
    break;
  
  case 'divisione':
    if (b === 0)
    {
      risultato = 'Non puoi dividere per 0';
    }
    else
    {
      risultato = a / b;
    }
    break;
  
  case 'potenza':
    risultato = a ** b; //a è la base, b è l'esponente        
    break;
  
  case 'media':
    risultato = (a + b) / 2;        
    break;
  
  case 'modulo':
    if (Number.isInteger(a) && Number.isInteger(b))
    {
      risultato = a % b;      
    }
    else
    {
      risultato = 'I valori inseriti devono essere numeri interi';      
    }
    break;
  
  default:
    risultato = 'Non conosco questa operazione';
    break;
}
console.log('output = ' + risultato);

