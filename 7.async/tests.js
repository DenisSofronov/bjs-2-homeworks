class AlarmClock {
  constructor() {
    this.alarmCollection = [];
    this.timerId = null;
  }

  addClock(clockTime, callback, clockId) {
    if (!clockId) {
      throw new Error("Alarm clock ID not found");
    }
    if (this.alarmCollection.find((item) => item.clockId === clockId)) {
      console.error("The alarm-clock with same ID already exists")
    } else {
      this.alarmCollection.push({
        clockTime,
        callback,
        clockId
      });
    }
  }

  removeClock(clockId) {
    this.alarmCollection = this.alarmCollection.filter((item) => item.clockId !== clockId);
    if (this.alarmCollection.length === this.alarmCollection.length) {
      console.log("Alarm-clock not found.");
      return false;
    } else {
      console.log("Alarm-clock has been deleted");
      return true;
    }
  }

  getCurrentFormattedTime() {
    const date = new Date();
    let HH = date.getHours();
    let MM = date.getMinutes();
    if (HH < 10) {
      HH = "0" + HH;
    }
    if (MM < 10) {
      MM = "0" + MM;
    }
    return `${HH}:${MM}`;
  }

  start() {
    const checkClock = (alarmClock) => {
      if (alarmClock.clockTime === this.getCurrentFormattedTime()) {
        alarmClock.callback();
      }
    };

    if (this.timerId !== null) {
      this.timerId = setInterval(() => {
        this.alarmCollection.forEach((alarmClock) => checkClock(alarmClock))
      }, 1000);
    }
  }

  stop() {
    if (this.timerId !== null) {
      clearInterval(this.timerId);
    }
    this.timerId = null;
  }

  printAlarms() {
    console.log("the total number of alarm-clocks is ${this.alarmCollection.length}.");
    this.alarmCollection.forEach((alarmClock) => console.log("Alarm-clock with ID ${alarmClock.clockId} is timed to go off at ${alarmClock.clockTime}."));
  }

  clearAlarms() {
    this.stop()
    this.alarmCollection = [];
  }
}

function testCase() {
  let phoneAlarm = new AlarmClock();
  phoneAlarm.addClock("09:00", () => console.log("Пора вставать"), 1);
  phoneAlarm.addClock("09:01", () => {
    console.log("Давай, вставай уже!");
    phoneAlarm.removeClock(2)
  }, 2);
  phoneAlarm.addClock("09:02", () => {
    console.log("Вставай, а то проспишь!");
    phoneAlarm.clearAlarms();
    phoneAlarm.printAlarms();
  }, 3);
  phoneAlarm.printAlarms()
  phoneAlarm.start();
}

testCase();
