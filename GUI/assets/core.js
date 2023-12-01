// ------------------ DRIVERS ------------------
async function deleteDriver(driverID) {
    const response = await fetch(`/drivers/${driverID}`,{
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
        window.location = '/drivers' }
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
        let url = `/admins/api/oversigt/` + rbValue;
        const res = await fetch(url);
        const bookings = await res.json();
        //RBs

        //THead

        //TBody
        //tildeler p elementer til td'erne fra booking.
        let idx = 1;
        for (const booking of bookings) {
            let startDate = new Date(booking.startDate)
            let endDate = new Date(booking.endDate);
            let totalPersoner;
            let theStart = startDate.getDate();
            let theEnd = endDate.getDate();
            
            /*
            //kalkulering af bookinger på tværs af måneder
            if (startDate.getDate() > endDate.getDate()) {
               //hvis en måned går på tværs over i en anden, sørger denne for, 
               //at de første dage bliver tilføjet korrekt.
                theEnd = 31;
            }
*/
            for (let i = theStart; i <= theEnd; i++) {
                let tdElementRejse = document.getElementById(i + ': Rejse');
                let tdElementKunde = document.getElementById(i + ': Kunde');
                let tdElementTilvalg = document.getElementById(i + ': Tilvalg');
                let tdElementAfhentes = document.getElementById(i + ': Afhentes');
                let tdElementAntalPersoner = document.getElementById(i + ': Antal Personer');

                //rejse
                if (tdElementRejse) {
                    // Opret et p-element for eventet og tilføj det til cellen
                    let pElementRejse = document.createElement('p');
                    //pElementRejse.textContent = '';
                    //nyt
                    pElementRejse.textContent = idx + ': ' + booking.journey.name; //booking.Name // + ' - ';
                    //pElementRejse.textContent += '- '
                    tdElementRejse.appendChild(pElementRejse);
                } else {
                    console.log('Fejl med at finde tdelementrejse')
                }

                //kunde
                if (tdElementKunde) {
                    let pElementKunde = document.createElement('p');
                    //pElementKunde = '';
                    //nyt
                    pElementKunde.textContent = idx + ': ' + booking.customer.firstName + ' ' + booking.customer.lastName;//kunde; //booking.customer
                    //pElementKunde.textContent += '- '
                    tdElementKunde.appendChild(pElementKunde);
                } else {
                    console.log('Fejl med at finde tdelementkunde')
                }

                //tilvalg
                if (tdElementTilvalg) {
                    let pElementTilvalg = document.createElement('p');
                    //tilvalg virker ik
                    /*
                    if (booking.tilvalg.length != 0) {
                        for (let j = 0; j < booking.tilvalg.length; j++) {
                            pElementTilvalg.textContent = idx + ': ' + booking.tilvalg[j].name;
                            pElementTilvalg.textContent += ' '
                        }
                    } else {*/
                    pElementTilvalg.textContent = idx + ': Ingen tilvalg';
                    //pElementTilvalg.textContent += '- '
                    //}
                    tdElementTilvalg.appendChild(pElementTilvalg);
                } else {
                    console.log('Fejl med at finde tdElementTilvalg')
                }

                if (tdElementAfhentes) {
                    let pElementAfhentes = document.createElement('p');
                    if (i == endDate.getDate()) {
                        pElementAfhentes.textContent = idx + ': Skal hentes denne dag';
                        //pElementAfhentes.textContent += '- '
                    }
                    tdElementAfhentes.appendChild(pElementAfhentes);
                }

                if (tdElementAntalPersoner) {
                    let pElementAntalPersoner = document.createElement('p');
                    pElementAntalPersoner.textContent = idx + ': ' + booking.nrOfPersons;
                    totalPersoner += booking.nrOfPersons;
                    //pElementAntalPersoner.textContent += '- '

                    tdElementAntalPersoner.appendChild(pElementAntalPersoner);
                }
            }
            /*
            let trExtra = document.createElement('tr');
            let tdTotalPersoner = document.createElement('td');
            let pTotalPersoner = document.createElement('p');
            pTotalPersoner = totalPersoner;
            tdTotalPersoner.appendChild(pTotalPersoner); 
            table.appendChild(trExtra);
            */
            idx++;
        }
    } catch (error) {
        console.error('Error fetch bookings', error);
    }
};

