/**
 * Created by frederikbouillon on 24/02/15.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .run(bindErrors);

    bindErrors.$inject = ['$rootScope', 'toaster'];
    function bindErrors($rootScope, toaster) {
        $rootScope.$on('Hello', function (event, title, detail) {
            toaster.pop({
                type: 'error',
                title: title,
                body: detail
            });
        });
    }
}());