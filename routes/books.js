const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const db = mongoose.connection;









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

module.exports = router;



// router.get('/:titleName', (req, res) => {
//     res.render('new_entry')
// })

// router.patch('/:titleName', (req, res) => {
//     res.status(201).json({
//         message: 'Updated products.'
//     });
//     return res.redirect('memberPage');
// });

// mongoose.connect('mongodb+srv://simmmer:snoops22@cluster0.34ahm.mongodb.net/memoryPalace?retryWrites=true&w=majority', {
//     useUnifiedTopology: true,
//     useNewUrlParser: true
// });
// mongoose.connect('mongodb+srv://simmmer:snoops22@cluster0.34ahm.mongodb.net/memoryPalace?retryWrites=true&w=majority', {
//     useUnifiedTopology: true,
//     useNewUrlParser: true
// });
