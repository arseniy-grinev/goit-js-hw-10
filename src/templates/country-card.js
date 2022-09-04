const countryCard = `   
    <h2 class="country-name"> <img src="{{flag}}" width=40>  {{name}}</h2>
    <p class="card-text"><b>Capital:</b> {{capital}}</p>
    <p class="card-text"><b>Population:</b> {{population}}</p>
    <p class="card-text"><b>Languages:</b>
    {{#each languages}}
      <span class="list-group-item"> {{this}} </span>
    {{/each}}
    </p>`

export default countryCard;