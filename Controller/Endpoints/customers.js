import express from 'express';
const customerRouter = express.Router();
import controller from '../Model/Customer.js';
import journeyController from '../Model/Journey.js';

//-------------------------------
// customer-ENDPOINTS for LOGIN |
//-------------------------------

customerRouter.get('/', (req, res) => {
    let isCustomerLoggedIn = false
    let customerUser = null
    if (req.session.isCustomerLoggedIn && req.session.customerUser) {
        isCustomerLoggedIn = true
        customerUser = req.session.customerUser
        res.render('testAfterCustomerLogin', {knownUser: isCustomerLoggedIn, customerUser: customerUser})
    } else {
        res.redirect('/customerLogin')
    }
    
})

customerRouter.post('/customerLogin', async (req, res) => {
    try {
        const { username, password } = req.body;
        const customerData = await controller.checkCustomer(username, password);
    
        if (customerData) {
          req.session.isCustomerLoggedIn = true;
          req.session.customerUser = customerData;
          res.redirect('/');
        } else {
          res.status(401).send('Forkert brugernavn eller adgangskode');
        }
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
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
    res.render('customerLogin')
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
customerRouter.get('/Calendar', async (req, res) => {
    // Check for login status using sessions or cookies
    if (!req.session.isLoggedIn) {
        try {
            res.render('bookingCalendar');
        } catch (error) {
            console.error('Fejl ved hentning af rejser', error);
            res.status(500).send('Der opstod en fejl ved hentning af rejser');
        }
    } else {
        res.redirect('/customerLogin');
    }
});


customerRouter.get('/Calendar/Book', async (req, res) => {
    // Check for login status using sessions or cookies
    if (!req.session.isLoggedIn) {
        try {
            const { endDate, customer, price } = req.body;
            const startDate = req.query.date || 'No date selected'; // Brug datoen gemt i sessionen som startDate
            
            //dage mellem startdato og slutdato
            const durationInDays = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)); //antallet af milisekunder på en dag

            if (durationInDays === 4 && new Date(startDate) < new Date(endDate)) {
                await controller.addJourney4Days({ startDate, endDate, customer, price });
                //res.redirect(`/Calendar/confirmation?startDate=${startDate}&endDate=${endDate}&price=${price}`);
            } else if (durationInDays === 3 && new Date(startDate) < new Date(endDate)) {
                await controller.addJourney3Days({ startDate, endDate, customer, price });
                //res.redirect(`/Calendar/confirmation?startDate=${startDate}&endDate=${endDate}&price=${price}`);
            }
            res.render('bookAJourney', { startDate });
        } catch (error) {
            console.error('Fejl ved tilføjelse af Rejse:', error);
            res.status(500).send('Der opstod en fejl ved tilføjelse af rejse.');
        }
    } else {
        res.redirect('/customerLogin');
    }
});


customerRouter.get('/Calendar/confirmation', async (req, res) => {
        try {
            // Hent oplysninger fra query params
            const { startDate, endDate, price } = req.query;
            // Render confirmation-siden og send nødvendige oplysninger med
            res.render('../GUI/views/bookingConfirmed', { startDate, endDate, price });
        } catch (error) {
            console.error('Fejl ved håndtering af bekræftelsessiden:', error);
            res.status(500).send('Der opstod en fejl ved håndtering af bekræftelsessiden.');
        }
    });




customerRouter.get('/Mypage/:id', async (req, res) => {
    // Check for login status using sessions or cookies
    if (!req.session.isLoggedIn) {
        try {
            const customerId = req.params.id; 
            const customerJourneys = await journeyController.getCustomerJourneys(customerId);
            const customer = await controller.getCustomer(customerId);
    
            res.render('bookingConfirmed', { journeys: customerJourneys, customer: customer });
        } catch (error) {
            console.error('Fejl ved hentning af kundens side:', error);
            res.status(500).send('Der opstod en fejl ved hentning af kundens side.');
        }
    } else {
        res.redirect('/customerLogin');
    }
});


export default customerRouter;