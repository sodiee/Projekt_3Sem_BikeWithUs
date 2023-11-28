import DBFunctions from '../../Storage/DBFunctions.js';


function Journey(name, startDate, customer, price,antalPersoner) {
    this.name = name;
    this.startDate = startDate;
    let endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 3);
    this.endDate = endDate
    this.customer = customer;
    this.price = price;
    this.antalPersoner = antalPersoner;
}

async function getCustomerJourneys(customerId) {
        const journeys = await DBFunctions.getCustomerJourneysDB(customerId);
        return journeys;
}

async function getJourneys() {
    return await DBFunctions.getJourneysDB();
}

async function getJourneysByMonth(month) {
    let arr = await getJourneys();

    arr = filterByMonth(arr, month)
    return arr;
}

async function addJourney3Days(journey) {
    let j = {name: journey.name, startDate: journey.startDate, endDate: journey.startDate + 3, customer: journey.customer, price: journey.price}
    return await DBFunctions.addJourneyDB(j);
}

async function addJourney4Days(journey) {
    let j = {name: journey.name, startDate: journey.startDate, endDate: journey.startDate + 4, customer: journey.customer, price: journey.price}
    return await DBFunctions.addJourneyDB(j);
}

function editJourney(journey) {
    let j = {name: journey.name, startDate: journey.startDate, endDate: journey.endDate, customer: journey.customer, price: journey.price}
    return DBFunctions.editJourneyDB(j);
}

function getJourney(journey) {
    return DBFunctions.getJourneyDB(journey);
}

async function deleteJourney(journey) {
    let j = {name: journey.name, startDate: journey.startDate, endDate: journey.endDate, customer: journey.customer, price: journey.price}
    DBFunctions.deleteJourneyDB(j);
}

async function editStartDate(journey) {
    let j = {name: journey.name, startDate: journey.startDate, endDate: journey.endDate}
    return DBFunctions.editStartDateDB(j);
}

function filterByMonth(monthArray, targetMonth) {
    let res = [];
   
    for (let i = 0; i < monthArray.length; i++) {
        
        let date = new Date(monthArray[i].startDate); 
       
        if (date.getMonth() + 1 == targetMonth) {
            res.push(monthArray[i]);
        }
    }
    return res;
}

export default {getJourneys, getJourneysByMonth, addJourney3Days, addJourney4Days, editJourney, getJourney, deleteJourney, getCustomerJourneys,editStartDate}






