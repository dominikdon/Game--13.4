'use strict';
(function(){ 
//variables
var output = document.getElementById('output');
var result = document.getElementById('result');
var resultMessage = document.getElementById('result-message');
var Paper = document.getElementById('paper');
var Rock = document.getElementById('rock');
var Scissors = document.getElementById('scissors');
var NewGame = document.getElementById('new-game');
var playerPick;
var computerChoice;
var computerPick;
var winner;
var continueGame;
var info;
var result;
var data = 0;
var params = {
	playerPoints: 0,
	computerPoints: 0,
	roundCount: 0,
	newGame: 0,
	progress: [],
}

Paper.style.visibility='hidden';
Rock.style.visibility='hidden';
Scissors.style.visibility='hidden';

//Modal
  function showModal(){
		document.querySelector('#modal-overlay').classList.add('show');
	};	
  
  var hideModal = function(){
		document.querySelector('#modal-overlay').classList.remove('show');
	};
	
	var closeButtons = document.querySelectorAll('.modal .close');
	
	for(var i = 0; i < closeButtons.length; i++){
		closeButtons[i].addEventListener('click', hideModal);
	}
  
  document.querySelector('#modal-overlay').addEventListener('click', hideModal);
  	var modals = document.querySelectorAll('.modal');
	
	for(var i = 0; i < modals.length; i++){
		modals[i].addEventListener('click', function(event){
			event.stopPropagation();
		})};

//show, hide buttons 
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
    params.newGame = window.prompt('How many rounds do you want to play?');
    writeText('') ;
    writeResult('');
    resultMessage.innerHTML = ""
    params.progress = [];
    params.playerPoints = 0;
    params.computerPoints = 0;
    params.roundCount = 0;
    continueGame = true;
  
    if (params.newGame === '' || isNaN(params.newGame) || params.newGame == null || params.newGame.trim().length == 0) {
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
    params.roundCount++;
    winner = 'DRAW';
//compare choices, return result
                if(playerPick == computerPick){
                    writeText("<br>You have to win "+params.newGame+" rounds<br><br>"+"ROUNDS TOTAL: " +params.roundCount+ "<br><br>" + "IT'S TIE: you played " + playerPick + ", computer played " + computerPick);
                    writeResult('PLAYER '+params.playerPoints+' : '+params.computerPoints +' COMPUTER<br>');
                } 
                else if((playerPick == 'ROCK' && computerPick == 'PAPER') || (playerPick == 'SCISSORS' && computerPick == 'ROCK') || (playerPick == 'PAPER' && computerPick == 'SCISSORS')){
                    params.computerPoints++;
                    winner = 'COMPUTER';
                    writeText("<br>You have to win "+params.newGame+" rounds<br><br>"+"ROUNDS TOTAL: " +params.roundCount+ "<br><br>" + "COMPUTER WON: you played " + playerPick + ", computer played " + computerPick);
                    writeResult('PLAYER '+params.playerPoints+' : '+params.computerPoints +' COMPUTER<br>');
                }
                else{
                    params.playerPoints++;
                    winner = 'PLAYER';
                    writeText("<br>You have to win "+params.newGame+" rounds<br><br>"+"ROUNDS TOTAL: " +params.roundCount+ "<br><br>" + "YOU WON: you played " + playerPick + ", computer played " + computerPick);
                    writeResult('PLAYER '+params.playerPoints+' : '+params.computerPoints +' COMPUTER<br>');
                }
  
                if(params.playerPoints == params.newGame){
                    continueGame = false;
                    var scoreInfo = [
                          {
                              info: '<br>YOU WON THE ENTIRE GAME!!!<br>',
                              result: '<br>PLAYER '+params.playerPoints+' : '+params.computerPoints +' COMPUTER<br>',

                          }]
                    showModal();
                }
                else if(params.computerPoints == params.newGame){
                    continueGame = false;
                    var scoreInfo = [
                              {
                              info: '<br>COMPUTER WON THE ENTIRE GAME!!!<br>',
                              result: '<br>PLAYER '+params.playerPoints+' : '+params.computerPoints +' COMPUTER<br>',
                              }]
                    showModal();
                }; 
  
// Table
    function createTable(){
       var table = document.getElementById('table');
       table.innerHTML = '';
       for(var i = 0; i < params.progress.length; i++) {
         var tr = document.createElement('tr');
       for(var key in params.progress[i]){
           var td = document.createElement('td');
           var text = document.createTextNode(params.progress[i][key]);       
           td.appendChild(text);
           tr.appendChild(td);
            }
           table.appendChild(tr);
       }    
     };

    params.progress.push({
       round: params.roundCount, 
       player: playerPick,
       computer: computerPick, 
       playerScore: winner,   
       computerScore: params.playerPoints+ ':' +params.computerPoints,
    });
  
//Modal's message  
     for (var i = 0, boxes = scoreInfo.length; i < boxes; i++) {
        var whoWin = scoreInfo[i].info;
        var score = scoreInfo[i].result;
        resultMessage.insertAdjacentHTML('beforeEnd', whoWin);
        resultMessage.insertAdjacentHTML('beforeEnd', score);
        createTable()  
     }
}

// Click button  
var Buttons = document.querySelectorAll('.player-move');
for( var i = 0; i < Buttons.length; i++ ){			
  Buttons[i].addEventListener('click', function(event){
            if(continueGame == false){
              result.insertAdjacentHTML('beforeEnd', "<br>Game over, please press the new game button!")
            }
            else if (continueGame == true){
              playerMove(this.getAttribute('data-move'));
            }
  })};    
})();