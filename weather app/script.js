let appId = 'ff2caab9ba6586d789f447b4c1fb6b29'; /*api app id from the openweathermap.com */
let units = 'metric';//metric
let searchMethod = 'zip';

function getSearchMethod(searchTerm){

    if(searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm)
      searchMethod = 'zip';
    else
      searchMethod = 'q';
}

function searchWeather(searchTerm){
  getSearchMethod(searchTerm);

  fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`).then(result => {
    return result.json();
  }).then(result => {
    init(result);
  })
}

function init(resultFromServer){
  console.log(resultFromServer);
  console.log("test 1213123");

  if(resultFromServer.message == "city not found") console.log('CITY NOT FOUND');

  switch(resultFromServer.weather[0].main){
    case 'Clear':
        document.body.style.backgroundImage = 'url("clear.jpg")';
    break;
    case 'Clouds':
        document.body.style.backgroundImage = 'url("clouds.jpg")';
    break;
    case 'Rain':
        document.body.style.backgroundImage = 'url("rain.jpg")';
    break;
    case 'Drizzle':
    case 'Thunderstorm':
        document.body.style.backgroundImage = 'url("drizzle.jpg")';
    break;
    case 'Mist':
        document.body.style.backgroundImage = 'url("mist.jpg")';
    break;
    case 'Snow':
        document.body.style.backgroundImage = 'url("snow.jpg")';
    break;
    default:
    break;
  }


  let weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader');
  let temperatureElement = document.getElementById('temperature');
  let humidityElement = document.getElementById('humidity');
  let windSpeedElement = document.getElementById('windSpeed');
  let cityHeader = document.getElementById('cityHeader');
  let weatherIcon = document.getElementById('documentIconImg');
  let minMaxElement = document.getElementById('minMax');

  weatherIcon.src = 'http://openweathermap.org/img/wn/' + resultFromServer.weather[0].icon + '.png';

  let resultDescription = resultFromServer.weather[0].description;
weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase() /* first character and now we add to
the rest of the string; */ + resultDescription.slice(1);




//temperature
temperatureElement.innerText = Math.round(resultFromServer.main.temp) + '°';
console.log('result temperature is ' + Math.round(resultFromServer.main.temp));


//windSpeed

//1 meter/ second = 3.6 km/h
windSpeedElement.innerText = 'Wind Speed: ' + Math.round((resultFromServer.wind.speed * 3.6)) + ' km/h';
console.log('result wind is ' + resultFromServer.wind.speed);


//city Name

cityHeader.innerText = resultFromServer.name;
//humidityElement



humidityElement.innerText = 'Humidity level ' + resultFromServer.main.humidity + '%';

//minMax

let resultmin = resultFromServer.main.temp_min;
let resultmax = resultFromServer.main.temp_max;

minMaxElement.innerText = 'Min: ' + Math.round(resultmin) + '°' + '↓  ' + '   Max: ' + Math.round(resultmax) + '°' + '↑';
setPositionInfo();
}




  function  setPositionInfo(){
    let weatherContainer = document.getElementById('weatherContainer');
    let weatherContainerHeight = weatherContainer.clientHeight;
    let weatherContainerWidth = weatherContainer.clientWidth;
    weatherContainer.style.left = `calc(50% - ${weatherContainerWidth/2}px)`;
    weatherContainer.style.top = `calc(50% - ${weatherContainerHeight/2}px)`; // 1.3
    weatherContainer.style.visibility = 'visible';
  }







document.getElementById('searchButton').addEventListener('click', () => {
  let searchTerm = document.getElementById('searchInput').value;
  console.log("search term log" + searchTerm);
  if(searchTerm)
    searchWeather(searchTerm);
})
