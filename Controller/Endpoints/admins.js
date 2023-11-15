const express = require('express')
const router = express.Router()
const controller = require('../Storage/DBFunctions')

router.get('/admins', (req, res) => {
    const admins = controller.getAdmins().then(data => {
        res.render('admins', {admins: data})
    })
})

//TODO
router.get('/createadmin', (req, res)=>{
    controller.createAdmin().then(data=>{
      console.log(data)
      res.render('createadmin')
    })
  })