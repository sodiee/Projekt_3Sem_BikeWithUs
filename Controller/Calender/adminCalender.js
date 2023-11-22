let table = document.getElementById("tableBody");
//måned
let months = ['january',
    'february',
    'march',
    'april',
    'may',
    'june',
    'july',
    'august',
    'september',
    'october',
    'november',
    'december',]
const localDate = new Date();
let currentMonth = months[localDate.getMonth()];
let selectedMonth = currentMonth;

//TR og TD
for (let i = 1; i <= 31; i++) {
    //Click current month
    const rb = document.getElementById('choice-' + currentMonth + '');
    rb.checked = true;

    //Laver objekter
    let trElement = document.createElement('tr');
    let tdElementDato = document.createElement('td');
    let tdElementRejse = document.createElement('td');
    let tdElementKunde = document.createElement('td');

    //Tilfører værdier til elementer
    tdElementDato.id = i;
    tdElementDato.textContent = i + '. ' + selectedMonth;
    tdElementRejse.id = i + ': Rejse'
    tdElementRejse.textContent = '-'
    tdElementKunde.id = i + ': Kunde'
    tdElementKunde.textContent = '-'

    //appender elementer til tabel
    trElement.appendChild(tdElementDato);
    trElement.appendChild(tdElementRejse);
    trElement.appendChild(tdElementKunde);
    table.appendChild(trElement);
}

//const btn = document.getElementById('btn');
let rbs = document.querySelectorAll('input[name="choice"]');
for (const rb of rbs) {
    rb.onclick = () => {
        updateMonth();
    };
}


function updateMonth() {
    let selectedValue;

    for (const rb of rbs) {
        if (rb.checked) {
            selectedValue = rb.value;
            selectedMonth = selectedValue;
            break;
        }
    }

    for (let i = 1; i <= 31; i++) {
        let tdElementDato = document.getElementById(i);
        tdElementDato.textContent = i + '. ' + selectedMonth;
    }
}


// Tilføj denne funktion til at tilføje et event
function addEvent(startDate, endDate, eventName/*skal ændres til selve journey*/) {
    // Find de relevante celler baseret på start- og slutdato
    for (let i = startDate; i <= endDate; i++) {
        let tdElementRejse = document.getElementById(i + ': Rejse');
        let tdElementKunde = document.getElementById(i + ': Kunde')

        if (tdElementRejse) {
            // Opret et p-element for eventet og tilføj det til cellen
            let pElementRejse = document.createElement('p');
            pElementRejse.textContent = eventName + ' - ';
            tdElementRejse.appendChild(pElementRejse);
        }

        if (tdElementKunde) {
            tdElementKunde.textContent = ""

            let pElementKunde = document.createElement('p');
            pElementKunde.textContent = 'Mikkel'; //journey.customer
            tdElementKunde.appendChild(pElementKunde);
        }
    }
}

addEvent(4, 4, "Mikkels fødselsdag");

addEvent(4, 4, "Mathias' fødselsdag");