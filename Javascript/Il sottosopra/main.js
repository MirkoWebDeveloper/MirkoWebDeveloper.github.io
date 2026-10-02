/*
  Il sottosopra
  Scrivi un programma che prenda in input un array multidimensionale e stampi in output la sua trasposta.

  Esempio:
    Input: 
      [
        [1, 2],
        [3, 4],
        [5, 6]
      ]
    Output:
      [
        [1, 3, 5],
        [2, 4, 6],
      ]
 
*/

var matriceUno = [[1, 2], [3, 4], [5, 6]];
var elementiInterni = matriceUno[0];
let matriceDue = [];

for (let i = 0; i < elementiInterni.length; i++)
{
  matriceDue[i] = [];
  for (let j = 0; j < matriceUno.length; j++)
  {
    matriceDue[i][j] = matriceUno[j][i];
  }
}
console.log(matriceUno);
console.log(matriceDue);

