const key = "31b886c84c9c9db98eeba6960d675bee";

export default class Api {
  constructor() {
    this.cities =  [
      {
        city: 'Sao paulo',
        country: 'BR'
      },
      {
        city: 'New York',
        country: 'US'
      },
      {
        city: 'London',
        country: 'GB'
      },
      {
        city: 'Tokyo',
        country: 'JP'
      },
      {
        city: 'Lima',
        country: 'PE'
      }
    ]
  }

  async reqByCords(params,type="cords") {

    // const {latitude, longitude} = coords;
    const extend = type === "cords" ? `lat=${params.latitude}&lon=${params.longitude}` : `q=${params}`;

    const URL = buildURL(extend);

    const current = await getJson(URL);

    //Special URL for the detail JSON
    const detailURL = type !== "cords" ? `lat=${current.coord.lat}&lon=${current.coord.lon}` : extend;

    const detailJson = await getJson(buildURL(detailURL, '3.0/onecall'));

    const forecast = this.getForecast(detailJson);

    const detailData = {
      speed: current.wind.speed,
      pressure: current.main.pressure,
      uv : detailJson.current.uvi,
      humidity : current.main.humidity,
    };

    const details = buildDetails(detailData);

    return {
      data: current,
      details,
      forecast
    }
  }

  getCities() {
    return this.cities;
  }

  async reqCities() {

    const weathers = [];
    

    for (const city of this.cities) {
      const URL = buildURL(`q=${city.city},${city.country}`);
      // console.log(URL)
      const json = await getJson(URL);
      // console.log(json);
      weathers.push({
        name: json.name,
        dt: json.dt,
        temp: json.main.temp,
        weather: json.weather[0]
      })
    }

    // console.log(weathers)

    return weathers
  }

  async reqCountryInfo(code) { 
    const URL = buildCountryURL(code);

    const json = await getJson(URL);

    return json[0]
  }

  getForecast(data) {

    const {daily, hourly} = data;
    return {
      daily,
      hourly
    }
  }

}

/**
 * construct the URL for a requests
 * @param {string} params for the request
 * @returns URL string
 */
function buildURL(params, apiPath="") {

  const URL = `https://api.openweathermap.org/data/${apiPath || "2.5/weather"}?${params}&appid=${key}&units=metric`

  return URL

}

/**
 * build the URL for the country API request
 * @param {string} code of the Country
 * @returns API URL
 */
function buildCountryURL(code) {
  return `https://restcountries.com/v3.1/alpha?codes=${code}`
}

/**
 * Create the objects whith the starter information about details, this information will be used in the detail cards.
 * @param {object} data object with details information
 */
function buildDetails(data) {

  const wind = buildDetail("Wind", "Today wind speed", data.speed);
  const pressure = buildDetail("Pressure", "Today Pressure", data.pressure);
  const uv = buildDetail("UV Index", "Today UV Index", data.uv);
  const humidity = buildDetail("Humidity", "Today Humidity", data.humidity);
  
  return [
    wind,
    pressure,
    uv,
    humidity
  ]
}

function buildDetail(title, descrip, value, imgPath="") {
  return {
    title,
    descrip,
    value,
    imgPath
  }
}

/**
 * make a request to the weather API
 * @param {string} url api for the request
 * @returns a JSON response
 */
async function getJson(url) {
  return fetch(url)
  .then(response => {
    if(!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  })
  .catch(err => console.log(err));
}