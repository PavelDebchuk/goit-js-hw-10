import './css/styles.css';


import countryCardTpl from './card.hbs';
const DEBOUNCE_DELAY = 300;

const refs = {
    cardContainer: document.querySelector('.country-info'),
};

const nameS = document.querySelector('#search-box');



nameS.addEventListener('input',
    // _.debounce(() => {
        nameSearch
    // }, 1000)
);




function nameSearch(){
    let name = nameS.value;
    fetchCountry()
        .then(renderCountryCard)
        .catch(error => console.log(error));

function fetchCountry(){
    
    return fetch(`https://restcountries.com/v2/name/${name}`)
    .then(response =>{
        return response.json();
    },
    );
}

function renderCountryCard(names) {
    const markup = countryCardTpl(names);
    refs.cardContainer.innerHTML = markup;
    }
}

