import DBFunctions from '../../Storage/DBFunctions.js';


function Journey(startDate, endDate, customer, price) {
    this.startDate = startDate;
    this.endDate = endDate;
    this.customer = customer;
    this.price = price;
}

async function getJourneys() {
    return await DBFunctions.getJourneysDB();
}

async function addJourney3Days(journey) {
    let j = {startDate: journey.startDate, endDate: journey.endDate, customer: journey.customer, price: journey.price}
    return await DBFunctions.addJourney3DaysDB(j);
}

async function addJourney4Days(journey) {
    let j = {startDate: journey.startDate, endDate: journey.endDate, customer: journey.customer, price: journey.price}
    return await DBFunctions.addJourney3DaysDB(j);
}

function editJourney(journey) {
    let j = {startDate: journey.startDate, endDate: journey.endDate, customer: journey.customer, price: journey.price}
    return DBFunctions.editJourneyDB(j);
}

function getJourney(journey) {
    return DBFunctions.getJourneyDB(journey);
}

async function deleteJourney(journey) {
    let j = {startDate: journey.startDate, endDate: journey.endDate, customer: journey.customer, price: journey.price}
    DBFunctions.deleteJourneyDB(j);
}

export default {getJourneys, addJourney3Days, addJourney4Days, editJourney, getJourney, deleteJourney}






