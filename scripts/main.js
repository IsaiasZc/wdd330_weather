import Effects from './effects.js';
import Api from './api.js';
import getLocation from './geolocation.js';
import Utilities from './utilities.js';

const effects = new Effects('home-btn','forecast-btn','cities-btn','location-btn');
const api = new Api();
const utl = new Utilities("#main-cnt", ".btn-nav");

export default class Main {
  
  async setup() {
    effects.setup();

    utl.setLoadingView();

    const coords = await this.getCurrentPosition();
    const {data, details, forecast} = await api.reqByCords(coords);
    
    utl.showHome(data, details);

    this.setupEventViews(
      {
        data,
        details,
        forecast
      }
    );
  };

  async getCurrentPosition() {
    const {coords} = await getLocation();
    
    return coords;
  };

  setupEventViews(weather) {
    this.setEventView('.home-btn', () => utl.showHome(weather.data, weather.details))
    this.setEventView('.forecast-btn', () => utl.showForecast(weather.forecast))
    this.setEventView('.cities-btn', () => utl.showCities())
    this.setEventView('.location-btn', () => utl.showLocation())
  }

  setEventView(selector, callback) {
    utl.$(selector).forEach( btn => {
      btn.addEventListener('click', callback)
    })
  }


}; 