let months = ['Januar', 'Februar', 'Marts', 'April', 'Maj', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'December']

function oversigtSide() {
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
            let tdElementAfhentes = document.createElement('td');
            let tdElementAntalKunder = document.createElement('td');


            //Tilfører værdier til elementer
            tdElementDato.id = i;
            tdElementDato.textContent = i + '. ' + selectedMonth;
            tdElementRejse.id = i + ': Rejse'
            tdElementRejse.textContent = ''
            tdElementKunde.id = i + ': Kunde'
            tdElementKunde.textContent = ''
            tdElementTilvalg.id = i + ': Tilvalg';
            tdElementTilvalg.textContent = '';
            tdElementAfhentes.id = i + ': Afhentes'
            tdElementAfhentes.textContent = ''
            tdElementAntalKunder.id = i + ': Antal Personer';
            tdElementAntalKunder.textContent = '';

            //appender elementer til tabel
            trElement.appendChild(tdElementDato);
            trElement.appendChild(tdElementRejse);
            trElement.appendChild(tdElementKunde);
            trElement.appendChild(tdElementTilvalg);
            trElement.appendChild(tdElementAfhentes);
            trElement.appendChild(tdElementAntalKunder);
            table.appendChild(trElement);
        }

        rbsOnclick();
        getBookings(res);
        updateMonth();
    }
}

function clear() {
    for (let i = 1; i <= 31; i++) {
        let tdElementRejse = document.getElementById(i + ': Rejse');
        let tdElementKunde = document.getElementById(i + ': Kunde');
        let tdElementTilvalg = document.getElementById(i + ': Tilvalg');
        let tdElementAfhentes = document.getElementById(i + ': Afhentes');
        let tdElementAntalKunder = document.getElementById(i + ': Antal Personer');

        tdElementRejse.textContent = ''
        tdElementKunde.textContent = ''
        tdElementTilvalg.textContent = ''
        tdElementAfhentes.textContent = ''
        tdElementAntalKunder.textContent = '';
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

    //fjerner overflødige datoer
    if (calculateDays(selectedMonthNumber) == 30) {
        let tdElementDato = document.getElementById(31);
        tdElementDato.textContent = ''
    }
    if (calculateDays(selectedMonthNumber) == 28) {
        for (let i = 29; i <= 31; i++) {
            let tdElementDato = document.getElementById(i);
            tdElementDato.textContent = ''
        }
    }

    //getBookings(months[selectedMonthNumber - 1]);
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
    if (window.location.pathname == '/admins/oversigt/redigerRejse') {
        let url = '/admins/api/getBookings/';
        const res = await fetch(url);
        const bookings = await res.json();

        let dropDown = document.getElementById('bookingsDropDown');
        dropDown.onchange = () => {
            updateTxtFields(bookings);
        }
        /*
        dropDown.onclick = () => {
            console.log(dropDown.value);
            console.log('selectedindex: ' + dropDown.options[dropDown.selectedIndex].value);
        }*/

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
    const response = await fetch(`/admins/api/oversigt/redigerRejse/${booking}`, {
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
    const response = await fetch(`/customers/${customerID}`,{
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
    let data = {firstName: firstName, lastName: lastName}
    let url = `/customers/${customerID}`
    const response = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    })
    if(response.status == 200){
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
    const response = await fetch(`/admins/${adminID}`,{
      method: 'DELETE'
    })
    if (response.status == 200) // OK 
    { if (typeof window !== 'undefined') {
      window.location = "/admins"
    }
    } else {
      alert("Der skete en fejl.")
    }
  }


async function editAdmin(adminID) {
    const firstName = document.getElementById('firstName').value 
    const lastName = document.getElementById('lastName').value
    let data = {firstName: firstName, lastName: lastName}
    let url = `/admins/${adminID}`
    const response = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    })
    if(response.status == 200){
        if(typeof window !== 'undefined'){
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
        if(typeof window !== 'undefined'){
        window.location = '/admins';
        }
    } else {
        alert('Der skete en fejl.');
    }
}  

