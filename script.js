// Declarations
let boxes = document.querySelectorAll(".btn");
let turnO = true;
let winMsg = document.querySelector("#winningMsg");
let count = 0;
let resetBtn = document.querySelector(".reset");
let addPlayerbtn = document.querySelector('#playerSubmit');
let player1;
let player2;
let countPlayer1 = 0;
let countPlayer2 = 0;
 

const winCondition = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8]
];

// Main function block
boxes.forEach((btn) => {
    btn.addEventListener('click', () => {
        if (turnO) {
            btn.innerText = "O";
            btn.style.color = "#28a745";
            turnO = false;
        } else {
            btn.innerText = "X";
            btn.style.color = "#dc3545";
            turnO = true;
        }
        btn.disabled = true;
        count++;
        checkWinner();
        if (count === 9 && !checkWinner()) {
            displayDraw();
        }
    });
});

const checkWinner = () => {
    for (let pattern of winCondition) {
        let position1 = boxes[pattern[0]].innerText;
        let position2 = boxes[pattern[1]].innerText;
        let position3 = boxes[pattern[2]].innerText;
        
        if (position1 !== "" && position2 !== "" && position3 !== "") {
            if (position1 === position2 && position2 === position3) {
                displayWinner(position1);
                disableBoxes();
                updateScore(position1);
                return true;
            }
        }
    }
};

const displayWinner = (position1) => {
    winMsg.firstElementChild.innerText = `The winner is ${position1}`;
    winMsg.style.display = "block";
};

const displayDraw = () => {
    winMsg.firstElementChild.innerText = `The Game is draw !`;
    winMsg.lastElementChild.innerText = `Both get one point !`;
    winMsg.style.display = "block";
    countPlayer1++;
    countPlayer2++;
    document.querySelector('#player1Score').innerText = countPlayer1;
    document.querySelector('#player2Score').innerText = countPlayer2;
};

const disableBoxes = () => {
    for (let btn of boxes) {
        btn.disabled = true;
    }
};

const enableBoxes = () => {
    for (let btn of boxes) {
        btn.disabled = false;
        btn.innerText = " ";
        btn.style.color = "black";
    }
};

const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    winMsg.style.display = "none";
};

const submitFunction = (event) => {
    document.querySelector('.scoreContainer').style.display = 'block';
    event.preventDefault();
    player1 = document.querySelector("#player1").value;
    player2 = document.querySelector("#player2").value;
    document.querySelector('#player1Table').innerText = player1;
    document.querySelector('#player2Table').innerText = player2;
    var modal = bootstrap.Modal.getInstance(document.getElementById('exampleModal'));
    modal.hide();
};

const updateScore = (position1) => {
    if (position1 === "O") {
        countPlayer1++;
    } else if (position1 === "X") {
        countPlayer2++;
    }
    document.querySelector('#player1Score').innerText = countPlayer1;
    document.querySelector('#player2Score').innerText = countPlayer2;
};

// Event listeners should be at the end
addPlayerbtn.addEventListener('click', submitFunction);
resetBtn.addEventListener("click", resetGame);