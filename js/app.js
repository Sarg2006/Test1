var mainApp = angular.module('mainApp', ['ngRoute']);

// configure our routes
mainApp.config(function($routeProvider) {
    $routeProvider

        // route for the home page
        .when('/', {
            templateUrl : 'pages/dashboard.html',
            controller  : 'dashboardController',
            title: 'Dashboard'
        })

        // route for the about page
        .when('/login', {
            templateUrl : 'pages/login.html',
            controller  : 'loginController',
            title: 'Login'
        })

        // route for the contact page
        .when('/registration', {
            templateUrl : 'pages/registration.html',
            controller  : 'registrationController',
            title: 'Registration'
        });
});