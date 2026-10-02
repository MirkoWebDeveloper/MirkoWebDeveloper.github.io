/*
  Che giorno è oggi?
  Scrivi un programma che dato un numero intero compreso tra 1 a 7
  visualizzi il corrispondente giorno della settimana. Sapendo che:
    1 = lunedì
    2 = martedì
    3 = mercoledì
    ...
    7 = domenica
  

  Esempi:
    Input: numero = 6
    Output: "Sabato"

    Input: numero = 10
    Output: "Errore! Giorno della settimana non valido!"

  Variante:
  Scrivere una versione che anziché i giorni della settimana, visualizzi i nomi dei mesi.
  
*/

/*switch. Fine ragionamento*/

var giorno = 5;
var mese = 4;

//settimana
switch (giorno) {
  case 1:
    console.log('numero = 1, giorno = Lunedì');
    break;
  
  case 2:
    console.log('numero = 2, giorno = Martedì');
    break;
  
  case 3:
    console.log('numero = 3, giorno = Mercoledì');
    break;
  
  case 4:
    console.log('numero = 4, giorno = Giovedì');
    break;
  
  case 5:
    console.log('numero = 5, giorno = Venerdì');
    break;
  
  case 6:
    console.log('numero = 6, giorno = Sabato');
    break;
  
  case 7:
    console.log('numero = 7, giorno = Domenica');
    break;

  default:
    console.log('numero = '+giorno+', Errore! Giorno della settimana non valido!');
    break;
}

//mesi
switch (mese) {
  case 1:
    console.log('numero = 1, mese = Gennaio');
    break;
  
  case 2:
    console.log('numero = 2, mese = Febbraio');
    break;
  
  case 3:
    console.log('numero = 3, mese = Marzo');
    break;
  
  case 4:
    console.log('numero = 4, mese = Aprile');
    break;
  
  case 5:
    console.log('numero = 5, mese = Maggio');
    break;
  
  case 6:
    console.log('numero = 6, mese = Giugno');
    break;
  
  case 7:
    console.log('numero = 7, mese = Luglio');
    break;
  
  case 8:
    console.log('numero = 8, mese = Agosto');
    break;
  
  case 9:
    console.log('numero = 9, mese = Settembre');
    break;
  
  case 10:
    console.log('numero = 10, mese = Ottobre');
    break;
  
  case 11:
    console.log('numero = 11, mese = Novembre');
    break;
  
  case 12:
    console.log('numero = 12, mese = Dicembre');
    break;

  default:
    console.log("numero = "+mese+", Errore! Mese dell'anno non valido!");
    break;
}