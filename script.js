const search = document.querySelector('.btn');
const weatherWidget = document.querySelector('.widget__weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error = document.querySelector('.not-found');

search.addEventListener('click', ()=>{
    const apiKey = '508a9c55df5975950059d529511660b6';
    function capitalizeFirstLetter(value) {
        return value.charAt(0).toUpperCase() + value.slice(1);
    }
    const city = capitalizeFirstLetter(document.querySelector('.widget__input').value)
    console.log(city);
    if(city === ''){
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
        .then(response => response.json())
        .then(json => {

            if (json.cod === '404') {
                weatherWidget.style.display = 'none';
                weatherDetails.style.display = 'none';
                error.style.display = 'block';
                error.classList.add('fadeIn');
                return;
            }

            error.style.display = 'none';
            error.classList.remove('fadeIn');

            const city = document.querySelector('.widget__weather-box .city');
            const image = document.querySelector('.widget__weather-box img');
            const temperature = document.querySelector('.widget__weather-box .temperature');
            const description = document.querySelector('.widget__weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

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

                case 'Haze':
                    image.src = 'images/mist.png';
                    break;

                default:
                    image.src = '';
            }
            city.innerHTML = `${json.name}`;
            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
            

            weatherWidget.style.display = '';
            weatherDetails.style.display = '';
            weatherWidget.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
        });
});
