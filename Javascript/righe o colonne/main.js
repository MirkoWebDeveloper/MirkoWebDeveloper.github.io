/*
  Righe o colonne?
  Scrivi un programma che:
    - Prenda in input due numeri, N e M.
    - Generi una matrice di NxM popolata di valori casuali compresi tra 1 e 100.
    - Dichiari due array, l'array R di N elementi e l'array C di M elementi.
    - Salvi, nell'array R le somme di ogni riga della matrice e nell'array C le somme di tutte le colonne.
    - Stampi la matrice e i due array.

    Esempio:
      Input: N = 2, M = 3
      Output:
        matrice =
        [
          [1, 50, 100],
          [1, 20, 40],
        ]

        array R = [152, 61]
        array C = [2, 70, 140]
  
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
let r = [];
let c = [];

for (let i = 0; i < n; i++)
{
  r[i] = 0;
}

for (let j = 0; j < m; j++)
{
  c[j] = 0;
}


for (let i = 0; i < n; i++)
{  
  matrice[i] = [];
  for (let j = 0; j < m; j++)
  {    
    matrice[i][j] = Math.floor(Math.random() * 100) + 1;
    r[i] += matrice[i][j]
    c[j] += matrice[i][j]
  }
}

console.table(matrice);
console.log('R = [' + r + ']');
console.log('C = [' + c + ']');



