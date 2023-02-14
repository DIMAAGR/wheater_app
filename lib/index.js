const container = document.querySelector('.container') // Define o objeto do html que sofrerá/executará a ação (obtem o local de onde ele está)
const search = document.querySelector('.search-box button') // Define que o objeto do html que sofrerá/executará a ação será o botão contido dentro do search box
const weatherBox = document.querySelector('.weather-box')
const weatherDetails = document.querySelector('.weather-details')
const error404 = document.querySelector('.not-found')

const image = document.querySelector('.weather-box img')
const temperature = document.querySelector('.weather-box .temperature')
const description = document.querySelector('.weather-box .description')

const humidity = document.querySelector('.weather-details .humidity span')
const wind = document.querySelector('.weather-details .wind span')

const APIKey = '32872301c21def39f1cc162e51246c46';

// ===============================================================
// On Search-box button Click event
// ===============================================================
search.addEventListener('click', () => {
    city = document.querySelector('.search-box input').value
    if (city === '') return;

    getWeatherData(city).then(json => {

        if (json.cod === '404') {
            container.style.height = '400px'
            weatherBox.style.display = 'none'
            weatherDetails.style.display = 'none'
            error404.style.display = 'block'
            error404.classList.add('fadeIn')
            return;
        }

        error404.style.display = 'none'
        error404.classList.remove('fadeIn')

        setWeatherImageOnPage(json.weather[0].main) 
        setWeatherDataOnPage(json)


    })



})

async function getWeatherData(city) {
    url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
    return fetch(url).then((response) => response.json()).then(json => json);
}

function setWeatherImageOnPage(weather) {
    switch (weather) {
        case 'Clear':
            image.src = 'assets/images/clear.png'
            break;
        case 'Rain':
            image.src = 'assets/images/rain.png'
            break;
        case 'Clouds':
            image.src = 'assets/images/cloud.png'
            break;
        case 'Mist':
            image.src = 'assets/images/mist.png'
            break;
        case 'Snow':
            image.src = 'assets/images/snow.png'
            break;
        default:
            image.src = ''
            break;
    }

}


function setWeatherDataOnPage(json) {

    /*
     * A propriedade Element.innerHTML define ou obtém 
     * a sintaxe HTML ou XML descrevendo os elementos descendentes.
    */

    console.log(json);

    temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`
    description.innerHTML = `${json.weather[0].description}`
    humidity.innerHTML = `${json.main.humidity}%`
    wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`

    weatherBox.style.display = ''
    weatherDetails.style.display = ''
    weatherBox.classList.add('fadeIn')
    weatherDetails.classList.add('fadeIn')
    container.style.height = '590px'
}
