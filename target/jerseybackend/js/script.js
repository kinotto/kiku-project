// oggetto che contiene squadra e array vuoto che conterrà le posizioni della x e o
var game = {
  team: "X",
  state: ["","","","","","","","",""]
}

// oggetti che contiene stato iniziale punteggi
var punteggi = {
  vittorie: 0,
  pareggi: 0,
  sconfitte: 0
}


var isClicked = false; //variabile che permette di non cliccare altre celle mentre si aspetta la risposta dal server

// funzione che gestisce il click del mouse all'interno di ogni cella
function handleClick(index){
  if(game.state[index] === "" && isClicked === false){
    game.state[index] = game.team.toUpperCase();
    updateTrisDom();

    isClicked = true;
    /* inizio libreria TicTacToe*/
    var board = new TicTacToe.TicTacToeBoard(game.state);
    var aiTeam = board.oppositePlayer(game.team);
    var aiPlayer = new TicTacToe.TicTacToeAIPlayer();
    aiPlayer.initialize(aiTeam, board);
    var move = aiPlayer.makeMove(); //istruzione che esegue algoritmo intelligenza artificiale
    if(move != null){
      board.makeMove(aiTeam, move);
    }
    /* fine libreria */
    game.state = board.board;
    setTimeout(function(){
      updateTrisDom(); //aggiorno il tris dopo 500ms
    },500)

    isClicked = false;
    setTimeout(function(){
      var winner = board.winner(); //variabile che contiene il vincitore
      if (winner !== null) { //entra solo se si ha gia un vincitore
        if (winner.cell === ""){ //entra se non ci sono vincitori
          punteggi.pareggi++; //incrementa punteggio
          bootbox.confirm({ //modale che conferma il pareggio
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
              if (result === true) {
                emptyTris();
              }
              else {
                logout();
              }
            }
          });
        }
        else if (winner.cell === "O") { //entra se il vincitore è l'avversario
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
              if (result === true) { //entra se si clicca sul bottone si
                emptyTris();
              }
              else {
                logout();
              }
            }
          });

        }
        updateScores();
        regScore();
      }

    }, 500)


  }

};

// funzione che dall'oggetto game recupera posizione x e o e inserisce l'immagine nella posizione corretta della cella
function updateTrisDom(){
  var tris = document.querySelector("#tris");
  for (var i = 0; i < tris.children.length; i++) {

    if(game.state[i] !== ""){
      if(game.state[i].toUpperCase() ===  "X"){
        tris.children[i].innerHTML = "<img class='img img-responsive center-block' src='images/x-tris.jpg'></img>";
      }
      else if(game.state[i].toUpperCase() ===  "O"){
        tris.children[i].innerHTML = "<img class='img img-responsive center-block' src='images/o-tris.jpg'></img>";
      }
    }
  }
}

// funzione che svuota il tris
function emptyTris(){
  game.state = ["","","","","","","","",""];
  for (var i = 0; i < tris.children.length; i++) {
    tris.children[i].innerHTML = "";
  }
}

//funzione che riavvia la pagina elliminando dalla memoria locale del browser l'username
function logout(){
  localStorage.removeItem("username");
  window.location.reload();
}
