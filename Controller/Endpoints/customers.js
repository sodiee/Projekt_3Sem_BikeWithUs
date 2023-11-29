import express from 'express';
const customerRouter = express.Router();
import controller from '../Model/Customer.js';
import journeyController from '../Model/Journey.js';

//-------------------------------
// customer-ENDPOINTS for LOGIN |
//-------------------------------
let isCustomerLoggedIn = false
let customerUser = null
customerRouter.get('/', (req, res) => {
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
                  const { customer, price, participants, duration, tilvalg } = req.body;
                  const startDate = req.query.date || 'No date selected';
              
                  // Konverter duration fra streng til heltal
                  const durationInDays = parseInt(duration, 10);
              
                  // Beregn slutdato baseret på startdato og valgt varighed
                  const endDate = new Date(startDate);
                  endDate.setDate(endDate.getDate() + durationInDays - 1); // Træk 1, da det inkluderer startdagen
              
                  // Opret et Journey-objekt med de nye oplysninger
                  const journeyData = {
                    startDate,
                    endDate,
                    customer,
                    price,
                    antalPersoner: participants,
                    tilvalg: [tilvalg]  // Gem tilvalget som et array, da der kan være flere tilvalg
                  };
              
                  // Brug den rigtige metode baseret på valgt varighed
                  if (durationInDays === 4 && new Date(startDate) < endDate) {
                    await controller.addJourney4Days(journeyData);
                  } else if (durationInDays === 3 && new Date(startDate) < endDate) {
                    await controller.addJourney3Days(journeyData);
                  }
                  res.render('bookAJourney', { startDate });

                } catch (error) {
                  console.error('Fejl ved tilføjelse af Rejse:', error);
                  res.status(500).send('Der opstod en fejl ved tilføjelse af rejse.');
                }
          }
     else {
        res.redirect('/customerLogin');
    }
});


customerRouter.post('/Calendar/confirmation', async (req, res) => {
        try {
            // Hent oplysninger fra query params
            const { startDate, endDate, price } = req.body;
            // Render confirmation-siden og send nødvendige oplysninger med
            res.render('/Users/lucasholm/Documents/GitHub/Projekt/views/bookingConfirmed.pug', { startDate, endDate, price });
        } catch (error) {
            console.error('Fejl ved håndtering af bekræftelsessiden:', error);
            res.status(500).send('Der opstod en fejl ved håndtering af bekræftelsessiden.');
        }
    });




customerRouter.get('/bookingConfirmed', async (req, res) => {
    // Check for login status using sessions or cookies
    if (req.session.isCustomerLoggedIn) {
        try {
            // const customerId = req.params.id; 
            // const customerJourneys = await journeyController.getCustomerJourneys(customerId);
            // const customer = await controller.getCustomer(customerId);
    
            res.render('bookingConfirmed', { customer: customerUser });
        } catch (error) {
            console.error('Fejl ved hentning af kundens side:', error);
            res.status(500).send('Der opstod en fejl ved hentning af kundens side.');
        }
    } else {
        res.redirect('/customerLogin');
    }
});

// CustomerPage

customerRouter.get('/CustomerPage', async (req, res) => {
    // Check for login status using sessions or cookies
    if (req.session.isLoggedIn) {
        try {
            //const customerId = req.params.id; 
            //const customerJourneys = await journeyController.getCustomerJourneys(customerId);
            //const customer = await controller.getCustomer(customerId);
    
            res.render('CustomerPage', { customer: customerUser });
        } catch (error) {
            console.error('Fejl ved hentning af kundens side:', error);
            res.status(500).send('Der opstod en fejl ved hentning af kundens side.');
        }
    } else {
        res.redirect('/customerLogin');
    }
});


export default customerRouter;