/*
  Fai il sensitivo
  Scrivi una funzione che calcoli la vicinanza tra tre numeri: A, B e N, e restituisca:
    - 0 Se A e B sono equidistanti da N
    - 1 Se B è più vicino a N rispetto ad A
    - -1 Se A è più vicino a N rispetto a B
  
  Utilizza questa funzione per creare un programma che simuli un gioco tra due utenti:
  vince chi si avvicina di più al numero N che verrà generato casualmente da 1 a 100. 
*/

function piuVicino()
{
  let a = parseInt(prompt('G1 inserisca un numero'));
  let b = parseInt(prompt('G2 inserisca un numero'));
  let n = Math.floor(Math.random() * 100) + 1; //numero casuale da 1 a 100
  let distanzaUno = Math.abs(n - a);
  let distanzaDue = Math.abs(n - b);
  let result;

  console.log('Numero da indovinare: ' + n);
  
  if (distanzaUno === distanzaDue) //pareggio
  {
    result = 0;
  }
  else if (distanzaUno < distanzaDue) //vince a
  {
    result = -1;
  }
  else
  {
    result = 1; //vince b
  }

  switch (result)
  {
    case 0:
      console.log('Pareggio');      
      break;
    
    case 1:
      console.log('G2 ha scelto il numero più vicino');
      break;
    
    case -1:
      console.log('G1 ha scelto il numero più vicino');
      break;
  }  
}

piuVicino();

