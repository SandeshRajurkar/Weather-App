const inputBox = document.querySelector('.input-box');
const searchBtn = document.querySelector('#searchBtn');
const wheather_img = document.querySelector('.wheather-img');
const temprature = document.querySelector('.temprature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');

const location_not_found = document.querySelector('.location-not-found');

const wheather_body = document.querySelector('.wheather-body');


async function checkWeather(city){
    const api_key = "fd6d57e24f38a9b5a0898ee50ec308dd";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    const weather_data = await fetch(`${url}`)
    .then(response => response.json())           //convert json into string
    console.log(weather_data);


    if(weather_data.cod === '404' || weather_data.message === 'Nothing to geocode'){
        // wheather_img.src = "/Assets/404.png"
        location_not_found.style.display = "flex";
        wheather_body.style.display = "none";
        console.log("error");
        return;
    }

    location_not_found.style.display = "none";
    wheather_body.style.display = "flex";

    temprature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
    description.innerHTML = `${weather_data.weather[0].description}`;
    humidity.innerHTML = `${weather_data.main.humidity}%`;
    wind_speed.innerHTML = `${weather_data.wind.speed}km/H`;

    switch(weather_data.weather[0].main){
        case 'Clouds':
            wheather_img.src = "/Assets/cloud.png";
            break;
        case 'Clear':
            wheather_img.src = "/Assets/clear.png";
            break;
        case 'Rain':
            wheather_img.src = "/Assets/rain.png";
            break;
        case 'Mist':
            wheather_img.src = "/Assets/mist.png";
            break;
        case 'Snow':
            wheather_img.src = "/Assets/snow.png";
            break;
    }

}


searchBtn.addEventListener('click',()=>{
    checkWeather(inputBox.value)
});