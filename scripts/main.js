import Effects from './effects.js';
import Api from './api.js';
import getLocation from './geolocation.js';
import Utilities from './utilities.js';
import Local from './local.js';

const effects = new Effects('home-btn','forecast-btn','cities-btn','location-btn');
const api = new Api();
const utl = new Utilities("#root","#login-form","#signout",'.btn-nav');
const local = new Local();

export default class Main {
  
  async setup() {

    this.loginEvent();
    this.signOutEvent();

    effects.setup();

    if (local.getLogin()) {
      utl.changeLogView();
      utl.changeActiveBtnState();
    }

    utl.setLoadingView();

    const coords = await this.getCurrentPosition();
    const {data, details, forecast} = await api.reqByCords(coords);

    // Prepare the home with the given information, we will get the rest of the info later
    utl.showHome(data, details);

    const cities = await api.reqCities();

    // console.log(data);
    const country = await api.reqCountryInfo(data.sys.country);

    console.log(country)

    this.setupEventViews(
      {
        data,
        details,
        forecast,
        cities,
        country
      }
    );

  };

  signOutEvent() {
    utl.signout.addEventListener("click", () => {
      utl.changeLogView();
      utl.changeActiveBtnState();
      local.setLogin(null, null, false);
    })
  }

  loginEvent() {
    utl.form.addEventListener("submit", (e) => {
      e.preventDefault();
      console.log("hola");

      const {userName, password} = utl.getFormValues();

      if(local.validCredentials(userName, password)) {
        utl.changeLogView();
        utl.changeActiveBtnState();
        local.setLogin(userName, password, true);
      };

      utl.cleanFormat();
    });
  }

  async getCurrentPosition() {
    const {coords} = await getLocation();
    
    return coords;
  };

  setupEventViews(weather) {
    this.setEventView('.home-btn', () => utl.showHome(weather.data, weather.details))
    this.setEventView('.forecast-btn', () => utl.showForecast(weather.forecast))
    this.setEventView('.cities-btn', () => utl.showCities(weather.cities))
    this.setEventView('.location-btn', () => utl.showLocation(weather.data,weather.country))
  }

  setEventView(selector, callback) {
    utl.$(selector).forEach( btn => {
      btn.addEventListener('click', callback)
    })
  }


}; 