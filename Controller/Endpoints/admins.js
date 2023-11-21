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

adminRouter.get('/customers', async (req, res) => {
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

adminRouter.get('/Customer/info/:id', async (req, res) => {
       

}) 




// ------------------------------------
// admin-ENDPOINTS for CRUD til drivers|
// ------------------------------------


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
     
 });

adminRouter.post('/Customer/Add', async (req, res) => {
    try {
        const { firstName, lastName, birthday, city } = req.body;
        await controllerCustomer.addCustomer({ firstName, lastName, birthday, city });
        
        res.redirect('/customers'); // Redirect til en oversigtsside eller anden relevant side
    } catch (error) {
        console.error('Fejl ved tilføjelse af kunde:', error);
        res.status(500).send('Der opstod en fejl ved tilføjelse af kunde.');
    }
});

adminRouter.post('/Customer/Delete/:id', async (req, res) => {
    try {
        const customerId = req.params.id;
        await controllerCustomer.deleteCustomer(customerId);
        
        res.redirect('/customers'); // Redirect til en oversigtsside eller anden relevant side
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