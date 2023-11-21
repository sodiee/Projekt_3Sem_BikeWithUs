let table = document.getElementById("table");
//måned
const localDate = new Date();
let months = ['January',
'February',
'March',
'April',
'May',
'June',
'July',
'August',
'September',
'October',
'November',
'December',]
let currentMonth = months[localDate.getMonth()];

//TR og TD
for (let i = 1; i <= 31; i++) {
    //Laver objekter
    let trElement = document.createElement('tr');
    let tdElementDato = document.createElement('td');
    let tdElementRejse = document.createElement('td');
    let tdElementKunde = document.createElement('td');

    //Tilfører værdier til elementer
    tdElementDato.id = i;
    tdElementDato.textContent = i + '. ' + currentMonth;
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

//Måneder-knap
for (let i = 0; i < 12; i++) {
    const btn = document.querySelector('#btn');
          // handle button click
          btn.onclick = function () {
              const rbs = document.querySelectorAll('input[name="choice"]');
              let selectedValue;
              for (const rb of rbs) {
                  if (rb.checked) {
                      selectedValue = rb.value;
                      break;
                  }
              }
              alert(selectedValue);
          };
}

// Tilføj denne funktion til at tilføje et event
function addEvent(startDate, endDate, eventName/*skal ændres til selve journey*/) {
    // Find de relevante celler baseret på start- og slutdato
    for (let i = startDate; i <= endDate; i++) {
        let tdElementRejse = document.getElementById(i + ': Rejse');
        let tdElementKunde = document.getElementById(i + ': Kunde')

        if (tdElementRejse) {
            tdElementRejse.textContent = ""
            // Opret et p-element for eventet og tilføj det til cellen
            let pElementRejse = document.createElement('p');
            pElementRejse.textContent = eventName;
            tdElementRejse.appendChild(pElementRejse);
        }

        if(tdElementKunde) {
            tdElementKunde.textContent = ""
         
            let pElementKunde = document.createElement('p');
            pElementKunde.textContent = 'Mikkel'; //journey.customer
            tdElementKunde.appendChild(pElementKunde);
        }
    }
}

addEvent(4, 4, "Mikkels fødselsdag");

