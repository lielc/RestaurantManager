//var ordersArr = [{orderNum: 1,tableNum: 1, DishArr: [{name:"Test1",quantity:2},{name:"Test2",quantity:1}]},{orderNum: 10,tableNum: 3, DishArr: ["Test4","Test3"]}];
//var itemsArr = [{orderNum:1, Dish:"Test1"},{orderNum:1, Dish:"Test2"},{orderNum:1, Dish:"Test3"},{orderNum:2, Dish:"Test20"}]

//var kitchen = function() {
    exports.isOpen = false;
    var activeOrdersArr = [];
    var nextOrderId = 1;

    function TableOrder(orderNum, tableNum, dishArr) {
        this.orderNum = orderNum;
        this.tableNum = tableNum;
        this.dishArr = dishArr;
    };

    function OrderDish(menuItemName,ItemQuantity){
        this.menuItemName = menuItemName;
        this.quantity = ItemQuantity;
    };

    //grab it from the DB
    function getNextOrderId(){
    }
//}
/*
 //grab it from the DB
exports.getFinishedOrders = function () {
    
}
*/

/*exports.init = function(collection,callback){
    isOpen = true;
}*/

exports.getActiveOrders = function () {
    return activeOrdersArr;
}

exports.addOrder = function (menuItems,tableId) {
    var newOrder = new TableOrder(tableId,2,menuItems);
    activeOrdersArr.push(newOrder);
    console.log("NEW ORDER: " +tableId+ " " + 2 + " " + menuItems[0].name);
}


/*

// saves the order to the DB and then removes the finished order from the current orders array
exports.saveOrder = function (order) {

}*/
