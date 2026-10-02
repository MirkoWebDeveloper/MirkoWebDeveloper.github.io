/*
  Invertimi
  Scrivi un programma che dato un numero N, generi un array di N numeri casuali
  e stampi sia l'array ottenuto che quello invertito.

  Esempio:
    Input: N = 5
    Output: array ottenuto = [3, 5, 10, 2, 8], array invertito = [8, 2, 10, 5, 3]

  Variante:
  Non utilizzare array/variabili di appoggio per l'inversione.

  Consigli:
  Per la variante ricordati l'uso degli indici del ciclo ;)  
*/

var n = 5;
var array = [];
var arrayDue = [];

for (let i = 0; i < n; i++)
{
    array[i] = Math.floor(Math.random() * 100) + 1;
}

console.log('array Ottenuto = [' + array + ']');

for (let i = 0; i < n; i++)
{
    arrayDue[i] = array[Math.abs(i - (n - 1))];    
}

console.log('array Invertito = [' + arrayDue + ']');

//variante
for (let i = 0; i < n / 2; i++)
{
    [array[i], array[Math.abs(i - (n - 1))]] = [array[Math.abs(i - (n - 1))], array[i]]; //destrutturazione
}
console.log('array invertito = [' + array + ']');

