const boxes= document.querySelectorAll(".box");
const gameInfo= document.querySelector(".game-info");
const newGamebtn= document.querySelector(".btn");

//variable diclaration
let currentPlayer;
let gameGrid=boxes;
const winningPosition=[
    [0,1,2],
    [3,4,5],
    [6,7,8],

    [0,3,6],
    [1,4,7],
    [2,5,8],

    [0,4,8],
    [2,4,6]
];

//let's create a function to initilize

function initGame(){
    currentPlayer="X";
    gameGrid=["","","","","","","","",""];
    boxes.forEach((box, index) => {
        box.innerText="";
        boxes[index].style.pointerEvents="all";
        //Method-1 to remove the winner marked positions by reapplyting the box and box-1,2,3,4,5,6,7,8 CSS Properties
        box.classList=`box box-${index+1}`;

    });
    newGamebtn.classList.remove("active");

    //Method-2 to remove the winner marked positions
    // winningPosition.forEach((position)=>{
    //     boxes[position[0]].classList.remove("win");
    //     boxes[position[1]].classList.remove("win");
    //     boxes[position[2]].classList.remove("win");

    // })
    gameInfo.innerText =`Current Player - ${currentPlayer}`;
}
initGame();

function swapTurn(){
    if(currentPlayer=="X"){
        currentPlayer="O";
    }
    else{
        currentPlayer="X"
    }
    gameInfo.innerText=`Current Player - ${currentPlayer}`;
}

function gameOver(){
    let answer="";

    winningPosition.forEach((position) =>{
        //all 3 boxes should be non empty and should be containe the same value
        if((gameGrid[position[0]] !=="" || gameGrid[position[1]] !== "" || gameGrid[position[2]]!=="")
            &&(gameGrid[position[0]]===gameGrid[position[1]])
            &&(gameGrid[position[1]]===gameGrid[position[2]])){
                if(gameGrid[position[0]]==="X")
                answer="X";
            else
            answer="O";

            //winner is found so disable the pointer button
            boxes.forEach((box) =>{
                box.style.pointerEvents="none";

            })

            //if we know the winner

            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");


        }
    });

 //If answer is non empty then we got the winnet   
if(answer !=""){
    gameInfo.innerText=`Winner Player - ${answer}`;
    newGamebtn.classList.add("active");
    return;

}

//When there is no winner or a tie

//Step-1 Checking that fill count which is starting from 0 and ending to 9
let fillCount=0;
gameGrid.forEach((box)=>{
    if(box !=="")
    fillCount++;
});
/*Step-2 When the fill count= 9 then we can say that all boxes are filled 
but there is no winner found so the game is tied*/
if(fillCount==9){
    gameInfo.innerText="Game Tied";
    newGamebtn.classList.add("active");

}



};

function handleClick(index){
    if (gameGrid[index]=== ""){
        boxes[index].innerText=currentPlayer;
        gameGrid[index]= currentPlayer;
        boxes[index].style.pointerEvents="none";
        // Swap is going to be happen
        swapTurn();
        //check do we have any winner or not
        gameOver();
    }

}

boxes.forEach((box, index)=>{
    box.addEventListener("click",() =>{
        handleClick(index);
    })
    
});

newGamebtn.addEventListener("click",initGame);

// newGamebtn.addEventListener("click",()=>
// {
//     initGame();
//     console.log(gameGrid);
// });
