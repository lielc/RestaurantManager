angular.module('RestMgrApp').controller('tableAdminCtrl', ['$scope','tablesDataService','Constants',function ($scope,tablesDataService,Constants){
    $scope.numOftables = 20;
    $scope.statusTypes = Constants.TableStatusType;
    $scope.tables;


    getAllTables();

    function getAllTables(){
        tablesDataService.getAllTables().then(function(response){
            $scope.tables = response.data.tables;
        })
    };
}]);
