/*
  Conta il tempo
  Scrivi un programma che dato un numero di secondi, calcoli la quantità di ore, minuti e secondi corrispondenti e
  poi stampi il risultato. L'output avrà solo numeri interi.

  Esempio:
    Input: 12560
    Output: 3 ore, 29 minuti e 20 secondi.

  Consigli:
  In un'ora ci sono 60 minuti, in un minuto 60 secondi. Quindi quanti secondi ci sono in un'ora?   
*/

/*dunque se ho 5000 secondi 
5000 / 3600 = 1,388888888888889 prendiamo solo l'intero quindi 1 = ore  il resto della divisione è 1400
1400 / 60 = 23,33333333333333 prendiamo solo l'intero quindi 23 = minuti il resto della divisione è 20
20 = secondi, quindi 5000 secondi sono 1 ora, 23 minuti e 20 secondi*/

var tempo = 5000;

var ore = Math.trunc(tempo / 3600);
var resto = tempo % 3600;

var minuti = Math.trunc(resto / 60);

var secondi = resto % 60;

console.log(tempo + ' secondi, corrispondono a ' + ore + ' ore, ' + minuti + ' minuti e ' + secondi + ' secondi');