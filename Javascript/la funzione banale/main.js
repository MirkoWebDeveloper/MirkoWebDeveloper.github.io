/*
  La funzione banale
  Scrivi una funzione di uguaglianza che prenda in input due argomenti e restituisca TRUE se i due argomenti sono IDENTICI,
  FALSE altrimenti.

  Esempi:
    Input: n = 2, m = 3
    Output: FALSE

    Input: n = 2, m = '2'
    Output: FALSE

    Input: n = 2, m = 2
    Output: TRUE  
*/

function sonoUguali(n,m)
{
  if (n === m)
  {
    return true;
  }
  else
  {
    return false;
  }  
}

//si può sostituire tutto il blocco if else con un return n===m; restituirà true se sono identici altrimenti false.

console.log(sonoUguali(4, 6)); //false
console.log(sonoUguali(5, 5)); //true