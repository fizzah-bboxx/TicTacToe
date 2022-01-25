var Player = /** @class */ (function () {
    function Player() {
        var _this = this;
        // Toggle between players
        this.changeTurn = function () {
            // Conditional Operators
            _this.currentPlayer = _this.currentPlayer === 'X' ? 'O' : 'X';
        };
        this.currentPlayer = 'X';
        this.gameWon = false;
    }
    // Updates UI to display messages
    Player.prototype.showWinnerDiv = function (message) {
        // Union Types
        var winnerDiv = document.querySelector('.winner-board');
        if (winnerDiv) {
            // Non-null Assertion
            winnerDiv.innerHTML = message;
            winnerDiv.style.visibility = 'visible';
        }
    };
    return Player;
}());
export { Player };
