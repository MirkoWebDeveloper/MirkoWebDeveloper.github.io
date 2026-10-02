/*
  Il calendario mediocre
  Scrivi un programma che dato:
    - Il numero di giorni nel mese
    - Il giorno della settimana in cui questo comincia (0: lunedì ... 6: domenica)
  Stampi il calendario di un mese.

  Esempio:
    Input: numero giorni = 31, giorno settimana = 0
    Output: Lun 1
            Mar 2
            Mer 3
            Gio 4
            Ven 5
            Sab 6
            Dom 7
            Lun 8
            Mar 9
            Mer 10
            Gio 11
            Ven 12
            Sab 13
            Dom 14
            Lun 15
            Mar 16
            Mer 17
            Gio 18
            Ven 19
            Sab 20
            Dom 21
            Lun 22
            Mar 23
            Mer 24
            Gio 25
            Ven 26
            Sab 27
            Dom 28
            Lun 29
            Mar 30
            Mer 31


  Variante:
  Piuttosto che avere in input il numero dei giorni del mese passa direttamente il mese e calcola tu da quanti giorni è formato.
 
*/

/*var giorni = 31;
var settimana = 0;
let calendario = '';

for (let i = 1; i <= giorni; i++)
{
  if (settimana === 0)
  {
    calendario += 'Lun ' + i + '\n';
    settimana++; 
  }
  else if (settimana === 1)
  {
    calendario += 'Mar ' + i + '\n';
    settimana++; 
  }
  else if (settimana === 2)
  {
    calendario += 'Mer ' + i + '\n';
    settimana++; 
  }
  else if (settimana === 3)
  {
    calendario += 'Gio ' + i + '\n';
    settimana++; 
  }
  else if (settimana === 4)
  {
    calendario += 'Ven ' + i + '\n';
    settimana++; 
  }
  else if (settimana === 5)
  {
    calendario += 'Sab ' + i + '\n';
    settimana++; 
  }
  else
  {
    calendario += 'Dom ' + i + '\n';
    settimana = 0; 
  }
}
console.log(calendario);*/

//calendario variante

var mese = 2;
var anno = 2026;
let calendario = '';
let i;


if (mese === 4 || mese === 6 || mese === 9 || mese === 11)
{
  //mesi con 30 giorni
  for (i = 1; i <= 30; i++)
  {
    calendario += i + '\n';
  }
}
else if (mese === 2)
{
  if (anno % 4 === 0) //febbraio è bisestile se l'anno è divisibile per 4
  {
    for (i = 1; i <= 29; i++) //febbraio bisestile
    {
      calendario += i + '\n';
    }
  }
  else
  {
    for (i = 1; i <= 28; i++) //febbraio non bisestile
    {
      calendario += i + '\n';
    }
  }
}
else 
{
  //mesi con 31 giorni
  for (i = 1; i <= 31; i++)
  {
    calendario += i + '\n';
  }
}

console.log(calendario);
