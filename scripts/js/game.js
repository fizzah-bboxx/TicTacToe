// Classes 
var GameLogic = /** @class */ (function () {
    function GameLogic() {
        // Double Bang Operator
        this.isFilled = function (arr) { return arr.every(function (x) { return !!x; }); };
        this.game_board = new Array(9).fill('');
    }
    /**
     * Updates Board
     * Checks if all cells are already filled show message draw.
     * @param player
     * @param index
     */
    GameLogic.prototype.updateBoard = function (player, index) {
        this.game_board[index] = player.currentPlayer;
        if (this.isFilled(this.game_board)) {
            player.showWinnerDiv("DRAW :O");
        }
    };
    /**
     * checks if 3 consecutive cells matches.
     * @param currentPlayer
     * @returns boolean
     */
    GameLogic.prototype.checkWin = function (currentPlayer) {
        var iter = { vert: 0, hori: 0 };
        var result = false;
        if ( //Diagonal
        (new Set([this.game_board[0],
            this.game_board[4],
            this.game_board[8],
            currentPlayer]).size === 1) ||
            //Reverse-diagonal
            (new Set([this.game_board[2],
                this.game_board[4],
                this.game_board[6],
                currentPlayer]).size === 1)) {
            result = true;
        }
        else {
            while (iter.hori < 3) {
                if ( // rows
                (new Set([this.game_board[iter.vert],
                    this.game_board[iter.vert + 1],
                    this.game_board[iter.vert + 2],
                    currentPlayer]).size === 1) ||
                    //columns
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
    // Reset the board
    GameLogic.prototype.resetGame = function (player) {
        this.game_board = new Array(9).fill('');
        player.currentPlayer = 'X';
        window.location.reload();
    };
    return GameLogic;
}());
export { GameLogic };
