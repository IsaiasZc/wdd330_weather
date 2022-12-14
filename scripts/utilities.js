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
  constructor(parent, form, signout, btnsNav, search) {
    this.search = this.$(search)[0];
    this.btnsNav = this.$(btnsNav);
    this.signout = this.$(signout)[0];
    this.form = this.$(form)[0];
    this.parent = this.$(parent)[0];
    this.home = new HomeView("home");
    this.forecast = new ForeCastView("forecast");
    this.cities = new CitiesView("cities");
    this.location = new LocationView("location");

  };

  cleanFormat(form) {
    form.reset();
  }

  changeActiveBtnState() {
    this.btnsNav.forEach(btn =>  {
      btn.disabled = !btn.disabled;
    })
  }

  changeLogView() {
    this.form.parentNode.classList.toggle('hide');
    this.parent.classList.toggle('hide');
    this.signout.disabled = !this.signout.disabled;
  }

  getFormValues() {
    const userName = this.form.email.value;
    const password = this.form.password.value;

    return {userName, password}
  }

  showLocation(wth, country) {
    const view = this.location.prepareCountry(wth, country);
    this.showMainView(view)
  }

  showCities(cities, callBack) {
    const view = this.cities.prepareCities(cities);

    this.showMainView(view);
    callBack();
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

  /**
   * get all the nodes with the given selector
   * @param {selector} select 
   * @returns array of nodes
   */
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
