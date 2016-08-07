var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    hbs = require('hbs'),
    bodyParser = require('body-Parser'),
    io = require('socket.io').listen(server),
    mongodb = require('mongodb'),
    path = require('path'),
    kitchen = require('./scripts/kitchenManager');

function getData(res) {
    var db = require('mongodb').Db,
        Server = require('mongodb').Server,
        MongoClient = require('mongodb').MongoClient;

    var dbUrl = 'mongodb://localhost:27017/RestaurantManagerDB';
    MongoClient.connect(dbUrl, function (err, db) {
        if (err) { console.log(err) }
        else {
            console.log("Connected correctly to server");
            var collection = db.collection("MenuItems");
            collection.find().toArray(function (err, items) {

                var ans_main = "";
                var ans_starter = "";
                var ans_drink = "";
                var ans_salad = "";

                for (var i = 0; i < items.length; i++) {
                    temp = "";
                    itemType = items[i].Type;

                    temp = "<tr> <td> " + items[i].Name
                        + " </td> <td> " + items[i].Description
                        + " </td> <td> " + items[i].Price
                        + " </td> <td> " + "Liel" + items[i].Name + "Cohen" + items[i].Price + "Dor"
                        + " </td></tr>";

                    if (itemType == "main") {ans_main += temp;}
                    if (itemType == "starter") {ans_starter += temp;}
                    if (itemType == "drink") {ans_drink += temp;}
                    if (itemType == "salad") {ans_salad += temp;}
                }
                res.render('tableMenuView', { ans_main: ans_main, starter: ans_starter, drink: ans_drink, salad: ans_salad });
            });
        }
    });
};

// Config
var menuItemsCol;
var OrdersCol;
var port = 8080;

app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/'));

//Routing
app.get('/', function (req, res) {
    res.render('index');
});

app.get('/tableScreen/:tableId', function (req, res) {
    var tableId = req.params.tableId;
    getData(res);
});

app.get('/kitchen', function (req, res) {
    /*if (!(kitchen.isOpen)){
        kitchen.init(collection)
    }*/

    var orders = kitchen.getActiveOrders();

    //res.render('kitchenView',{ordersArr: orders});
    res.render('kitchenView');
});

// Socket IO
io.sockets.on('connection',function (socket)
{
    /*sessions.push(socket);
    console.log("Client connected");
    io.sockets.emit('updateScreen', socket.handshake.query.screenId);

    socket.on('disconnect', function() {
        //sessions.delete(socket);
        for(var i = sessions.length - 1; i >= 0;  i--) {
            if(sessions[i].id == socket.id) {
                sessions.splice(i, 1);
                break;
            }
        }
        console.log("Client disconnected");
    });*/
    console.log("Client connected");

    socket.on('sendOrder', function(menuItems,tableId){
        console.log("order sent. details (first item only): " + menuItems[0].name);
        kitchen.addOrder(menuItems,tableId, new Date().toLocaleString());
        io.emit('displayOrders', kitchen.getActiveOrders());
    })
    socket.on('requestCheck', function(){
        console.log("request check");
    })
    socket.on('requestService', function(){
        console.log("request service");
    })

    socket.on('disconnect', function() {
        console.log("Client disconnected");
    });

    socket.on('', function(){

    });
});

server.listen(port);
console.log('Server listening on port ' + port);

//exports = module.exports = app;