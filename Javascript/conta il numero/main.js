/*
  Conta il numero
  Scrivi una funzione che dato un numero intero (massimo 9999) conti da quante cifre è formato.

  Esempi:
    Input: numero = 9
    Output: 1 cifra

    Input: numero = 245
    Output: 3 cifre  
*/

function contaCifre(numero)
{
  let cifre;
  numero = numero.toString();
  cifre = numero.length;

  switch (cifre)
  {
    case 1:
      console.log('1 cifra');
      break;
    
    case 2:
      console.log('2 cifre');
      break;
    
    case 3:
      console.log('3 cifre');
      break;
    
    case 4:
      console.log('4 cifre');
      break;
  
    default:
      console.log('inserisci un numero con massimo 4 cifre');
      break;
  }
}

contaCifre(345);

/*Versione Compatta

function contaCifre(numero) 
{
  let cifre = numero.toString().length;

  if (cifre > 4) 
  {
    console.log('inserisci un numero con massimo 4 cifre');
  } 
  else 
  {
    console.log(cifre + (cifre === 1 ? ' cifra' : ' cifre'));
  }
}
*/


