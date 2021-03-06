angular.module('RestMgrApp')
    .service('tablesDataService', ['$http', function ($http) {

        var urlBase = '/api/tables';

        this.getAllTables = function () {
            return $http.get(urlBase);
        };

        this.updateTableStatus = function (tableId, newStatusCode) {
            return $http.put(urlBase + '/' + tableId + '/' + newStatusCode);
        };

        this.getTableStatusById = function (tableId) {
            return $http.get(urlBase + '/' + tableId);
        };
    }])
    .service('menuDataService', ['$http', function ($http) {

        var urlBase = '/api/menu';

        this.getAllMenuItems = function () {
            return $http.get(urlBase);
        };

        this.getMenuItem = function (itemId) {
            return $http.put(urlBase + '/' + itemId+ '/');
        };

        this.deleteMenuItem = function (itemId) {
            return $http.delete(urlBase + '/delete/' + itemId).then(function (status) {
                return status.data;
            });
        };

        this.addMenuItem = function (newItem){
            return $http.post(urlBase + '/add',newItem).then(function (status) {
                return status.data;
            });
        };

        this.editMenuItem = function (newItem)
        {
            return $http.post(urlBase + '/edit',newItem).then(function (status) {
                return status.data;
            });
        };

        this.getFeed = function (callback)
        {
            return  $http.get("http://rss2json.com/api.json?rss_url=http%3A%2F%2Fnews.ycombinator.com%2Frss").then(function(response)
            {
                callback(response.data);
            });
        };

    }]);


        /*this.getCustomer = function (id) {
            return $http.get(urlBase + '/' + id);
        };

        this.insertCustomer = function (cust) {
            return $http.post(urlBase, cust);
        };

        this.updateCustomer = function (cust) {
            return $http.put(urlBase + '/' + cust.ID, cust)
        };

        this.deleteCustomer = function (id) {
            return $http.delete(urlBase + '/' + id);
        };

        this.getOrders = function (id) {
            return $http.get(urlBase + '/' + id + '/orders');
        };*/