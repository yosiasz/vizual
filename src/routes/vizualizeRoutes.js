var express = require('express');
var vizualizeRouter = express.Router();
var mysql = require('mysql')

var connection = mysql.createConnection({
'host' : 'localhost',
'port' : '3306',
'user' : 'scheduler',
'password' : 'password1234',
'database' : 'adventureworks'
});

var domain = [
    //", "dolor sit", "amet", "consectetur", "adipisicing", "elit", "sed", "do", "eiusmod", "tempor", "incididunt"
    {   title: 'Lorem ipsum'
    },
    {   title: 'dolor sit'
    },
    {   title: 'amet'
    },
    {   title: 'consectetur'
    }
]; 

var sql = 'SELECT soh.OrderDate, soh.SubTotal  FROM adventureworks.salesorderheader soh join adventureworks.address a on soh.billtoaddressid = a.addressid where CustomerID = 676'

var router = function (nav) {
    vizualizeRouter.route('/')    
    .get(function(req,res){
        connection.query(sql, req.params.id, function(err, rows, fields) {
            if (err) {
                console.error(err);
                res.statusCode = 500;
                res.send(err);
            }
            console.log(domain);
            res.render('vizualize',
                        {
                            title: 'Charts',
                            nav: nav,
                            domain: domain
            });                
        });
    });        

    return vizualizeRouter;
};

module.exports = router;