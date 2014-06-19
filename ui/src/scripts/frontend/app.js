/**
 * Frontend App Module
 */
define([
    'angular',
    'underscore',
    'helpers',
    './filters',
    './services',
    './directives',
    './controllers',
    'angular-bootstrap',
    'angular-ui-router'
], function (angular, _, helpers) {
    "use strict";

    return angular
        .module('frontend', [
            'ngAnimate',
            'ui.router',
            'ui.bootstrap',
            'frontend.controllers',
            'frontend.filters',
            'frontend.services',
            'frontend.directives'
        ])
        .config(function ($stateProvider, $urlRouterProvider) {
            // insert state config
        })
});