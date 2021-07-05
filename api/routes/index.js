const express = require('express')
const router  = express.Router()
const {ensureAuthenticated} = require('../../config/auth') 

//======================================================= app.get
//login page
router.get('/', (req, res)=>{
    res.render('welcome')
})
//register page
router.get('/register', (req, res)=>{
    res.render('register')
})
router.get('/dashboard',ensureAuthenticated,(req, res)=>{
    res.render('dashboard',{
        user: req.user
    });
})
router.get('/memberPage', (req, res)=>{
    res.render('memberPage',{
        user: req.user
    })

})

module.exports = router