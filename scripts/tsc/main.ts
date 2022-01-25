import {GameLogic} from './game.js'
import {Player} from './player.js'

let boxes: HTMLCollectionOf<Element> = document.getElementsByClassName("box");

let game: GameLogic = new GameLogic();
let player: Player = new Player();

Array.from(boxes).forEach((box, index) => {
    box.addEventListener('click',function handelClickEvent() {
        if (box.innerHTML == '' && !player.gameWon){
            let currentPlayer:string = player.currentPlayer
            box.innerHTML = currentPlayer;
            game.updateBoard(player,index)
            player.gameWon = game.checkWin(currentPlayer)
            if(player.gameWon){player.showWinnerDiv(currentPlayer.concat( " WON !!!" )) }
            player.changeTurn();
        }
    })
})

let resetButton: HTMLButtonElement | null = document.querySelector('.reset-button');
// Safe-Navigation operator >> conditional function call
resetButton?.addEventListener("click",()=>{
    game.resetGame(player)
})