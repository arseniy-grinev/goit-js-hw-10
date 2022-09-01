import './css/styles.css';
import debounce from 'lodash.debounce';
import API from './fetchCountries';
import Notiflix from 'notiflix';
import countryCardTpl from './templates/country-card.hbs';

const DEBOUNCE_DELAY = 700;

const inputCountry = document.querySelector('[id="search-box"]');
const countryInfoContainer = document.querySelector('.country-info');

inputCountry.addEventListener('input', debounce(onCountryInput, DEBOUNCE_DELAY));

function onCountryInput(e) {
    console.log(e.target.value);
    const requestValue = e.target.value.trim();
    console.log(requestValue);

    if (requestValue === '') return;
    API.fetchCountries(requestValue)
    .then(renderResult)
    .catch(onFetchError());
    
}

function renderResult(params) {
    console.log(params);
    if (params.length === 1) {
        console.log('страна найдена');
        renderCountryCard(params[0]);
        return;
    }
    else if (params.length <= 10) {
        console.log('найдено несколько стран');
    }
    else {
        console.log('надо добавить символов');
        manyMatchesInfo();
    }
}

function onFetchError(error) {
 Notiflix.Notify.failure('Oops, there is no country with that name', {timeout: 5000});
}

function manyMatchesInfo() {
    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.', { timeout: 4000 });
}

// function renderCountryCard(country) {
//     const markup = countryCardTpl(country);
//     countryInfoContainer.innerHTML = markup;

    
// }