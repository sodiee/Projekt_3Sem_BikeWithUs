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

//hent driver tasks
driverRouter.get('/driverTasks', async (req, res) => {
    const driverTasks = await getDriverTasks();
    res.render('driverTasks', {tasks: driverTasks});
});

driverRouter.delete('/:driverID', async (req, res) => {
    try {
        const driver = await controller.deleteDriver(req.params.driverID);
        res.json({ driver });
    } catch (error) {
        console.error('Fejl ved sletning af chauffør:', error);
        res.status(500).send('Der opstod en fejl ved sletning af chauffør.');
    }
});


driverRouter.put('/:driverID', async (req, res) => {
    try {
        const driver = await controller.editDriver(req.params.driverID);
        res.json({ driver });
    } catch (error) {
        console.error('Fejl ved redigering af chauffør:', error);
        res.status(500).send('Der opstod en fejl ved redigering af chauffør.');
    }
});
*/


export default driverRouter;