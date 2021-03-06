const currentDate = "2019/09/22";
const weekStartDate = "2019/09/16";

const getRandomUser = (array) => {
  let randomIndex =  Math.floor(Math.random() * array.length);
  return array[randomIndex]
}

//CLASS INSTANTIATIONS
const currentUser = new User(getRandomUser(userData));
const sleep = new Sleep(currentUser.id, sleepData);
const sleepRepo = new SleepRepo(sleepData);
const usersRepo = new UsersRepo(userData);
const hydration = new Hydration(currentUser.id, hydrationData);
const activity = new Activity(currentUser.id, activityData, userData);
const activityRepo = new ActivityRepo(activityData);

//SELECTORS
const dateInput = document.getElementById('date-input');
const dailySubmitButton = document.getElementById('daily-submit');
const dateTitle = document.querySelector(".view-title-text");
const weekStepsId = document.getElementById('week-steps');
const weekFlightsId = document.getElementById('week-flights');
const weekMinsActiveId = document.getElementById('week-mins-active');
const userProfileContainer = document.getElementById('user-profile-container')
const competitionContainer = document.getElementById('competition-container')
const myProfileBtn = document.getElementById('my-profile-btn')
const competitionBtn = document.getElementById('competition-btn')
const aside = document.getElementById('aside')
const viewSelectBtns = document.getElementById('view-select-btns')
const dayView = document.getElementById('day-view')
const weekView = document.getElementById('week-view')
const allTimeView = document.getElementById('all-time-view')

//GLOBAL VARIABLES
const createDate = new Date(dateInput.value);
const defaultDateInput = (createDate.getFullYear() + "/" + ("0" + (createDate.getMonth() + 1)).slice(-2) + "/" + ("0" + createDate.getUTCDate()).slice(-2));
const weekStepCount = activity.getActivityPropForWeek(weekStartDate, 'numSteps');  
const weekFlightsClimbed = activity.getActivityPropForWeek(weekStartDate, 'flightsOfStairs');
const weekMinsActive = activity.getActivityPropForWeek(weekStartDate, 'minutesActive');

//FUNCTION DECLARATIONS
const clearStepChallenge = () => {
  const stepChallenge = document.getElementById('step-challenge');
  stepChallenge.innerHTML = "";
}

const changeDateTitle = () => {
  if(event.target.id === 'daily-submit' && !dayView.classList.contains('hide')) {
    dateTitle.innerHTML = `Day of ${dateInput.value}`;
  }
  if(event.target.id === 'daily-submit' && !weekView.classList.contains('hide')) {
    dateTitle.innerHTML = `Week of ${dateInput.value}`
  }
  if(event.target.id === 'daily-submit' && !allTimeView.classList.contains('hide')) {
    dateTitle.innerHTML = `All Time`;
  }
}

const dateHandler = (date) => {
  domUpdates.displaySleepHoursForDay(date);
  domUpdates.displaySleepQualForDay(date);
  domUpdates.displayMilesWalkedForDay(date);
  domUpdates.displayMostActiveUser(date);
  domUpdates.displayLongestSleepers(date);
  domUpdates.displayHighestQualSleepers(date);
  domUpdates.displayHydrationForDay(date);
  charts.dailyStepsCompareChart(date);
  charts.dailyMinActiveCompareChart(date);
  charts.dailyFlightsCompareChart(date);
  domUpdates.displayWeeklyAvgMinutesActive(date);
  domUpdates.displayWeeklyAvgSteps(date);
  domUpdates.displayWeeklyAvgFlights(date);
  domUpdates.displayAllQualitySleepers(date);
  domUpdates.displayStepChallenge(date);
  charts.weeklySleepHoursChart(date);
  charts.weeklySleepQualChart(date);
  charts.weeklyHydrationChart(date);
  charts.weeklyStepsChart(date);
  charts.weeklyFlightsChart(date);
  charts.weeklyMinsActiveChart(date);
}

const changeDate = () => {
  let createDate = new Date(dateInput.value);  
  let correctDateInput = (createDate.getFullYear() + "/" + 
    ("0" + (createDate.getMonth() + 1)).slice(-2) + "/" + 
    ("0" + createDate.getUTCDate()).slice(-2));
  clearStepChallenge();
  dateHandler(correctDateInput);
  changeDateTitle();
}

const getFriends = () => {
  let userFriends = currentUser.friends;
  let userFriendData = [];
  userData.forEach((user) => {
    userFriends.forEach(id => {
      if(user.id === id) {
      userFriendData.push(user);
      }
    })
  })
  return userFriendData
}

const calculateWeeklyStepChallenge = (date) => {
  let userFriends = getFriends();
  let friendSteps = userFriends.reduce((acc, friend) => {
    let newActivity = new Activity(friend.id, activityData, userData);
    let stepsForWeek = newActivity.getActivityPropForWeek(date, 'numSteps');
    let totalSteps = stepsForWeek.reduce((acc, step) => {
      return acc += step;
    }, 0)
    let friendSteps = {};
    friendSteps[friend.name] = totalSteps;
    acc.push(friendSteps);
    return acc
  }, [])
  
  let currentUserSteps = {};
  currentUserSteps[currentUser.name] = activity.getActivityPropForWeek(date, 'numSteps').reduce((acc, step) => {
    return acc += step;
  }, 0);
  friendSteps.push(currentUserSteps);
  return friendSteps.sort((a, b) => (b.totalSteps - a.totalSteps));
}

const toggleAside = () => {
  if(!userProfileContainer.classList.contains('hide') || !competitionContainer.classList.contains('hide')) {
    aside.classList.remove('hide')
  } else if (userProfileContainer.classList.contains('hide') && competitionContainer.classList.contains('hide')) {
    aside.classList.add('hide')
  }
}

const showProfile = () => {
  userProfileContainer.classList.toggle('hide')
  toggleAside()
}

const showCompetition = () => {
  competitionContainer.classList.toggle('hide')
  toggleAside()
}

const showDayView = (event) => {
  if(event.target.id === 'day-btn') {
    dayView.classList.remove('hide')
    weekView.classList.add('hide')
    allTimeView.classList.add('hide')
    dateTitle.innerHTML = `Day of ${dateInput.value}`;
  }
}

const showWeekView = (event) => {
  if(event.target.id === 'week-btn') {
    weekView.classList.remove('hide')
    dayView.classList.add('hide')
    allTimeView.classList.add('hide')
    dateInput.value = '2019-09-16';
    dateTitle.innerHTML = `Week of ${dateInput.value}`
  }
}

const showAllTimeView = (event) => {
  if(event.target.id === 'all-time-btn') {
    allTimeView.classList.remove('hide')
    dayView.classList.add('hide')
    weekView.classList.add('hide')
    dateTitle.innerHTML = `All Time`;
  }
}

const changeView = () => {
  showDayView(event)
  showWeekView(event)
  showAllTimeView(event)
}

//FUNCTION CALLS
domUpdates.displayAvgSleepHoursForUser();
domUpdates.displayName();
domUpdates.displayInfo();
domUpdates.displayExceedStepGoal();
domUpdates.displayAvgHydration();
domUpdates.displayMaxStairs();
getFriends();
dateHandler(defaultDateInput);
charts.allTimeStepCompareChart();
charts.allTimeSleepQualCompareChart();

//EVENT LISTENERS
dailySubmitButton.addEventListener('click', changeDate);
myProfileBtn.addEventListener('click', showProfile)
competitionBtn.addEventListener('click', showCompetition)
viewSelectBtns.addEventListener('click', changeView) 