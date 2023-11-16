import DBFunctions from '../../Storage/DBFunctions.js';

function Driver(firstName, lastName) {
this.firstName = firstName;
this.lastName = lastName;
}


async function addDriver(driver) {
    let d = {FirstName: driver.firstName, LastName: driver.lastName}
    return await DBFunctions.addDriverDB(d);
}

function getDriver(driver) {
    DBFunctions.getDriverDB(driver.id);
}

function deleteDriver(driver) {
    let d = {FirstName: driver.firstName, LastName: driver.lastName}
    DBFunctions.deleteDriverDB(d);
}

function editDriver(driver) {
    let d = {FirstName: driver.firstName, LastName: driver.lastName}
    DBFunctions.editDriverDB(d);
}

async function getDrivers() {
    return await DBFunctions.getDriversDB();
}
export default {addDriver, getDriver, deleteDriver, editDriver, getDriver}