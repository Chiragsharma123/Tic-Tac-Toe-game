let boxes=document.querySelectorAll(".box");
let resetbtn =document.querySelector("#reset");
let newgamebtn=document.querySelector("#newgame");
let msgcontainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");
let turn=true;
let count=0;
const winPatterns=[
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        console.log("button was clicked");
        if(turn){
            box.innerText="O";
            turn=false;
        } 
        else{
            box.innerText="X";
            turn=true;
        }
        box.disabled=true;
        count++;

        let isWinner=checkWinner();
        
        if(count=== 9 && !isWinner){
            gameDraw();
        }
    });
});
const gameDraw=()=>{
    msg.innerText=`Game was a Draw.`;
    msgcontainer.classList.remove("hide");
    disableBoxes();
};

const disableBoxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
};
const enableBoxes=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText=""; 
    }
};
const showWinner=(winner)=>{
    msg.innerText=`Congratulations the winner is ${winner}`;
    msgcontainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner=()=>{
     for(let patter of winPatterns){
        let pos1Val=boxes[patter[0]].innerText;
        let pos2Val=boxes[patter[1]].innerText;
        let pos3Val=boxes[patter[2]].innerText;
        if(pos1Val!="" && pos2Val!="" && pos3Val!=""){
            if(pos1Val===pos2Val && pos2Val===pos3Val){
                showWinner(pos1Val);
                return true;
            }
        }
     }
};
const resetGame=()=>{
    turn =true;
    enableBoxes();
    count=0;
    msgcontainer.classList.add("hide");
};
newgamebtn.addEventListener("click",resetGame);
resetbtn.addEventListener("click",resetGame);