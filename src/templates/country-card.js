const countryCard = `   
    <h2 class="country-name"> <img src="{{flags.svg}}" width=40>  {{name.official}}</h2>
    <p class="card-text"><b>Capital:</b> {{capital}}</p>
    <p class="card-text"><b>Population:</b> {{population}}</p>
    <p class="card-text"><b>Languages:</b></p>
    <ul class="list-group"></ul>
    {{#each languages}}
      <li class="list-group-item">{{langueges.key.value}}</li>
    {{/each}}
    </ul> `;

export default countryCard;
