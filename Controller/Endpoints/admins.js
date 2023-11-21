import express from 'express';
const adminRouter = express.Router();
import controllerJourney from '../Model/Journey.js';
import controllerDriver from '../Model/Driver.js';
import controllerCustomer from '../Model/Customer.js';
import controllerAdmin from '../Model/Admin.js'

// ----------------------------
// admin-ENDPOINTS for oversigt|
// ----------------------------

adminRouter.get('/Journey/Overview', async (req, res) => {
    try{
    //finder alle oversigter over journeys
    const journeys = await controllerJourney.getJourneys();

    
    res.render('../GUI/views/journeys', {journeys: journeys})
    } catch (error) {
        console.error('Fejl ved hentning af rejser', error);
        res.status(500).send('Der opstod en fejl ved hentning af rejser');
    }
})

adminRouter.get('/Customers/Overview', async (req, res) => {
    try {
        // Finder alle customers
        const customers = await controllerCustomer.getCustomers();
        console.log(customers)
        res.render('../GUI/views/customers', { customers: customers });
    } catch (error) {
        console.error('Fejl ved hentning af kunder:', error);
        res.status(500).send('Der opstod en fejl ved hentning af kunder.');
    }
});

adminRouter.get('/Drivers/Overview', async (req, res) => {
    try {
        // Finder alle Drivers
        const drivers = await controllerDriver.getDrivers();
        res.render('../GUI/views/drivers', { drivers });
    } catch (error) {
        console.error('Fejl ved hentning af drivers:', error);
        res.status(500).send('Der opstod en fejl ved hentning af drivers.');
    }
});






// ------------------------------------
// admin-ENDPOINTS for CRUD til drivers|
// ------------------------------------
adminRouter.post('/Driver/Add', async (req, res) => {
    try{
    const {firstName, lastName} = req.body;
    await controllerDriver.addDriver({firstName, lastName});

    res.redirect('/Drivers/Overview'); //redirecting to driver page
    } catch(error) {
        console.error('Fejl ved tilføjelse af Driver');
        res.status(500).send('Der opstod en fejl ved tilføjelse af Driver');
    }
});

adminRouter.get('/Driver/Edit/:id', async (req, res) => {
    try {
        const driverId = req.params.id;
        const driver = await controllerDriver.getDriver(driverId)

        res.render('../GUI/views/EditDriver', {driver});
    } catch (error) {
        console.error('Fejl ved redigering af Driver', error);
        res.status(500).send('Der opstod en fejl ved redigering af Driver')
        
    }
});

adminRouter.post('/Driver/Delete/:id', async (req, res) => {
    try {
        const driverId = req.params.id;
        await controllerDriver.deleteDriver(driverId);

        res.redirect('/Drivers/Overview'); //redirect til en oversigt over drivers
    } catch (error) {
        console.error('fejl ved sletning af driver: ', error);
        res.status(500).send('Der opstod en fejl ved sletning af driver')
    }
});

adminRouter.get('/Driver/Get/:id', async (req, res) => {
    try {
        const driverId = req.params.id;
        const driver = await controllerDriver.getDriver(driverId)

        res.render('../GUI/views/DriverDetails', { driver });
    } catch (error) {
        console.error('Fejl ved hentning af Driver: ', error);
        res.status(500).send('Der opstod en fejl ved hentning af driver')
    }
});
// --------------------------------------
// admin-ENDPOINTS for CRUD til customers|
// --------------------------------------
adminRouter.get('/Customer/Get/:id', async (req, res) => {
    try {
        const customerId = req.params.id;
        const customer = await controllerCustomer.getCustomer(customerId);

            console.log(customer)
        res.render('../GUI/views/CustomerDetails', { customer: customer });

        
    } catch (error) {
        console.error('Fejl ved hentning af kunde:', error);
        res.status(500).send('Der opstod en fejl ved hentning af kunde.');
    }
}) 

adminRouter.post('/Customer/Add', async (req, res) => {
    try {
        const { firstName, lastName, birthday, city } = req.body;
        await controllerCustomer.addCustomer({ firstName, lastName, birthday, city });
        
        res.redirect('/Customers/Overview'); // Redirect til en oversigtsside eller anden relevant side
    } catch (error) {
        console.error('Fejl ved tilføjelse af kunde:', error);
        res.status(500).send('Der opstod en fejl ved tilføjelse af kunde.');
    }
});

adminRouter.post('/Customer/Delete/:id', async (req, res) => {
    try {
        const customerId = req.params.id;
        await controllerCustomer.deleteCustomer(customerId);
        
        res.redirect('/Customers/Overview'); // Redirect til en oversigtsside eller anden relevant side
    } catch (error) {
        console.error('Fejl ved sletning af kunde: ', error);
        res.status(500).send('Der opstod en fejl ved sletning af kunde.');
    }
});

adminRouter.get('/Customer/Edit/:id', async (req, res) => {
    try {
        const customerId = req.params.id;
        const customer = await controllerCustomer.getCustomer(customerId);
        
        res.render('../GUI/views/EditCustomer', { customer });
    } catch (error) {
        console.error('Fejl ved redigering af kunde:', error);
        res.status(500).send('Der opstod en fejl ved redigering af kunde.');
    }
});



// --------------------------------------
// admin-ENDPOINTS for CRUD til Journeys|
// --------------------------------------
adminRouter.get('/Journey/Edit/:id', async (req, res) => {
    try {
        const journeyId = req.params.id;
        const journey = await controllerJourney.getJourney(journeyId);
        
        res.render('../GUI/views/EditJourney', { journey });
    } catch (error) {
        console.error('Fejl ved redigering af rejse:', error);
        res.status(500).send('Der opstod en fejl ved redigering af rejse.');
    }
})



export default adminRouter;