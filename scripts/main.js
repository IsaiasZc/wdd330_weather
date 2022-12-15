import Effects from './effects.js';
import Api from './api.js';
import getLocation from './geolocation.js';
import Utilities from './utilities.js';
import Local from './local.js';

const effects = new Effects('home-btn','forecast-btn','cities-btn','location-btn');
const api = new Api();
const utl = new Utilities("#root","#login-form","#signout",'.btn-nav','#form-search');
const local = new Local();

export default class Main {

  constructor() {
    this.weather = {
      data: 'a',
      details: 'a',
      forecast: 'a',
      cities: 'a',
      country: 'a'
    };
  }
  
  async setup() {

    this.loginEvent();
    this.signOutEvent();

    effects.setup();

    if (local.getLogin()) {
      utl.changeLogView();
      utl.changeActiveBtnState();
      this.myLocationView();
    }

    this.otherLocationsView();
  };
  
  async reqWeatherData() {
    
  }
  async myLocationView() {
    utl.setLoadingView();

    this.buildAllWeather();
  };


  otherLocationsView() {
    utl.search.addEventListener('submit', async (e) => {
      e.preventDefault();


      this.buildAllWeather("city", utl.search.search.value);
      utl.cleanFormat(utl.search);

      // Here we need the code to look for a place when the user writes in the input

    })
  }

  async buildAllWeather(type="current", place) {
    // de-activate the buttons and set load

    effects.changeActiveBtn('home-btn');
    utl.setLoadingView();
    utl.changeActiveBtnState();
    let coords;

    if(type === "current") {
    coords = await this.getCurrentPosition();
    } 

    // Request the main data

    try {
      const {data, details, forecast} = await (type !== "current" ? api.reqByCords(place, "place") : api.reqByCords(coords));
      utl.showHome(data, details, forecast.hourly);
      
      // Prepare the home with the given information, we will get the rest of the info later
  
      const cities = await api.reqCities();
      const country = await api.reqCountryInfo(data.sys.country);
  
      // console.log(country)
      this.buildWeather(
        {
          data,
          details,
          forecast,
          cities,
          country
        }
      )
    } catch (error) {
      console.error(error);
      alert("The city name is invalid");
      utl.showHome(this.weather.data, this.weather.details, this.weather.forecast.hourly);
    }


    this.setupEventViews();
    utl.changeActiveBtnState();
  }

  setCityBtns() {

    const cities = api.getCities();

    utl.$(".btn-city").forEach( (btn, idx) => {
      const city = Object.values(cities[idx]).join(",");

      btn.addEventListener("click", () => {
        this.buildAllWeather('city',city);
      })
    })
  }

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

      const {userName, password} = utl.getFormValues();

      if(local.validCredentials(userName, password)) {
        utl.changeLogView();
        utl.changeActiveBtnState();
        this.myLocationView();
        local.setLogin(userName, password, true);
      } else {
        alert("The credentials are incorrect. try with the credential in placeholder")
      }
      
      ;

      utl.cleanFormat(utl.form);
    });
  }

  async getCurrentPosition() {
    const {coords} = await getLocation();
    
    return coords;
  };

  setupEventViews() {
    this.setEventView('.home-btn', () => utl.showHome(this.weather.data, this.weather.details, this.weather.forecast.hourly))
    this.setEventView('.forecast-btn', () => utl.showForecast(this.weather.forecast))
    this.setEventView('.cities-btn', () => utl.showCities(this.weather.cities, () => this.setCityBtns()))
    this.setEventView('.location-btn', () => utl.showLocation(this.weather.data,this.weather.country))
  }

  setEventView(selector, callback) {
    utl.$(selector).forEach( btn => {
      btn.addEventListener('click', callback)
    })
  }

  buildWeather(wth) {
    for (const key in wth) {
      if (this.weather[key]) {
        this.weather[key] = wth[key];
        
      }
    }
  }


}; 