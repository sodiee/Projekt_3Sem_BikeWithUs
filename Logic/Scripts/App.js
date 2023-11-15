import DBFunctions from "./Storage/DBFunctions";
import express, {response} from 'express'
import pug from 'pug'

const app = express();
app.set('view engine', 'pug')


// Middleware
app.use(express.urlencoded({extended: true}))
app.use(express.static('GUI'))


// Endpoints (routes)



app.listen(8000, () => {
    console.log('Så kører lortet')
})

DBFunctions.addCustomer("Mikkel", "Lindhøj", "xxxxxx", "Aarhus C");