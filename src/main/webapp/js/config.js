var ambiente = "raspberry"; //ambiente con cui si collega la macchina
var config = {
  apiLogin: {
    local: "http://10.0.0.15:8080/jerseybackend/rest/login",
    raspberry: "rest/login"
  },
  apiRegister:{
    local: "http://10.0.0.15:8080/jerseybackend/rest/register",
    raspberry: "rest/register"
  },
  apiRegScore:{
    local: "http://10.0.0.15:8080/jerseybackend/rest/regScore",
    raspberry: "rest/regScore"
  },
  apiGetScore:{
    local: "http://10.0.0.15:8080/jerseybackend/rest/getScore",
    raspberry: "rest/getScore"
  }
}
if(ambiente === "locale"){
  config.apiLogin = config.apiLogin.local; //apiLogin da oggetto diventa una stringa
  config.apiRegister = config.apiRegister.local;
  config.apiRegScore = config.apiRegScore.local;
  config.apiGetScore = config.apiGetScore.local;
}
else if(ambiente === "raspberry"){
  config.apiLogin = config.apiLogin.raspberry;
  config.apiRegister = config.apiRegister.raspberry;
  config.apiRegScore = config.apiRegScore.raspberry;
  config.apiGetScore = config.apiGetScore.raspberry;
}
