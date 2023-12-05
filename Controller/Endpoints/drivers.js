import express from 'express';
const driverRouter = express.Router();
import controller from '../Model/Driver.js';
import DBFunctions from '../../Storage/DBFunctions.js';

//-------------------------------
// driver-ENDPOINTS for LOGIN |
//-------------------------------

// Middleware to require login for protected routes
driverRouter.use((req, res, next) => {
    res.locals.isDriverLoggedIn = req.session.isDriverLoggedIn || false;
    res.locals.driverUser = req.session.driverUser || null;
    next();
})

// Middleware to require login for protected routes
function requireDriverLogin(req, res, next) {
    if (!req.session.isDriverLoggedIn) {
        // Redirect only if the user is not logged in
        res.redirect('/')
    } else {
        next();
    }
}

// Apply middleware to all supported routes except the login route
driverRouter.use((req, res, next) => {
    if (req.path !== '/driverLogin') {
        requireDriverLogin(req, res, next);
    } else {
        next();
    }
})

driverRouter.get('/', (req, res) => {
    let isDriverLoggedIn = res.locals.isDriverLoggedIn;
    let driverUser = res.locals.driverUser

    if (isDriverLoggedIn && driverUser) {
        res.render('driverMain', {knownUser: isDriverLoggedIn, driver: driverUser})
    } else {
        res.redirect('/')
    }
    
})

driverRouter.post('/driverLogin', async (req, res) => {
    try {
        const { username, password } = req.body;
        const driverData = await controller.checkDriver(username, password);
    
        if (driverData) {
          req.session.isDriverLoggedIn = true;
          req.session.driverUser = driverData;
          res.redirect('/drivers/');
        } else {
          res.status(401).send('Wrong username or password');
        }
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
});

driverRouter.get('/driverLogout', (req, res) => {
    req.session.destroy()
    res.redirect('/')
})

driverRouter.get('/driverLogin', (req, res) => {
    res.render('driverLogin')
})


// Arbejdsopgaver til chaufføren
driverRouter.get('/Tasks/Assign', async (req, res) => {
    try {
        const tasks = await controller.assignTasks();

        res.json({ tasks });
    } catch (error) {
        console.error('Errors when assigning tasks:', error);
        res.status(500).send('An error occurred while assigning tasks.');
    }
});

// Tilvalg for hver gæst
driverRouter.get('/Guests/Options', async (req, res) => {
    try {
        const guestOptions = await controller.getGuestOptions();

        res.json({ guestOptions });
    } catch (error) {
        console.error('Error retrieving options for guests:', error);
        res.status(500).send('An error occurred while retrieving options for guests.');
    }
});

// Get driver tasks
driverRouter.get('/driverTasks', async (req, res) => {
    const driverTasks = await getDriverTasks();
    res.render('driverTasks', {tasks: driverTasks});
});

// Get driver tasks
driverRouter.get('/driverTasks', async (req, res) => {
    const driverTasks = await getDriverTasks();
    res.render('driverTasks', {tasks: driverTasks});
});

driverRouter.delete('/:driverID', async (req, res) => {
    try {
        const driver = await DBFunctions.deleteDriverDB(req.params.driverID);
        res.status(200).json({ driver });
    } catch (error) {
        console.error('Error deleting driver:', error);
        res.status(500).send('An error occurred while deleting the driver.');
    }
});

driverRouter.put('/:driverID', async (req, res) => {
    try {
        const driver = await DBFunctions.editDriverDB(req.params.driverID, req.body);
        res.json({ driver });
    } catch (error) {
        console.error('Error editing driver:', error);
        res.status(500).send('An error occurred while editing the driver.');
    }
});

driverRouter.post('/', async (req, res) => {
    try {
        const driver = await DBFunctions.addDriverDB(req.body);
        res.status(201).json({ driver });
    } catch (error) {
        console.error('Error adding driver:', error);
        res.status(500).send('An error occurred while adding driver.');
    }
});


export default driverRouter;