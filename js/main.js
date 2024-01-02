let searchInput = document.getElementById("searchInput");
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let data = new Date();
let result = [];


async function getWeather(cuntry) {
    let apiWeather = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=f9f250e5e372499aad2231811233112&q=${cuntry}&days=3`);
     result = await apiWeather.json();
    displayToDay();
    displayTommorow();
    displayAfterTomorrow();
    
}

getWeather('cairo');
// function to display current day
function displayToDay() {
    let datToDay = days[data.getDay()]
    document.querySelector('.today').innerHTML = datToDay;
    document.querySelector('.today-date').innerHTML =`${data.getDay()} ${months[data.getMonth()]}` ;
    document.querySelector('.location').innerHTML = result.location.name;
    document.querySelector('.degree span').innerHTML = result.current.temp_c;
    document.querySelector('.icon').src = result.current.condition.icon;
    document.querySelector('.weather-mood').innerHTML = result.current.condition.text;

}


// function to display tommorow
function displayTommorow() {
  document.querySelector('.tomorow').innerHTML = days[new Date(result.forecast.forecastday[1].date).getDay()];
  document.querySelector('.tommorow-degree span').innerHTML = result.forecast.forecastday[1].day.maxtemp_c;
  document.querySelector('.tommorow-min-degree span').innerHTML = result.forecast.forecastday[1].day.mintemp_c;
  document.querySelector('.tommorow-icon').src = result.forecast.forecastday[1].day.condition.icon;
  document.querySelector('.tomm-weather-mood').innerHTML = result.forecast.forecastday[1].day.condition.text;
}

// function to display After tomorrow
function displayAfterTomorrow() {
    document.querySelector('.third-day').innerHTML = days[new Date(result.forecast.forecastday[2].date).getDay()];
    document.querySelector('.after-tommorow-degree span').innerHTML = result.forecast.forecastday[2].day.maxtemp_c;
    document.querySelector('.after-tommorow-min-degree span').innerHTML = result.forecast.forecastday[2].day.mintemp_c;
    document.querySelector('.after-tommorow-icon').src = result.forecast.forecastday[2].day.condition.icon;
    document.querySelector('.after-tomm-weather-mood').innerHTML = result.forecast.forecastday[2].day.condition.text;
}

// search country  function 
searchInput.addEventListener('keyup' , function(e){
    var searchValue = searchInput.value;
    if(searchValue!= ''){
        getWeather(searchValue)
    }
   else{
    getWeather('cairo')
   }

})

