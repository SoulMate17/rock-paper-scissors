let userScore = 0;
let computerScore = 0;

const BORDER_FLASH_TIMEOUT = 400;
const userScore_span = document.getElementById("user-score");
const computerScore_span = document.getElementById("computer-score");
const scoreBoard_div = document.querySelector(".score-board");
const result_p = document.querySelector(".result > p");
const rock_div = document.getElementById("r");
const paper_div = document.getElementById("p");
const scissor_div = document.getElementById("s");

function getComputerChoice() {
    const choices = ['r', 'p', 's'];
    const randomNumber = Math.floor(Math.random() * 3);
    return choices[randomNumber];
}

function changeScoreBorderColour() {
    console.log("help");
    if (userScore > computerScore) {
        scoreBoard_div.setAttribute("style", "border-color: green");
    } else if (computerScore > userScore) {
        scoreBoard_div.setAttribute("style", "border-color: red");
    } else {
        scoreBoard_div.setAttribute("style", "border-color: white");
    }
}

function convertToWord(result) {
    return result === "r" ? "Rock" : result === "p" ? "Paper" : "Scissors";
}

function win(userChoice, computerChoice) {
    userScore++;
    changeScoreBorderColour();
    userScore_span.innerHTML = userScore;
    const smallUserWorld = "user".fontsize(2).sup();
    const smallCompWorld = "comp".fontsize(2).sup();

    result_p.innerHTML = `${convertToWord(userChoice)}${smallUserWorld} beats ${convertToWord(computerChoice)}${smallCompWorld}. 🔥 You win 🔥`; // simple concatination replacement

    const userChoiceClassList_div = document.getElementById(userChoice).classList;
    userChoiceClassList_div.add("green-glow");
    setTimeout(() =>
            userChoiceClassList_div.remove("green-glow")
        , BORDER_FLASH_TIMEOUT);
}

function lose(userChoice, computerChoice) {
    computerScore++;
    changeScoreBorderColour();
    computerScore_span.innerHTML = computerScore;
    const smallUserWorld = "user".fontsize(2).sup();
    const smallCompWorld = "comp".fontsize(2).sup();

    result_p.innerHTML = `${convertToWord(computerChoice)}${smallCompWorld} beats ${convertToWord(userChoice)}${smallUserWorld}. You lost 😢`;

    const userChoiceClassList_div = document.getElementById(userChoice).classList;
    userChoiceClassList_div.add("red-glow");
    setTimeout(() => userChoiceClassList_div.remove("red-glow")
        , BORDER_FLASH_TIMEOUT);
}

function draw(userChoice, computerChoice) {
    const smallUserWorld = "user".fontsize(2).sup();
    const smallCompWorld = "comp".fontsize(2).sup();
    changeScoreBorderColour();

    result_p.innerHTML = `${convertToWord(userChoice)}${smallUserWorld} draws with ${convertToWord(computerChoice)}${smallCompWorld}. 🔥 Keep fighting! 🔥`;

    const userChoiceClassList_div = document.getElementById(userChoice).classList;
    userChoiceClassList_div.add("grey-glow");
    setTimeout(function () { // no labmda here just because
        userChoiceClassList_div.remove("grey-glow");
    }, BORDER_FLASH_TIMEOUT);

}

function game(userChoice) {
    const computerChoice = getComputerChoice();

    switch (userChoice + computerChoice) {
        case "rs" :
        case "pr":
        case "sp":
            win(userChoice, computerChoice);
            break;
        case "rp":
        case "ps":
        case "sr":
            lose(userChoice, computerChoice);
            break;
        default:
            draw(userChoice, computerChoice);
            break;
    }
}


function main() {
    rock_div.addEventListener('click', () => game("r"));

    paper_div.addEventListener('click', () => game("p"));

    scissor_div.addEventListener('click', () => game("s"));
}

main();