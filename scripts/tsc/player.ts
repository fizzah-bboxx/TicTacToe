// Literal types
type currentPlayerType = 'X' | 'O';

export class Player{
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