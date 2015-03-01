/**
 * Created by frederikbouillon on 25/02/15.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise(function($injector) {
                var $state = $injector.get('$state');
                $state.go('myShows');
            });

            $stateProvider
                .state('myShows', {
                    url: '/myShows',
                    templateUrl: 'components/myShows/myShows.html',
                    controller: 'MyShows',
                    controllerAs: 'vm'
                    // resolve
                })
                .state('explore', {
                    url: '/explore',
                    templateUrl: 'components/explore/explore.html',
                    controller: 'Explore',
                    controllerAs: 'vm'
                });
        }]);
}());
