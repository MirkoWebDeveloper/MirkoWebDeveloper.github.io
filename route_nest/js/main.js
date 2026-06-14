//JAVASCRIPT MODAL
function openModal()
{
    // Aggiunge la classe "active" che imposta display:flex
    document.getElementById('modal').classList.add('active');
}

function closeModal()
{
    // Rimuove la classe "active" e la modal sparisce
    document.getElementById('modal').classList.remove('active');
}
    
//mostra messaggio esito
function showMsg(idElement, text, type)
{
    const el = document.getElementById(idElement);
    el.textContent = text;
    el.className = 'alert-msg ' + type; // "success" o "error"
}

//Switch tra login e registrazione
function switchTab(value)
{
    if (value === 'login')
    {
        document.getElementById('form-login').style.display = 'block';
        document.getElementById('form-reg').style.display  = 'none';       
        document.getElementById('login-switch').style.display = 'none';
        document.getElementById('register-switch').style.display  = 'block';
    }
    else
    {
        document.getElementById('form-login').style.display = 'none';
        document.getElementById('form-reg').style.display  = 'block';        
        document.getElementById('login-switch').style.display = 'block';
        document.getElementById('register-switch').style.display  = 'none';
    }
}

//invio login al server (PHP)
async function sendLogin()
{
    const email    = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-pass').value;

    // Controllo base lato JS (prima di sprecare una richiesta HTTP)
    if (!email || !password)
    {
        showMsg('login-msg', 'Missing fields', 'error');
        return;
    }
    
    const response = await fetch('login.php', {  // fetch() manda una richiesta POST al file PHP
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }) //JSON.stringify trasforma l'oggetto JS in una stringa JSON che il PHP riceverà e leggerà
    });
    const data = await response.json(); //Il PHP risponde con un JSON tipo: { "ok": true, "msg": "Benvenuto!" }

    if (data.ok)
    {
        showMsg('login-msg', data.msg, 'success');
        setTimeout(() => { location.href = 'index.php'; }, 1000); // aspetta 1 secondo
    }
    else
    {
        showMsg('login-msg', data.msg, 'error');
    }
}

//invio registrazione al server
async function sendReg()
{
    const username = document.getElementById('reg-username').value.trim();
    const email    = document.getElementById('reg-email').value.trim();
    const password = document.getElementById('reg-pass').value;

    if (!username || !email || !password)
    {
        showMsg('reg-msg', 'Missing fields', 'error');
        return;
    }

    const response = await fetch('register.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password })
    });

    const data = await response.json();

    if (data.ok)
    {
        showMsg('reg-msg', data.msg, 'success');
    }
    else
    {
        showMsg('reg-msg', data.msg, 'error');
    }
}

// Clic sull'overlay scuro fuori dalla modal la chiude
document.getElementById('modal').addEventListener('click', function(e) {
    if (e.target === this) closeModal();
});

//JAVASCRIPT PAGINA EDIT_PROFILE

// Mostra anteprima della foto prima di salvare
function previewImage(input) 
{
    if (input.files && input.files[0]) 
    {
        var reader = new FileReader();
        reader.onload = function(e) 
        {
            document.getElementById('anteprima_foto').src = e.target.result;
        }
        reader.readAsDataURL(input.files[0]);
    }
}

//JAVASCRIPT PAGINA NEW_TRIP
function ctrlImages(input) 
{
    var error = document.getElementById('error_images');
    var preview = document.getElementById('preview');
    preview.innerHTML = '';

    if (input.files.length > 10) 
    {
        error.style.display = 'block';
        input.value = '';
        return;
    }

    error.style.display = 'none';

    // Mostra anteprima di ogni foto selezionata
    for (var i = 0; i < input.files.length; i++) 
    {
        var reader = new FileReader();
        reader.onload = function (e)
        {
            var img = document.createElement('img');
            img.src = e.target.result;
            img.style.width = '100px';
            img.style.height = '100px';
            img.style.objectFit = 'cover';
            img.classList.add('rounded');
            preview.appendChild(img);
        }
        reader.readAsDataURL(input.files[i]);
    }
}

//JAVASCRIPT PAGINA EDIT_TRIP
function ctrlEditImages(input, slots)
{
    var error = document.getElementById('error_images');
    var preview = document.getElementById('preview');
    preview.innerHTML = '';

    if (input.files.length > slots)
    {
        error.textContent = 'You can add to the maximum ' + slots + ' images';
        error.style.display = 'block';
        input.value = '';
        return;
    }

    error.style.display = 'none';

    for (var i = 0; i < input.files.length; i++)
    {
        var reader = new FileReader();
        reader.onload = function (e)
        {
            var img = document.createElement('img');
            img.src = e.target.result;
            img.style.width = '100px';
            img.style.height = '100px';
            img.style.objectFit = 'cover';
            img.classList.add('rounded');
            preview.appendChild(img);
        }
        reader.readAsDataURL(input.files[i]);
    }
}

