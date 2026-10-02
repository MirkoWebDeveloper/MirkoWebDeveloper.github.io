/*
  Sommali tutti
  Scrivi un programma che:
    - Prenda in input due numeri, N e M.
    - Generi una matrice di NxM popolata di valori casuali da 1 a 100.
    - Stampi la matrice e la somma di tutti i valori contenuti.

    Esempio:
      Input: N = 2, M = 3
      Output:
        matrice =
        [
          [1, 50, 100],
          [1, 20, 40],
        ]
        somma = 212  
*/

/*SINTASSI 

Math.random() * (max - min) + min ---> IL MINIMO è INCLUSO IL MASSIMO ESCLUSO 

Math.random() * (max - min + 1) + min ---> IL MINIMO INCLUSO IL MASSIMO INCLUSO


Math.floor(Math.random() * 100); // da 0 a 99
Math.floor(Math.random() * 99) + 1; // da 1 a 99
Math.floor(Math.random() * 101); // da 0 a 100
Math.floor(Math.random() * 100) + 1; //da 1 a 100 */

var n = 2;
var m = 3;
let matrice = [];
let somma = 0;

for (let i = 0; i < n; i++)
{
  matrice[i] = [];
  for (let j = 0; j < m; j++)
  {
    matrice[i][j] = Math.floor(Math.random() * 100) + 1;
    somma += matrice[i][j];
  }
}
console.table(matrice);

for (let i = 0; i < n; i++) {
  console.log(matrice[i]);
}
console.log('somma = ' + somma);



