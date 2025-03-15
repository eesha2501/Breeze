const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const body = document.body; // Selecting body for background change

search.addEventListener('click', () => {
    const APIKey = '54415c153b88c3aa6f295f88c24c6d6a';
    const city = document.getElementById('search-btn').value;

    if (city === '') {
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {

            if (json.cod == '404') {
                container.style.height = '450px';
                weatherBox.classList.remove('active');
                weatherDetails.classList.remove('active');
                error404.classList.add('active');
                body.style.background = "url('images/error.jpg')"; // Optional error background
                body.style.backgroundSize = "cover";
                return;
            }

            container.style.height = '560px';
            weatherBox.classList.add('active');
            weatherDetails.classList.add('active');
            error404.classList.remove('active');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            // Get sunrise and sunset time from API
            const sunrise = json.sys.sunrise * 1000; // Convert to milliseconds
            const sunset = json.sys.sunset * 1000;   // Convert to milliseconds
            const currentTime = new Date().getTime();

            // Change background based on time of day
            if (currentTime >= sunrise && currentTime < sunset) {
                body.style.background = "url('images/background.jpg')"; // Day background
            } else {
                body.style.background = "url('images/night.gif')"; // Night background
            }
            body.style.backgroundSize = "cover";
            body.style.backgroundPosition = "center";

            // Set weather image
            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'images/clear.png';
                    break;
                case 'Rain':
                    image.src = 'images/rain.png';
                    break;
                case 'Snow':
                    image.src = 'images/snow.png';
                    break;
                case 'Clouds':
                    image.src = 'images/cloud.png';
                    break;
                case 'Thunderstorm':
                    image.src = 'images/thunderstorm.png';
                    break;
                default:
                    image.src = 'images/default.png';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
        })
        .catch(error => console.error("Error fetching data:", error));
});
