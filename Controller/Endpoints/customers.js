import express from 'express';
const customerRouter = express.Router();
import controller from '../Model/Customer.js';





customerRouter.get('/Customer/Edit/:id', async (req, res) => {
    try {
        const customerId = req.params.id;
        const customer = await controller.getCustomer(customerId);
        
        res.render('../GUI/views/EditCustomer', { customer });
    } catch (error) {
        console.error('Fejl ved redigering af kunde:', error);
        res.status(500).send('Der opstod en fejl ved redigering af kunde.');
    }
});

customerRouter.post('/Customer/Delete/:id', async (req, res) => {
    try {
        const customerId = req.params.id;
        await controller.deleteCustomer(customerId);
        
        res.redirect('/customers'); // Redirect til en oversigtsside eller anden relevant side
    } catch (error) {
        console.error('Fejl ved sletning af kunde: ', error);
        res.status(500).send('Der opstod en fejl ved sletning af kunde.');
    }
});

customerRouter.get('/Customer/Get/:id', async (req, res) => {
   try {
        //const customerId = req.params.id;
        const customer1 = req.params.id
        const customer = await controller.getCustomer(req.params.id);

            console.log(customer)
        res.render('../GUI/views/CustomerDetails', { customer: customer });

        
    } catch (error) {
        console.error('Fejl ved hentning af kunde:', error);
        res.status(500).send('Der opstod en fejl ved hentning af kunde.');
    }
    
});

export default customerRouter;