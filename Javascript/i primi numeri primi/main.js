/*
  I primi numeri…primi!
  Scrivi una funzione che prenda in input un numero e restituisca TRUE se è un numero primo, FALSE altrimenti.
  Scrivi una seconda funzione, che prenda in input un numero N e stampi i primi N numeri primi.

  Esempio:
    Input: n = 5
    Output:
          TRUE

            2
            3
            5
            7
            11


  Consigli:
  Per non ripetere il codice, nella seconda funzione puoi richiamare la prima funzione
*/

/*allora un numero è primo se è divisibile solo per 1 e per se stesso.
se ad esempio scegliamo 7, visto che per forza sarà divisibile per 1 e per stesso, dobbiamo verificare
se lo è anche per tutti i valori che vanno da 2 a 7(escluso) quindi se 7 è il nosto n, saranno i valori 
da 2 a (n-1) quindi 7/2   7/3   7/4   7/5   7/6 ok questo si può ciclare con il for */

function numeroPrimo(n)
{
  if (n < 2)
  {
    return false;
  }  
  for (let i = 2; i < n; i++)
  {
    if (n % i === 0)
    {
      return false;
    }
  }
  return true;
}

function stampaNumeriPrimi(n)
{
  let counterEx = 0;
  let counterInt = 2;
  let array = [];
  while (counterEx < n)
  {    
    if (numeroPrimo(counterInt))
    {
      array.push(counterInt);
      counterEx++;      
    }
    counterInt++;
  }
  
  return array;
}

let numero = 5;
console.log(numeroPrimo(numero));
console.log(stampaNumeriPrimi(numero));

