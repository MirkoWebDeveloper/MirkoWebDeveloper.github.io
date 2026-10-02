/*
  Tanti numeri
  Scrivi un programma che dato array di numeri, calcoli la media dei valori e
  restituisca in output la media e tutti i valori minori della media.

  Esempio:
    Input: a = [3, 5, 10, 2, 8]
    Output: media = 5.6, valori minori = [3, 5, 2]

  Variante:
  Stampa anche quanti sono i valori minori della media e quanti quelli maggiori.  
*/

var a = [5, 10, 15, 20, 25];
let somma = 0;
let media;
let minori = [];
let counterMin = 0;
let counterMag = 0;
for (let i = 0; i < a.length; i++)
{
  somma += a[i];
}
media = somma / a.length;
console.log('media = ' + media);

for (let i = 0; i < a.length; i++)
{
  if (a[i] < media)
  {
    minori[counterMin] = a[i];
    counterMin++;
  }
  else if (a[i] > media)
  {
    counterMag++;
  }
  else 
  {
    console.log('uno dei valori è uguale alla media');
  }  
}

console.log('valori minori = [' + minori + ']');
console.log('valori minori della media: ' + counterMin + '\nvalori maggiori della media: ' + counterMag);