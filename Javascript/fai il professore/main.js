/*
  Fai il professore
  Scrivi un programma che converta un voto numerico (v) in un giudizio seguendo questi parametri:
    v < 18: insufficiente
    18 <= v < 21: sufficiente
    21 <= v < 24: buono
    24 <= v < 27: distinto
    27 <= v <= 29: ottimo
    v = 30: eccellente
  

  Esempio:
    Input: v = 29
    Output: Distinto
  
*/

/*uso esattamente l'ordine scritto nel testo, tranne per v=30 visto che è l'unica uguaglianza posso metterla per primo, non rompe
lo schema*/

var v = 25;

if (v === 30)
{
  console.log('Eccellente');
}
else if (v < 18)
{
  console.log('Insufficiente');
}
else if (v >= 18 && v < 21)
{
  console.log('sufficiente');  
}
else if (v >= 21 && v < 24)
{
  console.log('Buono');
}
else if (v >= 24 && v < 27)
{
  console.log('Distinto');
}
else if (v >= 27 && v <= 29)
{
  console.log('Ottimo');
}
else
{
  console.log("Valore non valido");
}