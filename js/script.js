'use strict';
(function(){ 
var output = document.getElementById('output');
var result = document.getElementById('result');

var Paper = document.getElementById('paper');
var Rock = document.getElementById('rock');
var Scissors = document.getElementById('scissors');
var NewGame = document.getElementById('new-game');

var playerPick;
var computerChoice;
var computerPick;
var playerPoints;
var computerPoints;
var roundCount;
var newGame;
var continueGame;

Paper.style.visibility='hidden';
Rock.style.visibility='hidden';
Scissors.style.visibility='hidden';

function showButtons(){
     Paper.style.visibility='visible';
     Rock.style.visibility='visible';
     Scissors.style.visibility='visible';
}
function hideButtons(){
    Paper.style.visibility='hidden';
    Rock.style.visibility='hidden';
    Scissors.style.visibility='hidden';
}

//New game
NewGame.addEventListener('click', function(){	
    newGame = window.prompt('How many rounds do you want to play?');
    writeText('') ;
    writeResult('');  
    playerPoints = "0";
    computerPoints = "0";
    roundCount = "0";
    continueGame = true;
  
    if (newGame === '' || isNaN(newGame) || newGame == null || newGame.trim().length == 0) {
      writeText('NO INPUT, TRY AGAIN!');
      hideButtons();
    }
    else {
      showButtons();
    }
})

//Write current moves and result
function writeText(text) {
    output.innerHTML = text;
}
function writeResult(text) {
    result.innerHTML = text;
}

//Computer move
 function computerMove() {
 var computerChoice = ['PAPER', 'ROCK', 'SCISSORS'];
 return computerChoice[Math.floor(Math.random() * 3)];
 };
  
//Checking result
function playerMove(playerPick){
    computerPick = computerMove();
    roundCount++;

//compare choices, return result
                if(playerPick == computerPick){
                    writeText("<br>You have to win "+newGame+" rounds<br><br>"+"ROUNDS TOTAL: " +roundCount+ "<br><br>" + "IT'S TIE: you played " + playerPick + ", computer played " + computerPick);
                    writeResult('PLAYER '+playerPoints+' : '+computerPoints +' COMPUTER<br>');
                } 
                else if((playerPick == 'ROCK' && computerPick == 'PAPER') || (playerPick == 'SCISSORS' && computerPick == 'ROCK') || (playerPick == 'PAPER' && computerPick == 'SCISSORS')){
                    computerPoints++;
                    writeText("<br>You have to win "+newGame+" rounds<br><br>"+"ROUNDS TOTAL: " +roundCount+ "<br><br>" + "COMPUTER WON: you played " + playerPick + ", computer played " + computerPick);
                    writeResult('PLAYER '+playerPoints+' : '+computerPoints +' COMPUTER<br>');
                }
                else{
                    playerPoints++;
                    writeText("<br>You have to win "+newGame+" rounds<br><br>"+"ROUNDS TOTAL: " +roundCount+ "<br><br>" + "YOU WON: you played " + playerPick + ", computer played " + computerPick);
                    writeResult('PLAYER '+playerPoints+' : '+computerPoints +' COMPUTER<br>');
                }
  
                if(playerPoints == newGame){
                    continueGame = false;
                    result.insertAdjacentHTML('beforeEnd', "<br><b>YOU WON THE ENTIRE GAME!!!</b>")
                }
                else if(computerPoints == newGame){
                    continueGame = false;
                    result.insertAdjacentHTML('beforeEnd', "<br><b>COMPUTER WON THE ENTIRE GAME!!!<b>")
                }   
}

//Buttons
Paper.addEventListener('click', function(){	
        if(continueGame == false){
            result.insertAdjacentHTML('beforeEnd', "<br>Game over, please press the new game button!")
        }
        else if (continueGame == true){
            playerMove('PAPER');
        }
})

Rock.addEventListener('click', function(){	
        if(continueGame == false){
            result.insertAdjacentHTML('beforeEnd', "<br>Game over, please press the new game button!")
        }
        else if (continueGame == true){
            playerMove('ROCK');
        }
})

Scissors.addEventListener('click', function(){	
        if(continueGame == false){
            result.insertAdjacentHTML('beforeEnd', "<br>Game over, please press the new game button!")
        }
        else if (continueGame == true){
            playerMove('SCISSORS');
        }
})
})(); 
