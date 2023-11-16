import DBFunctions from '../../Storage/DBFunctions.js';
const express = require('express')
const app = express()
app.set('view engine', 'pug')


// Middleware
app.use(express.urlencoded({extended: true}))
app.use(express.static('GUI'))


// Endpoints (routes)
const customerRouter = require('./Controller/Endpoints/customers')
app.use('/customers', customerRouter)
const adminRouter = require('./Controller/Endpoints/admins')
app.use('/admins', adminRouter)
const driverRouter = require('./Controller/Endpoints/drivers')
app.use('/drivers', driverRouter)




app.listen(8000, () => {
    console.log('Så kører lortet')
})

DBFunctions.addCustomer("Mikkel", "Lindhøj", "xxxxxx", "Aarhus C");