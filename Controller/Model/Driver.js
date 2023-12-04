import DBFunctions from '../../Storage/DBFunctions.js';


// Der er ekstra metoder i bunden som måske skal slettes

async function addDriver(driver) {
    let d = {firstName: driver.firstName, lastName: driver.lastName}
    return await DBFunctions.addDriverDB(d);
}

function getDriver(driver) {
    return DBFunctions.getDriverDB(driver.id);
}

function deleteDriver(driver) {
    let d = {firstName: driver.firstName, lastName: driver.lastName, id: driver.id}
    DBFunctions.deleteDriverDB(d);
}

function editDriver(driver) {
    let d = {firstName: driver.firstName, lastName: driver.lastName, id: driver.id}
    DBFunctions.editDriverDB(d);
}

async function getDrivers() {
    return await DBFunctions.getDriversDB();
}

async function checkDriver(driverUsername, driverPassword) { 
    try {
      return await DBFunctions.getDriverByUsernameAndPassword(driverUsername, driverPassword);
    } catch (error) {
      console.error(error);
      throw error; // Kast fejlen igen for yderligere håndtering
    }
  }

//hent driver tasks
/*
app.get('/driverTasks', async (req, res) => {
    const driverTasks = await getDriverTasks();
    res.render('driverTasks', {tasks: driverTasks});
});
*/

export default {addDriver, getDrivers, deleteDriver, editDriver, getDriver}