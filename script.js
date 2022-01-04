'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

const renderCountry = function (data, className = '') {
    const html = `
        <article class="country ${className}">
              <img class="country__img" src="${data.flag}" />
              <div class="country__data">
                <h3 class="country__name">${data.name}</h3>
                <h4 class="country__region">${data.region}</h4>
                <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1) + ' mln'}</p>
                <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
                <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
              </div>
            </article>
            `;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.getElementsByClassName.opacity = 1;
}

const renderError = function (msg) {
    countriesContainer.insertAdjacentText('beforeend', msg);
    countriesContainer.getElementsByClassName.opacity = 1;
}
// const getCountryAndNeighbour = function (country) {
//     // const request = new XMLHttpRequest();
//     // request.open('GET', `https://restcountries.com/v2//name/${country}`);
//     // request.send();

//     request.addEventListener('load', function () {
//         const [data] = JSON.parse(this.responseText);
//         console.log(data);
//         //Render COuntry
//         renderCountry(data);
//         // Get neighbour country (2) 
//         const [neighbour] = data.borders;
//         if (!neighbour) return;

//         //AJAX call country 2
//         const request2 = new XMLHttpRequest();
//         request2.open('GET', `https://restcountries.com/v2//alpha/${neighbour}`);
//         request2.send();

//         request2.addEventListener('load', function () {
//             const data2 = JSON.parse(this.responseText);
//             console.log(data2);
//             renderCountry(data2, 'neighbour');
//         })
//     })
// }

// getCountryAndNeighbour('poland');

// setTimeout(()=> {
//     console.log('1 sec passed');
// }, 1000);
// getCountryAndNeighbour('poland')

// const request = new XMLHttpRequest();
//     request.open('GET', `https://restcountries.com/v2//name/${country}`);
//     request.send();

// const request = fetch(`https://restcountries.com/v2//name/portugal`)


// const getCountryData = function(country) {
//     fetch(`https://restcountries.com/v2//name/${country}`).then(function(response) {
//         console.log(response);
//         return response.json();
//     }).then(function(data) {
//         console.log(data)
//     })
// }



const getCountryData = function (country) {
    // Country 1
    fetch(`https://restcountries.com/v2//name/${country}`)
        .then(response => response.json())
        .then(data => {
            renderCountry(data[0]);
            const neighbour = data[0].borders[0];

            if (!neighbour) return;

            // Country 2
            return fetch(`https://restcountries.com/v2//alpha/${neighbour}`)
        })
        .then(response => response.json())
        .then(data => renderCountry(data, 'neighbour'))
        .catch(err => {
            console.error(`${err} my errors`);
            renderError(`Something went wrong ${err.message}`)
        })
        .finally(() => {
            countriesContainer.getElementsByClassName.opacity = 1;
        })
};

btn.addEventListener('click', function () {
    getCountryData('germany');
})

const whereAmI = function (lat, lng) {
    console.log(`width ${lat}, height ${lng}`)
    fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
        .then(res => {
            if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
            return res.json()
        })
        .then(data => {
            // const country = data[0]
            console.log(data);
            const country = data.country;
            const city = data.city;
            console.log(`'You are in ${city}, ${country}`)
            getCountryData(country)
            return fetch(`https://restcountries.com/v2//name/${country}`)
        })
        .then(res => {
            if (!res.ok)
                throw new Error(`Country not found (${res.status})`);
            return res.json();
        })
        .then(data => renderCountry(data[0]))
        .catch(err => console.error(`${err.message} my errors`));
};
whereAmI(52.508, 13.381);

