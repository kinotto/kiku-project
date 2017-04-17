// var URL = {
//   test: "http://10.0.0.18:8080/jerseybackend/rest/game",
//   final: "rest/game"
// }
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
