const express = require('express')
const router = express.Router()

const bodyParser = require('body-parser')
const mongoose = require('mongoose')

var db=mongoose.connection









router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const essayCols = require('../models/essayCols');





// 20=================== Standard GET and POST.
router.get('/essayCols', (req, res) => {
    res.render('new_essayCol')
})

//====================================================================== GET method
router.get('/retrieved_essayCols', (req, res) => {
    db.collection('essayCollections')
    .find()
    .toArray()
    .then(results => {
        //In order to print the contents of the database to the console:
        // console.log(results)
        res.render('retrieved_essayCols', { essayCollections: results })  
    })
    .catch(error => console.error(error))
})
//====================================================================== GET method


router.post('/essayCols', function(req,res){
    const title = req.body.title;
    const author = req.body.author;
    const body = req.body.body;
  
    const data = {
        "title": title,
        "author":author,
        "body": body
    }
db.collection('essayCollections').insertOne(data,function(err, collection){
        if (err) throw err;
        console.log("Record inserted Successfully");
        return res.redirect('memberPage');     
    });
})

module.exports = router;


// 45=================== Modifying entries
// router.get('/:titleName', (req, res) => {
//     res.render('new_entry')
// })

// router.patch('/:titleName', (req, res) => {
//     res.status(201).json({
//         message: 'Updated products.'
//     });
//     return res.redirect('memberPage');
// });


