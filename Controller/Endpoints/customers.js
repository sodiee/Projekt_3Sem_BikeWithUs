import express from 'express';
const customerRouter = express.Router();
import controller from '../Model/Customer.js';
import journeyController from '../Model/Journey.js';

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
        res.redirect('/Calender');
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


// ------------------------------------------
// customer-ENDPOINTS for booking / Calender |
// ------------------------------------------
customerRouter.get('/Calender', async (req, res) => {
    // Check for login status using sessions or cookies
    if (req.session.isLoggedIn) {
        try {
            res.render('../GUI/views/CalenderCustomer');
        } catch (error) {
            console.error('Fejl ved hentning af rejser', error);
            res.status(500).send('Der opstod en fejl ved hentning af rejser');
        }
    } else {
        res.redirect('/customerLogin');
    }
});


customerRouter.post('/Calender/Book', async (req, res) => {
    // Check for login status using sessions or cookies
    if (req.session.isLoggedIn) {
        try {
            const { startDate, endDate, customer, price } = req.body;

            //dage mellem startdato og slutdato
            const durationInDays = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)); //antallet af milisekunder på en dag

            if (durationInDays === 4) {
                await controller.addJourney4Days({ startDate, endDate, customer, price });
            } else if (durationInDays === 3) {
                await controller.addJourney3Days({ startDate, endDate, customer, price });
            }
            res.redirect('/Mypage/:id');
        } catch (error) {
            console.error('Fejl ved tilføjelse af Rejse:', error);
            res.status(500).send('Der opstod en fejl ved tilføjelse af rejse.');
        }
    } else {
        res.redirect('/customerLogin');
    }
});



customerRouter.get('/Mypage/:id', async (req, res) => {
    // Check for login status using sessions or cookies
    if (req.session.isLoggedIn) {
        try {
            const customerId = req.params.id; 
            const customerJourneys = await journeyController.getCustomerJourneys(customerId);
            const customer = await controller.getCustomer(customerId);
    
            res.render('../GUI/views/bookingConfirmed', { journeys: customerJourneys, customer: customer });
        } catch (error) {
            console.error('Fejl ved hentning af kundens side:', error);
            res.status(500).send('Der opstod en fejl ved hentning af kundens side.');
        }
    } else {
        res.redirect('/customerLogin');
    }
});

export default customerRouter;