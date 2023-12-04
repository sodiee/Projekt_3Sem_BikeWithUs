import DBFunctions from '../../Storage/DBFunctions.js';

// Er tjekket for korrektur

function Journey(name,nrOfDays, price, description) {
    this.name = name;
    this.nrOfDays = nrOfDays;
    this.price = price;
    this.description = description;
}

async function getCustomerJourneys(customerId) {
        const journeys = await DBFunctions.getCustomerJourneysDB(customerId);
        return journeys;
}

async function getJourneys() {
    return await DBFunctions.getJourneysDB();
}

async function addJourney(journey) {
    let j = {name: journey.name, nrOfDays: journey.nrOfDays, price: journey.price, description: journey.description}
    return await DBFunctions.addJourneyDB(j);
}

function editJourney(journey) {
    let j = {name: journey.name, nrOfDays: journey.nrOfDays, price: journey.price, description: journey.description}
    return DBFunctions.editJourneyDB(j);
}

function getJourney(journey) {
    return DBFunctions.getJourneyDB(journey);
}

async function deleteJourney(journey) {
    let j = {name: journey.name, nrOfDays: journey.nrOfDays, price: journey.price, description: journey.description}
    DBFunctions.deleteJourneyDB(j);
}

async function getJourneysByMonth(month) {
    let arr = await getJourneys();

    arr = filterByMonth(arr, month)
    return arr;
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


export default {getJourneys, getJourneysByMonth, addJourney, editJourney, getJourney, deleteJourney, getCustomerJourneys}






