const firstPlayerScore       = document.querySelector("#first-player-score");
const firstPlayerRoundScore  = document.querySelector("#first-player-round-score");
const secondPlayerScore      = document.querySelector("#second-player-score");
const secondPlayerRoundScore = document.querySelector("#second-player-round-score");
const firstDiceRoll          = document.querySelector("#firstdiceroll");
const secondDiceRoll         = document.querySelector("#seconddiceroll");
const thirdDiceRoll          = document.querySelector("#thirddiceroll");
const fourthDiceRoll         = document.querySelector("#fourthdiceroll");
const resetBtn               = document.querySelector("#reset-button");
const popUpWindow            = document.getElementById("popup");
const closeBtn               = document.getElementById("play-again-btn");
const announcement           = document.querySelector("#announcement");
const rulesHeading           = document.querySelector(".rules h3");
const rulesContent           = document.querySelector(".rules-content");
const toggleRulesBtn         = document.querySelector("#toggleButton");
const playerOneID            = document.querySelector("#player-one-id");
const aiPlayerID             = document.querySelector("#ai-player-id")
const diceNumbers = [1, 2, 3, 4, 5, 6];
const diceImages  = [
    "", "../images/dice-1.png", 
    "../images/dice-2.png", 
    "../images/dice-3.png", 
    "../images/dice-4.png", 
    "../images/dice-5.png", 
    "../images/dice-6.png" ]

let firstDiceResult  = 0;
let secondDiceResult = 0;
let thirdDiceResult  = 0;
let fourthDiceResult = 0;
let roundsPlayed     = 0;
    
firstPlayerScore.innerHTML       = "0";
firstPlayerRoundScore.innerHTML  = "0";
secondPlayerScore.innerHTML      = "0";
secondPlayerRoundScore.innerHTML = "0";

//Rules
rulesHeading.addEventListener("click", toggleRules)


function toggleRules() 
{
    if(rulesContent.style.maxHeight)
    {
        rulesContent.style.maxHeight = null;
    }
    else
    {
        rulesContent.style.maxHeight = rulesContent.scrollHeight + "px";
    }
}

function hideDice()
{
    firstDiceRoll.style.display  = 'none';
    secondDiceRoll.style.display = 'none';
    thirdDiceRoll.style.display  = 'none';
    fourthDiceRoll.style.display = 'none';
}

function showDice()
{
    firstDiceRoll.style.display  = 'inline';
    secondDiceRoll.style.display = 'inline';
    thirdDiceRoll.style.display  = 'inline';
    fourthDiceRoll.style.display = 'inline';
}

function resetGame()
{
    roundsPlayed = 0;
    firstPlayerRoundScore.innerHTML = 0;
    firstPlayerScore.innerHTML = 0;
    secondPlayerRoundScore.innerHTML = 0;
    secondPlayerScore.innerHTML = 0;
    hideDice();
    showPlayerID();
}

function showPopUp()
{
    popUpWindow.style.display = "block";
}

function hidePopUp()
{
    popUpWindow.style.display = "none";
    resetGame();
}

function playerOneWinAnnouncement()
{
    showPopUp();
    announcement.innerHTML = `Congratulations! Player One Wins!`;
}

function aiWinAnnouncement()
{
    showPopUp();
    announcement.innerHTML = `Game Over! AI Wins!`;
}

function tieGameAnnouncement()
{
    showPopUp();
    announcement.innerHTML = `Game Over! Tie Game!`;
}

function hidePlayerID()
{
    playerOneID.style.display = 'none';
    aiPlayerID.style.display  = 'none';
}

function showPlayerID()
{
    playerOneID.style.display = 'inline';
    aiPlayerID.style.display  = 'inline';
}

hidePopUp();
hideDice();
resetBtn.addEventListener("click", resetGame)
closeBtn.addEventListener ("click", hidePopUp);

