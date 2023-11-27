import express from 'express';
const driverRouter = express.Router();
import controller from '../Model/Driver.js';

// Arbejdsopgaver til chaufføren
driverRouter.get('/Tasks/Assign', async (req, res) => {
    try {
        const tasks = await controller.assignTasks();

        res.json({ tasks });
    } catch (error) {
        console.error('Fejl ved tildeling af opgaver:', error);
        res.status(500).send('Der opstod en fejl ved tildeling af opgaver.');
    }
});

// Tilvalg for hver gæst
driverRouter.get('/Guests/Options', async (req, res) => {
    try {
        const guestOptions = await controller.getGuestOptions();

        res.json({ guestOptions });
    } catch (error) {
        console.error('Fejl ved hentning af tilvalg for gæster:', error);
        res.status(500).send('Der opstod en fejl ved hentning af tilvalg for gæster.');
    }
});

//hent driver tasks
driverRouter.get('/driverTasks', async (req, res) => {
    const driverTasks = await getDriverTasks();
    res.render('driverTasks', {tasks: driverTasks});
});








export default driverRouter;