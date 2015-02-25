/**
 * Created by frederikbouillon on 25/02/15.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('Explore', ExploreController);

    ExploreController.$inject = ['$scope'];
    function ExploreController($scope) {
        var vm = this;
        vm.page = 'Explore';
    }
}());