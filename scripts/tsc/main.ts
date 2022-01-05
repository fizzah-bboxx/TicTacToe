//Interface
interface IGameLogic {
    game_board: string[];

    updateBoard(player:Player,index:number):void;
    checkWin(currentPlayer:string):boolean;
    resetGame(player:Player):void;
}

// Classes 
class GameLogic implements IGameLogic{
   
    game_board : string[]

    constructor(){
        this.game_board = new Array(9).fill('');
    }

    // Double Bang Operator
    private isFilled = (arr:string[]):boolean => arr.every((x:string):boolean => !!x);

    /**
     * Updates Board
     * Checks if all cells are already filled show message draw.
     * @param player 
     * @param index 
     */
    updateBoard(player:Player,index:number):void {
        this.game_board[index] = player.currentPlayer
        if( this.isFilled(this.game_board)){
            player.showWinnerDiv("DRAW :O")
        }
    }

    /**
     * checks if 3 consecutive cells matches.
     * @param currentPlayer 
     * @returns boolean
     */
    checkWin(currentPlayer:string): boolean{
        // Type Aliases
        type iterType = {vert:number,hori:number}
        let iter:iterType = {vert :0,hori:0}
        
        let result: boolean = false;
        if( //Diagonal
            (new Set([this.game_board[0],
                this.game_board[4],
                this.game_board[8],
                currentPlayer]).size === 1) ||
            //Reverse-diagonal
            (new Set([this.game_board[2],
                this.game_board[4],
                this.game_board[6],
                currentPlayer]).size === 1)
            ){
            result = true
        }
        else {
            while(iter.hori < 3){
                if( // rows
                    (new Set([this.game_board[iter.vert],
                            this.game_board[iter.vert+1],
                            this.game_board[iter.vert+2],
                            currentPlayer]).size === 1) ||
                    //columns
                    (new Set([this.game_board[iter.hori],
                            this.game_board[iter.hori+3],
                            this.game_board[iter.hori+6],
                            currentPlayer]).size === 1)
                    ){
                    result = true
                }
                iter.vert += 3;
                iter.hori ++;
            }
        }
        return result
    }

    // Reset the board
    resetGame(player:Player):void{
        this.game_board = new Array(9).fill('');
        player.currentPlayer = 'X';
        window.location.reload();
    }

}

class Player{
    currentPlayer: currentPlayerType;
    gameWon:boolean;

    constructor(){
        this.currentPlayer = 'X';
        this.gameWon = false;
    }

    // Toggle between players
    changeTurn = (): void => {
        // Conditional Operators
        this.currentPlayer = this.currentPlayer === 'X'?'O':'X';
    };

    // Updates UI to display messages
    showWinnerDiv(message:string):void{
        // Union Types
        let winnerDiv: HTMLDivElement | null = document.querySelector('.winner-board');
        if(winnerDiv) {
            // Non-null Assertion
            winnerDiv!.innerHTML = message;
            winnerDiv!.style.visibility='visible';
        }
    }
}

let boxes: HTMLCollectionOf<Element> = document.getElementsByClassName("box");

// Literal types
type currentPlayerType = 'X' | 'O';

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