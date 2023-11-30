import express from 'express';
const customerRouter = express.Router();
import controller from '../Model/Customer.js';
import journeyController from '../Model/Journey.js';
import bookingController from '../Model/Booking.js';
import DBFunctions from '../../Storage/DBFunctions.js';

//-------------------------------
// customer-ENDPOINTS for LOGIN |
//-------------------------------
let isCustomerLoggedIn = false
let customerUser = null

customerRouter.get('/', (req, res) => {
    if (req.session.isCustomerLoggedIn && req.session.customerUser) {
        isCustomerLoggedIn = true
        customerUser = req.session.customerUser
        res.render('CustomerPage', {knownUser: isCustomerLoggedIn, customer: customerUser})
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

// edit, delete, add customer

customerRouter.put('/:customerID', async (req, res) => {
    try {
        const customer = await controller.editCustomer(req.params.customerID);
        res.json({ customer });
    } catch (error) { 
        console.error('Fejl ved redigering af kunde:', error);
        res.status(500).send('Der opstod en fejl ved redigering af kunde.');
    }
});

customerRouter.delete('/:customerID', async (req, res) => {
    try {
        await controller.deleteCustomer(req.params.customerID);
        res.status(204).end();
    } catch (error) {
        console.error('Fejl ved sletning af kunde:', error);
        res.status(500).send('Der opstod en fejl ved sletning af kunde.');
    }
});

customerRouter.post('/', async (req, res) => {
    try {
        const customer = await controller.addCustomer(req.body);
        res.status(201).json({ customer });
    } catch (error) {
        console.error('Fejl ved tilføjelse af kunde:', error);
        res.status(500).send('Der opstod en fejl ved tilføjelse af kunde.');
    }
});

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
            res.render('bookingCalendar', {customerUser: customerUser});
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

            const booking = {customerUser, selectedJourney, participants, startDate}
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
//hej

customerRouter.post('/Calendar/confirmation', async (req, res) => {
        try {
            // Hent oplysninger fra query params
            const { startDate, endDate, price } = req.body;
            // Render confirmation-siden og send nødvendige oplysninger med
            res.render('bookingConfirmed', { customer: customerUser, startDate, endDate, price });
        } catch (error) {
            console.error('Fejl ved håndtering af bekræftelsessiden:', error);
            res.status(500).send('Der opstod en fejl ved håndtering af bekræftelsessiden.');
        }
    });


customerRouter.get('/CustomerPage', async (req, res) => {
    // Check for login status using sessions or cookies
    if (req.session.isCustomerLoggedIn) {
        try {
            res.render('CustomerPage', { customer: customerUser});
        } catch (error) {
            console.error('Fejl ved hentning af kundens side:', error);
            res.status(500).send('Der opstod en fejl ved hentning af kundens side.');
        }
    } else {
        res.redirect('/customerLogin');
    }
});


export default customerRouter;