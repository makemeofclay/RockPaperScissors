const randomChoice = () => {
    const choices = ['rock', 'paper', 'scissors'];
    let randomNum = Math.round(Math.random() * 10) % 3;
    return choices[randomNum];
};

class gameHandler {
    playerChoice = '';
    computerChoice = ''
    rounds = 0;

    set playerChoice(value) {
        this.playerChoice = value;
    }

    get playerChoice() {
        return this.playerChoice;
    }

    set computerChoice(value) {
        this.computerChoice = value;
    }

    get computerChoice() {
        return this.computerChoice;
    }

    set rounds(value) {
        this.rounds = value;
    }

    get rounds() {
        return this.rounds;
    }
}
function waitForPlayerChoice(e) {
    return new Promise((resolve) => {
        e.addEventListener('click', (event) => {
            const button = event.target;
            switch (button.className) {
                case 'rock':
                    resolve('rock');
                    break;
                case 'paper':
                    resolve('paper');
                    break;
                case 'scissors':
                    resolve('scissors');
                    break;
                default:
                    resolve(undefined);
            }  
        }, {once: true});
    });
}
async function gameProcess() {
    // UI Addition
    const container = document.querySelector('#container');
    const playerChoice = await waitForPlayerChoice(container);
    return playerChoice;
}
class scoreHandler {
    constructor(name) {
        this.name = name;
    }
    score = 0;
    set score(value) {
        this.score = value;
    }
    get score() {
        return this.score;
    }
    increment() {
        this.score += 1;
        console.log(this.name + " won the round!")
    }
}
function roundDecider(p1, p2)
{
    if (typeof p1 !== 'undefined' && typeof p2 !== 'undefined') 
    {   
    //console.log(p1 + " p1 and " + p2 + " p2")
        if (p1 === p2)
        {
            return 'tie';
        }
        const beats = new Map([
            ['rock', 'scissors'],
            ['paper', 'rock'],
            ['scissors', 'paper']
        ]);
        // test to check map console.log(beats.get(p1) + " map test");
        if (beats.get(p1) === p2)
        {
            //console.log("output of roundDecider is p1");
            return 'p1'
        }
        else
        {
            //console.log("output of roundDecider is p2");
            return 'p2'
        }
    }
    return 'Uh oh.'
}
function displayScore(p1, score1, p2, score2) {
    score1.textContent = p1.score;
    score2.textContent = p2.score;
}
function winnerDisplay(result) {
    let buttons = document.querySelectorAll('button');
    buttons.forEach((button) => {
        button.remove()
    })
    const body = document.querySelector('body');
    body.textContent = 'GAME OVER';
    const h1 = document.createElement('h1');
    if (result === 'tie') {
        h1.textContent = 'TIE';
    } else {
        h1.textContent = result + ' WINS!';
    }
    body.appendChild(h1);
}
function comChoiceDisplay(choice) {
    const display = document.querySelector('#ComChoice');
    display.textContent = choice;
}
async function main() {
    const game = new gameHandler;
    const humPlayer = new scoreHandler("HUMAN");
    const comPlayer = new scoreHandler("COMPUTER");
    const score1 = document.querySelector('#p1');
    const score2 = document.querySelector('#p2');
    // TODO: Validate rounds is integer
    game.rounds = undefined;
    while (isNaN(game.rounds))
    {
        game.rounds = prompt("Number of rounds?")
    }
    // Get player choice
    
    for (let i = 1; i <= game.rounds; i++) 
    {
        game.playerChoice = undefined;
        while (typeof game.playerChoice === 'undefined') 
        {
            game.playerChoice = await gameProcess();
        }
        game.randomChoice = randomChoice();
        // TODO: find issue where it displays HUMAN choice as "random" or "score"
        console.log(humPlayer.name + " chose " + game.playerChoice);
        console.log(comPlayer.name + " chose " + game.randomChoice);
        // TODO: find issue where both HUMAN and COMPUTER can score in one round.
        // TODO: find issue where a player can score more than once in one round
        switch(roundDecider(game.playerChoice, game.randomChoice))
        {
            case 'tie':
                console.log("TIE!");
                break;
            case 'p1':
                humPlayer.increment();
                break;
            case 'p2':
                comPlayer.increment();
                break;
            default:
                console.log('UH OH, SCORE LOGIC BROKE')
        }
        // Display current score of current round
        console.log("SCORE: " + humPlayer.score + ":" + comPlayer.score);
        comChoiceDisplay(game.randomChoice);
        displayScore(humPlayer, score1, comPlayer, score2);
    }
    winnerResult = undefined;
    if (humPlayer.score === comPlayer.score) 
    {
        winnerResult = 'tie';
    } else 
    {
        winnerResult = Math.max(humPlayer.score, comPlayer.score) === humPlayer.score ? humPlayer.name : comPlayer.name;
    }
    winnerDisplay(winnerResult);
}
main();