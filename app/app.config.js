/**
 * Created by frederikbouillon on 24/02/15.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .config(exceptionHandler)
        .config(['$locationProvider', function ($locationProvider) {
            $locationProvider.html5Mode(true);
        }]);


    exceptionHandler.$inject = ['$provide'];
    function exceptionHandler($provide) {
        $provide.decorator("$exceptionHandler",['$delegate', '$injector', function($delegate, $injector) {
            return function(exception, cause) {
                //$delegate(exception, cause);
                var scope = $injector.get('$rootScope');
                var message = exception && exception.message;
                //
                scope.$emit('Hello', 'Program Error', message);
                //
                $delegate(exception, cause);
               //alert(exception.message);
            };
        }]);
    }


}());