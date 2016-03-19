'use strict';

var express = require('express');
var sql = require('mssql');
var app = express();
var nav = [{
        Link: '/Books',
        Text: 'Books'
        },{
        Link: '/Authors',
        Text: 'Authors'
        }];
var bookRouter = require('./src/routes/bookRoutes')(nav);
var adminRouter = require('./src/routes/adminRoutes')(nav);

var port = process.env.PORT || 5000;


//used by express first
app.use(express.static('public'));
//for basic html
//app.use(express.static('src/views'));

//templating engine
app.set('views', 'src/views');      
app.set('view engine', 'ejs');


app.use('/Books', bookRouter);
app.use('/Admin', adminRouter);

app.get('/', bookRouter, function (req, res) {
    res.render('index', {
        title: 'Hello from render',
        nav: nav
    });
    
});

app.listen(port, function () {
    console.log('running server on port ' + port);
});