/* Procedi alla cieca 

Scrivi un programma che stampi il contenuto di una matrice i cui valori interi 
sono generati casualmente nel range di 0 e 100. */

/*SINTASSI 

Math.random() * (max - min) + min ---> IL MINIMO è INCLUSO IL MASSIMO ESCLUSO 

Math.random() * (max - min + 1) + min ---> IL MINIMO INCLUSO IL MASSIMO INCLUSO


Math.floor(Math.random() * 100); // da 0 a 99
Math.floor(Math.random() * 99) + 1; // da 1 a 99
Math.floor(Math.random() * 101); // da 0 a 100
Math.floor(Math.random() * 100) + 1; //da 1 a 100 */

let matrice = [];
let riga = 5;
let colonna = 6;
//matrice 5 x 6 

for (let i = 0; i < riga; i++)
{
  matrice[i] = [];
  for (let j = 0; j < colonna; j++)
  {
    matrice[i][j] = Math.floor(Math.random() * 101);
  }
}
console.log(matrice);
