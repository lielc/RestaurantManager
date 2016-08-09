angular.module('RestMgrApp').controller('tableAdminCtrl', ['$scope','tablesDataService','Constants',function ($scope,tablesDataService,Constants){
    $scope.numOftables = 20;
    $scope.statusTypes = Constants.TableStatusType;
    $scope.tables;
    
    $scope.updateTableStatus = function(tableId,newStatusCode){
        tablesDataService.updateTableStatus(tableId,newStatusCode).then(function(){
            $scope.tables[tableId-1] = Constants.TableStatusType[newStatusCode];
        })
    };

    getAllTables();

    function getAllTables(){
        tablesDataService.getAllTables().then(function(response){
            $scope.tables = response.data.tables;
        })
    };

    function getTableStatusById(tableId){
         tablesDataService.getTableStatusById(tableId).then(function (response) {
             var temp20 = response.data.table;
            return response.data.table;
        });
    };
}]);
