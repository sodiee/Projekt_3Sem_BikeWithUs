import { async } from "@firebase/util"

// mathias lugter hahahah

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

async function getJourneys() {
    try {
        let url = `/api/oversigt/:${month}`;
        const res = await fetch(url);
        const journeys = await res.json();
        console.log(journeys);

        for (const journey of journeys) {
            for (let i = startDate; i <= endDate; i++) {
                let tdElementRejse = document.getElementById(i + ': Rejse');
                let tdElementKunde = document.getElementById(i + ': Kunde');
                let tdElementTilvalg = document.getElementById(i + ': Tilvalg');

                if (tdElementRejse) {
                    // Opret et p-element for eventet og tilføj det til cellen
                    let pElementRejse = document.createElement('p');
                    //nyt
                    pElementRejse.textContent = eventName //journey.Name // + ' - ';
                    tdElementRejse.appendChild(pElementRejse);
                }
                //nyt
                else {
                    console.log('Fejl med at finde tdelementrejse')
                }

                if (tdElementKunde) {
                    let pElementKunde = document.createElement('p');
                    //nyt
                    pElementKunde.textContent = kunde//journey.customer;//kunde; //journey.customer
                    tdElementKunde.appendChild(pElementKunde);
                }
                //nyt
                else {
                    console.log('Fejl med at finde tdelementkunde')
                }

                //nyt
                if (tdElementTilvalg) {
                    let pElementTilvalg = document.createElement('p');
                    pElementTilvalg.textContent = //journey.tilvalg;
                        tdElementTilvalg.appendChild(pElementTilvalg);
                } else {
                    console.log('Fejl med at finde tdElementTilvalg')
                }
            }
        }
    } catch (error) {
        console.error('Error fetch journeys', error);
    }
};

export default { getJourneys };