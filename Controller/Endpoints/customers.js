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

// Middleware to require login for protected routes
customerRouter.use((req, res, next) => {
    res.locals.isCustomerLoggedIn = req.session.isCustomerLoggedIn || false;
    res.locals.customerUser = req.session.customerUser || null;
    next();
})

// Middleware to require login for protected routes
function requireCustomerLogin(req, res, next) {
    if (!req.session.isCustomerLoggedIn) {
        // Redirects only if user is not logged in
        res.redirect('/customers/customerLogin')
    } else {
        next();
    }
}

// Apply middleware to all protected routes except the login route
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
        res.redirect('/')
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
          res.status(401).send('Wrong username or password');
        }
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
});

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
        const customer = await DBFunctions.editCustomerDB(req.params.customerID, req.body);
        res.json({ customer });
    } catch (error) { 
        console.error('Error when editing customer:', error);
        res.status(500).send('An error occurred while editing customer.');
    }
});

customerRouter.delete('/:customerID', async (req, res) => {
    try {
        await DBFunctions.deleteCustomerDB(req.params.customerID);
        res.status(204).end();
    } catch (error) {
        console.error('Error when deleting customer:', error);
        res.status(500).send('An error occurred while deleting the customer.');
    }
});

customerRouter.post('/', async (req, res) => {
    try {
        const customer = await DBFunctions.addCustomerDB(req.body);
        res.status(201).json({ customer });
    } catch (error) {
        console.error('Error when adding customer:', error);
        res.status(500).send('An error occurred while adding customer.');
    }
});

// ------------------------------------------
// customer-ENDPOINTS for booking / Calender |
// ------------------------------------------

customerRouter.get('/Calendar', async (req, res) => {
    // Check for login status using sessions or cookies
        try {
            res.render('bookingCalendar');
        } catch (error) {
            console.error('Error retrieving journeys', error);
            res.status(500).send('An error occurred while retrieving trips');
        }
    });


customerRouter.get('/Calendar/Book', async (req, res) => {
    // Check for login status using sessions or cookies
        try {
            const journeys = await journeyController.getJourneys();
            // Use the date stored in the session as startDate, or use 'No date selected' if no date is stored
            const startDate = req.query.date || 'No date selected'; 
            res.render('bookingJourney', { startDate, journeys });
        } catch (error) {
            console.error('Error when adding Travel:', error);
            res.status(500).send('An error occurred while adding trip.');
        }
    });

customerRouter.get('/api/journeys/:journeyID', async (req, res) =>{
    try{
        const journeyID = req.params.journeyID
        const journey = await journeyController.getJourney(journeyID)
        res.json(journey)

    } catch(error) {
        console.log('Fejl ved hentning af tur: ', error)
        res.status(500).send('Der opstod en fejl ved tilføjelse af rejse.');
    }
})

customerRouter.post('/Calendar/Book', async (req, res) => {
        try {
            const selectedJourneyId = req.body.journeyId;
            const selectedJourney = await journeyController.getJourney(selectedJourneyId);
            const { price, participants } = req.body;
            const startDate = new Date(req.body.date);
            const customerUser = req.session.customerUser;
            const selectedAddons = req.body.selectedAddons ? req.body.selectedAddons.map(JSON.parse) : [];
        
            const booking = {
                customer: customerUser,
                journey: selectedJourney,
                price: price,
                nrOfPersons: participants,
                startDate: startDate,
                addons: selectedAddons
            };

            // Save booking in the session
            req.session.booking = booking;

            if (await bookingController.addBooking(booking)) {
                res.redirect('/customers/Calendar/confirmation');
            } 
        } catch (error) {
            console.error('Error when adding booking:', error);
            res.status(500).send('An error occurred while adding booking.');
        }
});


customerRouter.get('/Calendar/confirmation', async (req, res) => {
        try {
            // Get booking from the session
            const booking = req.session.booking;
            const latestBooking = await bookingController.getCustomerBooking(req.session.customerId);

            // Render the confirmation page and send the necessary information with it
            res.render('bookingConfirmed', { customer: booking.customer, booking: booking, latestBooking });
        } catch (error) {
            console.error('Error handling confirmation page: ', error);
            res.status(500).send('An error occurred while handling the confirmation page.');
        }
});
customerRouter.get('/CustomerPage', async (req, res) => {
        try {
            const customerUser = req.session.customerUser; // Get customer from the session
            res.render('customerPage', {customer: customerUser});
        } catch (error) {
            console.error('Error retrieving the customers page:', error);
            res.status(500).send('An error occurred while retrieving the customer page.');
        }
});


customerRouter.get('/CustomerBookings', async (req, res) => {
        try {
            // Retrieve all bookings for the current customer
            const bookings = await bookingController.getCustomerBookings(req.session.customerId);

            // Submit bookings to the Pug file
            res.render('customerBookings', { bookings });
        } catch (error) {
            console.error('Error when retrieving the customers bookings:', error);
            res.status(500).send(`An error occurred while retrieving the customer's bookings: ${error.message}`);
        }
});

customerRouter.get('/Contact', async (req, res) => {
        try {
            res.render('contact')
        } catch (error) {
            console.error('Error retrieving contact information:', error);
            res.status(500).send('An error occurred while retrieving contact information.');            
        }
    })


export default customerRouter;