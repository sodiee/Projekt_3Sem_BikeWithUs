let table = document.getElementById("table");

for (let i = 0; i <= 31; i++) {
    //Laver objekter
    let trElement = document.createElement('tr');
    let tdElement1 = document.createElement('td');
    let tdElement2 = document.createElement('td');

    //Tilfører værdier til elementer
    tdElement1.id = i;
    tdElement1.textContent = '' + i + '';
    tdElement2.id = i + ': Aktivitet'
    tdElement2.textContent = '-'

    //appender elementer til tabel
    trElement.appendChild(tdElement1);
    trElement.appendChild(tdElement2);
    table.appendChild(trElement);
}

// Tilføj denne funktion til at tilføje et event
function addEvent(startDate, endDate, eventName) {
    // Find de relevante celler baseret på start- og slutdato
    for (let i = startDate; i <= endDate; i++) {
        let tdElement = document.getElementById(i + ': Aktivitet');

        if (tdElement) {
            tdElement.textContent = ""
            // Opret et p-element for eventet og tilføj det til cellen
            let pElement = document.createElement('p');
            pElement.textContent = eventName;
            tdElement.appendChild(pElement);
        }
    }
}

addEvent(4, 4, "Mikkels fødselsdag");