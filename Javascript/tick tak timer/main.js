/*
  Tick, tack, timer!
  Scrivi una funzione che dato un numero in input, stampi il conto alla rovescia a partire dal numero passato.

  Esempio:
    Input: n = 5
    Output:
            4
            3
            2
            1
            0        
  
*/

function countdown(n)
{
  let array = [];
  for (let i = 0; i < n; i++)
  {
    array[i] = i;
  }

  array = array.reverse();
  return array.join('\n');
}

console.log('countdown: \n' + countdown(5));