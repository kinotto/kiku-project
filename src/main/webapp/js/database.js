if(localStorage.getItem("username") !== null){
  document.getElementById("main-content").innerHTML = "<div style='width:100%; height:430px; display: flex; align-items: center;'><img class='img-responsive center-block' src='images/loader2.gif' style='width:100px; height:100px;'></img><div>";
  document.getElementById("welcome").remove();
  document.getElementById("user").innerHTML = "Benvenuto " + localStorage.getItem("username") + " !!";
  document.getElementById("logout").style.display = "block";
  document.getElementById("toggleNav").style = "";
  var user = {
    userName: localStorage.getItem("username")
  }
  setTimeout(function(){
    showGame();
  }, 500);

}
else{
  $.ajax({
    method: "GET",
    url: "notLoggedContent.html"
  }).done(function(response){
    document.querySelector("#main-content").innerHTML = response;
  })
}


//Blocco che permette il click del bottone login alla pressione del tasto enter
var elementsLog = document.querySelectorAll("#inputUsernameLog, #inputPasswordLog"); //elemento che contiene i riferimenti alle caselle di testo del login
for (var i = 0; i < elementsLog.length; i++) {
  elementsLog[i].addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode == 13) {
      document.querySelector("#buttonLog").click();
    }
  });
}

//Blocco che permette il click del bottone register alla pressione del tasto enter
var elementsReg = document.querySelectorAll("#inputUsernameReg, #inputPasswordReg");
for (var i = 0; i < elementsReg.length; i++) {
  elementsReg[i].addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode == 13) {
      document.querySelector("#buttonReg").click();
    }
  });
}


function login(){
  // $.ajax(
  //   method:"GET",
  //   url: "images/loader.gif"
  // ).

  var email = document.getElementById('inputUsernameLog').value;
  var passwd = document.getElementById('inputPasswordLog').value;
  var user = {
    userName: email,
    password: passwd
  }
  var options = {
    method: "POST",
    url:  config.apiLogin,
    dataType: "json",
    data: JSON.stringify(eval(user)),
    contentType: "application/json"
  };

  if (user.userName === "" && user.password === "") {
    document.getElementById('resultLog').innerHTML = "Riempi tutti i campi";
  }
  else {

    document.getElementById("resultLog").innerHTML = "<img class='img-responsive center-block' src='images/loader1.gif' style='width:30px; height:30px;'></img>";
    var promise = $.ajax(options);
    promise.done(function(response){
      if(response === true){
        localStorage.setItem("username",user.userName);
        window.user = user;
        // window.location.replace("indexLogged.html");
        document.getElementById("user").innerHTML = "Benvenuto " + user.userName + " !!";
        document.getElementById("welcome").remove();
        document.getElementById("logout").style.display = "block";
        document.getElementById("toggleNav").style = "";
        $.ajax({
          method:"GET",
          url:"loggedContent.html"
        }).done(function(response){
          // document.querySelector('#main-content').remove().children;
          $('#login-modal').modal('hide');
          document.querySelector("#main-content").innerHTML = response;
          getScore();
        })


      }
      else{
        document.getElementById('resultLog').innerHTML = "Nome utente o password errati!"
      }
    })
  }


}



function register(){
  var email = document.getElementById('inputUsernameReg').value;
  var passwd = document.getElementById('inputPasswordReg').value;
  var user = {
    userName: email,
    password: passwd
  }
  var options = {
    method: "POST",
    url: config.apiRegister,
    dataType: "json",
    data: JSON.stringify(eval(user)),
    contentType: "application/json"
  };
  if (user.userName === "" && user.password === "") {
    document.getElementById('resultReg').innerHTML = "Riempi tutti i campi";
  }
  else {
    document.getElementById("resultReg").innerHTML = "<img class='img-responsive center-block' src='images/loader1.gif' style='width:30px; height:30px;'></img>";
    var promise = $.ajax(options);
    promise.done(function(response){
      if(response === true){
        document.getElementById('resultReg').innerHTML = "Registrazione effettuata correttamente!"
      }
      else{
        document.getElementById('resultReg').innerHTML = "Campi non validi"
      }
      document.getElementById('inputUsernameReg').value = "";
      document.getElementById('inputPasswordReg').value = "";
    })
  }



}

function regScore(){
  var punteggi = {
    username: window.user.userName,
    vittorie: window.punteggi.vittorie,
    pareggi: window.punteggi.pareggi,
    sconfitte: window.punteggi.sconfitte
  }
  var options = {
    method: "POST",
    url: config.apiRegScore,
    dataType: "json",
    data: JSON.stringify(eval(punteggi)),
    contentType: "application/json"
  };
  var promise = $.ajax(options);
  promise.done(function(response){
    console.log(response);
  })
}

function getScore(){
  document.querySelector('#vittorie').innerHTML = "<img class='img-responsive center-block' src='images/loader2.gif' style='width:30px; height:30px;'></img>";
  document.querySelector('#pareggi').innerHTML = "<img class='img-responsive center-block' src='images/loader2.gif' style='width:30px; height:30px;'></img>";
  document.querySelector('#sconfitte').innerHTML = "<img class='img-responsive center-block' src='images/loader2.gif' style='width:30px; height:30px;'></img>";
  var username = window.user.userName;
  var options = {
    method: "GET",
    url: config.apiGetScore + "?Nome_Utente=" + username,
    dataType: "json",
    contentType: "application/json"
  };
  var promise = $.ajax(options);
  promise.done(function(response){
    punteggi.vittorie = response[0];
    punteggi.pareggi = response[1];
    punteggi.sconfitte = response[2];
    updateScores();
  })
}

function showInfoPage(){
  document.querySelector("#toggleNav").click();
  var options = {
    method: "GET",
    url: "infoPage.html"
  }
  $.ajax(options).done(function(response){
    document.querySelector("#main-content").innerHTML = response;
  })
}

function showGame(){
  var options = {
    method: "GET",
    url: "loggedContent.html"
  }
  $.ajax(options).done(function(response){
    document.querySelector("#main-content").innerHTML = response;
    getScore();
  })
}

function updateScores(){
  document.querySelector('#vittorie').innerHTML = punteggi.vittorie;
  document.querySelector('#pareggi').innerHTML = punteggi.pareggi;
  document.querySelector('#sconfitte').innerHTML = punteggi.sconfitte;
}
