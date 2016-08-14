var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    hbs = require('hbs'),
    bodyParser = require('body-Parser'),
    io = require('socket.io').listen(server),
    mongodb = require('mongodb'),
    path = require('path'),
    ObjectID = require('mongodb').ObjectID,
    kitchen = require('./scripts/kitchenManager'),
    tablesService = require('./scripts/tablesService'),
    menuService = require('./scripts/menuService');

var collection;
function getData(res) {
    var db = require('mongodb').Db,
        Server = require('mongodb').Server,
        MongoClient = require('mongodb').MongoClient;


    var dbUrl = 'mongodb://localhost:27017/RestaurantManagerDB';
    MongoClient.connect(dbUrl, function (err, db) {
        if (err) { console.log(err) }
        else {
            console.log("Connected correctly to server");
            collection = db.collection("MenuItems");
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
    res.render('../app/index');
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
    socket.on('requestCheck', function(tableId){
        io.emit('requestCheck', tableId);
    })
    socket.on('requestService', function(tableId){
        io.emit('requestService', tableId);
    })
    socket.on('tableOccupied', function(tableId){
        io.emit('tableOccupied', tableId);
    })
    socket.on('disconnect', function() {
        console.log("Client disconnected");
    });

    socket.on('', function(){

    });
});

app.get('/api/tables/', function(req, res) {
    tablesService.getAllTables(function (results) {
        res.json({status: 'success', tables: results});
    })
});

app.get('/api/tables/:tableId', function(req, res) {
    tableId = req.params.tableId;

    tablesService.getTableStatusById(tableId, function (results) {
        res.json({status: 'success', table: results});
    })
});

app.put('/api/tables/:tableId/:statusCode', function(req, res) {
    tableId = req.params.tableId;
    statusCode = req.params.statusCode;

    tablesService.updateTableStatus(tableId,statusCode);
    res.json({status: 'success'});
    });

app.get('/api/menu/', function(req, res) {
    console.log('*** getAllMenuItems');

    menuService.getAllMenuItems(collection,function (err, menuItems) {
        if (err) {
            console.log('*** menuItems err');
            res.json({
                menuItems: menuItems
            });
        } else {
            console.log('*** menuItems ok');
            res.json(menuItems);
        }
    });
});

app.post('/api/menu/edit', function(req,res)
{
    console.log("NewItem: %j", req.body.newItem.Price);
    var objectId = new ObjectID(req.body.newItem.id);
    var newItem = req.body.newItem;
    newItem.id = objectId;
    menuService.editMenuItem(collection,newItem, function(err){
        if(err)
        {
            console.log('*** editMenuItem err');
            res.json({ 'status': false });
        }
        else {
            console.log('*** editMenuItem ok');
            res.json({ 'status': true });
        }
    });
});

app.post('/api/menu/add', function(req,res)
{
    console.log("NewItem: %j", req.body.newItem);
    menuService.addMenuItem(collection,req.body.newItem, function(err){
        if(err)
        {
            console.log('*** addMenuItem err');
            res.json({ 'status': false });
        }
        else {
            console.log('*** addMenuItem ok');
            res.json({ 'status': true });
        }
    });
});

app.delete('/api/menu/delete/:id', function(req, res) {
    console.log('*** deleteMenuItem');

    menuService.deleteMenuItem(collection, req.params.id,function (err){
        if (err) {
            console.log('*** deleteMenuItem err');
            res.json({ 'status': false });
        } else {
            console.log('*** deleteMenuItem ok');
            res.json({ 'status': true });
        }
    });
});

/*exports.addCustomer = function (req, res) {
    console.log('*** addCustomer');
    db.getState(req.body.stateId, function (err, state) {
        if (err) {
            console.log('*** getState err');
            res.json({ 'status': false });
        } else {
            db.insertCustomer(req.body, state, function (err) {
                if (err) {
                    console.log('*** addCustomer err');
                    res.json(false);
                } else {
                    console.log('*** addCustomer ok');
                    res.json(req.body);
                }
            });
        }
    });
};*/

server.listen(port);
console.log('Server listening on port ' + port);

//exports = module.exports = app;