const key = "31b886c84c9c9db98eeba6960d675bee";

export default class Api {

  async reqByCords(coords) {

    const {latitude, longitude} = coords;

    const URL = buildURL(`lat=${latitude}&lon=${longitude}`)//`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${this.key}`;

    const response = await getJson(URL);

    return response
  }

}

/**
 * construct the URL for a requests
 * @param {string} params for the request
 * @returns URL string
 */
function buildURL(params) {

  const URL = `https://api.openweathermap.org/data/2.5/weather?${params}&appid=${key}&units=metric`

  return URL

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