import express from 'express';
const driverRouter = express.Router();
import controller from '../Model/Driver.js';

driverRouter.get('/Drivers', async (req, res) => {
    try {
        // Finder alle Drivers
        const drivers = await controller.getDrivers();
        res.render('../GUI/views/drivers', { drivers });
    } catch (error) {
        console.error('Fejl ved hentning af drivers:', error);
        res.status(500).send('Der opstod en fejl ved hentning af drivers.');
    }
});

driverRouter.post('/Driver/Add', async (req, res) => {
    try{
    const {firstName, lastName} = req.body;
    await controller.addDriver({firstName, lastName});

    res.redirect('/drivers'); //redirecting to driver page
    } catch(error) {
        console.error('Fejl ved tilføjelse af Driver');
        res.status(500).send('Der opstod en fejl ved tilføjelse af Driver');
    }
});

driverRouter.get('/Driver/Edit/:id', async (req, res) => {
    try {
        const driverId = req.params.id;
        const driver = await controller.getDriver(driverId)

        res.render('../GUI/views/EditDriver', {driver});
    } catch (error) {
        console.error('Fejl ved redigering af Driver', error);
        res.status(500).send('Der opstod en fejl ved redigering af Driver')
        
    }
});

driverRouter.post('/Driver/Delete/:id', async (req, res) => {
    try {
        const driverId = req.params.id;
        await controller.deleteDriver(driverId);

        res.redirect('/drivers'); //redirect til en oversigt over drivers
    } catch (error) {
        console.error('fejl ved sletning af driver: ', error);
        res.status(500).send('Der opstod en fejl ved sletning af driver')
    }
});

driverRouter.get('/Driver/Get/:id', async (req, res) => {
    try {
        const driverId = req.params.id;
        const driver = await controller.getDriver(driverId)

        res.render('../GUI/views/DriverDetails', { driver });
    } catch (error) {
        console.error('Fejl ved hentning af Driver: ', error);
        res.status(500).send('Der opstod en fejl ved hentning af driver')
    }
});

export default driverRouter;