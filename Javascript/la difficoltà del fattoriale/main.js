/*
  La difficoltà del fattoriale
  Scrivi una funzione che calcoli in maniera iterativa (usando un ciclo) il fattoriale di un numero preso in input.

  Esempio:
    Input: n = 5
    Output: 120

  Consigli:
  Il fattoriale è il prodotto dei numeri interi da 1 a n.
  Esempio: n = 5, fattoriale = 5*4*3*2*1 = 120  
*/

function fattoriale(n)
{
  let fatt = 1;
  for (let i = 2; i <= n; i++)
  {
    fatt *= i;
  }
  return fatt;
}

console.log(fattoriale(5));