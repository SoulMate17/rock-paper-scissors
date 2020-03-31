let userScore = 0;
let computerScore = 0;
let globalUserScore = 0;
let globalCompScore = 0;

const smallUserWorld = "user".fontsize(2).fontcolor("#95E3FA").sup();
const smallCompWorld = "comp".fontsize(2).fontcolor("#FEC16E").sup();
const BORDER_FLASH_TIMEOUT = 400;
const TRY_NUMBER = 10;

const userScore_span = document.getElementById("user-score");
const computerScore_span = document.getElementById("computer-score");
const scoreBoard_div = document.querySelector(".score-board");
const result_p = document.querySelector(".result > p");
const rock_div = document.getElementById("r");
const paper_div = document.getElementById("p");
const scissor_div = document.getElementById("s");
const lizard_div = document.getElementById("l");
const spock_div = document.getElementById("spock");
const global_user_score_div = document.getElementById("global-user-score");
const global_comp_score_div = document.getElementById("global-comp-score");

function getComputerChoice() {
    const choices = ['r', 'p', 's', 'l', 'spock'];
    const randomNumber = Math.floor(Math.random() * choices.length);
    return choices[randomNumber];
}

function changeScoreBorderColour() {
    if (userScore > computerScore) {
        scoreBoard_div.setAttribute("style", "border-color: #7EFF04"); // green
    } else if (computerScore > userScore) {
        scoreBoard_div.setAttribute("style", "border-color: #FF0445"); // red
    } else {
        scoreBoard_div.setAttribute("style", "border-color: white");
    }
}

function convertToWord(result) {
    switch (result) {
        case "r":
            return "Rock";
        case "p":
            return "Paper";
        case "s" :
            return "Scissors";
        case "l" :
            return "Lizard";
        case "spock":
            return "Spock";
        default:
            return "";
    }
}

function dropGameScore() {
    userScore = 0;
    userScore_span.innerHTML = userScore;
    computerScore = 0;
    computerScore_span.innerHTML = computerScore;
}

function checkForVictory() {
    if (userScore === TRY_NUMBER)
    {
        globalUserScore++;
        global_user_score_div.innerHTML = globalUserScore;
        dropGameScore();
        result_p.innerHTML = `You've destroyed AI in Rock Scissors Paper Lizard Spock game! Maybe <u>try again</u>?`
    } else
    if (computerScore === TRY_NUMBER) {
        globalCompScore++;
        global_comp_score_div.innerHTML = globalCompScore;
        dropGameScore();
        result_p.innerHTML = `This time AI was more lucky in Rock Scissors Paper Lizard Spock game! Maybe <u>try again</u>?`

    }
}

function mapChoiceToWinAction(winner, looser) {
    if (winner === "r" && looser === "s") return "crushes";
    if (winner === "r" && looser === "l") return "crushes";

    if (winner === "p" && looser === "r") return "covers";
    if (winner === "p" && looser === "spock") return "disproves";

    if (winner === "s" && looser === "p") return "cuts";
    if (winner === "s" && looser === "l") return "decapitates";

    if (winner === "l" && looser === "p") return "eats";
    if (winner === "l" && looser === "spock") return "poisons";

    if (winner === "spock" && looser === "s") return "smashes";
    if (winner === "spock" && looser === "r") return "vaporizes";
}

function win(userChoice, computerChoice) {
    userScore++;
    changeScoreBorderColour();
    userScore_span.innerHTML = userScore;

    result_p.innerHTML = `${convertToWord(userChoice)}${smallUserWorld} ${mapChoiceToWinAction(userChoice, computerChoice)} ${convertToWord(computerChoice)}${smallCompWorld}. You win 🔥`; // simple concatenation replacement

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

    result_p.innerHTML = `${convertToWord(computerChoice)}${smallCompWorld} ${mapChoiceToWinAction(computerChoice, userChoice)} ${convertToWord(userChoice)}${smallUserWorld}. You lost 💩`;

    const userChoiceClassList_div = document.getElementById(userChoice).classList;
    userChoiceClassList_div.add("red-glow");
    setTimeout(() => userChoiceClassList_div.remove("red-glow")
        , BORDER_FLASH_TIMEOUT);
}

function draw(userChoice, computerChoice) {
    changeScoreBorderColour();
    result_p.innerHTML = `${convertToWord(userChoice)}${smallUserWorld} draws with ${convertToWord(computerChoice)}${smallCompWorld}. Keep fighting (ง'̀-'́)ง`;

    const userChoiceClassList_div = document.getElementById(userChoice).classList;
    userChoiceClassList_div.add("grey-glow");
    setTimeout(function () { // no lambda here just because
        userChoiceClassList_div.remove("grey-glow");
    }, BORDER_FLASH_TIMEOUT);

}

function game(userChoice) {
    const computerChoice = getComputerChoice();
    switch (userChoice + computerChoice) {
        case "rs" :
        case "rl" :
        case "pr" :
        case "pspock" :
        case "sp" :
        case "sl" :
        case "spockr" :
        case "spocks" :
        case "lp" :
        case "lspock" :
            win(userChoice, computerChoice);
            break;
        case "rr":
        case "pp":
        case "ss":
        case "spockspock":
        case "ll":
            draw(userChoice, computerChoice);
            break;
        default:
            lose(userChoice, computerChoice);
            break;
    }
    checkForVictory();
    storeScoreInSession();
}

function loadScoreFromSession() {
    let s_userScore = sessionStorage.getItem('userScore');
    if (s_userScore !== null) {
        userScore = s_userScore;
        userScore_span.innerHTML = userScore;
    }

    let s_globalUserScore = sessionStorage.getItem('globalUserScore');
    if (s_globalUserScore !== null) {
        globalUserScore = s_globalUserScore;
        global_user_score_div.innerHTML = globalUserScore;
    }

    let s_compScore = sessionStorage.getItem('compScore');
    if (s_compScore !== null) {
        computerScore = s_compScore;
        computerScore_span.innerHTML = computerScore;
    }

    let s_globalCompScore = sessionStorage.getItem('globalCompScore');
    if (s_globalCompScore !== null) {
        globalCompScore = s_globalCompScore;
        global_comp_score_div.innerHTML = globalCompScore;
    }

    changeScoreBorderColour();
}

function storeScoreInSession() {
    storeCompScoreInSession();
    storeUserScoreInSession();
}

function storeUserScoreInSession() {
    sessionStorage.setItem('userScore', userScore);
    sessionStorage.setItem('globalUserScore', globalUserScore);
}

function storeCompScoreInSession() {
    sessionStorage.setItem('compScore', computerScore);
    sessionStorage.setItem('globalCompScore', globalCompScore);
}

function main() {

    loadScoreFromSession();

    rock_div.addEventListener('click', () => game("r"));

    paper_div.addEventListener('click', () => game("p"));

    scissor_div.addEventListener('click', () => game("s"));

    lizard_div.addEventListener('click', () => game("l"));

    spock_div.addEventListener('click', () => game("spock"));
}

main();