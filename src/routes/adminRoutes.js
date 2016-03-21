var express = require('express');
var adminRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var books = [
    {   title: 'Desert Fox',
        genre: 'Fiction',
        author: 'Hamdeen Sharaaz',
        read: true

    },
    {   title: 'War and Peace',
        genre: 'Historial Fiction',
        author: 'Lev Lenin',
        read: false

    },
    {   title: 'ፍቅር እስከ መቃብር',
        genre: 'ልብ ወለድ',
        author: 'ማንጉሾ ማንዲንጎ',
        read: false

    },
    {   title: 'የኛ ሰው በደማስቆ',
        genre: 'ልብ ወለድ',
        author: 'ኩርፎ ማታሙታ',
        read: false

    }
    
]; 

var url = 'mongodb://vizual:vizual@ds015899.mlab.com:15899/vizual';

var router = function (nav) {
    
    adminRouter.route('/')
        .get(function (req, res) {
                res.render('index',
                            {
                title: 'Books',
                nav: nav
                });                    
    });
    
    adminRouter.route('/addBooks')
        .get(function (req, res) {
        mongodb.connect(url, function (err, db) {
                var collection = db.collection('books');
                collection.insertMany(books, function (err, results) {
                    res.send(results);
                    db.close();
                });
                
            });
    });

        adminRouter.route('/deleteBooks')
        .get(function (req, res) {
            mongodb.connect(url, function (err, db) {
                var collection = db.collection('books');
                collection.remove({}, function (err, results) {
                    res.send(results);
                    db.close();
                });
                
            });
    });   
    
    
    return adminRouter;
};

module.exports = router;