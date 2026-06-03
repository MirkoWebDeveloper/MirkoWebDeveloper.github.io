const display = document.getElementById('display');

function aggiungiValore(valore)
{
    display.value += valore;
}

function calcola()
{
    try
    {
        display.value = eval(display.value);
    }
    catch
    {
        display.value = 'Errore';
    }
}

function cancella()
{
    display.value = '';
}