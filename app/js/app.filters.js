angular.module('RestMgrApp').filter('makeOddRange', function() {
    return function(input) {
        var lowBound, highBound;
        switch (input.length) {
            case 1:
                lowBound = 1;
                highBound = parseInt(input[0]);
                break;
            case 2:
                lowBound = parseInt(input[0]);
                highBound = parseInt(input[1]);
                break;
            default:
                return input;
        }
        var result = [];
        for (var i = lowBound; i <= highBound; i++)
        if(i%2 != 0) {
            result.push(i);
        }
        return result;
    };
});

angular.module('RestMgrApp').filter('makeEvenRange', function() {
    return function(input) {
        var lowBound, highBound;
        switch (input.length) {
            case 1:
                lowBound = 0;
                highBound = parseInt(input[0]);
                break;
            case 2:
                lowBound = parseInt(input[0]);
                highBound = parseInt(input[1]);
                break;
            default:
                return input;
        }
        var result = [];
        for (var i = lowBound; i <= highBound; i++)
            if(i%2 == 0) {
                result.push(i);
            }
        return result;
    };
});