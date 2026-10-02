/*
  Chi l'azzecca?
  Scrivi un programma che dati due numeri di due ipotetici giocatori,
  generi un numero casuale compreso tra 1 e 100 (zero escluso),
  verifichi se uno dei due giocatori ha azzeccato il numero casuale,
  e in caso contrario quale dei due si è avvicinato di più al numero.

  Esempio:
    Input: giocatore 1 = 5, giocatore 2 = 10
    Output: Numero casuale generato = 7
            "Nessuno dei due ha azzeccato il numero casuale, ma il giocatore 1 si è avvicinato di più!"

  Consigli:
  Per generare un numero casuale utlizza la funzione javascript Math.random() che restituisce un intervallo compreso tra 0 e 1.
  Il valore ottenuto dovrà essere convertito per ottenere un valore valido per il tuo intervallo, in questo modo:
    (Math.random() * (max-min) + min) ovvero, nel tuo caso:
    (Math.random() * (100-1) + 1)
  Ricordati che il valore dovrà essere intero quindi dovrai arrontondarlo usando Math.floor()  
*/

/*Dunque dunque, come si valuta chi si è avvicinato di più? facciamo che G1 = 5, G2 = 34 e pescato = 50
alle elementari la maestra diceva che la sottrazione ci indica quanti numeri separano il minuendo ed il sottraendo
quindi se faccio 50 - 5 = 45, e 50 - 34 = 16, posso subito vedere a occhio che 34 è più vicino perchè lo separano 16 numeri da 50
a differenza di 5 che ha una distanza di 45 numeri quindi devo fare il confronto tra le due distanze con un if. c'è però un problema
se il numero pescato è più piccolo come nell'esempio?
G1 = 5 --> 7 - 5 = 2 e fino a qui ok
G2 = 10 ---> 7 - 10 = -3  questo sballa i conti perchè -3 < 2 ma 5 è più vicino a 7 rispetto a 10, quindi serve un valore assoluto per
risolvere. si può fare con JavaScript? boh devo cercare nella documentazione*/

var giocatoreUno = 5;
var giocatoreDue = 10;

var pescato = Math.floor((Math.random() * (100 - 1) + 1)); //numero casuale da 1 a 100 arrotondato.

var distanzaUno = Math.abs(pescato - giocatoreUno); //valore assoluto distanza 1
var distanzaDue = Math.abs(pescato - giocatoreDue); //valore assouluto distanza 2

console.log('Numero casuale generato = '+pescato);

if (distanzaUno === 0)
{
  console.log('Il giocatore 1 ha azzeccato il numero casuale');
}
else if (distanzaDue === 0)
{
  console.log('Il giocatore 2 ha azzeccato il numero casuale');
}
else if (distanzaUno === distanzaDue)
{
  console.log('il giocatore 1 e il giocatore 2 hanno pareggiato');
}
else if (distanzaUno < distanzaDue)
{
  console.log('Nessuno dei due ha azzeccato il numero casuale, ma il giocatore 1 si è avvicinato di più!');
}
else
{
  console.log('Nessuno dei due ha azzeccato il numero casuale, ma il giocatore 2 si è avvicinato di più!');
}

