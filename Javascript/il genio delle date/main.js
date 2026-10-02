/*
  Il genio delle date
  Scrivi una funzione che prenda in input due argomenti: il giorno e il mese.
  La funzione deve restituire a quale giorno dell'anno corrisponde (compreso tra 1 e 366).

  Esempio:
    Input : giorno = 5, mese = 2
    Output:
            36

  Consigli:
  Puoi definire un array con i giorni di ogni mese e ciclarlo.   

*/

function giornoMese(giorno, mese)
{
  let giorniXmese = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; //gennaio = 1 corrisponde a --> giornixMese[0]
  let result = 0;

  for (let i = 0; i < mese - 1; i++)
  {
    result += giorniXmese[i];    
  }

  return result + giorno; //totale mi restituisce la somma dei gioni dei mesi precedenti a "mese" a cui devo aggiungere i giorni che indico
}

console.log(giornoMese(5, 2)); //36
console.log(giornoMese(6, 8));  //218

