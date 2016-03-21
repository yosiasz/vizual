var express = require('express');
var passport = require('passport');
var authRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var users = [
    {   username: 'yosiasz',
        password: 'Semrina77'

    },
    {   username: 'semharw',
        password: 'Semrina77'

    },
    {   username: 'elijah',
        password: 'Semrina77'

    },
    {   username: 'jadonp',
        password: 'preppie'

    },    
]; 

var url = 'mongodb://vizual:vizual@ds015899.mlab.com:15899/vizual';
//var url = 'mongodb://localhost:27017/vizual';

var router = function (nav) {

    authRouter.route('/')
        .get(function (req, res) {
        mongodb.connect(url, function (err, db) {
                var collection = db.collection('users');
                collection.find({}).toArray(function (err, results) {
                    res.send(results);
                    db.close();
                });
                
            });
    });
        
authRouter.route('/signUp')
        .post(function (req, res) {
            console.log(req.body);
            mongodb.connect(url, function (err, db) {
                var collection = db.collection('users');
                var user = {
                    username: req.body.userName,
                    password: req.body.password
                };

                collection.insert(user,
                    function (err, results) {
                        console.log(results.ops[0]);
                        req.login(results.ops[0], function () {
                            res.redirect('/auth/profile');
                        });
                    });
            });

        });

    authRouter.route('/profile')
        .all(function (req, res, next) {
               if (!req.user) {
                    res.redirect('/')
               } else {
                   next();
               }
        })
        .get(function (req, res) {
            //res.send(req.user);
            res.render('profile',
                        {
            title: 'Profile',
            nav: nav,
            user: req.user
            });                    
            
    });    
    
authRouter.route('/signIn')
        .post(passport.authenticate('local', {
            failureRedirect: '/'
        }), function (req, res) {
            res.redirect('/auth/profile');
        });
        
    authRouter.route('/addUsers')
        .get(function (req, res) {
        mongodb.connect(url, function (err, db) {
                var collection = db.collection('users');
                collection.insertMany(users, function (err, results) {
                    res.send(results);
                    db.close();
                });
                
            });
    });

        authRouter.route('/deleteUsers')
        .get(function (req, res) {
            mongodb.connect(url, function (err, db) {
                var collection = db.collection('users');
                collection.remove({}, function (err, results) {
                    res.send(results);
                    db.close();
                });
                
            });
    });   
    
    
    return authRouter;
};

module.exports = router;