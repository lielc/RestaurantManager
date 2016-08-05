var ordersArr = [{orderNum: 1,tableNum: 1, DishArr: [{name:"Test1",quantity:2},{name:"Test2",quantity:1}]},{orderNum: 10,tableNum: 3, DishArr: ["Test4","Test3"]}];

exports.getFinishedOrders = function () {
    
}

exports.getActiveOrders = function () {
    return ordersArr;
}

// saves the order to the DB and then removes the finished order from the current orders array
exports.saveOrder = function () {

}