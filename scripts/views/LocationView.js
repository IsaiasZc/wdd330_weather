import View from "./View.js";

export default class LocationView extends View {
  constructor(name) {
    super(name)
  }

  prepareCountry(wth, contry) {
    const countryView = this.newElem("section");
    countryView.className = 'country-view-section d-flex flex-column gap-3';

    countryView.appendChild( this.createCurrentCard(wth) )

    countryView.appendChild( this.countryDetailCard(contry))

    return countryView
  }

  /**
   * create a weather card based on the given object
   * @param {object} wth object with all the information
   * @returns node
   */
  createCurrentCard(wth) {
    const card = this.newElem("div");
    card.className = "currentCard p-4 c-mainBlue d-flex";
    card.innerHTML = `
      <section class="card_main d-flex gap-4 flex-column w-100 p-3">
        <div class="card_main_head d-flex justify-content-between">
          <h5>
            <i class="bi bi-geo-alt"></i>
            <span class="b-700" id="card-place">${wth.name}</span>
          </h5>
          <p class="m-0">Today <span id="card-time">${this.timeFormat()}</span></p>
        </div>
        <div class="card_main_tmp d-flex flex-column align-items-center">
          <span class="currentCard-temp lh-1">
            ${Math.round(wth.main.temp)}°
          </span>
          <span>
            ${wth.weather[0].description}
          </span>
        </div>
        <div class="card_main_more d-flex justify-content-between">
          <article>
            <i class="bi bi-wind"></i>
            <span>${wth.main.pressure}hpa</span>
          </article>
          <article>
            <i class="bi bi-droplet"></i>
            <span>${wth.main.humidity}%</span>
          </article>
          <article>
            <i class="bi bi-cloud-haze2-fill"></i>
            <span>${Math.round(wth.wind.speed)}km/h</span>
          </article>
        </div>
      </section>
    `
    return card
  }

  countryDetailCard(country) {
    const div = this.newElem('div');
    div.className = 'container country-detail d-flex flex-column gap-1';


    const countryData = this.cleanCountryData(country);

    div.innerHTML = countryData.map( data => this.createCountryRow(data)).join("");


    return div
  }

  
  createCountryRow(data) {
    return `
    <div class="country-row row mx-2 text-center">
      <div class="col-sm-6 fw-bold bg-secondary text-light d-flex justify-content-center align-items-center">${data.name}</div>
      <div class="col-sm-6 fw-light py-1 border d-flex justify-content-center align-items-center">${data.data}</div>
    </div>
    `
  }
  
  cleanCountryData(country) {

    const currency = Object.entries(country.currencies)[0];

    return [
      {
        name: "Common Name",
        data: country.name.common,
      },
      {
        name: "Official Name",
        data: country.name.official,
      },
      {
        name: "Capital",
        data: country.capital,
      },
      {
        name: "Area",
        data: `${(country.area / 1000).toFixed(2)} Km<sup>2</sup>`
      },
      {
        name: "Flag",
        data: `<img src="${country.flags.svg}" alt="Flag" class="w-100"/>`,
      },
      {
        name:"Coat of Arms",
        data: `<img src="${country.coatOfArms.svg}" alt="Coat of Arms" class="w-100">`,
      },
      {
        name: "Demonym",
        data: country.demonyms.eng.f,
      },
      {
        name: "Languages",
        data: Object.values(country.languages).join(", "),
      },
      {
        name: "Currency Code",
        data: currency[0],
      },
      {
        name: "Currency Name",
        data: currency[1].name,
      },
      {
        name: "Currency Symbol",
        data: currency[1].symbol,
      },
      {
        name: "Maps",
        data: `<a href="${country.maps.googleMaps}" target="_blank">Go to maps</a>`,
      },
      {
        name:"Time Zone",
        data: country.timezones,
      },
      {
        name:"Continent",
        data: country.continents[0],
      }
    ]

  }
}