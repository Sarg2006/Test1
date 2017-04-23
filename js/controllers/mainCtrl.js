mainApp.controller('mainController', function($scope, $rootScope, $localStorage) {
    $rootScope.registredUsers = localStorage.registredUsers ? $localStorage.getObj('registredUsers') : {};
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.activePage = current.$$route.title;
    });
});