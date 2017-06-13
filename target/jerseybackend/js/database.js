document.getElementById("main-content").innerHTML = "<div style='width:100%; height:430px; display: flex; align-items: center;'><img class='img-responsive center-block' src='images/loader2.gif' style='width:100px; height:100px;'></img><div>"; //mostra il loader al centro della pagina

// chiamata per mostrare il tris al refresh della pagina (entra solo se presente username nella memoria locale del browser)
if(localStorage.getItem("username") !== null){
  document.getElementById("main-content").innerHTML = "<div style='width:100%; height:430px; display: flex; align-items: center;'><img class='img-responsive center-block' src='images/loader2.gif' style='width:100px; height:100px;'></img><div>";
  document.getElementById("welcome").remove();
  document.getElementById("user").innerHTML = "Benvenuto/a " + localStorage.getItem("username") + " !!";
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

// funzione login con chiamata ajax per recuperare la pagina con il gioco
function login(){

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
  // controllo se campi vuoti restituisce stringa di riempire i campi
  if (user.userName === "" && user.password === "") {
    document.getElementById('resultLog').innerHTML = "Riempi tutti i campi";
  }
  else {

    document.getElementById("resultLog").innerHTML = "<img class='img-responsive center-block' src='images/loader1.gif' style='width:30px; height:30px;'></img>"; //mostra loader dopo aver cliccato login
    $.ajax({
      method: "POST",
      url:  config.apiLogin,
      dataType: "json",
      data: JSON.stringify(eval(user)),
      contentType: "application/json"
    }).done(function(response){
      if(response === true){
        localStorage.setItem("username",user.userName);
        window.user = user;
        window.location.reload();
      }
      else{
        document.getElementById('resultLog').innerHTML = "Nome utente o password errati!"
      }
    })
  }


}


// funzione register con chiamata ajax per inviare dati al database
function register(){
  var email = document.getElementById('inputUsernameReg').value; //variabile che contiene username inserito nel campo di testo
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
  // controllo se campi vuoti restituisce stringa di riempire i campi
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
        document.getElementById('resultReg').innerHTML = "Username già in uso"
      }
      document.getElementById('inputUsernameReg').value = "";
      document.getElementById('inputPasswordReg').value = "";
    })
  }



}

// funzione con chiamata ajax per inviare punteggi al database
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

// funzione che recupera i punteggi dal database attraverso una chiamata ajax
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

// funzione che recupera contenuto della pagina di info
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

// funzione che recupera contenuto della pagina col gioco
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

// funzione che aggiorna i punteggi nella pagina
function updateScores(){
  document.querySelector('#vittorie').innerHTML = punteggi.vittorie;
  document.querySelector('#pareggi').innerHTML = punteggi.pareggi;
  document.querySelector('#sconfitte').innerHTML = punteggi.sconfitte;
}
