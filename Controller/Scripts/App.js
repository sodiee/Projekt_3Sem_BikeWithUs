import express from 'express'
import session  from 'express-session';


const app = express();
app.set('view engine', 'pug');

// Middleware
//app.use(express.json);
app.use(express.urlencoded({extended: true}))
app.use(express.static('/views'))
app.use(express.static('./GUI/assets'))

app.use(session({
    secret: 'Test-Secret',
    saveUninitialized: true,
    resave: false
}))


// Endpoints (routes)
import customerRouter from '../Endpoints/customers.js'
app.use('/', customerRouter)
import adminRouter from'../Endpoints/admins.js'
app.use('/admins', adminRouter)
import driverRouter from '../Endpoints/drivers.js'
app.use('/drivers', driverRouter)


// Kør serveren
app.listen(8801, () => {
    console.log('Kører på port 8801')
})
