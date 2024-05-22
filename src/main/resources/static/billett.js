document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('kjopBillett').addEventListener('click', kjopBillett);
    document.getElementById('slettAlle').addEventListener('click', slettAlleBilletter);
    hentOgVisBilletter();
});

function hentInputData() {
    return {
        film: document.getElementById('film').value,
        antall: parseInt(document.getElementById('antall').value, 10),
        fornavn: document.getElementById('fornavn').value,
        etternavn: document.getElementById('etternavn').value,
        telefon: document.getElementById('telefon').value,
        epost: document.getElementById('epost').value
    };
}

function validerInput(billett) {
    const namePattern = /^\D+$/;

    if (!billett.film || billett.antall <= 0 || !billett.fornavn || !billett.etternavn || !billett.telefon || !billett.epost) {
        alert('Alle felt må fylles ut og antall må være større enn 0!');
        return false;
    }

    if (!namePattern.test(billett.fornavn) || !namePattern.test(billett.etternavn)) {
        alert('Navn kan ikke inneholde tall!');
        return false;
    }

    if (!/^\d{8}$/.test(billett.telefon)) {
        alert('Telefonnummer må være 8 siffer');
        return false;
    }

    if (!/\S+@\S+\.\S+/.test(billett.epost)) {
        alert('E-postadressen er ikke gyldig');
        return false;
    }

    return true;
}

function kjopBillett() {
    const billett = hentInputData();

    if (!validerInput(billett)) {
        return;
    }

    fetch('http://localhost:8080/api/billetter', { // Oppdatert URL
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(billett)
    })
        .then(response => {
            if (!response.ok) {
                throw                new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(() => {
            hentOgVisBilletter();
            resetSkjema();
        })
        .catch(error => console.error('There has been a problem with your fetch operation:', error));
}

function hentOgVisBilletter() {
    fetch('http://localhost:8080/api/billetter') // Oppdatert URL
        .then(response => response.json())
        .then(billetter => {
            const billettListe = document.getElementById('billettListe');
            billettListe.innerHTML = '';

            billetter.forEach((billett, index) => {
                const li = document.createElement('li');
                li.innerHTML = `Billett ${index + 1}: ${billett.film}, Antall: ${billett.antall}, Navn: ${billett.fornavn} ${billett.etternavn}, Telefon: ${billett.telefon}, E-post: ${billett.epost} 
                                <button onclick="slettBillett(${billett.id})">Slett</button> 
                                <button onclick="redigerBillett(${billett.id})">Rediger</button>`;
                billettListe.appendChild(li);
            });
        })
        .catch(error => console.error('There has been a problem with your fetch operation:', error));
}

function resetSkjema() {
    document.getElementById('film').value = '';
    document.getElementById('antall').value = '1';
    document.getElementById('fornavn').value = '';
    document.getElementById('etternavn').value = '';
    document.getElementById('telefon').value = '';
    document.getElementById('epost').value = '';
}

function slettBillett(id) {
    fetch(`http://localhost:8080/api/billetter/${id}`, { // Oppdatert URL
        method: 'DELETE'
    })
        .then(() => hentOgVisBilletter())
        .catch(error => console.error('There has been a problem with your fetch operation:', error));
}

function redigerBillett(id) {
    fetch(`http://localhost:8080/api/billetter/${id}`) // Oppdatert URL
        .then(response => response.json())
        .then(billett => {
            document.getElementById('film').value = billett.film;
            document.getElementById('antall').value = billett.antall;
            document.getElementById('fornavn').value = billett.fornavn;
            document.getElementById('etternavn').value = billett.etternavn;
            document.getElementById('telefon').value = billett.telefon;
            document.getElementById('epost').value = billett.epost;

            // Change button function to update instead of creating new
            document.getElementById('kjopBillett').innerText = 'Oppdater billett';
            document.getElementById('kjopBillett').removeEventListener('click', kjopBillett);
            document.getElementById('kjopBillett').addEventListener('click', function oppdater() {
                oppdaterBillett(id);
            });
        })
        .catch(error => console.error('There has been a problem with your fetch operation:', error));
}

function oppdaterBillett(id) {
    const billett = hentInputData();

    if (!validerInput(billett)) {
        return;
    }

    fetch(`http://localhost:8080/api/billetter/${id}`, { // Oppdatert URL
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(billett)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(() => {
            hentOgVisBilletter();
            resetSkjema();
            document.getElementById('kjopBillett').innerText = 'Kjøp billett';
            document.getElementById('kjopBillett').removeEventListener('click', oppdaterBillett);
            document.getElementById('kjopBillett').addEventListener('click', kjopBillett);
        })
        .catch(error => console.error('There has been a problem with your fetch operation:', error));
}

function slettAlleBilletter() {
    fetch('http://localhost:8080/api/billetter', { // Oppdatert URL
        method: 'DELETE'
    })
        .then(() => hentOgVisBilletter())
        .catch(error => console.error('There has been a problem with your fetch operation:', error));
}
