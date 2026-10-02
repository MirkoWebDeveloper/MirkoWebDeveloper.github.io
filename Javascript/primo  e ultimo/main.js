/*
  Primo e ultimo
  Scrivi due funzioni una che prenda in input tre numeri e restituisca il maggiore,
  l'altra che restituisca il minore.

  Esempio:
    Input: a = 1, b = -10, c = 4
    Output: minore = -10, maggiore = 4

  Variante:
  Scrivi due funzioni che prendano in input un array di numeri, una funzione deve restituire il valore maggiore contenuto nell'array,
  l'altra il valore minore. 
*/

function maggiore(a, b, c) //trova il maggiore
{
  let temp;
  if (a > b)
  {
    temp = a;
  }
  else
  {
    temp = b;
  }

  if (c > temp)
  {
    temp = c;
  }

  return temp;
}

function minore(a, b, c) //trova il minore
{
  let temp;
  if (a < b)
  {
    temp = a;
  }
  else
  {
    temp = b;
  }
  if (c < temp)
  {
    temp = c;
  }

  return temp;
}

console.log('Minore: ' + minore(1, -10, 4) + '\nMaggiore: ' + maggiore(1, -10, 4));

//variante

function maggioreVar(array) //trova il maggiore
{
  let temp = array[0];
  for (let i = 1; i < array.length; i++)
  {
    if (array[i] > temp)
    {
      temp = array[i];
    }
  }
  return temp;
}

function minoreVar(array) //trova il minore
{
  let temp = array[0];
  for (let i = 1; i < array.length; i++)
  {
    if (array[i] < temp)
    {
      temp = array[i];
    }
  }
  return temp;
}

console.log('Minore: ' + minoreVar([3, 1, 5, 2]) + '\nMaggiore: ' + maggioreVar([3, 1, 5, 2]));
