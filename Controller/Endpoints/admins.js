import express from 'express';
const adminRouter = express.Router();
import controllerJourney from '../Model/Journey.js';
import controllerDriver from '../Model/Driver.js';
import controllerCustomer from '../Model/Customer.js';
import controllerAdmin from '../Model/Admin.js'
import controllerBooking from '../Model/Booking.js';
import DBFunctions from '../../Storage/DBFunctions.js';


//----------------------------
// admin-ENDPOINTS for LOGIN |
//----------------------------

// Middleware til at kræve log ind for beskyttede ruter
adminRouter.use((req, res, next) => {
    res.locals.isAdminLoggedIn = req.session.isAdminLoggedIn || false;
    res.locals.adminUser = req.session.adminUser || null;
    next();
});

// Middleware til at kræve log ind for beskyttede ruter
function requireAdminLogin(req, res, next) {

    if (!req.session.isAdminLoggedIn) {
        res.redirect('/');
    } else {
        next();
    }
}

// Anvend middleware på alle beskyttede ruter, undtagen login-ruten
adminRouter.use((req, res, next) => {
    if (req.path !== '/adminLogin') {
        requireAdminLogin(req, res, next);
    } else {
        next();
    }
});

// Rute til /admins/
adminRouter.get('/', (req, res) => {
    let isAdminLoggedIn = res.locals.isAdminLoggedIn;
    let adminUser = res.locals.adminUser;

    if (isAdminLoggedIn && adminUser) {
        res.render('adminMain', { knownUser: isAdminLoggedIn, adminUser: adminUser });
    } else {
        res.redirect('/');
    }
});

