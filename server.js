var express = require('express')
    , app = express()
    , server = require('http').createServer(app)
    , hbs = require('hbs')
    , bodyParser = require('body-Parser')
    , messageEngine = require('./messages')
    , io = require('socket.io').listen(server)
    , mongodb = require('mongodb');

var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/mongoDb_Data';
var menuItemsCol;

var collection;
MongoClient.connect(url, function(err, db) {
    if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
    }
    else {
        menuItemsCol = db.collection('MenuItems');
        console.log("Connected to database!");
    }
});

server.listen(8080);

app.set('view engine', 'html');
app.engine('html', hbs.__express);
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

var sessions = [];
/*

io.sockets.on('connection',function (socket)
{
    sessions.push(socket);
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
    });
});
*/

// routing
app.get('/', function(req, res) {
        res.render(__dirname + '/views/index');
});

/*
app.get('/pages', function(req, res){
    //var messages = req.session.messages;
    res.render(__dirname + '/views/screen', {title:"new title"});//, {messages: messages});
});
*/

app.get('/tableScreen/:tableId', function(req, res){

    var tableId = req.params.tableId;
    var menuItemsArray = messageEngine.getMessages(collection, function (res2) {
        res.render(__dirname + '/views/index', {title: "My Index", messages: res2});
    });
    res.render(__dirname + '/views/tableMenuView',{title:"Screen " + tableId});

    /*var messagesScreen2 = JSON.stringify(messageEngine.getMessageById(screenId, collection, function (res2)
    /!*{
        var myres = JSON.stringify(res2);
        res.render(__dirname + '/views/screen',{title:"Screen " +screenId,messages:myres});

    }));*!/*/
});

/*
app.get('/TestUpdate', function(req, res) {

    var Id = req.query.id;
    if (Id != undefined) {
        console.log("Updating");
        messageEngine.addMessage(Id, collection, function(newMessage) {
            messageEngine.getMessageById(Id, collection, function (messages) {
                console.log("Got messages: " + messages);
                var counter = 0;
                for (var currIndex = 0; currIndex < sessions.length; currIndex++) {
                    var currSession = sessions[currIndex];
                    if (currSession.handshake.query.screenId == Id)
                    {
                        counter++;
                        console.log("Updating session: " + currSession.id);
                        currSession.emit('update', messages);
                    }
                }
                res.status(200).json({ "message": "Message was added." + counter + " clients were updated."});
            });

        },function(err){
            res.status(500).json({"message" : "Internal server error. \n" + err});
        });
    }
});*/
