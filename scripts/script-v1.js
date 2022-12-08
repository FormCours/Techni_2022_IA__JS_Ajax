// V1 - Requete via XML Http Request
// *********************************

const weatherFrom = document.querySelector('#weather-form');
const weatherCity = document.querySelector('#weather-city');
const weatherResult = document.getElementById('weather-result');

// URL
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=__city__&units=metric&lang=fr&appid=7dd2a0dabe181f6c9336b69f11ff86a2';
const weatherIconUrl = 'http://openweathermap.org/img/wn/__icon__@2x.png';

// Gestion du formulaire
weatherFrom.addEventListener('submit', (event) => {
    event.preventDefault();

    const city = weatherCity.value.trim();
    searchWeather(city);

    weatherCity.focus();
    weatherCity.value = '';
});

// La requete Ajax (=> XMLHttpRequest)
const searchWeather = (city) => {

    // Initialisation de l'objet XHR
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState !== XMLHttpRequest.DONE) {
            return;
        }

        const data = JSON.parse(xhr.response);
        if (xhr.status === 200) {
            displayWeather(data);
        }
        else {
            displayError(data);
        }
    });

    // Configuration de la requete
    const url = weatherUrl.replace('__city__', city);
    xhr.open('GET', url, true);

    // Envoi de la requete
    xhr.send();
};

const displayWeather = (data) => {

    clearDisplay();

    const villeHtml = document.createElement('p');
    const tempHtml = document.createElement('p');
    const tempRessentiHtml = document.createElement('p');
    const descHtml = document.createElement('p');
    const imgHtml = document.createElement('img');
    const divImg = document.createElement('div');
    const divContent = document.createElement('div');

    villeHtml.innerText = 'Lieux : ' + data.name + ' - ' + data.sys.country;
    tempHtml.innerText = 'Temperature actuelle : ' + data.main.temp;
    tempRessentiHtml.innerText = 'Tempature ressenti : ' + data.main.feels_like;
    tempRessentiHtml.classList = 'feels-temp';
    descHtml.innerText = 'Description : ' + data.weather[0].description;
    const urlImage = weatherIconUrl.replace('__icon__', data.weather[0].icon);
    imgHtml.setAttribute('src', urlImage);

    divImg.classList.add('fond');

    divImg.append(imgHtml);
    divContent.append(villeHtml, tempHtml, tempRessentiHtml, descHtml)
    weatherResult.append(divContent, divImg);

    console.log(data);
};

const displayError = (error) => {

    clearDisplay();

    const pHtml = document.createElement('p');

    const spanHtml = document.createElement('span');
    spanHtml.innerText = error.message;
    spanHtml.classList = 'errorMessage';

    pHtml.innerText = 'error : ';
    pHtml.appendChild(spanHtml);
    //pHtml.append('Error : ', spanHtml);

    weatherResult.appendChild(pHtml);
};

const clearDisplay = () => {
    weatherResult.innerHTML= "";
}