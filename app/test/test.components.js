angular.
    module('RestMgrApp').
    component('testList',{
    templateUrl: 'app/test/test.template.html',
    controller: function test1Controller() {
        this.test1Arr = [
            {name: 'test1_str1', val:'contents of str1'
            },{
                name: 'test1_str2', val:'contents of str2'
            }
        ];
    }
});
