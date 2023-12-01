import express from 'express';
const customerRouter = express.Router();
import controller from '../Model/Customer.js';
import journeyController from '../Model/Journey.js';
import bookingController from '../Model/Booking.js'
import DBFunctions from '../../Storage/DBFunctions.js';
import adminRouter from './admins.js';

//-------------------------------
// customer-ENDPOINTS for LOGIN |
//-------------------------------

// Middleware til at kræve log ind for beskyttede ruter
customerRouter.use((req, res, next) => {
    res.locals.isCustomerLoggedIn = req.session.isCustomerLoggedIn || false;
    res.locals.customerUser = req.session.customerUser || null;
    next();
})

// Middleware til at kræve log ing for beskyttede ruter
function requireCustomerLogin(req, res, next) {
    if (!req.session.isCustomerLoggedIn) {
        // Omdiriger kun, hvis brugen er ikke logget ind
        res.redirect('/customers/customerLogin')
    } else {
        next();
    }
}

// Anvend middleware på alle bestyttede ruter, undtagen login-ruten
customerRouter.use((req, res, next) => {
    if (req.path !== '/customerLogin') {
        requireCustomerLogin(req, res, next);
    } else {
        next();
    }
})

customerRouter.get('/', (req, res) => {
    let isCustomerLoggedIn = res.locals.isCustomerLoggedIn;
    let customerUser = res.locals.customerUser

    if (isCustomerLoggedIn && customerUser) {
        res.render('customerPage', {knownUser: isCustomerLoggedIn, customer: customerUser})
    } else {
        res.redirect('/customers/customerLogin')
    }
    
})

customerRouter.post('/customerLogin', async (req, res) => {
    try {
        const { username, password } = req.body;
        const customerData = await controller.checkCustomer(username, password);
    
        if (customerData) {
          req.session.isCustomerLoggedIn = true;
          req.session.customerUser = customerData;
          res.redirect('/customers/');
        } else {
          res.status(401).send('Forkert brugernavn eller adgangskode');
        }
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
});

customerRouter.get('/customerLogout', (req, res) => {
    req.session.destroy()
    res.redirect('/customers/customerLogin')
})

customerRouter.get('/customerLogin', (req, res) => {
    res.render('customerLogin')
})

// edit, delete, add customer

customerRouter.put('/:customerID', async (req, res) => {
    try {
        const customer = await DBFunctions.editCustomerDB(req.params.customerID, req.body);
        res.json({ customer });
    } catch (error) { 
        console.error('Fejl ved redigering af kunde:', error);
        res.status(500).send('Der opstod en fejl ved redigering af kunde.');
    }
});

customerRouter.delete('/:customerID', async (req, res) => {
    try {
        await DBFunctions.deleteCustomerDB(req.params.customerID);
        res.status(204).end();
    } catch (error) {
        console.error('Fejl ved sletning af kunde:', error);
        res.status(500).send('Der opstod en fejl ved sletning af kunde.');
    }
});

customerRouter.post('/', async (req, res) => {
    try {
        const customer = await DBFunctions.addCustomerDB(req.body);
        res.status(201).json({ customer });
    } catch (error) {
        console.error('Fejl ved tilføjelse af kunde:', error);
        res.status(500).send('Der opstod en fejl ved tilføjelse af kunde.');
    }
});

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
        try {
            const journeys = await journeyController.getJourneys();
            const startDate = req.query.date || 'No date selected'; // Brug datoen gemt i sessionen som startDate
            res.render('bookingJourney', { startDate, journeys });
        } catch (error) {
            console.error('Fejl ved tilføjelse af Rejse:', error);
            res.status(500).send('Der opstod en fejl ved tilføjelse af rejse.');
        }
    });

customerRouter.post('/Calendar/Book', async (req, res) => {
        try {
            const selectedJourneyId = req.body.journeyId;
            const selectedJourney = await journeyController.getJourney(selectedJourneyId);
            const { price, participants } = req.body;
            const startDate = new Date(req.body.date);

            const booking = {
                customer: customerUser,
                journey: selectedJourney,
                nrOfPersons: participants,
                startDate: startDate
            };

            // Gem booking i sessionen
            req.session.booking = booking;

            if (await bookingController.addBooking(booking)) {
                res.redirect('/Calendar/confirmation');
            } 
        } catch (error) {
            console.error('Fejl ved tilføjelse af booking:', error);
            res.status(500).send('Der opstod en fejl ved tilføjelse af booking.');
        }
});


customerRouter.get('/Calendar/confirmation', async (req, res) => {
        try {
            // Hent booking fra sessionen
            const booking = req.session.booking;

            const latestBooking = await bookingController.getCustomerBooking(req.session.customerId);

            // Render confirmation-siden og send nødvendige oplysninger med
            res.render('bookingConfirmed', { customer: booking.customer, booking: booking, latestBooking });
        } catch (error) {
            console.error('Fejl ved håndtering af bekræftelsessiden:', error);
            res.status(500).send('Der opstod en fejl ved håndtering af bekræftelsessiden.');
        }
});
customerRouter.get('/CustomerPage', async (req, res) => {
    // Check for login status using sessions or cookies
        try {
            
            res.render('customerPage', {customer: customerUser });
        } catch (error) {
            console.error('Fejl ved hentning af kundens side:', error);
            res.status(500).send('Der opstod en fejl ved hentning af kundens side.');
        }
});

// Ændring af render-metoden i din customers.js-fil
customerRouter.get('/CustomerBookings', async (req, res) => {
        try {
            // Hent alle bookinger for den aktuelle kunde
            const bookings = await bookingController.getCustomerBookings(req.session.customerId);

            // Send bookinger til Pug-filen
            res.render('customerBookings', { bookings });
        } catch (error) {
            console.error('Fejl ved hentning af kundens bookinger:', error);
            res.status(500).send(`Der opstod en fejl ved hentning af kundens bookinger: ${error.message}`);
        }
});

customerRouter.get('/Contact', async (req, res) => {
        try {
            res.render('contact')
        } catch (error) {
            console.error('Fejl ved hentning af kontaktinformation:', error);
            res.status(500).send('Der opstod en fejl ved hentning kontaktinformation.');            
        }
    })


export default customerRouter;