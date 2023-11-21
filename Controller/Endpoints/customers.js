import express from 'express';
const customerRouter = express.Router();
import controller from '../Model/Customer.js';


// -------------------------------
// customer-ENDPOINTS for booking |
// -------------------------------

customerRouter.post('/Journey/Book/4day', async (req, res) => {
    try {
        const { startDate, endDate, customer, price } = req.body;
        await controller.addJourney4Days({ startDate, endDate, customer, price });
        
        res.redirect('/Journeys/Overview'); // Redirect til en oversigtsside eller anden relevant side
    } catch (error) {
        console.error('Fejl ved tilføjelse af Rejse:', error);
        res.status(500).send('Der opstod en fejl ved tilføjelse af rejse.');
    }
});

customerRouter.post('/Journey/Book/3day', async (req, res) => {
    try {
        const { startDate, endDate, customer, price } = req.body;
        await controller.addJourney3Days({ startDate, endDate, customer, price });
        
        res.redirect('/Journeys/Overview'); // Redirect til en oversigtsside eller anden relevant side
    } catch (error) {
        console.error('Fejl ved tilføjelse af Rejse:', error);
        res.status(500).send('Der opstod en fejl ved tilføjelse af rejse.');
    }
});

customerRouter.get('/Journey/MyJourneys/:id', async (req, res) => {
    
        try {
            const customerId = req.params.customerId;
            const customerJourneys = await controller.getCustomerJourneys(customerId);
            const customer = await controller.getCustomer(customerId);
    
            res.render('../GUI/views/CustomerPage', { trips: customerJourneys, customer: customer });
        } catch (error) {
            console.error('Fejl ved hentning af kundens side:', error);
            res.status(500).send('Der opstod en fejl ved hentning af kundens side.');
        }
});
    
     


export default customerRouter;