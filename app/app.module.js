// Define the `RestMgrApp` module
var RestMgrApp = angular.module('RestMgrApp', ['ui.router']);

RestMgrApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('admin');

    $stateProvider
        .state('admin', {
            url: '/admin',
            templateUrl: 'app/admin/admin.template.html',
            abstract: true
        })
        .state('admin.tableadmin', {
            url: '',
            templateUrl: 'app/admin/admin.tableadmin.template.html'

        })
        .state('admin.menuedit', {
            url: '/menuedit',
            templateUrl: 'app/admin/admin.menuedit.template.html'
        })
        .state('admin.menuedit.add', {
            url: '/add',
            templateUrl: 'app/admin/admin.menuedit.add.template.html'
        })
});

RestMgrApp.constant('Constants', {
    TableStatusType: ["AVAILABLE","OCCUPIED","SERVICE","REQ_CHECK"]
});