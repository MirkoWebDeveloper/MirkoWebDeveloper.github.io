/*
  Maggiore e minore
  Scrivi un programma che dati quattro numeri in input,
  restituisca in output il maggiore e il minore.

  Esempio:
    Input: a = 3, b = -1, c = 4, d = -2
    Output: maggiore = 4, minore = -2  
*/

/* dunque abbiamo quattro numeri 3, -1, 4, -2  facendolo con carta e penna basterebbero 6 controlli totali
Maggiore -> 3 > -1? M = 3; 3 > 4? M = 4; 4 > -2? M = 4
Minore -> 3 < -1? m = -1; -1 < 4? m = -1; -1 < -2? m= -2
quindi dovrebbero essere 3 if else per Maggiore e 3 if else per minore con la variabile che viene aggiornata ogni
volta che trova un nuovo valore più grande o più piccolo, non so se si possa fare un controllo generale che tira fuori 
direttamente il più grande e il più piccolo senza usare un array quindi farò come scritto sopra*/

var a = 3;
var b = -1;
var c = 4;
var d = -2;
var M, m;

/*Maggiore*/
if (a > b)
{
  M = a;
}
else
{
  M = b;
}

if (c > M)
{
  M = c;
}

if (d > M)
{
  M = d;
}

/*Minore*/
if (a < b)
{
  m = a;
}
else
{
  m = b;
}

if (c < m)
{
  m = c;
}

if (d < m)
{
  m = d;
}

/*Esito*/
console.log('Maggiore: ' + M + ', Minore: ' + m);