import express from 'express';
import session from 'express-session'
const adminRouter = express.Router();
import controllerJourney from '../Model/Journey.js';
import controllerDriver from '../Model/Driver.js';
import controllerCustomer from '../Model/Customer.js';
import controllerAdmin from '../Model/Admin.js'

//----------------------------
// admin-ENDPOINTS for LOGIN |
//----------------------------

adminRouter.get('/', (req, res) => {
    let isLoggedIn = false
    if (req.session.isLoggedIn) {
        isLoggedIn = true
        res.render('../GUI/views/adminMain.pug', {knownUser: isLoggedIn})
    } else {
        res.redirect('/adminLogin')
    }
    
})

adminRouter.post('/adminLogin', (req, res) => {
    const {username, password} = req.body
    if (checkUser(username, password)) {
        req.session.isLoggedIn = true
        res.redirect('/')
    } else {
        res.send('Forkert brugernavn eller adgangskode')
    }
})

adminRouter.get('/secret', (req, res) => {
    if (req.session.isLoggedIn) {
        res.render('adminMain', {knownUser: req.session.isLoggedIn})
    } else {
        res.redirect('/adminLogin')
    }
})

adminRouter.get('/logout', (req, res) => {
    req.session.destroy()
    res.redirect('/')
})

// TODO
// Simulator af databaseopkald
function checkUser(user, password) {
    let returnValue = false
    if (user == 'BENT' && password == '123') {
        returnValue = true
    }
    return returnValue
}


//adminRouter.get('/secret', checkSecretPages, (req, res) => {
    //res.render('adminMain', { knownUser: req.session.isLoggedIn });
//});

// ----------------------------
// admin-ENDPOINTS for oversigt|
// ----------------------------
adminRouter.get('/Journeys/Overview', async (req, res) => {
    try{
    //finder alle journeys
    const journeys = await controllerJourney.getJourneys();
        
    
    res.render('../GUI/views/journeys', {journeys: journeys})
    } catch (error) {
        console.error('Fejl ved hentning af rejser', error);
        res.status(500).send('Der opstod en fejl ved hentning af rejser');
    }
})

adminRouter.get('/Customers/Overview', async (req, res) => {
    try {
        // Finder alle customers
        const customers = await controllerCustomer.getCustomers();
       if (req.session.isLoggedIn) {
        res.render('../GUI/views/customers', { customers: customers });
    } else {
        res.redirect('/adminLogin')
    }
    } catch (error) {
        console.error('Fejl ved hentning af kunder:', error);
        res.status(500).send('Der opstod en fejl ved hentning af kunder.');
    }
});

adminRouter.get('/Drivers/Overview', async (req, res) => {
    try {
        // Finder alle Drivers
        const drivers = await controllerDriver.getDrivers();
        if (req.session.isLoggedIn) {    
        res.render('../GUI/views/drivers', { drivers });
    } else {
        res.redirect('/adminLogin')
    }
    } catch (error) {
        console.error('Fejl ved hentning af drivers:', error);
        res.status(500).send('Der opstod en fejl ved hentning af drivers.');
    }
});

adminRouter.get('/Overview', async (req, res) => {
    try {
        //Finder alle admins
        const admins = await controllerAdmin.getAdmins();
        if (req.session.isLoggedIn) {    
            res.render('../GUI/views/admins', {admins});
        } else {
            res.redirect('/adminLogin')
        }
    } catch (error) {
        console.error('Fejl ved hentning af admins', error);
        res.status(500).send('Der opstod en fejl ved hentning af admins');
    }
});




// ------------------------------------
// admin-ENDPOINTS for CRUD til drivers|
// ------------------------------------
adminRouter.post('/Driver/Add', async (req, res) => {
    try{
    const {firstName, lastName} = req.body;
    await controllerDriver.addDriver({firstName, lastName});

    res.redirect('/Drivers/Overview'); //redirecting to driver page
    } catch(error) {
        console.error('Fejl ved tilføjelse af Driver');
        res.status(500).send('Der opstod en fejl ved tilføjelse af Driver');
    }
});

