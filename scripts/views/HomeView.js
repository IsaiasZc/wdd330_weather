import View from "./View.js";

export default class HomeView extends View{
  constructor(name) {
    super(name)
  }

  /**
   * Prepare the whole home view
   * @param {data} data prepare the home view
   * @returns the home view
   */
   prepareHome(data, details=[]) {

    const mainCard = this.createCurrentCard(data);
    const detailsC = this.createMdetailCards(details);
    const homeView = this.newElem("section");
    homeView.className = "home-view container-sm";

    homeView.appendChild(mainCard);
    homeView.appendChild(detailsC);

    return homeView;
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

      <section class="card_tmp_detailed py-2 rounded-3 w-100">
        <h5 class="ps-3">temperature</h5>
        ${testInfo()}

      </section>
    `
    return card
  }

  createMdetailCards(arr) {
    const details = this.newElem("div");
    details.className = "details";

    arr.forEach( data => details.appendChild(this._createMDetailCard(data)))
    
    return details
  }

  _createMDetailCard(obj) {
    const card = this.newElem("div");
    const {title, descrip, value, imgPath} = obj;

    card.innerHTML = `
    <div class="data">
      <h2>${title}</h2>
      <span>${descrip}</span>
      <span>${value}</span>
    </div>
    <div class="image">
    <img src="${imgPath}" alt="${title}">
    </div>
    `

    return card
  }
}

function testInfo() {
  return  `
  <div class="line" style="height: 100px; width: 100%;">

  </div>
  <div class="div d-flex justify-content-between text-center">
    <p>
      Morning
      <span>26°</span>
    </p>
    <p>
      Afternon
      <span>24°</span>
    </p>
    <p>
      Evening
      <span>28°</span>
    </p>
    <p>
      Night
      <span>20°</span>
    </p>
  </div>
  `
}