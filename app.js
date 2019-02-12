let hue = require("node-hue-api"),
  HueApi = hue.HueApi,
  lightState = hue.lightState;

let displayResult = function(result) {
  console.log(result);
};

let displayError = function(err) {
  console.error(err);
};

let host = "10.0.0.115",
  username = "",
  api = new HueApi(host, username),
  state = lightState.create();

// Now turn on the lamp
setTimeout(function() {
  state.colorLoop();

  api.setLightState(4, state.on(), function(err, result) {
    if (err) throw err;
    displayResult(result);
  });

  api.setLightState(6, state.on(), function(err, result) {
    if (err) throw err;
    displayResult(result);
  });
}, 1000);
