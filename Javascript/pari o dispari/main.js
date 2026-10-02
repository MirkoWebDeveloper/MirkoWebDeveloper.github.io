/*
  Pari o dispari?
  Scrivi un programma che prenda in input un numero intero e restituisca 0 se è pari o 1 se è dispari.

  Esempi:
    Input: numero = 63
    Output: 1

    Input: numero = 24
    Output: 0 
*/

/*Un numero pari è divisibile per 2 con resto 0, mentre se è dispari avremo resto 1 (sempre)*/

var numero = 63765
var resto = numero % 2;
let esito;

if (resto === 1)
{
  esito = 'dispari';
}
else
{
  esito = 'pari';
}

console.log('il numero = ' + numero + ', è ' + esito + ', output: ' + resto);