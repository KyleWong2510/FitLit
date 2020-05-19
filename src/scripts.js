const currentUser = new User(getRandomUser(userData));

const currentDate = "2019/09/22";
const weekStartDate = "2019/09/16";

const sleep = new Sleep(currentUser.id, sleepData);
const sleepRepo = new SleepRepo(sleepData);
const usersRepo = new UsersRepo(userData);
const hydration = new Hydration(currentUser.id, hydrationData);
const activity = new Activity(currentUser.id, activityData, userData);
const activityRepo = new ActivityRepo(activityData);

const weekSleepHours = sleep.getWeeklySleepHours(weekStartDate);
const weekSleepQuality = sleep.getWeeklySleepQual(weekStartDate);
const weekOuncesDrank = hydration.getWeeklyWater(weekStartDate);
const weekStepCount = activity.getStepsForWeek(weekStartDate);
const weekFlightsClimbed = activity.getFlightsForWeek(weekStartDate);
const weekMinsActive = activity.getMinsActiveForWeek(weekStartDate);
const dailyStepsTaken = activity.getStepsTaken(currentDate);
const allAvgDailyStepsTaken = activityRepo.calculateAvgSteps(currentDate);

const todaySleepHours = document.getElementById("today-sleep-hours");
const todaySleepQuality = document.getElementById("today-sleep-quality");
const userAvgSleepHours = document.getElementById("user-avg-sleep-hours")
const userAvgSleepQuality = document.getElementById("user-avg-sleep-quality");
const allAvgSleepQuality = document.getElementById("all-avg-sleep-quality");
const longestSleepers = document.getElementById("longest-sleepers");
const highestQualSleepers = document.getElementById("highest-qual-sleepers");
const allHighestQualSleepers = document.getElementById("all-highest-qual-sleepers");
const greeting = document.getElementById("greeting");
const name = document.getElementById("name");
const address = document.getElementById("address");
const email = document.getElementById("email");
const strideLength = document.getElementById("stride-length");
const dailyStepGoal = document.getElementById("daily-step-goal");
const friends = document.getElementById("friends");
const stepGoalComparison = document.getElementById("step-goal-comparison");
const weekSleepHoursId = document.getElementById("week-sleep-hours").getContext("2d");
const weekSleepQualId = document.getElementById("week-sleep-quality").getContext("2d");
const todayHydration = document.getElementById("today-hydration")
const weekHydrationId = document.getElementById("week-hydration").getContext("2d");
const todayStepsTaken = document.getElementById("today-steps-taken")
const todayMinsActive = document.getElementById("today-mins-active")
const todayStairsClimbed = document.getElementById("today-stairs-climbed");
const todayMilesWalked = document.getElementById("today-miles-walked")
const allUsersAvgSteps = document.getElementById("all-users-avg-steps")
const allUsersAvgMinsActive = document.getElementById("all-users-avg-mins-active")
const allUsersAvgFlights = document.getElementById("all-users-avg-flights")
const mostActiveUser = document.getElementById('most-active-user')
const weekStepsId = document.getElementById('week-steps').getContext('2d')
const weekFlightsId = document.getElementById('week-flights').getContext('2d')
const weekMinsActiveId = document.getElementById('week-mins-active').getContext('2d')
const weekAvgSteps = document.getElementById('week-steps-taken-avg')
const weekAvgMinsActive = document.getElementById('week-mins-active-avg')
const weekAvgFlights = document.getElementById('week-flights-avg')
const stepChallenge = document.getElementById('step-challenge');
const dateInput = document.getElementById('date-input');
const dailySubmitButton = document.getElementById('daily-submit');
const dailyStepComparison = document.getElementById('daily-step-comparison');

const createDate = new Date(dateInput.value);
const defaultDateInput = (createDate.getFullYear() + "/" + 
("0" + (createDate.getMonth() + 1)).slice(-2) + "/" + 
("0" + createDate.getUTCDate()).slice(-2));


dailySubmitButton.addEventListener('click', changeDate);


function changeDate() {
  let createDate = new Date(dateInput.value);
  let correctDateInput = (createDate.getFullYear() + "/" + 
    ("0" + (createDate.getMonth() + 1)).slice(-2) + "/" + 
    ("0" + createDate.getUTCDate()).slice(-2));
  return domUpdates.displayHydrationForDay(correctDateInput)
}

domUpdates.displaySleepHoursForDay(currentDate);
domUpdates.displaySleepQualForDay(currentDate);
domUpdates.displayAvgSleepHoursForUser();
// domUpdates.displayAvgSleepQualForUser();
domUpdates.displayHydrationForDay(defaultDateInput);
// domUpdates.displayMinutesActiveForDay(currentDate);
domUpdates.displayMilesWalkedForDay(currentDate);
// domUpdates.displayStepsTakenForDay(currentDate);
// domUpdates.displayStairsClimbedForDay(currentDate);
domUpdates.displayAllUsersAvgSteps(currentDate);
domUpdates.displayAllUsersAvgMinsActive(currentDate);
domUpdates.displayAllUsersAvgFlights(currentDate);
domUpdates.displayMostActiveUser(currentDate)
domUpdates.displayWeeklyAvgMinutesActive(weekStartDate)
domUpdates.displayWeeklyAvgSteps(weekStartDate)
domUpdates.displayWeeklyAvgFlights(weekStartDate)
// domUpdates.displayAvgSleepQualityForAll();
domUpdates.displayLongestSleepers(currentDate);
domUpdates.displayHighestQualSleepers(currentDate);
domUpdates.displayAllQualitySleepers(weekStartDate);
domUpdates.displayName();
domUpdates.displayInfo();
domUpdates.displayStepChallenge(weekStartDate);
//domUpdates.calculateWeeklyStepChallenge(weekStartDate);
getFriends();


charts.weeklySleepHoursChart();
charts.weeklySleepQualChart();
charts.weeklyHydrationChart();
charts.weeklyStepsChart();
charts.weeklyFlightsChart();
charts.weeklyMinsActiveChart();
charts.dailyStepsCompareChart();

function getFriends() {
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

function calculateWeeklyStepChallenge(date) {
  let userFriends = getFriends();
  let friendSteps = userFriends.reduce((acc, friend) => {
    let newActivity = new Activity(friend.id, activityData, userData);
    let stepsForWeek = newActivity.getStepsForWeek(date);
    let totalSteps = stepsForWeek.reduce((acc, step) => {
      return acc += step;
    }, 0)
    let friendSteps = {};
    friendSteps[friend.name] = totalSteps;
    acc.push(friendSteps);
    return acc
  }, [])
  
  let currentUserSteps = {};
  currentUserSteps[currentUser.name] = activity.getStepsForWeek(date).reduce((acc, step) => {
    return acc += step;
  }, 0);
  friendSteps.push(currentUserSteps);
  return friendSteps.sort((a, b) => (b.totalSteps - a.totalSteps));
}

function getRandomUser(array) {
  let randomIndex =  Math.floor(Math.random() * array.length);
  return array[randomIndex]
}