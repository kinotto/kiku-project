//var mysql      = require('mysql');
/*
var user = {
  userName: 'pippo',
  password: 'pluto'
}
var options = {
  method: "POST",
  url: "http://localhost:8080/jerseybackend/rest/login",
  dataType: "json",
  data: JSON.stringify(eval(user)),
  contentType: "application/json"
};


var promise = $.ajax(options);
promise.done(function(response){
  console.log(response);
})
*/

var user = {
  userName: 'pippo33',
  password: 'pluto33'
}
var options = {
  method: "POST",
  url: "http://10.0.0.18:8080/jerseybackend/rest/register",
  dataType: "json",
  data: JSON.stringify(eval(user)),
  contentType: "application/json"
};


var promise = $.ajax(options);
promise.done(function(response){
  console.log(response);
})
