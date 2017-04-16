
var URL = {
  test: "http://10.0.0.18:8080/jerseybackend/rest/game",
  final: "rest/game"
}


var game = {
  team: "x",
  state: ["","","","","","","","",""]
}
var isClicked = false;
function handleClick(index){
  if(game.state[index] === "" && isClicked === false){
    game.state[index] = game.team;
    updateTrisDom();
    //document.querySelector("#q1").innerHTML="<img src='images/x-tris.jpg'></img>";

    isClicked = true;
    var options = {
      method: "POST",
      url: URL.final,
      dataType: "json",
      data: JSON.stringify(game),
      contentType: "application/json"
    };

    var promise = $.ajax(options);
    promise.done(function(response){
      game.state = response.state;
      updateTrisDom();
      isClicked = false;
      setTimeout(function(){

        if (response.winner.team !== "") {
          if (response.winner.team.toUpperCase() === "O") {
            alert("Ha vinto il computer");
          }

        }
        if (response.draw === true){
          alert("Il risultato è un pareggio");
        }
      }, 1000)

    });

  }

};

function updateTrisDom(){
  var tris = document.querySelector("#tris");
  for (var i = 0; i < tris.children.length; i++) {
    var child = tris.children[i];

      if(game.state[i] !== ""){
         if(game.state[i].toUpperCase() ===  "X"){
          tris.children[i].innerHTML = "<img src='images/x-tris.jpg'></img>";
        }
        else if(game.state[i].toUpperCase() ===  "O"){
          tris.children[i].innerHTML = "<img src='images/o-tris.jpg'></img>";
        }
      }


  }
}
