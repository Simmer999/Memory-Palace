const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const db = mongoose.connection;

const users = db.collection('users')

// console.log(users)





router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const Book = require('../models/books');





// 20=================== Standard GET and POST.
router.get('/books', (req, res) => {
    res.render('new_book')
})

//====================================================================== GET method
router.get('/retrieved_books', (req, res) => {
    db.collection('Books')// See const users = db.collection('users')
    .find()
    .toArray()
    .then(results => {
        //In order to print the contents of the database to the console:
        // console.log(results)
        res.render('retrieved_books', { Books: results })// Books vs entries
    })
    .catch(error => console.error(error))
})
//====================================================================== GET method


//====================================================================== POST method
router.post('/books', (req, res ) => {
    const title = req.body.title;
    const author = req.body.author;
    const body = req.body.body;
  
    const data = {
        "title": title,
        "author": author,
        "body": body
    }
    db.collection('Books').insertOne(data,function(err, collection){
        if (err) throw err;
        console.log("Record inserted Successfully");
        return res.redirect('memberPage');     
    });
})
//====================================================================== POST method

module.exports = router