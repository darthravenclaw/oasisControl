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
const days = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];

const app = Vue.createApp({
  data: () => {
    return {
      data: {},
      test: "hello",
      time: "",
      date: "",
    };
  },
  methods: {
    get: () => {
      return "get worked";
    },
    updateTime() {
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
    setup() {
      setInterval(this.updateTime, 1000);
      console.log("setup run");
    },
    setWeekend() {
      console.log("weekend");
      let foundWeekend = false;
      for (let i = 0; i < this.data.days.length; i++) {
        console.log(this.data.days[i].dayCode);
        if (!foundWeekend) {
          if (
            this.data.days[i].dayCode == 0 ||
            this.data.days[i].dayCode == 6 ||
            this.data.days[i].dayCode == 7
          ) {
            this.data.days[i].showWeekend = true;
            i++;
            this.data.days[i].showWeekend = true;
            i++;
            this.data.days[i].showWeekend = true;
            foundWeekend = true;
          } else {
            this.data.days[i].showWeekend = false;
          }
        } else {
          this.data.days[i].showWeekend = false;
        }
      }
    },
    setFull() {
      this.data.days.forEach((day) => (day.showWeekend = true));
    },
    getTime(time) {
      const date = new Date(time * 1000);
      // console.log(date);
      const h = date.getHours();
      return `${this.pad(date.getHours())}:${this.pad(date.getMinutes())}`;
    },
    pad(num) {
      return num < 10 ? "0" + num : num;
    },
    formatDate(date) {
      const d = new Date(date);
      return `${days[d.getDay()]} ${months[d.getMonth()]} ${d.getDate()}`;
    },
    toggleShow(day) {
      console.log("click");
      day.showFull = !day.showFull;
    },
    getData() {
      fetch("./data.json")
        //   fetch("https://fair-probable-wrinkle.glitch.me/weather")
        .then((res) => {
          console.log("asdf");
          if (res.ok) {
            return res.json();
          } else {
            console.log("error");
          }
        })

        .then((data) => {
          this.data = data;
          console.log(data);
          this.data.days.forEach((day) => {
            let dateString = day.valid_date;
            let dArray = dateString.split("-");
            let tempDate = new Date(dArray[0], dArray[1] - 1, dArray[2]);
            day.dayCode = tempDate.getDay();
            if (!("showFull" in day)) {
              day.showFull = false;
            }
            if (!("showWeekend" in day)) {
              day.showWeekend = true;
            }
          });
        });
    },
  },
  mounted() {
    this.getData();
    this.setup();
  },
});

app.mount("#app");
