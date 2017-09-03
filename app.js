(function() {
    var app = angular.module("monopoly-manager", []);

    var gameStarted = false;

    app.controller('SetupGameController', ['$scope', function($scope){
        $scope._playersList = [];
        this.initialBalance = 1500;
        this.newPlayerme = '';
        this.gameStarted = false;

        console.log(this.initialBalance);
        this.addPlayer = function() {
            var players = $scope._playersList;
            var player = {
                name: this.newPlayerName,
                balance: 1500
            };
            players.push(player);
            console.log(players);
            this.newPlayerName = '';
        };

        this.startGame = function() {
            this.gameStarted = true;
        };
    }]);



})();
