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