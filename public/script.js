let poolTempLabel = document.getElementById("poolTemp");
let indoorTempLabel = document.getElementById("indoorTemp");
let indoorHumLabel = document.getElementById("indoorHumidity");
let outdoorTempLabel = document.getElementById("outdoorTemp");
let outdoorHumLabel = document.getElementById("outdoorHumidity");
let timeVal = document.getElementById("timeVal");
let dateVal = document.getElementById("dateVal");
let fridayDateLabel = document.getElementById("fridayDate");
let fridayDiscLabel = document.getElementById("fridayDisc");
let fridayHighLabel = document.getElementById("fridayHigh");
let saturdayDateLabel = document.getElementById("saturdayDate");
let saturdayDiscLabel = document.getElementById("saturdayDisc");
let saturdayHighLabel = document.getElementById("saturdayHigh");
let sundayDateLabel = document.getElementById("sundayDate");
let sundayDiscLabel = document.getElementById("sundayDisc");
let sundayHighLabel = document.getElementById("sundayHigh");

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

setInterval (updateData,1000);
async function updateData (){
    let d = new Date()
    let h = d.getHours();
    if (h < 10){h = "0"+h};
    let m = d.getMinutes();
    if (m < 10){m = "0"+m};
    let s = d.getSeconds();
    if (s < 10){s = "0"+s};
    timeVal.innerHTML = h + ":" +m + ":" + s;
    dateVal.innerHTML = `${days[d.getDay()]} ${months[d.getMonth()]} ${d.getDate()}`;
    const apiUrl = 'weather';
    const fetchRes = await fetch(apiUrl);
    const fetchedJSON = await fetchRes.json();
    const data = await JSON.parse(fetchedJSON);
   
    poolTempLabel.innerHTML=data.poolTemp;
    indoorTempLabel.innerHTML=data.indoorTemp;
    indoorHumLabel.innerHTML=data.indoorHum+"%";
    outdoorTempLabel.innerHTML=data.outdoorTemp; 
    outdoorHumLabel.innerHTML=data.outdoorHum+"%";
    fridayDateLabel.innerHTML=data.fridayDate;
    fridayDiscLabel.innerHTML=data.fridayDisc;
    fridayHighLabel.innerHTML=data.fridayHigh;
    saturdayDateLabel.innerHTML=data.saturdayDate;
    saturdayDiscLabel.innerHTML=data.saturdayDisc;
    saturdayHighLabel.innerHTML=data.saturdayHigh;
    sundayDateLabel.innerHTML=data.sundayDate;
    sundayDiscLabel.innerHTML=data.sundayDisc;
    sundayHighLabel.innerHTML=data.sundayHigh;
}

