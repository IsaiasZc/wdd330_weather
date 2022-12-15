  import View from "./View.js";

export default class ForeCastView extends View {
  constructor(name) {
    super(name)
  }

  prepareForecast(forecast) {
    const foreView = this.newElem("section");
    foreView.className = 'foreView container-sm d-flex flex-column gap-5'
    foreView.appendChild(this.hourCards(forecast.hourly))
    foreView.appendChild(this.dailyCards(forecast.daily))
    return foreView
  }

  hourCards(hourlyData) {
    const container = this.newElem('section');
    container.className = 'd-flex flex-column';
    container.innerHTML = '<h2>Next 5 Hours:</h2>'
    const cards = this.newElem('div');
    cards.className = 'hourCards d-flex gap-3 flex-wrap justify-content-evenly w-100';
    for (let i = 0; i < 5; i++) {
      // console.log(hourlyData[i])

      cards.appendChild(this.hourCard(hourlyData[i]))
    }

    container.appendChild(cards)
    return container
  }

  hourCard(hourData) {
    const card = this.newElem("div");
    card.className = 'hourCard border-0 p-4 d-flex flex-column border rounded p-1 align-items-center';
    card.style.minWidth = '140px';
    card.innerHTML = `
    <h4>${this.timeFormat(hourData.dt * 1000)}</h4>
    <img src="${this.getIconURL(hourData.weather[0].icon)}" alt="${hourData.weather[0].description}">
    <span>${hourData.weather[0].description}</span>
    <span>${hourData.temp}°</span>
    `
    return card
  }

  dailyCards(days) {
    const cntAll = this.newElem("div");
    cntAll.innerHTML = "<h2>Coming days</h2>"
    const container = this.newElem('section');
    container.className = 'fore-days-cnt d-grid'

    // console.log(days)
    days.forEach( day => {
      container.appendChild(this.dayCard(day))
    })

    cntAll.appendChild(container)

    return cntAll
  }

  dayCard(dayData) {
    const card = this.newElem("div");
    card.className = 'fore_day_card p-3 rounded-4 w-100 d-flex justify-content-between align-items-center';
    const date = new Date(dayData.dt * 1000);

    card.innerHTML = `
    <h4 class="d-flex flex-column">
      <span>${date.toLocaleString('default', {weekday: 'long'})}</span>  
      <small>${date.toLocaleString('default', {day: 'numeric', month: 'short'})}</small>
    </h4>
    <h3>${dayData.temp.day}°</h3>
    <img src="${this.getIconURL(dayData.weather[0].icon)}" alt="${dayData.weather[0].description}">

    `
    
    return card
  
  }

}