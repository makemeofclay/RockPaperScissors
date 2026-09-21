const randomChoice = () => {
    const choices = ['rock', 'paper', 'scissors'];
    let randomNum = Math.round(Math.random() * 100) % 3;
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
function getChoice() {
    let choice = prompt("Enter your choice (rock, paper, or scissors): ", "");
    if (choice === null || choice.trim() === "") {
        console.log("Exiting Rock, Paper, Scissors.");
        return null;
    }
    choice = choice.toLowerCase().trim();
    // Validate input
    const validChoices = ['rock', 'paper', 'scissors'];
    if (!validChoices.includes(choice)) {
        console.log("Invalid choice. Please enter rock, paper, or scissors.");
        getChoice();
    }
    return choice;
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
    console.log(p1 + " p1 and " + p2 + " p2")
    if (typeof p1 !== 'undefined' && typeof p2 !== 'undefined') 
    {
        if (p1 === p2)
        {
            return 'tie';
        }
        const beats = new Map([
            ['rock', 'scissors'],
            ['paper', 'rock'],
            ['scissors', 'paper']
        ]);
        if (beats.get(p1) === p2)
        {
            return 'p1'
        }
        else
        {
            return 'p2'
        }
    }
    return 'Uh oh.'
}
function main() {
    const game = new gameHandler;
    const humPlayer = new scoreHandler("HUMAN");
    const comPlayer = new scoreHandler("COMPUTER");
    // TODO: Validate rounds is integer
    game.rounds = prompt("Set rounds.");
    // Get player choice
    for (let i = 1; i <= game.rounds; i++) 
    {
        game.playerChoice = getChoice();
        game.randomChoice = randomChoice();
        // TODO: find issue where it displays HUMAN choice as "random" or "score"
        console.log(humPlayer.name + " chose " + game.playerChoice);
        console.log(comPlayer.name + " chose " + game.randomChoice);
        // TODO: find issue where both HUMAN and COMPUTER can score in one round.
        // TODO: find issue where a player can score more than once in one round
        let outcome = roundDecider(game.playerChoice, game.randomChoice);
        switch(outcome)
        {
            case 'tie':
                pass;
            case 'p1':
                humPlayer.increment;
            case 'p2':
                comPlayer.increment;
            default:
                console.log('UH OH, SCORE LOGIC BROKE')
        }
        // Display current score of current round
        console.log("SCORE: " + humPlayer.score + ":" + comPlayer.score);
        
    }
    if (humPlayer.score === comPlayer.score) 
    {
        console.log("Tie!");
    }
    const winner = Math.max(humPlayer.score, comPlayer.score) === humPlayer.score ? humPlayer : comPlayer;
    console.log(winner.name + " is the winner with " + winner.score + " points!");
}
main();