adminRouter.get('/Driver/Edit/:id', async (req, res) => {
    try {
        const driverId = req.params.id;
        const driver = await controllerDriver.getDriver(driverId)
        if (req.session.isLoggedIn) {    
            res.render('../GUI/views/EditDriver', {driver});
        } else {
            res.redirect('/adminLogin')
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

        res.redirect('/Drivers/Overview'); //redirect til en oversigt over drivers
    } catch (error) {
        console.error('fejl ved sletning af driver: ', error);
        res.status(500).send('Der opstod en fejl ved sletning af driver')
    }
});

adminRouter.get('/Driver/Get/:id', async (req, res) => {
    try {
        const driverId = req.params.id;
        const driver = await controllerDriver.getDriver(driverId)

        if (req.session.isLoggedIn) {    
            res.render('../GUI/views/DriverDetails', { driver });
        } else {
            res.redirect('/adminLogin')
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

        if (req.session.isLoggedIn) {    
            res.render('../GUI/views/CustomerDetails', { customer: customer });
        } else {
            res.redirect('/adminLogin')
        }
        
    } catch (error) {
        console.error('Fejl ved hentning af kunde:', error);
        res.status(500).send('Der opstod en fejl ved hentning af kunde.');
    }
}) 

adminRouter.post('/Customer/Add', async (req, res) => {
    try {
        const { firstName, lastName, birthday, city } = req.body;
        await controllerCustomer.addCustomer({ firstName, lastName, birthday, city });
        
        res.redirect('/Customers/Overview'); // Redirect til en oversigtsside eller anden relevant side
    } catch (error) {
        console.error('Fejl ved tilføjelse af kunde:', error);
        res.status(500).send('Der opstod en fejl ved tilføjelse af kunde.');
    }
});

adminRouter.post('/Customer/Delete/:id', async (req, res) => {
    try {
        const customerId = req.params.id;
        await controllerCustomer.deleteCustomer(customerId);
        
        res.redirect('/Customers/Overview'); // Redirect til en oversigtsside eller anden relevant side
    } catch (error) {
        console.error('Fejl ved sletning af kunde: ', error);
        res.status(500).send('Der opstod en fejl ved sletning af kunde.');
    }
});

adminRouter.get('/Customer/Edit/:id', async (req, res) => {
    try {
        const customerId = req.params.id;
        const customer = await controllerCustomer.getCustomer(customerId);
        
        if (req.session.isLoggedIn) {    
            res.render('../GUI/views/EditCustomer', { customer });
        } else {
            res.redirect('/adminLogin')
        }

    } catch (error) {
        console.error('Fejl ved redigering af kunde:', error);
        res.status(500).send('Der opstod en fejl ved redigering af kunde.');
    }
});



// --------------------------------------
// admin-ENDPOINTS for CRUD til Journeys|
// --------------------------------------


adminRouter.post('/Journey/Add/4day', async (req, res) => {
    try {
        const { startDate, endDate, customer, price } = req.body;
        await controllerJourney.addJourney4Days({ startDate, endDate, customer, price });
        
        res.redirect('/Journeys/Overview'); // Redirect til en oversigtsside eller anden relevant side
    } catch (error) {
        console.error('Fejl ved tilføjelse af Rejse:', error);
        res.status(500).send('Der opstod en fejl ved tilføjelse af rejse.');
    }
});

adminRouter.post('/Journey/Add/3day', async (req, res) => {
    try {
        const { startDate, endDate, customer, price } = req.body;
        await controllerJourney.addJourney3Days({ startDate, endDate, customer, price });
        
        res.redirect('/Journeys/Overview'); // Redirect til en oversigtsside eller anden relevant side
    } catch (error) {
        console.error('Fejl ved tilføjelse af Rejse:', error);
        res.status(500).send('Der opstod en fejl ved tilføjelse af rejse.');
    }
});

adminRouter.post('/Journey/Delete/:id', async (req, res) => {
    try {
        const journeyId = req.params.id;
        await controllerJourney.deleteJourney(journeyId);
        
        res.redirect('/Journeys/Overview'); // Redirect til en oversigtsside eller anden relevant side
    } catch (error) {
        console.error('Fejl ved sletning af Rejse: ', error);
        res.status(500).send('Der opstod en fejl ved sletning af rejse.');
    }
});

adminRouter.get('/Journey/Edit/:id', async (req, res) => {
    try {
        const journeyId = req.params.id;
        const journey = await controllerJourney.getJourney(journeyId);
        
        if (req.session.isLoggedIn) {    
            res.render('../GUI/views/EditJourney', { journey });
        } else {
            res.redirect('/adminLogin')
        }
        
    } catch (error) {
        console.error('Fejl ved redigering af Rejse:', error);
        res.status(500).send('Der opstod en fejl ved redigering af rejse.');
    }
});


// -----------------------------------
// admin-ENDPOINTS for CRUD til Admins|
// -----------------------------------
adminRouter.get('/Get/:id', async (req, res) => {
    try {
        const adminId = req.params.id;
        const admin = await controllerAdmin.getAdmin(adminId);

        if (req.session.isLoggedIn) {    
            res.render('../GUI/views/AdminDetails', { admin: admin });
        } else {
            res.redirect('/adminLogin')
        }
        
    } catch (error) {
        console.error('Fejl ved hentning af admin:', error);
        res.status(500).send('Der opstod en fejl ved hentning af admin.');
    }
}) 

adminRouter.post('/Add', async (req, res) => {
    try {
        const { firstName, lastName, adminStatus } = req.body;
        await controllerAdmin.addAdmin({ firstName, lastName, adminStatus });
        
        res.redirect('/Overview'); // Redirect til en oversigtsside eller anden relevant side
    } catch (error) {
        console.error('Fejl ved tilføjelse af Admin:', error);
        res.status(500).send('Der opstod en fejl ved tilføjelse af admin.');
    }
});

adminRouter.post('/Delete/:id', async (req, res) => {
    try {
        const adminId = req.params.id;
        await controllerAdmin.deleteAdmin(adminId);
        
        res.redirect('/Overview'); // Redirect til en oversigtsside eller anden relevant side
    } catch (error) {
        console.error('Fejl ved sletning af Admin: ', error);
        res.status(500).send('Der opstod en fejl ved sletning af admin.');
    }
});

adminRouter.get('/Edit/:id', async (req, res) => {
    try {
        const adminId = req.params.id;
        const admin = await controllerAdmin.getAdmin(adminId);

        if (req.session.isLoggedIn) {    
            res.render('../GUI/views/EditAdmin', { admin });
        } else {
            res.redirect('/adminLogin')
        }
        
    } catch (error) {
        console.error('Fejl ved redigering af Admin:', error);
        res.status(500).send('Der opstod en fejl ved redigering af admin.');
    }
});





export default adminRouter;