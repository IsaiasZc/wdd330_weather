import Effects from './effects.js';
import Api from './api.js';
import getLocation from './geolocation.js';
import Utilities from './utilities.js';

const effects = new Effects();
const api = new Api();
const utl = new Utilities("#main-cnt");

export default class Main {
  
  async setup() {
    effects.setup();

    const coords = await this.getCurrentPosition();
    const data = await api.reqByCords(coords);

    console.log(data);

    utl.showHome(data);

  };

  async getCurrentPosition() {
    const {coords} = await getLocation();
    
    return coords
  }

};