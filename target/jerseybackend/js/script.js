var URL = {
  test: "http://10.0.0.18:8080/jerseybackend/rest/game",
  final: "rest/game"
}


var game = {
  team: "X",
  state: ["","","","","","","","",""]
}

var punteggi = {
  vittorie: 0,
  pareggi: 0,
  sconfitte: 0
}
updateScores();

var isClicked = false;
function handleClick(index){
  if(game.state[index] === "" && isClicked === false){
    game.state[index] = game.team.toUpperCase();
    updateTrisDom();
    //document.querySelector("#q1").innerHTML="<img src='images/x-tris.jpg'></img>";

    isClicked = true;
    var board = new TicTacToe.TicTacToeBoard(game.state);
    var aiTeam = board.oppositePlayer(game.team);
    var aiPlayer = new TicTacToe.TicTacToeAIPlayer();
    aiPlayer.initialize(aiTeam, board);
    var move = aiPlayer.makeMove();
    if(move != null){
      board.makeMove(aiTeam, move);
    }
    game.state = board.board;
    setTimeout(function(){
      updateTrisDom();
    },100)

    isClicked = false;
    setTimeout(function(){
      var winner = board.winner();
      if (winner !== null) {
        if (winner.cell === ""){
          punteggi.pareggi++;
          bootbox.confirm({
            title: "Hai Pareggiato!!",
            message: "Vuoi ricominciare?",
            buttons: {
              cancel: {
                label: '<i class="fa fa-times"></i> No, voglio uscire!'
              },
              confirm: {
                label: '<i class="fa fa-check"></i> Si'
              }
            },
            callback: function (result) {
              emptyTris();
              updateScores();
            }
          });
        }
        else if (winner.cell === "O") {
          punteggi.sconfitte++;
          bootbox.confirm({
            title: "Hai Perso:(",
            message: "Vuoi ricominciare?",
            buttons: {
              cancel: {
                label: '<i class="fa fa-times"></i> No, voglio uscire!'
              },
              confirm: {
                label: '<i class="fa fa-check"></i> Si'
              }
            },
            callback: function (result) {
              emptyTris();
              updateScores();
            }
          });

        }

      }

    }, 500)
    // var options = {
    //   method: "POST",
    //   url: URL.test,
    //   dataType: "json",
    //   data: JSON.stringify(eval(game)),
    //   contentType: "application/json"
    // };

    // var promise = $.ajax(options);
    // promise.done(function(response){
    //   game.state = response.state;
    //   updateTrisDom();
    //   isClicked = false;
    // setTimeout(function(){
    //
    //   if (response.winner.team !== "") {
    //     if (response.winner.team.toUpperCase() === "O") {
    //       punteggi.sconfitte++;
    //       bootbox.confirm({
    //         title: "Hai Perso:(",
    //         message: "Vuoi ricominciare?",
    //         buttons: {
    //           cancel: {
    //             label: '<i class="fa fa-times"></i> No, voglio uscire!'
    //           },
    //           confirm: {
    //             label: '<i class="fa fa-check"></i> Si'
    //           }
    //         },
    //         callback: function (result) {
    //           emptyTris();
    //           updateScores();
    //         }
    //       });
    //
    //     }
    //
    //   }
    //   if (response.draw === true){
    //     punteggi.pareggi++;
    //     if (confirm('Il risultato è un pareggio')) {
    //       emptyTris();
    //       updateScores();
    //     }
    //   }
    // }, 500)
    //
    // });

  }

};

function updateTrisDom(){
  var tris = document.querySelector("#tris");
  for (var i = 0; i < tris.children.length; i++) {

    if(game.state[i] !== ""){
      if(game.state[i].toUpperCase() ===  "X"){
        tris.children[i].innerHTML = "<img class='img' src='images/x-tris.jpg'></img>";
      }
      else if(game.state[i].toUpperCase() ===  "O"){
        tris.children[i].innerHTML = "<img class='img' src='images/o-tris.jpg'></img>";
      }
    }


  }
}

function emptyTris(){
  game.state = ["","","","","","","","",""];
  for (var i = 0; i < tris.children.length; i++) {
    tris.children[i].innerHTML = "";
  }
}

function updateScores(){
  document.querySelector('#vittorie').innerHTML = ""+punteggi.vittorie;
  document.querySelector('#pareggi').innerHTML = punteggi.pareggi;
  document.querySelector('#sconfitte').innerHTML = punteggi.sconfitte;
}
