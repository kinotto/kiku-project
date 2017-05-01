//var mysql      = require('mysql');


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
    document.getElementById("resultLog").innerHtml = "<img src='images/loader.gif'></img>";
    var promise = $.ajax(options);
    promise.done(function(response){
      if(response === true){
        window.user = user;
        // window.location.replace("indexLogged.html");
        document.getElementById("user").innerHTML = "Benvenuto " + user.userName + "!!";
        document.getElementById("underWelcome").remove();
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
