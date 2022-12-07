const key = "31b886c84c9c9db98eeba6960d675bee";

export default class Api {

  async reqByCords(coords) {

    const {latitude, longitude} = coords;

    const URL = buildURL(`lat=${latitude}&lon=${longitude}`)//`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${this.key}`;

    const response = await getJson(URL);

    const detailJson = await getJson(buildURL(`lat=${latitude}&lon=${longitude}`, '3.0/onecall'));

    const forecast = this.getForecast(detailJson);

    const detailData = {
      speed: response.wind.speed,
      pressure: response.main.pressure,
      uv : detailJson.current.uvi,
      humidity : response.main.humidity,
    };

    const details = buildDetails(detailData);

    return {
      data: response,
      details,
      forecast
    }
  }

  getForecast(data) {

    // console.log(data);

    // data.hourly.forEach( day => {
    //   console.log(new Date(day.dt * 1000))
    // })

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
 * make a api request
 * @param {string} url api for the request
 * @returns json object with a response
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