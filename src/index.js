import './css/styles.css';
import countryCardTpl from './card.hbs';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const countryList = document.querySelector('.country-list');

const refs = {
    cardContainer: document.querySelector('.country-info'),
};

const nameS = document.querySelector('#search-box');
nameS.addEventListener('input', _.debounce(nameSearch, 1000));

function nameSearch(){
    let name = _.trim(nameS.value,' ');
    if(name == '') {
        refs.cardContainer.style.visibility = "hidden";
            countryList.style.visibility = "hidden";
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
    
    )
}

function renderCountryCard(names) {
console.log(names.length);
    if(names.length === 1) {
        let markup = countryCardTpl(names);
        refs.cardContainer.innerHTML = markup;
        countryList.style.display = "none";
        refs.cardContainer.style.visibility = "visible";
        }
    else if (names.length == undefined) {
        Notiflix.Notify.failure("Oops, there is no country with that name")
    }
else if (names.length > 1){
    Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
    let markup = names
        .map((name) => {
            return `
            <li class="row-list">
                <img src="${name.flag}" width="40" alt="${name.demonym}">
                <h1>${name.name}</h1>
            </li>`;
        })
        .join("");
    countryList.innerHTML = markup;
}}

}