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
let monthData = [];
const localDate = new Date(); 
let currentMonth = months[localDate.getMonth()];
let selectedMonth = currentMonth;

//afhentningsfunktion - er dette virkelig nødvendigt?
//- array med alle journeys for hver måned ?
//- indsættelse af faktiske journeys
//- tilvalg skal hentes ind

//TR og TD

//const btn = document.getElementById('btn');



//tilføj events
//nyt
function addEvent(startDate, endDate, eventName/*skal ændres til selve journey*/, kunde) {
    
    
}
