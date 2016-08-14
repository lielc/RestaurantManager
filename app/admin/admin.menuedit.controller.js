angular.module('RestMgrApp').controller('menuEditCtrl', ['$scope','menuDataService',function ($scope,menuDataService){
    $scope.menuItems = [];
    $scope.newItem = {Name:"name",Description:"description",Price:"price",Type:"drink/desert.."};
    $scope.Types =["Drink","Desert","Starter","Main","Salad"];
    $scope.searchName="";
    $scope.searchPriceMin = 0;
    $scope.searchPriceMax = 120;
    $scope.feedData = {"books":[{"id":11,"name":"zehava veshloshet ha subim","author":"J. K. Rowling","price":55,"amount":35}]};

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

    $scope.refreshFeed = function() {
        menuDataService.getFeed(function(data)
        {
            $scope.feedData = data;
        });
    };

    $scope.addMenuItem = function (newItem) {
        menuDataService.addMenuItem({
            "newItem": {
                "Description": newItem.Description,
                "Price": newItem.Price,
                "Name": newItem.Name,
                "Type": newItem.Type
            }
        })
            .then(function (error) {
                alert('Error adding menuItem: ' + error.message);
            });
    };

    $scope.refreshGoogleMap = function()
    {
        var myCenter = new google.maps.LatLng(32.166868, 34.811683);
        var mapProp = {
            center: new google.maps.LatLng(32.166868, 34.811683),
            zoom: 15,
            panControl: false,
            zoomControl: false,
            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: false,
            overviewMapControl: false,
            rotateControl: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
        var myLatLng = {lat: 32.166868, lng: 34.811683};
        var marker = new google.maps.Marker({
            position: myLatLng,
            title : 'Our Resteraunt',
            map:map
        });
    };

}]);
