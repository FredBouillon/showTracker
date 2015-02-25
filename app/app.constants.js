/**
 * Created by frederikbouillon on 24/02/15.
 */
(function () {
    'use strict';

    var systemEvents = {
        errorEvent: 'errorEvent'
    }

    angular
        .module('app')
        .constant('Enums', {
            SystemEvents: systemEvents
        })

}());