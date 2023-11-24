import express from 'express';
const customerRouter = express.Router();
import controller from '../Model/Customer.js';

//-------------------------------
// customer-ENDPOINTS for LOGIN |
//-------------------------------

customerRouter.get('/', (req, res) => {
    let isCustomerLoggedIn = false
    if (req.session.isCustomerLoggedIn) {
        isCustomerLoggedIn = true
        res.render('../GUI/views/testAfterCustomerLogin.pug', {knownUser: isCustomerLoggedIn})
    } else {
        res.redirect('/customerLogin')
    }
    
})

customerRouter.post('/customerLogin', (req, res) => {
    const {username, password} = req.body;
    if (checkCustomerUser(username, password)) {
        req.session.isCustomerLoggedIn = true;
        res.redirect('/');
    } else {
        res.send('Forkert brugernavn eller adgangskode');
    }
});

customerRouter.get('/secret', (req, res) => {
    if (req.session.isLoggedIn) {
        res.render('customers', {knownUser: req.session.isCustomerLoggedIn})
    } else {
        res.redirect('/customerLogin')
    }
})

customerRouter.get('/customerLogout', (req, res) => {
    req.session.destroy()
    res.redirect('/')
})

customerRouter.get('/customerLogin', (req, res) => {
    res.render('../GUI/views/customerLogin.pug')
})

// TODO
// Simulator af databaseopkald
function checkCustomerUser(customerUsername, customerPassword) {
    let returnValue = false
    if (customerUsername == 'Maksym' && customerPassword == '123') {
        returnValue = true
    }
    return returnValue
}


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

customerRouter.get('/Journey/Mypage/:id', async (req, res) => {
    
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