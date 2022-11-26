/**
 * A helper to manipulate the DOM
 */

export default class Utilities {
  /**
   * 
   * @param {selector} parent selector for the view
   */
  constructor(parent) {
    this.parent = $(parent);
  }

  /**
   * create a weather card based on the given object
   * @param {object} wth object with all the information
   * @returns node
   */
  createCurrentCard(wth) {
    const card = cn("div");
    card.className = "currentCard p-4 c-mainBlue d-flex";
    card.innerHTML = `
      <section class="card_main d-flex gap-4 flex-column w-100 p-3">
        <div class="card_main_head d-flex justify-content-between">
          <h5>
            <i class="bi bi-geo-alt"></i>
            <span class="b-700" id="card-place">${wth.name}</span>
          </h5>
          <p class="m-0">Today <span id="card-time">${timeFormat()}</span></p>
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

  /**
   * 
   * @param {data} data prepare the home view
   * @returns the home view
   */
  prepareHome(data) {

    const mainCard = this.createCurrentCard(data);

    const homeView = cn("section");
    homeView.className = "home-view container-sm";

    homeView.appendChild(mainCard);

    return homeView;
  }

  /**
   * Insert the given view
   * @param {node} nodo 
   */
  showMainView(nodo) {
    this.parent.innerHTML = "";

    this.parent.appendChild(nodo);
  }


  showHome(data) {
    const view = this.prepareHome(data);
    this.showMainView(view)
  }
}



/**
 * select an existing Element
 * @param {string} select selector of the element
 * @returns a nodo
 */
function $(select) {
  return document.querySelector(select) || console.error("El elemento indicado no existe en el DOM");
}

/**
 * Create a new element
 * @param {string} elem element to be created
 * @returns a node
 */
function cn(elem) {
  return document.createElement(elem)
}

function timeFormat(time) {
  let newTime = time ? new Date(time) : new Date();

  return newTime.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
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