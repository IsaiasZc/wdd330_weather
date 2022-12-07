import CitiesView from "./views/CitiesView.js";
import ForeCastView from "./views/ForeCastView.js";
import HomeView from "./views/HomeView.js";
import LocationView from "./views/LocationView.js";

/**
 * A helper to manipulate the DOM
 */
export default class Utilities {

  /**
   * 
   * @param {selector} parent selector for the view
   */
  constructor(parent) {
    this.parent = this.$(parent)[0];
    this.home = new HomeView("home");
    this.forecast = new ForeCastView("forecast");
    this.cities = new CitiesView("cities");
    this.location = new LocationView("location");

  };

  showLocation() {
    const view = ""
    this.showMainView(view)
  }

  showCities() {
    const view = ""
    this.showMainView(view)
  }

  showForecast(forecast) {
    const view = this.forecast.prepareForecast(forecast)
    this.showMainView(view)
  }

  /**
   * 
   * @param {object} data information for the main card
   */
  showHome(data, details=[]) {
    const view = this.home.prepareHome(data, details);
    this.showMainView(view)
  };

  /**
   * Insert the given view
   * @param {node} nodo 
   */
  showMainView(nodo) {
    this.parent.innerHTML = "";

    this.parent.appendChild(nodo);
  };

  _classesLoading() {
    this.parent.classList.toggle("d-flex");
    this.parent.classList.toggle("justify-content-center");
    this.parent.classList.toggle("align-items-center");
  };

  setLoadingView() {
    // this._classesLoading();
    this.parent.innerHTML = `
    <div class="spinner-grow text-info" style="width: 6rem; height: 6rem;" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
    `
  };

  $(select) {
    return [...document.querySelectorAll(select)] || console.error("El elemento indicado no existe en el DOM");
  };
}

/**
 * select an existing Element
 * @param {string} select selector of the element
 * @returns a nodo
 */
function $(select) {
  return document.querySelector(select) || console.error("El elemento indicado no existe en el DOM");
}