// Rute til /admins/adminLogin
adminRouter.post('/adminLogin', async (req, res) => {
    try {
        const { username, password } = req.body;
        const adminData = await controllerAdmin.checkAdmin(username, password);

        if (adminData) {
            req.session.isAdminLoggedIn = true;
            req.session.adminUser = adminData;
            res.redirect('/admins/');
        } else {
            res.status(401).send('Forkert brugernavn eller adgangskode eller du er ikke længer admin');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

adminRouter.get('/adminLogin', (req, res) => {
    res.render('adminLogin')
})

adminRouter.get('/adminLogout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});


// ----------------------------
// admin-ENDPOINTS for oversigt|
// ----------------------------
adminRouter.get('/Journeys', async (req, res) => {
    try {
        //finder alle journeys
        //const journeys = await controllerJourney.getJourneys();


        res.render('journeys', { journeys: journeys })
    } catch (error) {
        console.error('Fejl ved hentning af rejser', error);
        res.status(500).send('Der opstod en fejl ved hentning af rejser');
    }
})

adminRouter.get('/oversigt', async (req, res) => {
    try {
        res.render('adminJSCalender')
    } catch (err) {
        console.error('Fejl ved indlæsning af adminoversigt', err);
        res.status(500).send('Fejl ved indlæsning af adminoversigt');
    }
});

adminRouter.get('/oversigt/redigerRejse', async (req, res) => {
    try {
        let bookings = await controllerBooking.getBookings();
        res.render('adminOversigtRedigerRejse', { bookings: bookings });
    } catch (error) {
        console.log(error)
    }
});

//APIsektion start

adminRouter.get('/api/oversigt/:month', async (req, res) => {
    try {
        let bookings = await controllerBooking.getBookingsByMonth(req.params.month);
        res.json(bookings);
    } catch (err) {
        console.log('Fejl ved hentning af bookings pr. måned');
    }
});

adminRouter.get('/api/getBookings/', async (req, res) => {
    try {
        let bookings = await controllerBooking.getBookings();
        
        res.json(bookings);

    } catch (error) {
        console.log(error);
    }
})

adminRouter.post('/api/oversigt/redigerRejse/', async (req, res) => {
    try {
        let bookingId = req.body;
        
        let booking = await controllerBooking.getBooking(bookingId);
       
        let newStartDate = new Date(req.body.startDate);
        
        let newEndDate = controllerBooking.addDays(newStartDate, booking.journey.nrOfDays);

        controllerBooking.editStartDate(booking, newStartDate, newEndDate);
        
        res.redirect('/admins/oversigt/redigerRejseComplete/')
    } catch (error) {
        console.log(error)
    }
})

//APIsektion slut

adminRouter.get('/oversigt/redigerRejseComplete/', async (req, res) => {
    res.render('bookingUpdateComplete');
})

adminRouter.get('/Customers', async (req, res) => {
    try {
        // Finder alle customers
        const customers = await controllerCustomer.getCustomers();
        res.render('customers', { knownUser: isAdminLoggedIn, customers: customers });
    } catch (error) {
        console.error('Fejl ved hentning af kunder:', error);
        res.status(500).send('Der opstod en fejl ved hentning af kunder.');
    }
});

adminRouter.get('/admins/drivers', async (req, res) => {
    try {
        // Finder alle drivers
        const drivers = await controllerDriver.getDrivers();
        res.render('drivers', { drivers });
    } catch (error) {
        console.error('Fejl ved hentning af drivers:', error);
        res.status(500).send('Der opstod en fejl ved hentning af drivers.');
    }
});

// Rute til /admins/overview
adminRouter.get('/overview', async (req, res) => {
    try {
        // Finder alle admins
        const admins = await controllerAdmin.getAdmins();
        res.render('adminsOverview', { admins: admins });
    } catch (error) {
        console.error('Fejl ved hentning af admins', error);
        res.status(500).send('Der opstod en fejl ved hentning af admins');
    }
});




// ------------------------------------
// admin-ENDPOINTS for CRUD til drivers|
// ------------------------------------
adminRouter.post('/Driver/Add', async (req, res) => {
    try {
        const { firstName, lastName } = req.body;
        await controllerDriver.addDriver({ firstName, lastName });

        res.redirect('/Drivers'); //redirecting to driver page
    } catch (error) {
        console.error('Fejl ved tilføjelse af Driver');
        res.status(500).send('Der opstod en fejl ved tilføjelse af Driver');
    }
});

adminRouter.get('/Driver/Edit/:id', async (req, res) => {
    try {
        const driverId = req.params.id;
        const driver = await controllerDriver.getDriver(driverId)
        if (req.session.isAdminLoggedIn) {
            res.render('EditDriver', { driver });
        } else {
            res.redirect('/')
        }

    } catch (error) {
        console.error('Fejl ved redigering af Driver', error);
        res.status(500).send('Der opstod en fejl ved redigering af Driver')

    }
});

adminRouter.post('/Driver/Delete/:id', async (req, res) => {
    try {
        const driverId = req.params.id;
        await controllerDriver.deleteDriver(driverId);

        res.redirect('/Drivers'); //redirect til en oversigt over drivers
    } catch (error) {
        console.error('fejl ved sletning af driver: ', error);
        res.status(500).send('Der opstod en fejl ved sletning af driver')
    }
});

adminRouter.get('/Driver/Get/:id', async (req, res) => {
    try {
        const driverId = req.params.id;
        const driver = await controllerDriver.getDriver(driverId)

        if (req.session.isAdminLoggedIn) {
            res.render('DriverDetails', { driver });
        } else {
            res.redirect('/')
        }

    } catch (error) {
        console.error('Fejl ved hentning af Driver: ', error);
        res.status(500).send('Der opstod en fejl ved hentning af driver')
    }
});
// --------------------------------------
// admin-ENDPOINTS for CRUD til customers|
// --------------------------------------
adminRouter.get('/Customer/Get/:id', async (req, res) => {
    try {
        const customerId = req.params.id;
        const customer = await controllerCustomer.getCustomer(customerId);
        res.render('CustomerDetails', { customer: customer });
    } catch (error) {
        console.error('Fejl ved hentning af kunde:', error);
        res.status(500).send('Der opstod en fejl ved hentning af kunde.');
    }
})


/**? bruges endnu? */
adminRouter.post('/Customer/Add', async (req, res) => {
    try {
        const { firstName, lastName, birthday, city } = req.body;
        await controllerCustomer.addCustomer({ firstName, lastName, birthday, city });

        res.redirect('/Customers'); // Redirect til en oversigtsside eller anden relevant side
    } catch (error) {
        console.error('Fejl ved tilføjelse af kunde:', error);
        res.status(500).send('Der opstod en fejl ved tilføjelse af kunde.');
    }
});

/**? bruges endnu? */
adminRouter.post('/Customer/Delete/:id', async (req, res) => {
    try {
        const customerId = req.params.id;
        await controllerCustomer.deleteCustomer(customerId);

        res.redirect('/Customers'); // Redirect til en oversigtsside eller anden relevant side
    } catch (error) {
        console.error('Fejl ved sletning af kunde: ', error);
        res.status(500).send('Der opstod en fejl ved sletning af kunde.');
    }
});

/**? bruges endnu? */
adminRouter.get('/Customer/Edit/:id', async (req, res) => {
    try {
        const customerId = req.params.id;
        const customer = await controllerCustomer.getCustomer(customerId);
            res.render('customerEdit', { customer });
    } catch (error) {
        console.error('Fejl ved redigering af kunde:', error);
        res.status(500).send('Der opstod en fejl ved redigering af kunde.');
    }
});



// --------------------------------------
// admin-ENDPOINTS for CRUD til Journeys|
// --------------------------------------

/**? bruges endnu? */
adminRouter.post('/Journey/Add/4day', async (req, res) => {
    try {
        const { startDate, endDate, customer, price } = req.body;
        await controllerJourney.addJourney4Days({ startDate, endDate, customer, price });

        res.redirect('/Journeys'); // Redirect til en oversigtsside eller anden relevant side
    } catch (error) {
        console.error('Fejl ved tilføjelse af Rejse:', error);
        res.status(500).send('Der opstod en fejl ved tilføjelse af rejse.');
    }
});

/**? bruges endnu? */
adminRouter.post('/Journey/Add/3day', async (req, res) => {
    try {
        const { startDate, endDate, customer, price } = req.body;
        await controllerJourney.addJourney3Days({ startDate, endDate, customer, price });

        res.redirect('/Journeys'); // Redirect til en oversigtsside eller anden relevant side
    } catch (error) {
        console.error('Fejl ved tilføjelse af Rejse:', error);
        res.status(500).send('Der opstod en fejl ved tilføjelse af rejse.');
    }
});

/**? bruges endnu? */
adminRouter.post('/Journey/Delete/:id', async (req, res) => {
    try {
        const journeyId = req.params.id;
        await controllerJourney.deleteJourney(journeyId);

        res.redirect('/Journeys/'); // Redirect til en oversigtsside eller anden relevant side
    } catch (error) {
        console.error('Fejl ved sletning af Rejse: ', error);
        res.status(500).send('Der opstod en fejl ved sletning af rejse.');
    }
});
/**? bruges endnu? */
adminRouter.get('/Journey/Edit/:id', async (req, res) => {
    try {
        const journeyId = req.params.id;
        const journey = await controllerJourney.getJourney(journeyId);
        res.render('EditJourney', { journey });
    } catch (error) {
        console.error('Fejl ved redigering af Rejse:', error);
        res.status(500).send('Der opstod en fejl ved redigering af rejse.');
    }
});


// -----------------------------------
// admin-ENDPOINTS for CRUD til Admins|
// -----------------------------------
/**? bruges endnu? */
adminRouter.get('/Get/:id', async (req, res) => {
    try {
        const adminId = req.params.id;
        const admin = await controllerAdmin.getAdmin(adminId);
            res.render('AdminDetails', { admin: admin });
    } catch (error) {
        console.error('Fejl ved hentning af admin:', error);
        res.status(500).send('Der opstod en fejl ved hentning af admin.');
    }
})
/**? bruges endnu? */
adminRouter.post('/Add', async (req, res) => {
    try {
        const { firstName, lastName, adminStatus } = req.body;
        await controllerAdmin.addAdmin({ firstName, lastName, adminStatus });

        res.redirect('/Admins'); // Redirect til en oversigtsside eller anden relevant side
    } catch (error) {
        console.error('Fejl ved tilføjelse af Admin:', error);
        res.status(500).send('Der opstod en fejl ved tilføjelse af admin.');
    }
});
/**? bruges endnu? */
adminRouter.post('/Delete/:id', async (req, res) => {
    try {
        const adminId = req.params.id;
        await controllerAdmin.deleteAdmin(adminId);

        res.redirect('/Admins'); // Redirect til en oversigtsside eller anden relevant side
    } catch (error) {
        console.error('Fejl ved sletning af Admin: ', error);
        res.status(500).send('Der opstod en fejl ved sletning af admin.');
    }
});
/**? bruges endnu? */
adminRouter.get('/Edit/:id', async (req, res) => {
    try {
        const adminId = req.params.id;
        const admin = await controllerAdmin.getAdmin(adminId);
            res.render('EditAdmin', { admin });
    } catch (error) {
        console.error('Fejl ved redigering af Admin:', error);
        res.status(500).send('Der opstod en fejl ved redigering af admin.');
    }
});



// Edit, add, delete admin
adminRouter.put('/:adminID', async (req, res) => {
    try {
        const admin = await DBFunctions.editAdminDB(req.params.adminID, req.body);
        res.json(admin);
    } catch (error) {
        console.error('Fejl ved redigering af Admin: ', error);
        res.status(500).send('Der opstod en fejl ved redigering af admin.');
    }
});

adminRouter.post('/', async (req, res) => {
    try {
        const admin = await DBFunctions.addAdminDB(req.body);
        res.json(admin);
    } catch (error) {
        console.error('Fejl ved tilføjelse af Admin: ', error);
        res.status(500).send('Der opstod en fejl ved tilføjelse af admin.');
    }
});

adminRouter.delete('/:adminID', async (req, res) => {
    try {
        const admin = await DBFunctions.deleteAdminDB(req.params.adminID);
        res.json(admin);
    } catch (error) {
        console.error('Fejl ved sletning af Admin: ', error);
        res.status(500).send('Der opstod en fejl ved sletning af admin.');
    }
});

export default adminRouter;