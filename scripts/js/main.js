"use strict";
var GameLogic = (function () {
    function GameLogic() {
        this.isFilled = function (arr) { return arr.every(function (x) { return !!x; }); };
        this.game_board = new Array(9).fill('');
    }
    GameLogic.prototype.updateBoard = function (player, index) {
        this.game_board[index] = player.currentPlayer;
        if (this.isFilled(this.game_board)) {
            player.showWinnerDiv("DRAW :O");
        }
    };
    GameLogic.prototype.checkWin = function (currentPlayer) {
        var iter = { vert: 0, hori: 0 };
        var result = false;
        if ((new Set([this.game_board[0],
            this.game_board[4],
            this.game_board[8],
            currentPlayer]).size === 1) ||
            (new Set([this.game_board[2],
                this.game_board[4],
                this.game_board[6],
                currentPlayer]).size === 1)) {
            result = true;
        }
        else {
            while (iter.hori < 3) {
                if ((new Set([this.game_board[iter.vert],
                    this.game_board[iter.vert + 1],
                    this.game_board[iter.vert + 2],
                    currentPlayer]).size === 1) ||
                    (new Set([this.game_board[iter.hori],
                        this.game_board[iter.hori + 3],
                        this.game_board[iter.hori + 6],
                        currentPlayer]).size === 1)) {
                    result = true;
                }
                iter.vert += 3;
                iter.hori++;
            }
        }
        return result;
    };
    GameLogic.prototype.resetGame = function (player) {
        this.game_board = new Array(9).fill('');
        player.currentPlayer = 'X';
        window.location.reload();
    };
    return GameLogic;
}());
var Player = (function () {
    function Player() {
        var _this = this;
        this.changeTurn = function () {
            _this.currentPlayer = _this.currentPlayer === 'X' ? 'O' : 'X';
        };
        this.currentPlayer = 'X';
        this.gameWon = false;
    }
    Player.prototype.showWinnerDiv = function (message) {
        var winnerDiv = document.querySelector('.winner-board');
        if (winnerDiv) {
            winnerDiv.innerHTML = message;
            winnerDiv.style.visibility = 'visible';
        }
    };
    return Player;
}());
var boxes = document.getElementsByClassName("box");
var game = new GameLogic();
var player = new Player();
Array.from(boxes).forEach(function (box, index) {
    box.addEventListener('click', function handelClickEvent() {
        if (box.innerHTML == '' && !player.gameWon) {
            var currentPlayer = player.currentPlayer;
            box.innerHTML = currentPlayer;
            game.updateBoard(player, index);
            player.gameWon = game.checkWin(currentPlayer);
            if (player.gameWon) {
                player.showWinnerDiv(currentPlayer.concat(" WON !!!"));
            }
            player.changeTurn();
        }
    });
});
var resetButton = document.querySelector('.reset-button');
resetButton === null || resetButton === void 0 ? void 0 : resetButton.addEventListener("click", function () {
    game.resetGame(player);
});
