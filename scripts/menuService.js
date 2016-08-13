var menuItems = [];


/*getCustomer: function (id, callback) {
    console.log('*** accessDB.getCustomer');
    Customer.find({ 'id': id }, {}, function (err, customer) {
        callback(null, customer[0]);
    });
}*/

exports.getAllMenuItems = function(collection,response){
    /*if (menuItems.length == 0) {
        collection.find({}).toArray(function (err, items) {
           if (err) {
               console.log("problem with collection/db: " + err);
           } else {
               console.log("got items from db");
               menuItems = items;
           }
        });
    }

    response(menuItems);*/
    console.log('*** menuService.getAllMenuItems');
    collection.find({}).toArray().then(function (menuItems) {
        response(null, menuItems);
    });
};

exports.deleteMenuItem = function(collection,id,callback){
    console.log('*** accessDB.deleteCustomer');
    collection.remove({ 'Id': id }, function (err) {
        callback(null);
    });
};

exports.addMenuItem = function(collection,req_body,callback){
    console.log('*** accessDB.addMenuItem');

    var newMenuItem;

    newMenuItem.Name = req_body.name;
    newMenuItem.Description = req_body.description;
    newMenuItem.Price = req_body.price;

    collection.insertOne(newMenuItem, function(err,result){
            callback(err);
    });
};