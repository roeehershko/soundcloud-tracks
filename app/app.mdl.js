'use strict';

/**
 * @ngdoc overview
 * @name yeomanApp
 * @description
 * # yeomanApp
 *
 * Main module of the application.
 */
angular.module('app', [
    'ngTouch',
    'ngMessages',
    'LocalStorageModule',
    'ui.bootstrap',
    'ui.bootstrap.accordion',
    'ui.router',
    'app.layout',
    'app.common.services',
    'app.core.dashboard'
])
    .config(function ($urlRouterProvider) {

        // Redirect to default page
        $urlRouterProvider.otherwise('/');
    });
