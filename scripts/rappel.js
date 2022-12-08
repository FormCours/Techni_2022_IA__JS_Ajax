const numberForm = document.getElementById('number-form');
const numberInput = document.getElementById('number-input');
const numberAdded = document.querySelector('#number-table tbody tr');

const numberRegex = /^[0-9]*$/;

// Gestion du formulaire
numberForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const td = document.createElement('td');
    td.innerText = numberInput.value;
    numberAdded.append(td);

    numberInput.focus();
    numberInput.value = '';
});

// Autorisé uniquement la saisie de nombre 
numberInput.addEventListener('keypress', (e) => {
    console.log(e.key);
    if (e.key !== 'Enter' && !numberRegex.test(e.key)) {
        e.preventDefault();
    }
});

// Déacitvé le copier coller
numberInput.addEventListener("paste", (e) => { e.preventDefault(); });

// Déactivé le Drop de text
numberInput.addEventListener("drop", (e) => { e.preventDefault(); });
