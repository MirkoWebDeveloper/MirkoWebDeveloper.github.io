/* Metti un po' d'ordine Scrivi un programma che dato un array di 10 numeri interi 
ordinati in modo casuale li riordini in modo decrescente.

Esempio: 
Input: array = [3, 7, -2, 5, 8, 1, 2, 5, 6, -4] 
Output: [8, 7, 6, 5, 5, 3, 2, 1, -4, -2] 

Variante: Prova ad ordinali in modo crescente. 

Consigli: non usare il metodo sort per questo esercizio prova a scrivere tu il codice 
per ordinare gli array, usando if e cicli */

/*dunque, credo che il prof sia scarso in matematica, nel suo output decrescente -4 è scritto prima di -2 =_=  */

var array = [3, 7, -2, 5, 8, 1, 2, 5, 6, -4];

console.log(array);

//ordine decrescente

for (let i = 0; i < array.length; i++)
{
  for (let j = 0; j < array.length; j++)
  {
    if (array[i] > array[j])
    {
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
}
console.log(array);

array = [3, 7, -2, 5, 8, 1, 2, 5, 6, -4];

//ordine crescente

for (let i = 0; i < array.length; i++)
{
  for (let j = 0; j < array.length; j++)
  {
    if (array[i] < array[j])
    {
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
}
console.log(array);
