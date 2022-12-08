// V3 - Requete via l'API Fetch
// ****************************

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

// La requete Ajax (=> avec API Fetch)
const searchWeather = (city) => {
    const url = weatherUrl.replace('__city__', city);

    fetch(url, { method: 'GET' })
        .then((response) => {

            const rep = response.json();
            return rep;
        })
        .then( (rep) =>{
            console.log('Data', rep);
            if (rep.cod !== 200) {
                return Promise.reject(rep);
            }
            else{
                return rep;
            }
        })
        .then((data) => {
            console.log('Result', data);
            displayWeather(data);
        })
        .catch((error) => {
            console.log('Zebi', error);
            displayError(error);
        });
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

    villeHtml.innerText = 'Ville : ' + data.name + ' | Pays : ' + data.sys.country;
    tempHtml.innerText = 'Temperature actuelle : ' + data.main.temp;
    tempRessentiHtml.innerText = 'Tempature ressenti : ' + data.main.feels_like;
    tempRessentiHtml.classList = 'feels-temp';
    descHtml.innerText = 'Description : ' + data.weather[0].description;
    const urlImage = weatherIconUrl.replace('__icon__', data.weather[0].icon);
    imgHtml.setAttribute('src', urlImage);

    divImg.classList.add('fond');

    divImg.append(imgHtml);
    divContent.append(villeHtml, tempHtml, tempRessentiHtml, descHtml);
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
    weatherResult.innerHTML = "";
};