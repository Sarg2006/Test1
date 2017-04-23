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