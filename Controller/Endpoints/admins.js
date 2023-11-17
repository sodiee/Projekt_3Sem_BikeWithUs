import express from 'express';
const adminRouter = express.Router();
import controller from '../Model/Admin.js';

adminRouter.get('/Kundeinformation', async (req, res) => {
       

}) 

adminRouter.get('/Journey/Edit/:id', async (req, res) => {
    try {
        const journeyId = req.params.id;
        const journey = await controller.getJourney(journeyId);
        
        res.render('../GUI/views/EditJourney', { journey });
    } catch (error) {
        console.error('Fejl ved redigering af rejse:', error);
        res.status(500).send('Der opstod en fejl ved redigering af rejse.');
    }
})

adminRouter.get('/Journey/Overview', async (req, res) => {
    try{
    //finder alle oversigter over journeys
    const journeys = await controller.getJourneys();

    
    res.render('../GUI/views/journeys', {journeys: journeys})
    } catch (error) {
        console.error('Fejl ved hentning af rejser', error);
        res.status(500).send('Der opstod en fejl ved hentning af rejser');
    }
})


export default adminRouter;