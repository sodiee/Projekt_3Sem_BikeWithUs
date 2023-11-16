import DBFunctions from '../../Storage/DBFunctions.js';
import express from 'express'
const app = express()
app.set('view engine', 'pug')


// Middleware
app.use(express.urlencoded({extended: true}))
app.use(express.static('GUI'))


// Endpoints (routes)
import customerRouter from '../../Endpoints/customers.js'
app.use('/customers', customerRouter)
const adminRouter = require('./Controller/Endpoints/admins')
app.use('/admins', adminRouter)
const driverRouter = require('./Controller/Endpoints/drivers')
app.use('/drivers', driverRouter)




app.listen(8000, () => {
    console.log('Så kører lortet')
})

DBFunctions.addCustomer("Mikkel", "Lindhøj", "xxxxxx", "Aarhus C");