angular.module('RestMgrApp').controller('menuEditCtrl', ['$scope','menuDataService',function ($scope,menuDataService){
    $scope.menuItems = [];
    
    getAllMenuItems();
    
    function getAllMenuItems(){
        menuDataService.getAllMenuItems().then(function(response){
            $scope.menuItems = response.data;
        })
    };
    
    $scope.deleteMenuItem = function (id) {
        menuDataService.deleteMenuItem(id).then(function(){
            for (var i = 0; i < $scope.menuItems.length; i++) {
                if ($scope.menuItems[i]._id === id) {
                    $scope.menuItems.splice(i, 1);
                    break;
                }
            }
        }, function (error) {
            $window.alert('Error deleting menuItem: ' + error.message);
        })
};

}]);
