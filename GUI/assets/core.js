// ------------------ DRIVERS ------------------
async function deleteDriver(driverID) {
    const response = await fetch(`/drivers/${driverID}`, {
        method: 'DELETE'
    })
    if (response.status == 204) {
        window.location = "/drivers"
    } else {
        alert("Der skete en fejl.")
    }
}


async function editDriver(driverID) {
    const firstName = document.getElementById('firstName').value
    const lastName = document.getElementById('lastName').value
    let data = { firstName: firstName, lastName: lastName }
    let url = `/drivers/${driverID}`
    const response = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    })
    if (response.status == 200) {
        window.location = '/drivers'
    } else {
        alert("Der skete en fejl.")
    }
}


async function addDriver(driver) {
    const response = await fetch('/drivers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(driver),
    });

    if (response.status === 201) {
        window.location = '/drivers';
    } else {
        alert('Der skete en fejl.');
    }
}


//------------------ JOURNEYS -------------------
async function deleteJourney(journeyID) {
    const response = await fetch(`/journeys/${journeyID}`, {
        method: 'DELETE'
    })
    if (response.status == 204) {
        window.location = "/journeys"
    } else {
        alert("Der skete en fejl.")
    }
}

async function editJourney(journeyID) {
    const startDate = document.getElementById('startDate').value
    const endDate = document.getElementById('endDate').value
    const price = document.getElementById('price').value
    let data = { startDate: startDate, endDate: endDate, price: price }
    let url = `/journeys/${journeyID}`
    const response = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    })
    if (response.status == 200) {
        window.location = '/journeys'
    } else {
        alert("Der skete en fejl.")
    }
}

async function getJourneys(rbValue) {
    try {
        let url = `/admins/api/oversigt/` + rbValue;
        const res = await fetch(url);
        const journeys = await res.json();

        //RBs

        //THead

        //TBody
        //tildeler p elementer til td'erne fra journey.
        let idx = 1;
        for (const journey of journeys) {
            let startDate = new Date(journey.startDate)
            let endDate = new Date(journey.endDate);

            for (let i = startDate.getDate(); i <= endDate.getDate(); i++) {
                let tdElementRejse = document.getElementById(i + ': Rejse');
                let tdElementKunde = document.getElementById(i + ': Kunde');
                let tdElementTilvalg = document.getElementById(i + ': Tilvalg');

                //rejse
                if (tdElementRejse) {
                    // Opret et p-element for eventet og tilføj det til cellen
                    let pElementRejse = document.createElement('p');
                    pElementRejse.id = 'pERejse';
                    //pElementRejse.textContent = '';
                    //nyt
                    pElementRejse.textContent = idx + ': ' + journey.name + '\n -' //journey.Name // + ' - ';
                    tdElementRejse.appendChild(pElementRejse);
                } else {
                    console.log('Fejl med at finde tdelementrejse')
                }

                //kunde
                if (tdElementKunde) {
                    let pElementKunde = document.createElement('p');
                    //pElementKunde = '';
                    //nyt
                    pElementKunde.textContent = idx + ': ' + journey.customer.firstName + ' ' + journey.customer.lastName + ' - ';//kunde; //journey.customer
                    tdElementKunde.appendChild(pElementKunde);
                } else {
                    console.log('Fejl med at finde tdelementkunde')
                }

                //tilvalg
                if (tdElementTilvalg) {
                    let pElementTilvalg = document.createElement('p');
                    //pElementTilvalg = '';
                    pElementTilvalg.textContent = idx + ': ' + "Dårlig seng :D"//journey.tilvalg;
                    tdElementTilvalg.appendChild(pElementTilvalg);
                } else {
                    console.log('Fejl med at finde tdElementTilvalg')
                }
            }
            idx++;
        }
    } catch (error) {
        console.error('Error fetch journeys', error);
    }
};

if (window.location.pathname == '/admins/oversigt/') {
    //RBs
    let months = ['Januar', 'Februar', 'Marts', 'April', 'Maj', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'December']
    let date = new Date();
    let i = 0;
    for (const month of months) {
        i++;
        let form = document.getElementById('form');

        let rbElement = document.createElement('input');
        rbElement.type = "radio"
        rbElement.value = i;
        rbElement.name = "months"
        rbElement.id = 'rb-' + month;
        if (date.getMonth() + 1 == i) {
            rbElement.checked = true;
        }
        form.appendChild(rbElement);

        let labelElement = document.createElement('label');
        labelElement.innerHTML = month;
        labelElement.for = 'rb-' + month;
        form.appendChild(labelElement);
    }

    let rbs = document.querySelectorAll('input[type="radio"]');
    let res;
    for (const rb of rbs) {
        if (rb.checked) {
            res = rb.value;
            break;
        }
    }
    let selectedMonth = months[res - 1];

    //TBody
    let table = document.getElementById("tableBody");

    for (let i = 1; i <= 31; i++) {
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

    rbsOnclick();
    getJourneys(res);
}

//DOM Dynamic functions
let months = ['Januar', 'Februar', 'Marts', 'April', 'Maj', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'December']

function clear() {
    for (let i = 1; i <= 31; i++) {
    let pElementRejse = document.getElementById(i + ': Rejse');
    let pElementKunde = document.getElementById(i + ': Kunde');
    let pElementTilvalg = document.getElementById(i + ': Tilvalg');

    pElementRejse.textContent = '-'
    pElementKunde.textContent = '-'
    pElementTilvalg.textContent = '-'
    }
}

function rbsOnclick() {
    //giver rbs onclick funktion
    let rbs = document.querySelectorAll('input[type="radio"]');
    for (const rb of rbs) {
        rb.onclick = () => {
            updateMonth();
            clear();
            getJourneys(rb.value);
        };
    }
}


function updateMonth() {
    //opdaterer felterne rejse, kunder og tilvalg
    let rbs = document.querySelectorAll('input[type="radio"]');
    for (const rb of rbs) {
        if (rb.checked) {
            selectedMonthNumber = rb.value;
            break;
        }
    }
    clear();
    for (let i = 1; i <= calculateDays(selectedMonthNumber); i++) {
        let tdElementDato = document.getElementById(i);
        tdElementDato.textContent = i + '. ' + months[selectedMonthNumber - 1];
    }
    getJourneys(months[selectedMonthNumber - 1]);
}

function calculateDays(month) {
    if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
        return 31;
    } else if (month == 2) {
        return 28;
    } else {
        return 30;
    }
}
