var statusType = ["AVAILABLE","OCCUPIED","SERVICE","REQ_CHECK"];

var NUM_OF_TABLES = 20;
var tablesArr = [];
init();

function init(){
    for (i=0; i<NUM_OF_TABLES;++i){
        tablesArr[i] = statusType[0];
    }
};

exports.getAllTables = function(callback){
    callback(tablesArr);
};

exports.getTableStatusById = function(tableId, callback){
    callback(tablesArr[tableId-1]);
}

exports.updateTableStatus = function(tableId,statusCode){
    tablesArr[tableId-1] = statusType[statusCode];
};