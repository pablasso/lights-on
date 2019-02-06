const tessel = require("tessel");
const ambientlib = require("ambient-attx4");
const ambient = ambientlib.use(tessel.port["A"]);
const axios = require("axios");

ambient.on("ready", () => {
  const UPPER_BOUND = 0.1;
  const LOWER_BOUND = 0.05;
  let turned = true;

  setInterval(() => {
    ambient.getLightLevel((err, lightdata) => {
      if (err) throw err;
      console.log("Light level:", lightdata.toFixed(8));

      if (turned && lightdata < LOWER_BOUND) {
        console.log("Light OFF detected! sending request..");
        persistRecord(lightdata, "Light turned OFF");
        turned = false;
      } else if (!turned && lightdata > UPPER_BOUND) {
        console.log("Light ON detected! sending request..");
        persistRecord(lightdata, "Light turned ON");
        turned = true;
      }
    });
  }, 500);
});

ambient.on("error", err => {
  console.log(err);
});

const persistRecord = (light_level, message) => {
  const SERVER_URL =
    "https://wt-603f81c7285a850c4ebc09e59f4a017e-0.sandbox.auth0-extend.com/tecel";

  axios
    .post(SERVER_URL, {
      light: light_level,
      message: message
    })
    .then(res => {
      console.log("Request sent.");
    })
    .catch(error => {
      console.error(error);
    });
};
