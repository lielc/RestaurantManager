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
                var temp = items[0].RestaurantManagerDB;
                var ans = "";
                for (var i = 0; i < temp.length; i++) {
                    ans += "Name: " + temp[i].Name + "\n";
                    ans += "Description: " + temp[i].Description + "\n";
                    ans += "Price: " + temp[i].Price + "\n";
                    ans += "Type: " + temp[i].Type + "\n";
                    ans += "\n"
                    ans += "\n"
                }
                console.log(ans);
                ans = ans.replace(/(?:\r\n|\r|\n)/g, " <br/> ");

                res.render('tableMenuView', { items: ans });

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
app.get('/tableScreen/:tableId', function (req, res) {
    var tableId = req.params.tableId;

    // waiting for gilad
    //getData(res);
    res.render('tableMenuView', {tableId: tableId});
});

app.get('/kitchen', function (req, res) {
    /*var ordersArr = kitchen.getActiveOrders();
    var ordersHtml = "";

    for (var currOrder in ordersArr) {
        // curr order = orderNum: 1,tableNum: 1, DishArr: [{name:"Test1",quantity:2},{name:"Test2",quantity:1}]
        var numOfDishes = ordersArr[currOrder].

        ordersHtml +=
            "<tr> <td rowspan='"+ numOfDishes +"'> " + curOrder.orderNum + " </td> " +
            "<td rowspan='"+ numOfDishes +"> " + curOrder.tableNum+ " </td>" +
            "<td> "+ curOrder.DishArr.name + " </td>";
            "<td> "+ curOrder.DishArr.quantity + " </td> </tr>";
        for (var j=1; j<numOfDishes; j++) {
            "<tr><td> " +  + " </td></tr>"
        }
    }
    */
    //res.render('kitchenView',{orders: ordersHtml});
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

    socket.on('sendOrder', function(cart){
        console.log("order sent. details (first item only): " + cart[0].name);
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

exports = module.exports = app;