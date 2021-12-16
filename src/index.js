import './css/styles.css';

import countryCardTpl from './card.hbs';

import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const refs = {
    cardContainer: document.querySelector('.country-info'),
};

const nameS = document.querySelector('#search-box');
nameS.addEventListener('input', _.debounce(nameSearch, 1000));
function nameSearch(){
    Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
    let name = _.trim(nameS.value,' ');
    if(name === '') {
            let listItem = document.querySelector('.list-item')
            listItem.style.visibility = "hidden";
            return;
    };
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
    const countryList = document.querySelector('.country-list');
    
    // if (names.length < 11){
    //     const markup = names
    //         .map((name) => {
    //             return `
    //             <li class="row-list">
    //                 <img src="${name.flag}" width="40" alt="${name.demonym}">
    //                 <h1>${name.name}</h1>
    //             </li>`;
    //         })
    //         .join("");
    //     countryList.innerHTML = markup;
    // }
   
        const markup = countryCardTpl(names);
        refs.cardContainer.innerHTML = markup;
        countryList.style.display = "none";
    
}
}