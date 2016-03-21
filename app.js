'use strict';

var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var cookieParser  = require('cookie-parser');
var session = require('express-session');   //express sesssion used by passport to store user information
var nav = [{
        Link: '/vizualize',
        Text: 'Vizualize'
        },{
        Link: '/Auth/Profile',
        Text: 'Profile'
        }];

var authRouter = require('./src/routes/authRoutes')(nav);
var vizualizeRouter = require('./src/routes/vizualizeRoutes')(nav);

var port = process.env.PORT || 5000;


//used by express first
app.use(express.static('public'));
app.use(bodyparser.json());
app.use(cookieParser());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(session({
    secret: 'vizual',
    resave: false,
    saveUninitialized: true
}));

require('./src/config/passport')(app);

//for basic html
//app.use(express.static('src/views'));

//templating engine
app.set('views', './src/views');      
app.set('view engine', 'ejs');


//app.use('/Admin', adminRouter);
app.use('/Vizualize', vizualizeRouter);
app.use('/Auth', authRouter);

app.get('/', function (req, res) {
    res.render('index', {
        title: 'Hello from render',
        nav: nav
    });
});

app.listen(port, function () {
    console.log('running server on port ' + port);
});