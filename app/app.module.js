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
        .state('admin.menuedit_display', {
            url: '/menuedit_display',
            templateUrl: 'app/admin/admin.menuedit.display.template.html'
        })
        .state('admin.menuedit_edit', {
            url: '/menuedit_edit',
            templateUrl: 'app/admin/admin.menuedit.edit.template.html'
        })
        .state('admin.menuedit_display.add', {
            url: '/add',
            templateUrl: 'app/admin/admin.menuedit.add.template.html'
        })
        .state('admin.menuedit_search', {
            url: '/search',
            templateUrl: 'app/admin/admin.menuedit.search.template.html'
        })
        .state('admin.menuedit_fun', {
            url: '/fun',
            templateUrl: 'app/admin/admin.menuedit.fun.template.html'
        })
});

RestMgrApp.constant('Constants', {
    TableStatusType: ["AVAILABLE","OCCUPIED","SERVICE","REQ_CHECK"]
});