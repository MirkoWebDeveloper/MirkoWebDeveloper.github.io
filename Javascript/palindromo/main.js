/*
  Palindomo
  Scrivi una funzione che prenda in input una stringa e restituisca TRUE se è palindroma, FALSE se non lo è.
  Nel controllo scarta gli spazi e i segni di punteggiatura.

  Esempio:
    Input: i topi non avevano nipoti
    Output: TRUE


  Consigli:
  Puoi eliminare spazi e segni di punteggiatura usando le espressioni regolari o il metodo del tipo stringa chiamato replace,
  in questo modo: str.replace(/\W/g, ""). 
*/

function palindromo(s)
{
  s = s.replace(/\W/g, "");
  let inversa = s.split('').reverse().join('');
  /*split('') --> trasforma in array di lettere
  reverse() --> lo inverte
  join('') --> ritrasforma in stringa */
  
  return s === inversa; //confronta se le due stringhe sono identiche, true se lo sono
} 

console.log(palindromo("anna")); //true
console.log(palindromo('i topi non avevano nipoti')); //true
console.log(palindromo('giacomo')); //false

