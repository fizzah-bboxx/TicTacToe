import { GameLogic } from './game.js';
import { Player } from './player.js';
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
// Safe-Navigation operator >> conditional function call
resetButton === null || resetButton === void 0 ? void 0 : resetButton.addEventListener("click", function () {
    game.resetGame(player);
});
