import View from "./View.js";

export default class CitiesView extends View {
  constructor(name) {
    super(name)
  }

  prepareCities(cities) {
    const citiesView = this.newElem("section");

    cities.forEach( city => {
      citiesView.appendChild( this.citieCard(city))
    })

    return citiesView;

  }


  citieCard(city) {
    const cnt = this.newElem('div');
    cnt.className = 'd-flex justify-content-between';
    const date = new Date(city.dt * 1000);
    cnt.innerHTML = `
    <div class="descrip">
      <h3>${city.name}</h3>
      <span>${city.temp}</span>
      <p>${date.toLocaleString()}</p>
    </div>
    <div class="city-icon d-flex flex-column align-items-center">
      <img src="${this.getIconURL(city.weather.icon)}">
      <button class="btn btn-primary">More Details <i class="bi bi-arrow-right-short"></i></button>
    </div>
    `

    return cnt
  }
} 