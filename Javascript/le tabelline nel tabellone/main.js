/*
  Le tabelline nel tabellone
  Scrivi un programma che stampi il tabellone delle tabelline, da 0 a 10.
  In questo modo:
    x | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
    0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0
    1 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
    2 | 0 | 2 | 4 | 6 | 8 | 10 | 12 | 14 | 16 | 18 | 20
    ...
    10 | 0 | 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90 | 100   
  
*/

/*SINTASSI 

Math.random() * (max - min) + min ---> IL MINIMO è INCLUSO IL MASSIMO ESCLUSO 

Math.random() * (max - min + 1) + min ---> IL MINIMO INCLUSO IL MASSIMO INCLUSO


Math.floor(Math.random() * 100); // da 0 a 99
Math.floor(Math.random() * 99) + 1; // da 1 a 99
Math.floor(Math.random() * 101); // da 0 a 100
Math.floor(Math.random() * 100) + 1; //da 1 a 100 */

let matrice = [];
let a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let b = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

for (let i = 0; i < a.length; i++)
{
  matrice[i] = [];
  for (let j = 0; j < b.length; j++)
  {
    matrice[i][j] = a[i] * b[j];
  }  
}
console.log(matrice);

