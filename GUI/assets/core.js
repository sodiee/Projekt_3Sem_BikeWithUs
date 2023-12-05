//ER FINPUDSET

// ------------------ DRIVERS ------------------
async function deleteDriver(driverID) {
    const response = await fetch(`/drivers/${driverID}`, {
        method: 'DELETE'
    })
    if (response.status == 200) {
        if (typeof window !== 'undefined') {
            window.location = '/drivers';
        }
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
        if (typeof window !== 'undefined') {
            window.location = '/drivers'
        }
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
        if (typeof window !== 'undefined') {
            window.location = '/drivers';
        }
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

  async function getJourney(journeyID) {
    const response = await fetch(`/journeys/${journeyID}`, {
        method: 'GET'
    });

    if (response.status === 200) {
        const journeyData = await response.json();
        console.log(journeyData);
    } else {
        alert("Der skete en fejl ved hentningen af den valgte tur");
    }
}

async function getJourneys() {
    const response = await fetch('/journeys', {
        method: 'GET'
    });
    if (response.status === 200) {
        const journeysData = await response.json();
        console.log(journeysData);
    } else {
        alert("Der skete en fejl ved hentningen af alle ture");
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

//------------------ BOOKINGS -------------------
//DOM adminCalender.js Dynamic functions
//oversigt side
async function getBookings(rbValue) {
    try {
        let url = `/admins/api/overview/` + rbValue;
        const res = await fetch(url);
        const bookings = await res.json();
    
        let idx = 1;
        for (const booking of bookings) {
            let startDate = new Date(booking.startDate)
            let endDate = new Date(booking.endDate);
            let totalPersoner;

            let theStart = startDate.getDate();
            let theEnd = endDate.getDate();
            /*
            console.log('startdate.getmonth ' + startDate.getMonth());
            console.log('enddate.getmonth + 1: ' + (endDate.getMonth() + 1))
            console.log('rbvalue : ' + rbValue);

            if (startDate.getMonth() !== endDate.getMonth()) {
                console.log('1')
                if (startDate.getMonth() == rbValue) {
                    console.log('2')
                    theEnd = calculateDays(startDate.getMonth() + 1);
                } else if (endDate.getMonth() + 1 == rbValue) {
                    console.log('3')
                    theStart = 1;
                }
            }
            */

            for (let i = theStart; i <= theEnd; i++) {
                let tdElementJourney = document.getElementById(i + ': Rejse');
                let tdElementCustomer = document.getElementById(i + ': Kunde');
                let tdElementAddons = document.getElementById(i + ': Tilvalg');
                let tdElementPickup = document.getElementById(i + ': Afhentes');
                let tdElementNrOfPersons = document.getElementById(i + ': Antal Personer');

                //rejse
                if (tdElementJourney) {
                    let pElementJourney = document.createElement('p');
                    pElementJourney.textContent = idx + ': ' + booking.journey.name;
                    tdElementJourney.appendChild(pElementJourney);
                } else {
                    console.log('Fejl med at finde tdelementrejse')
                }

                //kunde
                if (tdElementCustomer) {
                    let pElementCustomer = document.createElement('p');
                    pElementCustomer.textContent = idx + ': ' + booking.customer.firstName + ' ' + booking.customer.lastName;//kunde; //booking.customer
                    tdElementCustomer.appendChild(pElementCustomer);
                } else {
                    console.log('Fejl med at finde tdelementkunde')
                }

                //tilvalg
                if (tdElementAddons) {
                    let pElementAddons = document.createElement('p');
                    //tilvalg virker ik
                    /*
                    if (booking.tilvalg.length != 0) {
                        for (let j = 0; j < booking.tilvalg.length; j++) {
                            pElementTilvalg.textContent = idx + ': ' + booking.tilvalg[j].name;
                            pElementTilvalg.textContent += ' '
                        }
                    } else {*/
                    pElementAddons.textContent = idx + ': Ingen tilvalg';
                    //pElementTilvalg.textContent += '- '
                    //}
                    tdElementAddons.appendChild(pElementAddons);
                } else {
                    console.log('Fejl med at finde tdElementTilvalg')
                }

                if (tdElementPickup) {
                    let pElementPickup = document.createElement('p');
                    if (i == endDate.getDate()) {
                        pElementPickup.textContent = idx + ': Skal hentes denne dag';
                    }
                    tdElementPickup.appendChild(pElementPickup);
                }

                if (tdElementNrOfPersons) {
                    let pElementNrOfPersons = document.createElement('p');
                    pElementNrOfPersons.textContent = idx + ': ' + booking.nrOfPersons;
                    totalPersoner += booking.nrOfPersons;

                    tdElementNrOfPersons.appendChild(pElementNrOfPersons);
                }
            }
            idx++;
        }
    } catch (error) {
        console.error('Der er en fejl i fetch af bookings.', error);
    }
};

let months = ['Januar', 'Februar', 'Marts', 'April', 'Maj', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'December']

function oversigtSide() {
    if (window.location.pathname == '/admins/overview/') {
        //RBs
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
            let tdElementDate = document.createElement('td');
            let tdElementJourney = document.createElement('td');
            let tdElementCustomer = document.createElement('td');
            let tdElementAddons = document.createElement('td');
            let tdElementPickup = document.createElement('td');
            let tdElementNrOfPersons = document.createElement('td');

            //Tilfører værdier til elementer
            tdElementDate.id = i;
            tdElementDate.textContent = i + '. ' + selectedMonth;
            tdElementJourney.id = i + ': Rejse'
            tdElementJourney.textContent = ''
            tdElementCustomer.id = i + ': Kunde'
            tdElementCustomer.textContent = ''
            tdElementAddons.id = i + ': Tilvalg';
            tdElementAddons.textContent = '';
            tdElementPickup.id = i + ': Afhentes'
            tdElementPickup.textContent = ''
            tdElementNrOfPersons.id = i + ': Antal Personer';
            tdElementNrOfPersons.textContent = '';

            //appender elementer til tabel
            trElement.appendChild(tdElementDate);
            trElement.appendChild(tdElementJourney);
            trElement.appendChild(tdElementCustomer);
            trElement.appendChild(tdElementAddons);
            trElement.appendChild(tdElementPickup);
            trElement.appendChild(tdElementNrOfPersons);
            table.appendChild(trElement);
        }
        rbsOnclick();
        getBookings(res);
        updateMonth();
    }
}

function clear() {
    for (let i = 1; i <= 31; i++) {
        let tdElementJourney = document.getElementById(i + ': Rejse');
        let tdElementCustomer = document.getElementById(i + ': Kunde');
        let tdElementAddons = document.getElementById(i + ': Tilvalg');
        let tdElementPickup = document.getElementById(i + ': Afhentes');
        let tdElementNrOfPersons = document.getElementById(i + ': Antal Personer');

        tdElementJourney.textContent = ''
        tdElementCustomer.textContent = ''
        tdElementAddons.textContent = ''
        tdElementPickup.textContent = ''
        tdElementNrOfPersons.textContent = '';
    }
}

function rbsOnclick() {
    //giver rbs onclick funktion
    let rbs = document.querySelectorAll('input[type="radio"]');
    for (const rb of rbs) {
        rb.onclick = () => {
            updateMonth();
            clear();
            getBookings(rb.value);
        };
    }
}


function updateMonth() {
    //opdaterer felterne rejse, kunder og tilvalg, antalpersoner og afhentes
    let rbs = document.querySelectorAll('input[type="radio"]');
    for (const rb of rbs) {
        if (rb.checked) {
            selectedMonthNumber = rb.value;
            break;
        }
    }

    clear();

    for (let i = 1; i <= calculateDays(selectedMonthNumber); i++) {
        let tdElementDate = document.getElementById(i);
        tdElementDate.textContent = i + '. ' + months[selectedMonthNumber - 1];
    }

    //fjerner overflødige datoer
    if (calculateDays(selectedMonthNumber) == 30) {
        let tdElementDate = document.getElementById(31);
        tdElementDate.textContent = ''
    }
    if (calculateDays(selectedMonthNumber) == 28) {
        for (let i = 29; i <= 31; i++) {
            let tdElementDate = document.getElementById(i);
            tdElementDate.textContent = ''
        }
    }
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

//rediger side
async function redigerSide() {
    if (window.location.pathname == '/admins/overview/editBooking') {
        let url = '/admins/api/getBookings/';
        const res = await fetch(url);
        const bookings = await res.json();

        let dropDown = document.getElementById('bookingsDropDown');
        dropDown.onchange = () => {
            updateTxtFields(bookings);
        }
    }
}

//dynamisk opdaterer tekstfelter med info
function updateTxtFields(bookings) {
    let dropDown = document.getElementById('bookingsDropDown');
    let txtName = document.getElementById('customerName')
    let txtID = document.getElementById('bookingId')
    let txtStartDate = document.getElementById('bookingStartDate');
    if (dropDown) {
        let idFromDropDown = dropDown.options[dropDown.selectedIndex].value;
        let actualBooking;
        for (const booking of bookings) {
            if (idFromDropDown === booking.docID) {
                actualBooking = booking;
            }
        }
        txtName.value = actualBooking.customer.firstName + ' ' + actualBooking.customer.lastName;
        txtID.value = actualBooking.docID;
        txtStartDate.value = actualBooking.startDate;
    }
}

async function redigeringsBtnOnclick() {
    let btn = document.getElementById('redigerBtn');
    btn.onclick = () => {
        let dropDown = document.getElementById('bookingsDropDown');
        let selectedBookingID = dropDown.options[dropDown.selectedIndex].value;
        editBooking(selectedBookingID);
    }
}

async function editBooking(booking) {
    const response = await fetch(`/admins/api/overview/editBooking/${booking}`, {
        method: 'put',
        body: JSON.stringify(booking),
        headers: { 'Content-Type': 'application/json' }
    });
    if (response.status == 204) {
        alert('Rejsen er nu redigeret');
    } else {
        alert("Der skete en fejl i forsøget på at redigere denne rejse.")
    }
}

oversigtSide();
redigerSide();



//------------------ CUSTOMERS -------------------
async function deleteCustomer(customerID) {
    const response = await fetch(`/customers/${customerID}`, {
        method: 'DELETE'
    })
    if (response.status == 204) {
        if (typeof window !== 'undefined') {
            window.location = "/customers"
        }
    } else {
        alert("Der skete en fejl.")
    }
}


async function editCustomer(customerID, firstName, lastName) {
    let data = { firstName: firstName, lastName: lastName }
    let url = `/customers/${customerID}`
    const response = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    })
    if (response.status == 200) {
        if (typeof window !== 'undefined') {
            window.location = '/customers'
        }
    } else {
        alert("Der skete en fejl.")
    }
}


async function addCustomer(customer) {
    const response = await fetch('/customers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(customer),
    });

    if (response.status === 201) {
        window.location = '/customers';
    } else {
        alert('Der skete en fejl.');
    }
}
//------------------ ADMINS -------------------
async function deleteAdmin(adminID) {
    const response = await fetch(`/admins/${adminID}`, {
        method: 'DELETE'
    })
    if (response.status == 200) // OK 
    {
        if (typeof window !== 'undefined') {
            window.location = "/admins"
        }
    } else {
        alert("Der skete en fejl.")
    }
}


async function editAdmin(adminID) {
    const firstName = document.getElementById('firstName').value
    const lastName = document.getElementById('lastName').value
    let data = { firstName: firstName, lastName: lastName }
    let url = `/admins/${adminID}`
    const response = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    })
    if (response.status == 200) {
        if (typeof window !== 'undefined') {
            window.location = '/admins'
        }
    } else {
        alert("Der skete en fejl.")
    }
}


async function addAdmin(admin) {
    const response = await fetch('/admins', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(admin),
    });

    if (response.status === 201) {
        if (typeof window !== 'undefined') {
            window.location = '/admins';
        }
    } else {
        alert('Der skete en fejl.');
    }
}

