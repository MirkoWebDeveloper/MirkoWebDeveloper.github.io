/*
  Rincorri la decina
  Scrivi un programma che che stampi i numeri da 1 a 100 andando a capo ogni 10.

  Esempio:
    Output: 1 2 3 4 5 6 7 8 9 10
            11 12 13 14 15 16 17 18 19 20
            21 22 23 24 25 26 27 28 29 30
            31 32 33 34 35 36 37 38 39 40
            41 42 43 44 45 46 47 48 49 50
            51 52 53 54 55 56 57 58 59 60
            61 62 63 64 65 66 67 68 69 70
            71 72 73 74 75 76 77 78 79 80
            81 82 83 84 85 86 87 88 89 90
            91 92 93 94 95 96 97 98 99 100

  Consiglio:
  Per andare a capo usa '\n'.  
*/

/*duqnue ho un solo pensiero al momento: Come caspita lo faccio senza usare gli array? o_O 
altro problema incredibile, come ficco le cose dentro un log in modo dinamico facendo in modo che si aggiorni e vada a capo ogni 10
so come fare per fargli stamapare 10 log ma credo che l'esercizio voglia un solo log con 10 righe, posso andare a capo con \n ogni dieci numeri
il problema è dove salvarli per poi visualizzarli...voglio gli arrayyyy arrrgh!!!*/

/*Soluzione brute force*/
var n = 0;

for (let i = 1; i <= 10; i++)
{
  console.log((n + 1) + ' ' + (n + 2) + ' ' + (n + 3) + ' ' + (n + 4) + ' ' + (n + 5) + ' ' + (n + 6) + ' ' + (n + 7) + ' ' + (n + 8) + ' ' + (n + 9) + ' ' + (n + 10)); 
  n += 10;
}

/*Seconda soluzione meglio questa*/

var risultato = "";

for (let i = 1; i <= 100; i++) {
  risultato += i + " ";

  if (i % 10 === 0) {
    risultato += "\n";
  }
}

console.log(risultato);