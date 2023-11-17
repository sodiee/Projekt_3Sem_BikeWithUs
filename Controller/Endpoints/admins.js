import express from 'express';
const adminRouter = express.Router();
import controller from '../Model/Admin.js';

adminRouter.get('/Kundeinformation', async (req, res) => {
       

}) 

adminRouter.get('/rejse/rediger', (req, res) => {

})

adminRouter.post('/rejse/oversigt', (req, res) => {

})


export default adminRouter;