document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('kjopBillett').addEventListener('click', kjopBillett);
    document.getElementById('slettAlle').addEventListener('click', slettAlleBilletter);
    hentOgVisBilletter();
});

function kjopBillett() {
    const film = document.getElementById('film').value;
    const antall = parseInt(document.getElementById('antall').value, 10);
    const fornavn = document.getElementById('fornavn').value;
    const etternavn = document.getElementById('etternavn').value;
    const telefon = document.getElementById('telefon').value;
    const epost = document.getElementById('epost').value;

    if (!film || antall <= 0 || !fornavn || !etternavn || !telefon || !epost) {
        alert('Alle felt må fylles ut og antall må være større enn 0!');
        return;
    }

    if (!/^\d{8}$/.test(telefon)) {
        alert('Telefonnummer må være 8 siffer');
        return;
    }

    if (!/\S+@\S+\.\S+/.test(epost)) {
        alert('E-postadressen er ikke gyldig');
        return;
    }

    const billett = { film, antall, fornavn, etternavn, telefon, epost };

    fetch('/api/billetter', {
        method: 'POST',
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
        })
        .catch(error => console.error('There has been a problem with your fetch operation:', error));
}

function hentOgVisBilletter() {
    fetch('/api/billetter')
        .then(response => response.json())
        .then(billetter => {
            const billettListe = document.getElementById('billettListe');
            billettListe.innerHTML = '';

            billetter.forEach((billett, index) => {
                billettListe.innerHTML += `<li>Billett ${index + 1}: ${billett.film}, Antall: ${billett.antall}, Navn: ${billett.fornavn} ${billett.etternavn}, Telefon: ${billett.telefon}, E-post: ${billett.epost}</li>`;
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

function slettAlleBilletter() {
    fetch('/api/billetter', {
        method: 'DELETE'
    })
        .then(() => hentOgVisBilletter())
        .catch(error => console.error('There has been a problem with your fetch operation:', error));
}
