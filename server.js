// server.js

// modules
var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    hbs = require('hbs') ,
    bodyParser = require('body-Parser'),
    io = require('socket.io').listen(server),
    mongodb = require('mongodb'),
    path = require('path'),
    mongoose = require('mongoose');

// Config
var dbUrl = 'mongodb://localhost:27017/RestaurantManagerDB';
var menuItemsCol;
var OrdersCol;
var port = 8080;

app.set('views', __dirname + '/frontend/views');
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);

app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));

var MongoClient = mongodb.MongoClient;

mongoose.connect(dbUrl, function(err, db) {
    if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
    }

    menuItemsCol = db.collection('MenuItems');
    OrdersCol = db.collection('Orders');
    console.log("Connected to database!");


    // start app at http://localhost:8080
    app.listen(port);
    console.log('Server listening on port ' + port);
});

// expose app
exports = module.exports = app;

app.get('/tableScreen/:tableId', function(req, res) {
        var tableId = req.params.tableId;
        res.render('tableMenuView', {tableId: tableId });
    })

/*
app.get('/api/getMenuItems', function(req, res) {
    console.log('getMenuItems was called');
    db.getMenuItems(menuItemsCol, function (result){
        console.log('json result : ' + result);
        res.json({ status:"Success", messages: result });
    })
});*/
