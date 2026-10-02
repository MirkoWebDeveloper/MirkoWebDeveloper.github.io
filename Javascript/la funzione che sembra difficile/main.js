/*
  La funzione che sembra difficile
  Scrivi una funzione che prenda in input due numeri N e K e restituisca la k-esima cifra (partendo da destra) di N.
  Se K è maggiore del numero delle cifre di N, la funzione restituirà 0.  
*/

/* dunque si conta da destra 

 N = 123456, K = 3  (quindi 3 cifre da destra, 6->5->4)
 valore in uscita 4
*/

function contaKappa(n, k)
{
  let stringa = n.toString(); //trasformo n in una stringa
  let l = stringa.length; //calcolo la lunghezza totale della stringa.
  let result;
  
  if (k > l)
  {
    result = 0;
  }
  else
  {
    result = stringa[l - k];
  }
  
  return result;
}

console.log(contaKappa(123456, 4));
console.log(contaKappa(123456, 1));
console.log(contaKappa(123456, 7));
