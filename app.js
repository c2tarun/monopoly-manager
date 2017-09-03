(function() {
    var app = angular.module("monopoly-manager", []);

    var gameStarted = false;

    app.controller('SetupGameController', ['$scope', function($scope){
        $scope._playersList = [];
        $scope._gameStarted = false;

        this.initialBalance = 1500;
        this.newPlayerName = '';
        this.errorMessage = '';

        console.log(this.initialBalance);
        this.addPlayer = function() {
            var players = $scope._playersList;
            this.errorMessage = '';
            if(this.newPlayerName) {
                var player = {
                    name: this.newPlayerName,
                    balance: 1500
                };
                players.push(player);
            } else {
                this.errorMessage = "Name cannot be empty";
            }
            
            this.newPlayerName = '';
        };

        this.startGame = function() {
            $scope._gameStarted = true;
        };
    }]);



})();
