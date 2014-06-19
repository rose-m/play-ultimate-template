require.config({
    paths: {
        jquery: '../bower_components/jquery/dist/jquery.min',
        //jqueryui: '../bower_components/jquery-ui/ui/jquery-ui',
        bootstrapAffix: '../bower_components/sass-bootstrap/js/affix',
        bootstrapAlert: '../bower_components/sass-bootstrap/js/alert',
        bootstrapButton: '../bower_components/sass-bootstrap/js/button',
        bootstrapCarousel: '../bower_components/sass-bootstrap/js/carousel',
        bootstrapCollapse: '../bower_components/sass-bootstrap/js/collapse',
        bootstrapDropdown: '../bower_components/sass-bootstrap/js/dropdown',
        bootstrapModal: '../bower_components/sass-bootstrap/js/modal',
        bootstrapPopover: '../bower_components/sass-bootstrap/js/popover',
        bootstrapScrollspy: '../bower_components/sass-bootstrap/js/scrollspy',
        bootstrapTab: '../bower_components/sass-bootstrap/js/tab',
        bootstrapTooltip: '../bower_components/sass-bootstrap/js/tooltip',
        bootstrapTransition: '../bower_components/sass-bootstrap/js/transition',

        underscore: '../bower_components/underscore-amd/underscore',
        async: '../bower_components/requirejs-plugins/src/async',
        angular: '../bower_components/angular/angular',
        'angular-animate': '../bower_components/angular-animate/angular-animate',
        'angular-sanitize': '../bower_components/angular-sanitize/angular-sanitize',
        'angular-bootstrap': '../bower_components/angular-bootstrap/ui-bootstrap-tpls',
        'angular-ui-router': '../bower_components/angular-ui-router/release/angular-ui-router'
    },
    shim: {
        bootstrapAffix: {
            deps: [
                'jquery'
            ]
        },
        bootstrapAlert: {
            deps: [
                'jquery'
            ]
        },
        bootstrapButton: {
            deps: [
                'jquery'
            ]
        },
        bootstrapCarousel: {
            deps: [
                'jquery'
            ]
        },
        bootstrapCollapse: {
            deps: [
                'jquery',
                'bootstrapTransition'
            ]
        },
        bootstrapDropdown: {
            deps: [
                'jquery'
            ]
        },
        bootstrapPopover: {
            deps: [
                'jquery',
                'bootstrapTooltip'
            ]
        },
        bootstrapScrollspy: {
            deps: [
                'jquery'
            ]
        },
        bootstrapTab: {
            deps: [
                'jquery'
            ]
        },
        bootstrapTooltip: {
            deps: [
                'jquery'
            ]
        },
        bootstrapModal: {
            deps: [
                'jquery'
            ]
        },
        bootstrapTransition: {
            deps: [
                'jquery'
            ]
        },
        jquery: {
            exports: 'jQuery'
        },
        /*jqueryui: {
            deps: [
                'jquery'
            ]
        },*/
        angular: {
            exports: 'angular'
        },
        'angular-animate': {
            deps: [
                'angular'
            ]
        },
        'angular-sanitize': {
            deps: [
                'angular'
            ]
        },
        'angular-bootstrap': {
            deps: [
                'angular'
            ]
        },
        'angular-ui-router': {
            deps: [
                'angular'
            ]
        }
    }
});

require(['jquery', 'angular', 'frontend/app', 'bootstrapTransition', 'bootstrapCollapse', 'bootstrapAlert', 'bootstrapTab', 'bootstrapDropdown', 'bootstrapCarousel', 'bootstrapModal', 'angular-animate', 'angular-sanitize', 'angular-bootstrap', 'angular-ui-router' ],
    function ($, angular, frontend) {
        'use strict';

        /**
         * Bootstrap Angular App
         */
        $(function () {
            angular.bootstrap(document, [frontend['name']]);
        });
    }
);