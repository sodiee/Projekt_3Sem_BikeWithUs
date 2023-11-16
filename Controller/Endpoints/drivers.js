const express = require('express');
const router = express.Router();
const controller = require('../Controller/Model/Driver');

router.get('/Drivers', async (req, res) => {
    try {
        // Finder alle Drivers
        const drivers = await controller.getDrivers();
        res.render('drivers', { drivers });
    } catch (error) {
        console.error('Fejl ved hentning af drivers:', error);
        res.status(500).send('Der opstod en fejl ved hentning af drivers.');
    }
});

router.post('/Driver/Add', async (req, res) => {
    try{
    const {firstName, lastName} = req.body;
    await controller.addDriver({firstName, lastName});

    res.redirect('/Drivers'); //redirecting to driver page
    } catch(error) {
        console.error('Fejl ved tilføjelse af Driver');
        res.status(500).send('Der opstod en fejl ved tilføjelse af Driver');
    }
});

router.get('/Driver/Edit/:id', async (req, res) => {
    try {
        const driverId = req.params.id;
        const driver = await controller.getDriver(driverId)

        res.render('EditDriver', {driver});
    } catch (error) {
        console.error('Fejl ved redigering af Driver', error);
        res.status(500).send('Der opstod en fejl ved redigering af Driver')
        
    }
});

router.post('/Driver/Delete/:id', async (req, res) => {
    try {
        const driverId = req.params.id;
        await controller.deleteDriver(driverId);

        res.redirect('/Drivers'); //redirect til en oversigt over drivers
    } catch (error) {
        console.error('fejl ved sletning af driver: ', error);
        res.status(500).send('Der opstod en fejl ved sletning af driver')
    }
});

router.get('/Driver/Get/:id', async (req, res) => {
    try {
        const driverId = req.params.id;
        const driver = await controller.getDriver(driverId)

        res.render('DriverDetails', { driver });
    } catch (error) {
        console.error('Fejl ved hentning af Driver: ', error);
        res.status(500).send('Der opstod en fejl ved hentning af driver')
    }
});

module.exports = router;