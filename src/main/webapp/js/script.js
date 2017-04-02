

// function click(){
//   document.querySelector("#q1").innerHTML="<img src='images/x-tris.jpg'></img>";
// }
document.addEventListener("DOMContentLoaded",
  function (event) {

    // Unobtrusive event binding
    document.querySelector("button")
      .addEventListener("click", function () {


        // Call server to get the name
        $ajaxUtils
          .sendGetRequest("rest/game",
            function (request) {
              var arrayGriglia = request.responseText;

                          document.querySelector("")
                            .innerHTML = "";

            });

      });
  }
);
