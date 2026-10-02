var one = 'Star';
var two = 'Wars';

console.log('one: ' + one);
console.log('two: ' + two);

function scambio()//scambia il valore contenuto nelle due variabili
{
    let temp = one;    
    one = two;
    two = temp;
}
scambio();


console.log('one: ' + one);
console.log('two: ' + two);