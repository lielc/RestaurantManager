// Define the `RestMgrApp` module
var RestMgrApp = angular.module('RestMgrApp', ['ui.router']);

RestMgrApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider
        .state('admin', {
            url: '/admin',
            templateUrl: 'app/admin/admin.template.html'
        })
        .state('admin.tableadmin', {
            url: '/tableadmin',
            templateUrl: 'app/admin/admin.tableadmin.template.html'

        })
        .state('admin.menuedit', {
            url: '/menuedit',
            templateUrl: 'app/admin/admin.menuedit.template.html'
        })
});

RestMgrApp.constant('Constants', {
    TableStatusType: ["AVAILABLE","OCCUPIED","SERVICE","REQ_CHECK"]
});