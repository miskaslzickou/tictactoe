let crossTurn=true;
const winningCombos = [
  [1, 2, 3], [4, 5, 6], [7, 8, 9], // Vodorovné
  [1, 4, 7], [2, 5, 8], [3, 6, 9], // Svislé
  [1, 5, 9], [3, 5, 7]             // Diagonální
];
let xFields = [];
let oFields = [];
let gamePaused=false;
function Reset(){

    gamePaused=false;
    const squares = document.querySelectorAll('.square');
    squares.forEach(square => {
        if(square.hasChildNodes()){
              square.removeChild(square.firstChild);
        }

});
    document.getElementById("message").style.display="none";
    xFields = [];
    oFields = [];
    crossTurn = true;
    gamePaused=false;

}
function changeElement(id){
  
   let elem;
   if(gamePaused){
    return;
   }
   gamePaused=true;
    if (crossTurn){
        elem=document.getElementById("cross_tmp");
    }
    else{
        elem=document.getElementById("circle_tmp");
    }
    if(id.hasChildNodes()){
        return;
    }
     const fieldNumber = parseInt(id.classList[1]); 
     if (crossTurn) {
    xFields.push(fieldNumber);
    } else {
    oFields.push(fieldNumber);
    }

     checkWin(crossTurn ? xFields : oFields)
    crossTurn=!crossTurn;
    
    const newElem=elem.cloneNode(true);
    newElem.removeAttribute("id");
   
   

    newElem.style.display="block";
    id.appendChild(newElem);
   gamePaused=false;
}
function checkWin(playerFields){
  for (const combo of winningCombos) {
  
    const hasWon = combo.every(field => playerFields.includes(field));
    if (hasWon) {
        document.getElementById("message").style.display="block";
        document.getElementById("text").innerText=crossTurn ? "Křížek vyhrál!" : "Kolečko vyhrálo!";
        gamePaused = true;

    }
    }
    return;
}