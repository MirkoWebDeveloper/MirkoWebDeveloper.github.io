/*
  Quanti anni ha?
  Scrivi un programma che dato l'anno corrente e un anno di nascita determini:
    - l'età della persona,
    - quanti anni sono necessari per raggiungere i 100
  Restituisca in output entrambi i risultati.

  Esempio:
    Input: anno corrente = 2018, anno di nascita = 1991
    Ouput: età = 27, anni mancanti = 73  
*/

/*ragioniamo considerando la mia età, io sono nato nel 1984 e adesso nel 2026 ho 42 anni e mi mancano si e no una cinquantina d'anni
per arrivare a 100
2026 - 1984 = 42 anni,  100 - 42 = 58 anni mancanti*/

var annoCorrente = 2026;
var annoNascita = 1984;
var eta = annoCorrente - annoNascita;
var anniMancanti = 100 - eta;

console.log('anno corrente: ' + annoCorrente + ', anno di nascita: ' + annoNascita + ', età: ' + eta + ', anni mancanti: ' + anniMancanti);