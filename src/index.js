import './css/styles.css';


import countryCardTpl from './card.hbs';
const DEBOUNCE_DELAY = 300;

// const input = document.querySelector('#search-box');

const countryList = document.querySelector('.country-list');

const countryInfo = document.querySelector('.country-info');


const nameS = document.querySelector('#search-box');

nameS.addEventListener('input', nameSearch);
function nameSearch(){
    
fetchCountry()
    .then(renderCountryCard)
    .catch(error => console.log(error));
}
//{name},{capital},{population},{flags},{languages}



function fetchCountry(){
    
    let name = nameS.value;
    return fetch(`https://restcountries.com/v2/name/${name}`)
    .then(response => {
        return response.json( );
    })
    
}


function renderCountryCard(dataCountry) {
    console.log(dataCountry);
    const markup = countryCardTpl(dataCountry);
    countryInfo.innerHTML = markup;
} 