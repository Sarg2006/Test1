mainApp.controller('dashboardController', function($scope, $rootScope, $localStorage) {
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
    if($scope.logged){
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