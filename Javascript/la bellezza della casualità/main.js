/*
  La bellezza della casualità
  Scrivi una funzione che prenda in input un numero e restituisca un numero casuale 
  compreso tra 0 e l'argomento passato.  
*/

function random(n)
{
  let numero = Math.floor(Math.random() * (n + 1));
  return numero;
}

console.log(random(4));