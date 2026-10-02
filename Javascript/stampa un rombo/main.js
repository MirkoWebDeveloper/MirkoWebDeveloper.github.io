/*
  Rombo che stampa!
  Scrivi un programma che dato un numero dispari stampi un rombo di lettere.

  Esempio:
    Input : 5
    Output:
            X
           XXX
          XXXXX
           XXX
            X  
  
*/

let n = 5;
let mid = Math.floor(n / 2);

// Metà superiore + riga centrale
for (let i = 0; i <= mid; i++) {
    let riga = "";
    
    // Spazi
    for (let s = 0; s < mid - i; s++) {
        riga += " ";
    }
    
    // X
    for (let x = 0; x < 2 * i + 1; x++) {
        riga += "X";
    }
    
    console.log(riga);
}

// Metà inferiore
for (let i = mid - 1; i >= 0; i--) {
    let riga = "";
    
    // Spazi
    for (let s = 0; s < mid - i; s++) {
        riga += " ";
    }
    
    // X
    for (let x = 0; x < 2 * i + 1; x++) {
        riga += "X";
    }
    
    console.log(riga);
}