angular.module('RestMgrApp')
    .service('tablesDataService', ['$http', function ($http) {

        var urlBase = '/api/tables';

        this.getAllTables = function () {
            var temp = $http.get(urlBase);
            return temp;
        };

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
    }]);