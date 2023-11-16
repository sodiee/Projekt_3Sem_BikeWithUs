import DBFunctions from '../../Storage/DBFunctions.js';
import express from 'express'
const app = express()
app.set('view engine', 'pug')


// Middleware
app.use(express.urlencoded({extended: true}))
app.use(express.static('GUI'))


// Endpoints (routes)
const customerRouter = require('./Controller/Endpoints/customers')
app.use('/customers', customerRouter)
//import adminRouter from'Controller/Endpoints/admins.js'
//app.use('/admins', adminRouter)
import driverRouter from '../Endpoints/drivers.js'
app.use('/drivers', driverRouter)




app.listen(8000, () => {
    console.log('Så kører lortet')
})

