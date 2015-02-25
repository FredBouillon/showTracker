/**
 * Created by frederikbouillon on 24/02/15.
 */
(function() {
    'use strict';

    angular
        .module('app')
        .controller('MyShows', MyShowController);

    MyShowController.$inject = ['$scope'];
    function MyShowController($scope) {
        var vm = this;
        vm.page = 'My shows';
        //throw {message: 'error message'};
    }

}());