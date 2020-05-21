class Sleep {
  constructor(id, sleepData) {
    this.userSleep = this.getUserSleep(id, sleepData);
  }

  getUserSleep(id, sleepData) {
    return sleepData.filter(sleep => sleep.userID === id);
  }

  checkDate(date) {
    let isDate = new Date(date);
    let newIsDate = isDate.getFullYear() + "/" +
      ("0" + (isDate.getMonth() + 1)).slice(-2) + "/" +
      ("0" + isDate.getDate()).slice(-2);
    return newIsDate;
  }

  getDailySleepProp(date, property) {
    let newDate = this.checkDate(date);
    if (date !== newDate) {
      return 'You must pass a valid date';
    } else {
      let sleepEntry = this.userSleep.filter(sleep => sleep.date === date);
      return sleepEntry.reduce((acc, sleep) => {
        acc += sleep[property];
        return acc;
      }, 0)
    }
  }

  getAvgSleepProp(property) {
    let avg = this.userSleep.reduce((acc, sleep) => {
      return acc += sleep[property] / this.userSleep.length;
    }, 0)
    return Number(avg.toFixed(1));
  }

  getWeeklySleepProp(date, property) {
    let newDate = this.checkDate(date);
    if (date !== newDate) {
      return 'You must pass a valid date';
    } else {
      let sleepDate = this.userSleep.find(sleep => sleep.date === date);
      let firstDate = this.userSleep.indexOf(sleepDate);
      return this.userSleep
        .slice(firstDate, firstDate + 7)
        .map(sleep => sleep[property]);
    }
  }
}

if (typeof module !== 'undefined') {
  module.exports = Sleep;
}