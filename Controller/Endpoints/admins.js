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

// Middleware to require login for protected routes
adminRouter.use((req, res, next) => {
    res.locals.isAdminLoggedIn = req.session.isAdminLoggedIn || false;
    res.locals.adminUser = req.session.adminUser || null;
    next();
});

// Middleware to require login for protected routes
function requireAdminLogin(req, res, next) {

    if (!req.session.isAdminLoggedIn) {
        res.redirect('/');
    } else {
        next();
    }
}

// Apply middleware to all protected routes except the login route
adminRouter.use((req, res, next) => {
    if (req.path !== '/adminLogin') {
        requireAdminLogin(req, res, next);
    } else {
        next();
    }
});

// Route to /admins/
adminRouter.get('/', (req, res) => {
    let isAdminLoggedIn = res.locals.isAdminLoggedIn;
    let adminUser = res.locals.adminUser;

    if (isAdminLoggedIn && adminUser) {
        res.render('adminMain', { knownUser: isAdminLoggedIn, adminUser: adminUser });
    } else {
        res.redirect('/');
    }
});

// Route to /admins/adminLogin
adminRouter.post('/adminLogin', async (req, res) => {
    try {
        const { username, password } = req.body;
        const adminData = await controllerAdmin.checkAdmin(username, password);

        if (adminData) {
            req.session.isAdminLoggedIn = true;
            req.session.adminUser = adminData;
            res.redirect('/admins/');
        } else {
            res.status(401).send('Incorrect username or password or you are no longer an admin');
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
        // Finds all journeys
        const journeys = await controllerJourney.getJourneys();
        res.render('journeys', { journeys: journeys })
    } catch (error) {
        console.error('Error when retrieving journeys', error);
        res.status(500).send('An error occurred while retrieving trips');
    }
})

adminRouter.get('/oversigt', async (req, res) => {
    try {
        res.render('adminJSCalender')
    } catch (err) {
        console.error('Error loading admin overview', err);
        res.status(500).send('Error loading admin overview');
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
        //res.status(500).send('Fejl ved hentning af journeys pr. måned');
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

//ikke færdig
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

//APIsektion end

adminRouter.get('/oversigt/redigerRejseComplete/', async (req, res) => {
    res.render('bookingUpdateComplete');
})

adminRouter.get('/Customers', async (req, res) => {
    try {
        // Finds all customers
        const customers = await controllerCustomer.getCustomers();
        res.render('customers', { knownUser: isAdminLoggedIn, customers: customers });
    } catch (error) {
        console.error('Error when retrieving customers:', error);
        res.status(500).send('An error occurred while retrieving customers.');
    }
});

adminRouter.get('/admins/drivers', async (req, res) => {
    try {
        // Finds all drivers
        const drivers = await controllerDriver.getDrivers();
        res.render('drivers', { drivers });
    } catch (error) {
        console.error('Error downloading drivers:', error);
        res.status(500).send('An error occurred while downloading drivers.');
    }
});

// Route to /admins/overview
adminRouter.get('/overview', async (req, res) => {
    try {
        // Finds all admins
        const admins = await controllerAdmin.getAdmins();
        res.render('adminsOverview', { admins: admins });
    } catch (error) {
        console.error('Error retrieving admins', error);
        res.status(500).send('An error occurred while retrieving admins');
    }
});

// ------------------------------------
// admin-ENDPOINTS for CRUD for drivers|
// ------------------------------------
adminRouter.post('/Driver/Add', async (req, res) => {
    try {
        const { firstName, lastName } = req.body;
        await controllerDriver.addDriver({ firstName, lastName });
        res.redirect('/Drivers'); //redirecting to driver page
    } catch (error) {
        console.error('Error adding Driver');
        res.status(500).send('An error occurred while adding Driver');
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
        console.error('Error editing Driver', error);
        res.status(500).send('An error occurred while editing the Driver')

    }
});

adminRouter.post('/Driver/Delete/:id', async (req, res) => {
    try {
        const driverId = req.params.id;
        controllerDriver.deleteDriver(driverId);

        res.redirect('/Drivers'); //redirect to an overview of drivers
    } catch (error) {
        console.error('Error when deleting driver: ', error);
        res.status(500).send('An error occurred while deleting the driver')
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
        console.error('Error while getting Driver: ', error);
        res.status(500).send('An error occurred while getting the driver')
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
        console.error('Error when retrieving customer:', error);
        res.status(500).send('An error occurred while retrieving the customer.');
    }
})


/**? bruges endnu? */
adminRouter.post('/Customer/Add', async (req, res) => {
    try {
        const { firstName, lastName, birthday, city } = req.body;
        await controllerCustomer.addCustomer({ firstName, lastName, birthday, city });

        res.redirect('/Customers'); // Redirect to an overview page or other relevant page
    } catch (error) {
        console.error('Error when adding customer:', error);
        res.status(500).send('An error occurred while adding customer.');
    }
});

/**? bruges endnu? */
adminRouter.post('/Customer/Delete/:id', async (req, res) => {
    try {
        const customerId = req.params.id;
        await controllerCustomer.deleteCustomer(customerId);

        res.redirect('/Customers'); // Redirect to an overview page or other relevant page
    } catch (error) {
        console.error('Error when deleting customer: ', error);
        res.status(500).send('An error occurred while deleting the customer.');
    }
});

/**? bruges endnu? */
adminRouter.get('/Customer/Edit/:id', async (req, res) => {
    try {
        const customerId = req.params.id;
        const customer = await controllerCustomer.getCustomer(customerId);
            res.render('customerEdit', { customer });
    } catch (error) {
        console.error('Error when editing customer:', error);
        res.status(500).send('An error occurred while editing customer.');
    }
});



// --------------------------------------
// admin-ENDPOINTS for CRUD for Journeys|
// --------------------------------------

/**? bruges endnu? */
adminRouter.post('/Journey/Add/4day', async (req, res) => {
    try {
        const { startDate, endDate, customer, price } = req.body;
        await controllerJourney.addJourney4Days({ startDate, endDate, customer, price });

        res.redirect('/Journeys'); // Redirect to an overview page or other relevant page
    } catch (error) {
        console.error('Error when adding Journey:', error);
        res.status(500).send('An error occurred while adding Journey.');
    }
});

/**? bruges endnu? */
adminRouter.post('/Journey/Add/3day', async (req, res) => {
    try {
        const { startDate, endDate, customer, price } = req.body;
        await controllerJourney.addJourney3Days({ startDate, endDate, customer, price });

        res.redirect('/Journeys'); // Redirect to an overview page or other relevant page
    } catch (error) {
        console.error('Error when adding Journey:', error);
        res.status(500).send('An error occurred while adding Journey.');
    }
});

/**? bruges endnu? */
adminRouter.post('/Journey/Delete/:id', async (req, res) => {
    try {
        const journeyId = req.params.id;
        await controllerJourney.deleteJourney(journeyId);

        res.redirect('/Journeys/'); // Redirect to an overview page or other relevant page
    } catch (error) {
        console.error('Error when deleting Journey: ', error);
        res.status(500).send('An error occurred while deleting trip.');
    }
});
/**? bruges endnu? */
adminRouter.get('/Journey/Edit/:id', async (req, res) => {
    try {
        const journeyId = req.params.id;
        const journey = await controllerJourney.getJourney(journeyId);
        res.render('EditJourney', { journey });
    } catch (error) {
        console.error('Error when editing Journey:', error);
        res.status(500).send('An error occurred while editing trip.');
    }
});


// -----------------------------------
// admin-ENDPOINTS for CRUD for Admins|
// -----------------------------------
/**? bruges endnu? */
adminRouter.get('/Get/:id', async (req, res) => {
    try {
        const adminId = req.params.id;
        const admin = await controllerAdmin.getAdmin(adminId);
            res.render('AdminDetails', { admin: admin });
    } catch (error) {
        console.error('Error retrieving admin:', error);
        res.status(500).send('An error occurred while retrieving admin.');
    }
})
/**? bruges endnu? */
adminRouter.post('/Add', async (req, res) => {
    try {
        const { firstName, lastName, adminStatus } = req.body;
        await controllerAdmin.addAdmin({ firstName, lastName, adminStatus });

        res.redirect('/Admins'); // Redirect to an overview page or other relevant page
    } catch (error) {
        console.error('Error adding Admin:', error);
        res.status(500).send('An error occurred while adding admin.');
    }
});
/**? bruges endnu? */
adminRouter.post('/Delete/:id', async (req, res) => {
    try {
        const adminId = req.params.id;
        await controllerAdmin.deleteAdmin(adminId);

        res.redirect('/Admins'); // Redirect to an overview page or other relevant page
    } catch (error) {
        console.error('Error when deleting Admin: ', error);
        res.status(500).send('An error occurred while deleting admin.');
    }
});

/**? bruges endnu? */
adminRouter.get('/Edit/:id', async (req, res) => {
    try {
        const adminId = req.params.id;
        const admin = await controllerAdmin.getAdmin(adminId);
            res.render('EditAdmin', { admin });
    } catch (error) {
        console.error('Error editing Admin:', error);
        res.status(500).send('An error occurred while editing Admin:.');
    }
});



// Edit, add, delete admin
adminRouter.put('/:adminID', async (req, res) => {
    try {
        const admin = await DBFunctions.editAdminDB(req.params.adminID, req.body);
        res.json(admin);
    } catch (error) {
        console.error('Error editing Admin: ', error);
        res.status(500).send('An error occurred while editing admin.');
    }
});

adminRouter.post('/', async (req, res) => {
    try {
        const admin = await DBFunctions.addAdminDB(req.body);
        res.json(admin);
    } catch (error) {
        console.error('Error adding Admin: ', error);
        res.status(500).send('An error occurred while adding admin.');
    }
});

adminRouter.delete('/:adminID', async (req, res) => {
    try {
        const admin = await DBFunctions.deleteAdminDB(req.params.adminID);
        res.json(admin);
    } catch (error) {
        console.error('Error when deleting Admin: ', error);
        res.status(500).send('An error occurred while deleting admin.');
    }
});

export default adminRouter;