// Object 1: Dice Object
class Dice
{
    constructor( value )
    {
        this.value = value;
    }
}

// Object 2: Player Object
class Player
{
    constructor( name )
    {
        this.name = name;
    }
}

// Rolls the dice
function rollDice() 
{
    let firstDice  = parseInt(Math.random() * (diceNumbers.length) + 1);
    let secondDice = parseInt(Math.random() * (diceNumbers.length) + 1);
    let thirdDice  = parseInt(Math.random() * (diceNumbers.length) + 1);
    let fourthDice = parseInt(Math.random() * (diceNumbers.length) + 1);

    firstDiceRoll.setAttribute("src", diceImages[firstDice]);
    secondDiceRoll.setAttribute("src", diceImages[secondDice]);
    thirdDiceRoll.setAttribute("src", diceImages[thirdDice]);
    fourthDiceRoll.setAttribute("src", diceImages[fourthDice]);

    firstDiceResult  = firstDice;
    secondDiceResult = secondDice;
    thirdDiceResult  = thirdDice;
    fourthDiceResult = fourthDice;

}

// Plays a single round of dice game
function playRound()
{
    let p1RoundScore = 0;
    let p2RoundScore = 0;

    if(roundsPlayed < 3)
    {
        roundsPlayed++;

        rollDice();
        showDice();
        hidePlayerID();

        // Dice roll results for Player dice
        if(firstDiceResult == 1 || secondDiceResult == 1)
        {
            firstPlayerRoundScore.innerHTML = 0;
        }
        else if(firstDiceResult === secondDiceResult)
        {
            let p1RoundScore = `${parseInt((firstDiceResult + secondDiceResult) * 2)}`;
            firstPlayerRoundScore.innerHTML  = p1RoundScore;
            firstPlayerScore.innerHTML = `${parseInt(firstPlayerScore.innerHTML) + parseInt(p1RoundScore)}`;
        }
        else
        {
            let p1RoundScore = `${parseInt(firstDiceResult + secondDiceResult)}`;
            firstPlayerRoundScore.innerHTML  = p1RoundScore;
            firstPlayerScore.innerHTML = `${parseInt(firstPlayerScore.innerHTML) + parseInt(p1RoundScore)}`;
        }

        // Dice roll results for AI dice
        if(thirdDiceResult == 1 || fourthDiceResult == 1)
        {
            secondPlayerRoundScore.innerHTML = 0;
        }
        else if(thirdDiceResult == fourthDiceResult)
        {
            let p2RoundScore = `${parseInt((thirdDiceResult + fourthDiceResult) * 2)}`;
            secondPlayerRoundScore.innerHTML = p2RoundScore;
            secondPlayerScore.innerHTML = `${parseInt(secondPlayerScore.innerHTML) + parseInt(p2RoundScore)}`;
        }
        else 
        {
            let p2RoundScore = `${parseInt(thirdDiceResult + fourthDiceResult)}`;
            secondPlayerRoundScore.innerHTML = p2RoundScore;
            secondPlayerScore.innerHTML = `${parseInt(secondPlayerScore.innerHTML) + parseInt(p2RoundScore)}`;
        }

        if(roundsPlayed == 3)
        {
            rollBtn.innerHTML = `END`;
        }
    }
    else if(roundsPlayed >= 3)
    {
        let p1TotalScore = parseInt(firstPlayerScore.innerHTML);
        let p2TotalScore = parseInt(secondPlayerScore.innerHTML);

        if(p1TotalScore > p2TotalScore)
        {
            playerOneWinAnnouncement();
        }
        else if(p1TotalScore == p2TotalScore)
        {
            tieGameAnnouncement();
        }
        else
        {
            aiWinAnnouncement();
        }

        if(rollBtn.innerHTML == `END`)
        {
            rollBtn.innerHTML = `ROLL`;
        }
    }
}

const rollBtn = document.querySelector("#roll-button");
rollBtn.addEventListener("click", playRound);
