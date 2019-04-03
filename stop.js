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
  username = "Yh9QU2CRGN76hIqgHYsqUAXkYK5ygh8wfpSEK37H",
  api = new HueApi(host, username),
  state = lightState.create();

setTimeout(function() {
  api.setLightState(4, state.off(), function(err, result) {
    if (err) throw err;
    displayResult(result);
  });

  api.setLightState(6, state.off(), function(err, result) {
    if (err) throw err;
    displayResult(result);
  });
}, 1000);
