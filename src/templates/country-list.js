const countryList = `
    {{#each this}}
      <p class="country-name"> <img src="{{this.flag}}" width=20>  {{this.name}}</p>
    {{/each}}
    `

export default countryList;