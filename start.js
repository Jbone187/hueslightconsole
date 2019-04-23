let hue = require("node-hue-api"),
  HueApi = hue.HueApi,
  lightState = hue.lightState;

let inquirer = require('inquirer');

let displayResult = function (result) {
  console.log(result);
};

let displayError = function (err) {
  console.error(err);
};

let host = "10.0.0.115",
  username = "",
  api = new HueApi(host, username),
  state = lightState.create();

// Now turn on the lamp


inquirer
  .prompt([{
      type: 'list',
      name: 'BC1',
      message: "Please select first bulb color",
      choices: ['Red', 'Blue', 'Green', 'Purple']
    },
    {
      type: 'list',
      name: 'BC2',
      message: "Please select second bulb color",
      choices: ['Red', 'Blue', 'Green', 'Purple']

    }
  ])
  .then(answers => {
    console.log(`You have selected ${answers.BC1} and ${answers.BC2} as your bulb color's`);

    let Blue = state.rgb(0, 0, 255);
    let Red = state.rgb(255, 0, 0);
    let Green = state.rgb(0, 204, 0);
    let Purple = state.rgb(153, 0, 153);


    function setOne() {
      // state.rgb(0, 0, 255);
      function answersBC1(color) {
        if (color === 'Red') {
          Red()
        } else if (color === 'Blue') {
          Blue()
        } else if (color === 'Green') {
          Green()
        } else if (color === 'Purple') {
          Purple()
        }
      };
      answersBC1(answers.BC1)

      api.setLightState(4, state.on(), function (err, result) {
        if (err) throw err;
        displayResult(result);
      });

      api.setLightState(6, state.on(), function (err, result) {
        if (err) throw err;
        displayResult(result);
      });
    }

    function setTwo() {
      setTimeout(function () {
        // state.rgb(255, 0, 0);

        function answersBC2(color) {
          if (color === 'Red') {
            Red()
          } else if (color === 'Blue') {
            Blue()
          } else if (color === 'Green') {
            Green()
          } else if (color === 'Purple') {
            Purple()
          }
        };
        answersBC2(answers.BC2)

        api.setLightState(4, state.on(), function (err, result) {
          if (err) throw err;
          displayResult(result);
        });

        api.setLightState(6, state.on(), function (err, result) {
          if (err) throw err;
          displayResult(result);
        });
      }, 5000);
    }

    function* run() {
      yield setOne();

      yield setTwo();
    }

    setInterval(function () {
      let partylight = run();
      partylight.next();
      partylight.next();
    }, 10000);

  });