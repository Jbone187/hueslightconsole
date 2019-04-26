let hue = require("node-hue-api"),
  HueApi = hue.HueApi,
  lightState = hue.lightState;

let inquirer = require("inquirer");

let displayResult = function(result) {
  console.log(result);
};

let displayError = function(err) {
  console.error(err);
};

// Phillip hueslight api connection string

let host = "10.0.0.115",
  username = "Yh9QU2CRGN76hIqgHYsqUAXkYK5ygh8wfpSEK37H",
  api = new HueApi(host, username),
  state = lightState.create();

// Command line interface

inquirer
  .prompt([
    {
      type: "list",
      name: "BC1",
      message: "Please select first bulb color",
      choices: ["Red", "Blue", "Green", "Purple"]
    },
    {
      type: "list",
      name: "BC2",
      message: "Please select second bulb color",
      choices: ["Red", "Blue", "Green", "Purple"]
    }
  ])
  .then(answers => {
    // Turn lights on and associate color based off selected inputs

    function setOne() {
      function answersBC1(color) {
        if (color === "Red") {
          state.rgb(255, 0, 0);
        } else if (color === "Blue") {
          state.rgb(0, 0, 255);
        } else if (color === "Green") {
          state.rgb(23, 88, 7);
        } else if (color === "Purple") {
          state.rgb(160, 32, 240);
        }
      }
      answersBC1(answers.BC1);

      api.setLightState(4, state.on(), function(err, result) {
        if (err) throw err;
        displayResult(result);
      });

      api.setLightState(6, state.on(), function(err, result) {
        if (err) throw err;
        displayResult(result);
      });
    }

    function setTwo() {
      setTimeout(function() {
        function answersBC1(color) {
          if (color === "Red") {
            state.rgb(255, 0, 0);
          } else if (color === "Blue") {
            state.rgb(0, 0, 255);
          } else if (color === "Green") {
            state.rgb(23, 88, 7);
          } else if (color === "Purple") {
            state.rgb(160, 32, 240);
          }
        }
        answersBC1(answers.BC2);

        api.setLightState(4, state.on(), function(err, result) {
          if (err) throw err;
          displayResult(result);
        });

        api.setLightState(6, state.on(), function(err, result) {
          if (err) throw err;
          displayResult(result);
        });
      }, 5000);
    }
    // Push functions through a generator for flow control

    function* run() {
      yield setOne();

      yield setTwo();
    }

    setInterval(function() {
      let partylight = run();
      partylight.next();
      partylight.next();
    }, 10000);

    console.log(
      "\n",
      `You have selected ${answers.BC1} and ${answers.BC2} as your bulb color's`
    );
  });
