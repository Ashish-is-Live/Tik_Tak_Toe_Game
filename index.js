const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currPlayer;
let gameGrid;
const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],

]

// lets create a function ti initialize a game
function initGame() {
    currPlayer = "X"
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    // ui par empty karna hai
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        // initialize box with css properties again
        //  box.classList=`box box${index+1}`;
        if(box.classList.contains("win")){
            box.classList.remove("win")
        }


    })
   
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player -${currPlayer}`;



}
initGame();

function swapTurn() {
    if (currPlayer === "X") {
        currPlayer = "O"
    } else {
        currPlayer = "X";
    }

    // UI update
    gameInfo.innerText = `Current Player -${currPlayer}`
}
function checkGameOver() {
    let answer = "";
    winningPositions.forEach(position => {
        // All three boxes should be non empty and exactly same in value
        if (gameGrid[position[0]] !== "" && gameGrid[position[1]] !== "" && gameGrid[position[2]] !== "" && (gameGrid[position[0]] === gameGrid[position[1]]) && gameGrid[position[1]] === gameGrid[position[2]]) {

            // check if x is winner
            if (gameGrid[position[0]] === "X") {
                answer = "X";
            } else {
                answer = "O";
            }
            //   disable pointer events
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })

            // now we know  X/O is a winner
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");



        }
        // it means we have a winner
        if (answer !== "") {
            gameInfo.innerText = `Winner Player:${answer}`;
            newGameBtn.classList.add("active");
            return;
        }
        // when there is a tie
        let fillCount = 0;
        gameGrid.forEach((box) => {
            if (box !== "") {
                fillCount++;
            }
        });

        // board is filled game is tied
        if(fillCount==9){
            gameInfo.innerText="Game Tied";
            newGameBtn.classList.add("active");
        }

    })










}

function handleClick(index) {
    if (gameGrid[index] === "") {
        boxes[index].innerText = currPlayer;
        gameGrid[index] = currPlayer;
        // swap the turn 
        swapTurn();
        boxes[index].style.pointerEvents = "none";
        // check if someone Won
        checkGameOver();

    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    });
})

newGameBtn.addEventListener("click", initGame);


