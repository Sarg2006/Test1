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
mainApp.controller('dashboardController', function($scope, $rootScope, $localStorage, $location) {
    $scope.showAdd = false;
    $scope.showEdit = false;
    setTimeout(function(){
        $scope.updatePasswords();
        $scope.$apply();
    },0);
    $scope.updatePasswords = function(){
        angular.forEach($rootScope.registredUsers,function(resp,key){
            if(resp.name == $scope.logged){
                $scope.passwords = resp.passwords ? resp.passwords : {};
                resp.passwords = resp.passwords ? resp.passwords : {};
                angular.forEach($scope.passwords,function(res){
                    var string = '';
                    for(var i = 0; i < res.password.length; i++){
                        string += "*";
                    }
                    res.unreveald = string;
                    res.showUnreveal = false;
                    res.edit = false;
                });
            }
        });
    };
    $scope.logged = $localStorage.getObj('logged');
    if(!$scope.logged){
        $location.path("/registration");
    }
    $scope.addPasswordObj ={
        password: "",
        url: ""
    };
    $scope.addPassword = function(){
        if($scope.addPasswordForm.$valid){
            angular.forEach($rootScope.registredUsers,function(resp,key){
                if(resp.name == $scope.logged){
                    var size = 0;
                    console.log(resp);
                    for (key in resp.passwords) {
                        if (resp.passwords.hasOwnProperty(key)) size++;
                    }
                    resp.passwords[size] = {
                        password: $scope.addPasswordObj.password,
                        url: $scope.addPasswordObj.url
                    };
                    //$scope.passwords = resp.passwords;
                    $scope.updatePasswords();
                    $localStorage.setObj('registredUsers', $rootScope.registredUsers);
                    $scope.showAdd = false;
                    $scope.addPasswordObj ={
                        password: "",
                        url: ""
                    };
                }
            });
        }
    };
    $scope.showEditFunc = function(pass){
        pass.edit = true;
    };
    $scope.saveEdit = function(pass){
        pass.edit = true;
        $localStorage.setObj('registredUsers', $rootScope.registredUsers);
        $scope.updatePasswords();
        console.log($scope)
    };
    $scope.deletePass = function(pass, key){
        delete $scope.passwords[key];
        $localStorage.setObj('registredUsers', $rootScope.registredUsers);
    }
});
mainApp.controller('loginController', function($scope, $rootScope, $localStorage, $location) {
    $scope.loginObj = {
        name:"",
        password: ""
    };
    $scope.login = function(){
        $scope.buttonClicked = true;
        $scope.loginError = true;
        angular.forEach($rootScope.registredUsers,function(resp,key){
            if(resp.name == $scope.loginObj.name && resp.password == $scope.loginObj.password){
                $localStorage.setObj('logged', resp.name);
                $scope.loginError = false;
                $location.path("/");
            }
        });
    };
});
mainApp.controller('mainController', function($scope, $rootScope, $localStorage) {
    $rootScope.registredUsers = localStorage.registredUsers ? $localStorage.getObj('registredUsers') : {};
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.activePage = current.$$route.title;
    });
});
mainApp.controller('registrationController', function($scope, $rootScope, $localStorage, $location) {
    $scope.registerObj = {
        name:"",
        password: "",
        password2: ""
    };
    $scope.submitRegistration = function(){
        $scope.nameError = false;
        $scope.buttonClicked = true;
        angular.forEach($rootScope.registredUsers,function(resp,key){
            if(resp.name == $scope.registerObj.name){
                $scope.nameError = true;
                console.log($rootScope.registredUsers)
            }
        });
        if($scope.registrationForm.$valid && !$scope.nameError && $scope.registerObj.password == $scope.registerObj.password2){
            delete $scope.registerObj.password2;
            var size = 0;
            for (key in $rootScope.registredUsers) {
                if ($rootScope.registredUsers.hasOwnProperty(key)) size++;
            }
            $rootScope.registredUsers[size] = $scope.registerObj;
            $localStorage.setObj('registredUsers', $scope.registredUsers);
            $location.path("/login");
        }
    }
});
mainApp.factory("$localStorage",function(){
    return {
        setObj: function(key, obj){
            localStorage.setItem(key, JSON.stringify(obj));
        },
        getObj: function(key){
            return JSON.parse(localStorage.getItem(key));
        }
    }
});