/*
  Il conta cifre
  Scrivi un programma che dato un numero (massimo 9999) conti da quante cifre è formato.

  Esempi:
    Input: numero = 9
    Output: 1 cifra

    Input: numero = 245
    Output: 3 cifre  
*/

/*Posso fregare il sistema trasformando il numero in una stringa, contare i caratteri fare un if di confronto e sparare fuori il 
risultato, sono massimo 4 numeri quindi 4 if else if vanno bene, non è necessario scomodare uno switch*/

var numero = 4567;
var cifre;
numero = numero.toString(); //convertiamo il numero in una stringa
cifre = numero.length;

if (cifre === 1)
{
  console.log('1 cifra');
}
else if (cifre === 2)
{
  console.log('2 cifre');
}
else if (cifre === 3)
{
  console.log('3 cifre');
}
else if (cifre === 4)
{
  console.log('4 cifre');
}
else
{
  console.log('inserisci un numero con massimo 4 cifre'); //ne mettiamo un altro nel caso a qualche scemo venga in mente di mettere più di 4 cifre
}

