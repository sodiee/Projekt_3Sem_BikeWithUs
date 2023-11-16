const express = require('express');
const router = express.Router();
const controller = require('../Controller/Model/Customer');


router.get('/customers', async (req, res) => {
    try {
        // Finder alle customers
        const customers = await controller.getCustomers();
        res.render('customers', { customers });
    } catch (error) {
        console.error('Fejl ved hentning af kunder:', error);
        res.status(500).send('Der opstod en fejl ved hentning af kunder.');
    }
});

router.post('/Customer/Add', async (req, res) => {
    try {
        const { firstName, lastName, birthday, city } = req.body;
        await controller.addCustomer({ firstName, lastName, birthday, city });
        
        res.redirect('/customers'); // Redirect til en oversigtsside eller anden relevant side
    } catch (error) {
        console.error('Fejl ved tilføjelse af kunde:', error);
        res.status(500).send('Der opstod en fejl ved tilføjelse af kunde.');
    }
});

router.get('/Customer/Edit/:id', async (req, res) => {
    try {
        const customerId = req.params.id;
        const customer = await controller.getCustomer(customerId);
        
        res.render('EditCustomer', { customer });
    } catch (error) {
        console.error('Fejl ved redigering af kunde:', error);
        res.status(500).send('Der opstod en fejl ved redigering af kunde.');
    }
});

router.post('/Customer/Delete/:id', async (req, res) => {
    try {
        const customerId = req.params.id;
        await controller.deleteCustomer(customerId);
        
        res.redirect('/customers'); // Redirect til en oversigtsside eller anden relevant side
    } catch (error) {
        console.error('Fejl ved sletning af kunde: ', error);
        res.status(500).send('Der opstod en fejl ved sletning af kunde.');
    }
});

router.get('/Customer/Get/:id', async (req, res) => {
    try {
        const customerId = req.params.id;
        const customer = await controller.getCustomer(customerId);

        res.render('CustomerDetails', { customer });
    } catch (error) {
        console.error('Fejl ved hentning af kunde:', error);
        res.status(500).send('Der opstod en fejl ved hentning af kunde.');
    }
});

module.exports = router;