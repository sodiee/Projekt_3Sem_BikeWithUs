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
//nyt
let monthData = [[filterByMonth(getMonths, 1)], [filterByMonth(getMonths, 2)],[filterByMonth(getMonths, 3)], [filterByMonth(getMonths, 4)],[filterByMonth(getMonths, 5)], [filterByMonth(getMonths, 6)],[filterByMonth(getMonths, 7)], [filterByMonth(getMonths, 8)],[filterByMonth(getMonths, 9)], [filterByMonth(getMonths, 10)],[filterByMonth(getMonths, 11)], [filterByMonth(getMonths, 12)],]
const localDate = new Date(); 
let currentMonth = months[localDate.getMonth()];
let selectedMonth = currentMonth;

//afhentningsfunktion - er dette virkelig nødvendigt?
//- array med alle journeys for hver måned ?
//- indsættelse af faktiske journeys
//- tilvalg skal hentes ind

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
    let tdElementTilvalg = document.createElement('td');


    //Tilfører værdier til elementer
    tdElementDato.id = i;
    tdElementDato.textContent = i + '. ' + selectedMonth;
    tdElementRejse.id = i + ': Rejse'
    tdElementRejse.textContent = '-'
    tdElementKunde.id = i + ': Kunde'
    tdElementKunde.textContent = '-'
    tdElementTilvalg.id = i + ': Tilvalg';
    tdElementTilvalg.textContent = '-';

    //appender elementer til tabel
    trElement.appendChild(tdElementDato);
    trElement.appendChild(tdElementRejse);
    trElement.appendChild(tdElementKunde);
    trElement.appendChild(tdElementTilvalg);
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


//tilføj events
//nyt
function addEvent(startDate, endDate, eventName/*skal ændres til selve journey*/, kunde) {
    
    
}
