/**
 * Created by roee on 2/1/2016.
 */
'use strict';

/**
 * @ngdoc function
 * @name yeomanApp.controller:MainCtrl
 * @description
 * # MainCtrl
 */
angular.module('app.layout', [ 'ui.router' ])
.config(function ($stateProvider) {
    $stateProvider.state('app', {
        url: '/',
        abstract: true,
        views: {
            'layout@': {
                templateUrl: 'app/common/layout/layout.tpl.html',
                controller: 'app.states.layout.layoutCtrl'
            },
            'sidebar@app': {}
        }
    });
});