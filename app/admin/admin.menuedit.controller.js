angular.module('RestMgrApp').controller('menuEditCtrl', ['$scope','menuDataService',function ($scope,menuDataService){
    $scope.menuItems = [];
    $scope.newItem = {Name:"name",Description:"description",Price:"price",Type:"drink/desert.."};
    
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

    $scope.editMenuItem = function (id) {
        for (var i = 0; i < $scope.menuItems.length; i++)
        {
            if ($scope.menuItems[i]._id === id)
            {
                var newItem = $scope.menuItems[i];
                alert(newItem._id);
                menuDataService.editMenuItem({"newItem":
                    {"id":newItem._id, "Description":newItem.Description,
                    "Price":newItem.Price,"Name":newItem.Name,"Type":newItem.Type}}).then(function () {
                }, function (error) {
                    alert('Error editing menuItem: ' + error.message);
                })
            }
        }
    };

    $scope.addMenuItem = function (newItem) {
        alert(newItem.Name);
        menuDataService.addMenuItem({
            "newItem": {
                "Description": newItem.Description,
                "Price": newItem.Price,
                "Name": newItem.Name,
                "Type": newItem.Type
            }
        })
            .then(function () {
                alert('Error adding menuItem: ' + error.message);
            });
    };

}]);
