import View from "./View.js";

export default class CitiesView extends View {
  constructor(name) {
    super(name)
  }

  prepareCities(cities) {
    const citiesView = this.newElem("section");
    citiesView.className = "d-flex flex-column gap-3";

    cities.forEach( city => {
      citiesView.appendChild( this.citieCard(city))
    })

    return citiesView;

  }


  citieCard(city) {
    const cnt = this.newElem('div');
    cnt.className = 'd-flex justify-content-between gap-5 bg_almost_white rounded-3 px-4 py-2';
    const date = new Date(city.dt * 1000);
    cnt.innerHTML = `
    <div class="descrip d-flex flex-column justify-content-between">
      <h3>${city.name}</h3>
      <span class="text-black-50">Temperature: ${city.temp}°</span>
      <p>${date.toLocaleString()}</p>
    </div>
    <div class="city-icon d-flex flex-column align-items-center">
      <img src="${this.getIconURL(city.weather.icon)}">
      <button class="btn btn-primary btn-city">More Details <i class="bi bi-arrow-right-short"></i></button>
    </div>
    `

    return cnt
  }
} 