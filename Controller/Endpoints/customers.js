const express = require('express');
const router = express.Router();
const controller = require('../Controller/Model/Customer');

router.get('/', (req, res) => {
    //find alle customers
    const customers = controller.getCustomer().then(data => {
        res.render('Customer', {customers: data})
    });
})

router.get('/')