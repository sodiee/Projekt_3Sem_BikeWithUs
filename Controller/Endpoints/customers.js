import express from 'express';
const customerRouter = express.Router();
import controller from '../Model/Customer.js';
import journeyController from '../Model/Journey.js';
import bookingController from '../Model/Booking.js'

//-------------------------------
// customer-ENDPOINTS for LOGIN |
//-------------------------------
let isCustomerLoggedIn = false
let customerUser = null
customerRouter.get('/', (req, res) => {
    if (req.session.isCustomerLoggedIn && req.session.customerUser) {
        isCustomerLoggedIn = true
        customerUser = req.session.customerUser
        res.render('customerPage', {knownUser: isCustomerLoggedIn, customer: customerUser})
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
    if (req.session.isCustomerLoggedIn) {
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
    if (req.session.isCustomerLoggedIn) {
        try {
            res.render('bookingCalendar', {customer: customerUser});
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
    if (req.session.isCustomerLoggedIn) {
        try {
            const journeys = await journeyController.getJourneys();
            const startDate = req.query.date || 'No date selected'; // Brug datoen gemt i sessionen som startDate
            res.render('bookingJourney', { startDate, journeys });
        } catch (error) {
            console.error('Fejl ved tilføjelse af Rejse:', error);
            res.status(500).send('Der opstod en fejl ved tilføjelse af rejse.');
        }
    } else {
        res.redirect('/customerLogin');
    }
});

customerRouter.post('/Calendar/Book', async (req, res) => {
    // Check for logi/Calendar/Bookn status using sessions or cookies
    if (req.session.isCustomerLoggedIn) {
        try {
            const selectedJourneyId = req.body.journeyId;
            const selectedJourney = await journeyController.getJourney(selectedJourneyId);
            const {price, participants } = req.body;
            const startDate = req.query.date || 'No date selected'; // Brug datoen gemt i sessionen som startDate

            const booking = {customer : customerUser, journey : selectedJourney, nrOfPersons : participants, startDate :  startDate}
            await bookingController.addBooking(booking);

            res.redirect('/Calendar');
        } catch (error) {
            console.error('Fejl ved tilføjelse af booking:', error);
            res.status(500).send('Der opstod en fejl ved tilføjelse af booking.');
        }
    } else {
        res.redirect('/customerLogin');
    }
});

customerRouter.get('/Mypage/:id', async (req, res) => {
    // Check for login status using sessions or cookies
    if (!req.session.isCustomerLoggedIn) {
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

customerRouter.get('/CustomerJourneys', async (req, res) => {
    if(req.session.isCustomerLoggedIn) {
        try {
            res.render('customerJourneys', {journeys: customerUser.journeys})
        } catch (error) {
            console.error('Fejl ved hentning af kundens rejser:', error);
            res.status(500).send('Der opstod en fejl ved hentning af kundens rejser.');
        }
    }
    else {
        res.redirect('/customerLogin')
    }
})

customerRouter.get('/Contact', async (req, res) => {
    if(req.session.isCustomerLoggedIn) {
        try {
            res.render('contact')
        } catch (error) {
            console.error('Fejl ved hentning af kontaktinformation:', error);
            res.status(500).send('Der opstod en fejl ved hentning kontaktinformation.');            
        }
    }
})


export default customerRouter;