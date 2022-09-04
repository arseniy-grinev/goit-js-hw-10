import './css/styles.css';
import debounce from 'lodash.debounce';
import API from './fetchCountries';
import Notiflix from 'notiflix';
import countryCard from './templates/country-card';
import countryList from './templates/country-list';

const DEBOUNCE_DELAY = 300;
const Handlebars = require("handlebars");
const countryCardTpl = Handlebars.compile(countryCard);
const countryListTpl = Handlebars.compile(countryList);


const inputCountry = document.querySelector('[id="search-box"]');
const countryInfoContainer = document.querySelector('.country-info');
const countryListContainer = document.querySelector('.country-list');

inputCountry.addEventListener('input', debounce(onCountryInput, DEBOUNCE_DELAY));

function onCountryInput(e) {
    console.log(e.target.value);
    const requestValue = e.target.value.trim();
    console.log(requestValue);

    if (requestValue === '') { 
        resetCountryCard();
        // resetCountryList();
        return;
    } ;
    API.fetchCountries(requestValue, onFetchError)
    .then(renderResult)
    // .catch(onFetchError());
    
}

function renderResult(params) {
    resetConteiners();
    console.log(params);
    if (params.length === 1) {
        const country = crerateCountriesInfo(params[0]);
        resetCountryList();
        renderCountryCard(country);
        return;
    }
    else if (params.length <= 10) {
        const countries = params.map(crerateCountriesInfo);
        // console.log('найдено несколько стран');
        console.log(countries);
        resetCountryCard();
        renderCountryList(countries);
        return;
    }
    else if (params.length > 10) {
        console.log('надо добавить символов');
        manyMatchesInfo();
        resetConteiners();
    }
}

function resetConteiners() {
    resetCountryCard();
    resetCountryList();
}

function onFetchError(error) {
 Notiflix.Notify.failure('Oops, there is no country with that name', {timeout: 5000});
}

function manyMatchesInfo() {
    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.', { timeout: 4000 });
}

function renderCountryCard(country, languages) {

    const markup = countryCardTpl(country, languages);
    countryInfoContainer.innerHTML = markup;
}

function resetCountryCard() {
   countryInfoContainer.innerHTML = "";  
}

function renderCountryList(countries) {
    const markup = countryListTpl(countries);
    console.log(markup);
    countryListContainer.innerHTML = markup;
}

function resetCountryList() {
    countryListContainer.innerHTML = "";
}

function getCountryLanguages(country) {
    return Object.values(country.languages);
}

function crerateCountriesInfo(country) {
    const languages = getCountryLanguages(country);
    const capital = country.capital[0];
    const population = country.population;
    const flag = country.flags.svg;
    const name = country.name.official;


    return {flag, name, capital, population, languages}

}