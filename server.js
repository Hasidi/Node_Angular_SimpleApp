/**
 * Created by Hasidi on 28/05/2017.
 */
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var Connection = require('tedious').Connection;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var cors = require('cors');
app.use(cors());
var DButilsAzure = require('./DBUtils');
var DButilsPromise = require('./DButils');


var config = {
    userName: 'Hasidi',
    password: 'Has12345',
    server: 'labs2017.database.windows.net',
    requestTimeout: 15000,
    options: {encrypt: true, database: 'LabDB'}
};

//-------------------------------------------------------------------------------------------------------------------

app.use(express.static(__dirname + '/public'));
//-------------------------------------------------------------------------------------------------------------------
connection = new Connection(config);
var connected = false;
connection.on('connect', function(err) {
    if (err) {
        console.error('error connecting: ' + err.message);
    }
    else {
        console.log("Connected Azure");
        connected = true;
    }
});

//-------------------------------------------------------------------------------------------------------------------
//
// app.get('*', function(req, res) {
//     res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
// });
//-------------------------------------------------------------------------------------------------------------------
app.use(function(req, res, next){
    if (connected)
        next();
    else
        res.status(503).send('Server is down');
});

//-------------------------------------------------------------------------------------------------------------------


app.get('/select1', function (req,res) {
    DButilsAzure.Select(connection, 'Select * from Score'
        , function (result) {
            res.send(result);
        });
});
//-------------------------------------------------------------------------------------------------------------------

app.get('/select2', function (req, res) {
    DButilsPromise.Select(connection, 'Select * from Scoree')
        .then(function (ans) {
            // do foo1()
            res.send(ans);
        })
        .catch(function (err) {
            //handling error
            res.send(err);
        })
});
//-------------------------------------------------------------------------------------------------------------------
app.get('/insert', function (req, res) {
    connectToDB();
    DButilsAzure.Insert(function(result){
        res.send(result);
    });
});

//-------------------------------------------------------------------------------------------------------------------
var port = 4000;
app.listen(port, function () {
    console.log('Example app listening on port ' + port);
});
//-------------------------------------------------------------------------------------------------------------------
app.get('/select2', function (req, res) {
    DButilsPromise.Select(connection, 'Select * from Scoree')
        .then(foo1)
        .then(foo2)
        .then(function (ans) {
            res.send(ans);
        })
        .catch(function (err) {
            //handling error
            res.send(err);
        })
});

