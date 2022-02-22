if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
let poolTemp;
let indoorTemp;
let outdoorTemp;
let indoorHum;
let outdoorHum;
let fridayDate = "na";
let fridayDisc;
let fridayHigh;
let saturdayDate = "na";
let saturdayDisc;
let saturdayHigh;
let sundayDate = "na";
let sundayDisc;
let sundayHigh;
let forcastData;

const AMBIENTWEATHER_API_KEY = process.env.AMBIENTWEATHER_API_KEY;
const AMBIENTWEATHER_APPLICATION_KEY =
  process.env.AMBIENTWEATHER_APPLICATION_KEY;
const WEATHERBIT_API_KEY = process.env.WEATHERBIT_API_KEY;
const port = process.env.PORT || 3000;
const fetch = require("node-fetch");
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

app.get("/weather", async (req, res) => {
  let obj = {
    poolTemp: poolTemp,
    indoorTemp: indoorTemp,
    indoorHum: indoorHum,
    outdoorTemp: outdoorTemp,
    outdoorHum: outdoorHum,
    fridayDate: fridayDate,
    fridayDisc: fridayDisc,
    fridayHigh: fridayHigh,
    saturdayDate: saturdayDate,
    saturdayDisc: saturdayDisc,
    saturdayHigh: saturdayHigh,
    sundayDate: sundayDate,
    sundayDisc: sundayDisc,
    sundayHigh: sundayHigh,
    days: forcastData
  };
  res.json(JSON.stringify(obj));
});

async function getWeatherBitData() {
  const apiUrl = `https://api.weatherbit.io/v2.0/forecast/daily?&postal_code=63119&country=US&units=I&key=${WEATHERBIT_API_KEY}`;
  const fetchRes = await fetch(apiUrl);
  const weatherBitJSON = await fetchRes.json();

  
  for (let i = 0; i < weatherBitJSON.data.length; i++) {
    forcastData = weatherBitJSON.data;
    let dateString = weatherBitJSON.data[i].valid_date;
    let dArray = dateString.split("-");
    let tempDate = new Date(dArray[0], dArray[1] - 1, dArray[2]);

    if (tempDate.getDay() == 5 && fridayDate == "na") {
      fridayDate = `Friday the ${formatDate(tempDate.getDate())}`;
      fridayDisc = weatherBitJSON.data[i].weather.description;
      fridayHigh = weatherBitJSON.data[i].high_temp;
    } else if (tempDate.getDay() == 6 && saturdayDate == "na") {
      saturdayDate = `Saturday the ${formatDate(tempDate.getDate())}`;
      saturdayDisc = weatherBitJSON.data[i].weather.description;
      saturdayHigh = weatherBitJSON.data[i].high_temp;
    } else if (tempDate.getDay() == 0 && sundayDate == "na") {
      sundayDate = `Sunday the ${formatDate(tempDate.getDate())}`;
      sundayDisc = weatherBitJSON.data[i].weather.description;
      sundayHigh = weatherBitJSON.data[i].high_temp;
    }
  }
}
function formatDate(date) {
  switch (date) {
    case 1:
      return date + "st";
    case 2:
      return date + "nd";
    case 3:
      return date + "rd";
    default:
      return date + "th";
  }
}

setInterval(getAmbientWeatherData, 10000);
async function getAmbientWeatherData() {
  try {
    const apiUrl = `https://api.ambientweather.net/v1/devices?applicationKey=${AMBIENTWEATHER_APPLICATION_KEY}&apiKey=${AMBIENTWEATHER_API_KEY}`;
    const fetchRes = await fetch(apiUrl);
    const weatherJSON = await fetchRes.json();

    console.log(weatherJSON[0].lastData);
    if (weatherJSON[0].lastData.temp2f != undefined){
    poolTemp = weatherJSON[0].lastData.temp2f;
    }else{
      poolTemp = "Closed";
    }
    indoorTemp = weatherJSON[0].lastData.tempinf;
    outdoorTemp = weatherJSON[0].lastData.temp1f;
    indoorHum = weatherJSON[0].lastData.humidityin;
    outdoorHum = weatherJSON[0].lastData.humidity1;
  } catch (err) {
    console.log(err);
  }
}
getAmbientWeatherData();
getWeatherBitData();

app.listen(port, () => {
  console.log("server running on port " + port);
});
