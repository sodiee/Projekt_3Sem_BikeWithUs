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
    let isAdminLoggedIn = false
    let adminUser = null
    if (req.session.isAdminLoggedIn && req.session.adminUser) {
        isAdminLoggedIn = true
        adminUser = req.session.adminUser
        //adminUser = req.session.adminData
        res.render('adminMain', {knownUser: isAdminLoggedIn, adminUser: adminUser})
    } else {
        res.redirect('/adminLogin')
    }
})

adminRouter.post('/adminLogin', async (req, res) => {
    try {
      const { username, password } = req.body;
      const adminData = await controllerAdmin.checkAdmin(username, password);
  
      if (adminData) {
        req.session.isAdminLoggedIn = true;
        req.session.adminUser = adminData;
        res.redirect('/admins/');
      } else {
        res.status(401).send('Forkert brugernavn eller adgangskode');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

/*
adminRouter.get('/secret', (req, res) => {
    if (req.session.isAdminLoggedIn) {
        res.render('adminMain', {knownUser: req.session.isAdminLoggedIn})
    } else {
        res.redirect('/adminLogin')
    }
})
*/

adminRouter.get('/adminLogin', (req, res) => {
    res.render('adminLogin')
})

adminRouter.get('/adminLogout', (req, res) => {
    req.session.destroy()
    res.redirect('/adminLogin')
})


// ----------------------------
// admin-ENDPOINTS for oversigt|
// ----------------------------
adminRouter.get('/Journeys', async (req, res) => {
    try{
    //finder alle journeys
    //const journeys = await controllerJourney.getJourneys();
        
    
    res.render('journeys', {journeys: journeys})
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

adminRouter.get('/api/oversigt/:month', async (req, res) => {
 
    try {
     
        let journeys = await controllerJourney.getJourneysByMonth(req.params.month);
      
        res.json(journeys);
       
    } catch (err) {
        console.log('Fejl ved hentning af journeys pr. måned')
        ;
        //res.status(500).send('Fejl ved hentning af journeys pr. måned');
    }
})

adminRouter.get('/oversigt/redigerRejse', async (req, res) => {
    try {
        res.render('adminOversigtRedigerRejse');
    } catch (error) {
        
    }
});

adminRouter.get('/Customers', async (req, res) => {
    try {
        // Finder alle customers
        const customers = await controllerCustomer.getCustomers();
       if (req.session.isAdminLoggedIn) {
        res.render('customers', { knownUser: isAdminLoggedIn, customers: customers });
    } else {
        res.redirect('/adminLogin')
    }
    } catch (error) {
        console.error('Fejl ved hentning af kunder:', error);
        res.status(500).send('Der opstod en fejl ved hentning af kunder.');
    }
});

adminRouter.get('/Drivers', async (req, res) => {
    try {
        // Finder alle Drivers
        const drivers = await controllerDriver.getDrivers();
        if (req.session.isAdminLoggedIn) {    
        res.render('drivers', { drivers });
    } else {
        res.redirect('/adminLogin')
    }
    } catch (error) {
        console.error('Fejl ved hentning af drivers:', error);
        res.status(500).send('Der opstod en fejl ved hentning af drivers.');
    }
});

adminRouter.get('/Admins', async (req, res) => {
    try {
        //Finder alle admins
        const admins = await controllerAdmin.getAdmins();
        if (req.session.isAdminLoggedIn) {    
            res.render('admins', {admins});
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

    res.redirect('/Drivers'); //redirecting to driver page
    } catch(error) {
        console.error('Fejl ved tilføjelse af Driver');
        res.status(500).send('Der opstod en fejl ved tilføjelse af Driver');
    }
});

adminRouter.get('/Driver/Edit/:id', async (req, res) => {
    try {
        const driverId = req.params.id;
        const driver = await controllerDriver.getDriver(driverId)
        if (req.session.isAdminLoggedIn) {    
            res.render('EditDriver', {driver});
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

        if (req.session.isAdminLoggedIn) {    
            res.render('CustomerDetails', { customer: customer });
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
        
        res.redirect('/Customers'); // Redirect til en oversigtsside eller anden relevant side
    } catch (error) {
        console.error('Fejl ved tilføjelse af kunde:', error);
        res.status(500).send('Der opstod en fejl ved tilføjelse af kunde.');
    }
});

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

adminRouter.get('/Customer/Edit/:id', async (req, res) => {
    try {
        const customerId = req.params.id;
        const customer = await controllerCustomer.getCustomer(customerId);
        
        if (req.session.isAdminLoggedIn) {    
            res.render('EditCustomer', { customer });
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
        
        res.redirect('/Journeys'); // Redirect til en oversigtsside eller anden relevant side
    } catch (error) {
        console.error('Fejl ved tilføjelse af Rejse:', error);
        res.status(500).send('Der opstod en fejl ved tilføjelse af rejse.');
    }
});

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

adminRouter.get('/Journey/Edit/:id', async (req, res) => {
    try {
        const journeyId = req.params.id;
        const journey = await controllerJourney.getJourney(journeyId);
        
        if (req.session.isAdminLoggedIn) {    
            res.render('EditJourney', { journey });
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

        if (req.session.isAdminLoggedIn) {    
            res.render('AdminDetails', { admin: admin });
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
        
        res.redirect('/Admins'); // Redirect til en oversigtsside eller anden relevant side
    } catch (error) {
        console.error('Fejl ved tilføjelse af Admin:', error);
        res.status(500).send('Der opstod en fejl ved tilføjelse af admin.');
    }
});

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

adminRouter.get('/Edit/:id', async (req, res) => {
    try {
        const adminId = req.params.id;
        const admin = await controllerAdmin.getAdmin(adminId);

        if (req.session.isAdminLoggedIn) {    
            res.render('EditAdmin', { admin });
        } else {
            res.redirect('/adminLogin')
        }
        
    } catch (error) {
        console.error('Fejl ved redigering af Admin:', error);
        res.status(500).send('Der opstod en fejl ved redigering af admin.');
    }
});

export default adminRouter;