(function() {
    var app = angular.module("monopoly-manager", []);

    app.service('gameState', function() {
        var playersList = [];
        var gameStarted = false;

        return {
            getPlayerList: function() {
                return playersList;
            },
            setGameStartState: function(state) {
                gameStarted = state;
            },
            getGameStartState: function() {
                return gameStarted;
            }
        };
    });

    app.controller('SetupGameController', ['$scope', '$rootScope', 'gameState', function($scope, $rootScope, gameState){
        this._playersList = gameState.getPlayerList();
        this._gameStarted = gameState.getGameStartState();
        this.initialBalance = 1500;
        this.newPlayerName = '';
        this.errorMessage = '';

        this.addPlayer = function() {
            var players = this._playersList;
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
            console.log(this._playersList)
            this.newPlayerName = '';
        };

        this.startGame = function() {
            var bank = {
                name: 'Bank',
                balance: 1000000
            };
            this._playersList.push(bank);
            this._gameStarted = true;
            gameState.setGameStartState(this._gameStarted);
            $rootScope.$broadcast('game_state_changed', gameState);
        };
    }]);

    app.controller('GameProgressController', ['$scope', '$rootScope', 'gameState', function($scope, $rootScope, gameState) {
        this.playersList = gameState.getPlayerList();
        $scope.gameStarted = gameState.getGameStartState();
        this.transferFrom = 0;
        this.tranferTo = this.playersList.length;
        this.transferAmount = 0;

        $rootScope.$on('game_state_changed', function(e, data){
            $scope.gameStarted = gameState.getGameStartState();
        });

        this.transferMoney = function() {
            var fromPlayer = this.playersList[this.transferFrom];
            var toPlayer = this.playersList[this.transferTo];

            fromPlayer.balance = fromPlayer.balance - this.transferAmount;
            toPlayer.balance = toPlayer.balance + this.transferAmount;
        };
    }]);

})();
