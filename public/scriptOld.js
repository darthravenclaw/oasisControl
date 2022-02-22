const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const app = Vue.createApp({
  data() {
    return {
      time: "00:00:00",
      date: "",
      indoorTemp: 67,
      indoorHum: 29,
      outdoorTemp: 17,
      outdoorHum: 29,
      poolTemp: undefined,
      days: [
        { Date: "Friday the 18th", Disc: "stuff", High: 37.5, class: "normal" },
        {
          Date: "Saturday the 18th",
          Disc: "stuff",
          High: 26.9,
          class: "freezing",
        },
        { Date: "Sunday the 18th", Disc: "stuff", High: 37.5, class: "normal" },
      ],
    };
  },
  methods: {
    setup() {
      setInterval(this.getTime, 1000);
      this.updateData();
      console.log("setup run")
    },
    getTime() {
      let d = new Date();
      let h = d.getHours();
      if (h < 10) {
        h = "0" + h;
      }
      let m = d.getMinutes();
      if (m < 10) {
        m = "0" + m;
      }
      let s = d.getSeconds();
      if (s < 10) {
        s = "0" + s;
      }
     // console.log(app.time);
      this.time = `${h}:${m}:${s}`;

      this.date = `${days[d.getDay()]} ${months[d.getMonth()]} ${d.getDate()}`;
    },
  
  updateData() {
    console.log("update Run")
   // Simple GET request using fetch
    const apiUrl = "weather";
    fetch(apiUrl)
  .then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      console.log("error");
    }
  }).then((temp)=>JSON.parse(temp))
      .then((data) => {
      console.log(JSON.stringify(data));
      
      if (data.indoorTemp) this.indoorTemp = data.indoorTemp;
      if (data.indoorTemp) this.poolTemp = data.poolTemp;

      if (data.indoorTemp) this.indoorHum = data.indoorHum + "%";

      if (data.indoorTemp) this.outdoorTemp = data.outdoorTemp;
      if (data.indoorTemp)   this.outdoorHum = data.outdoorHum + "%";

        this.days[0].Date = data.fridayDate;
        this.days[0].Disc = data.fridayDisc;
        this.days[0].High = data.fridayHigh;

        this.days[1].Date = data.saturdayDate;
        this.days[1].Disc = data.saturdayDisc;
        this.days[1].High = data.saturdayHigh;

        this.days[2].Date = data.sundayDate;
        this.days[2].Disc = data.sundayDisc;
        this.days[2].High = data.sundayHigh;
      }).then(()=>{
      for (let day of this.days){
        console.log(day);
        if (day.High<32){
          day.class ="freezing";
        }else{
          day.class ="regular";
        }
      }
    })
      
    
  }
  },
  mounted() {
    this.setup();
  }
  
});

app.mount("#app");
