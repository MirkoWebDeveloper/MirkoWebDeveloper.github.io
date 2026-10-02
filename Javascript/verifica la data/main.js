/*
  Verifica la data
  Scrivi un programma che definisca un oggetto per la rappresentazione di una data e verifichi se è valida o meno.
  L'oggetto sarà composto da giorno, mese e anno (input a piacere).

  Esempio:
    Input:
      day: 18
      month: 19
      year: 2016
    Output:
      "La data non è valida!"  
*/


function calendario(giorno, mese, anno)
{
  this.dataGiorno = giorno;
  this.dataMese = mese;
  this.dataAnno = anno;
}

let data = new calendario(18, 19, 2016);
let esito = true;

if (data.dataAnno < 0) //verifica se l'anno è da 0 in poi
{
  esito = false;
}

if (data.dataMese === 4 || data.dataMese === 6 || data.dataMese === 9 || data.dataMese === 11) //mesi di 30 giorni
{
  if (data.dataGiorno > 30 || data.dataGiorno < 1)
  {
    esito = false;
  }
}
else if (data.dataMese === 2)
{
  if (data.dataAnno % 4 === 0)
  {
    if (data.dataGiorno > 29 || data.dataGiorno < 1) //febbraio bisestile
    {
      esito = false;
    }
  }
  else 
  {
    if (data.dataGiorno > 28 || data.dataGiorno < 1) //febbraio non bisestile
    {
      esito = false;
    }
  }
}
else if (data.dataMese === 1 || data.dataMese === 3 || data.dataMese === 5 || data.dataMese === 7 || data.dataMese === 8 || data.dataMese === 10 || data.dataMese === 12) //mesi di 31 giorni
{
  if (data.dataGiorno > 31 || data.dataGiorno < 1)
  {
    esito = false;
  }
}
else
{
  esito = false; //più di 12 mesi o 0 o numei negativi
}

if (esito) //stampa del risultato
{ 
  console.log('Data valida');  
}
else
{
  console.log('Data non valida');
}
 