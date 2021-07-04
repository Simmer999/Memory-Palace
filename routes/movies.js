const express = require('express');
const router = express.Router()
const MongoClient = require('mongodb').MongoClient;

//============================================

MongoClient.connect(process.env.DB, {
    useUnifiedTopology: true })
        .then(client => {
            const db = client.db('sample_mflix');
            console.log('Connected to movies database.') 
            const mflix = db.collection('movies');
            const users = db.collection('users')

//===========================================
                    
    router.get('/movies', (req, res) => {
        mflix.find().limit(15).skip(22000).toArray()
            .then(results => {
                res.render('movies', { entries: results })
            })
        .catch(error => console.error(error))
    });  
    
    




    




    
});

module.exports = router