import DBFunctions from '../../Storage/DBFunctions.js';
import express from 'express'
const app = express()
app.set('view engine', 'pug')


// Middleware
app.use(express.urlencoded({extended: true}))
app.use(express.static('./GUI/views'))
app.use(express.static('./GUI/assets'))
app.use(session({
    secret: 'Maksym',
    saveUninitialized: true,
    resave: true
}))


// Endpoints (routes)
import customerRouter from '../Endpoints/customers.js'
app.use('/', customerRouter)
import adminRouter from'../Endpoints/admins.js'
app.use('/admin', adminRouter)
import driverRouter from '../Endpoints/drivers.js'
app.use('/', driverRouter)




app.listen(8801, () => {
    console.log('Så kører lortet')
})

