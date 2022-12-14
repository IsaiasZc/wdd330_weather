

export default class View {
  constructor(name) {
    this.name = name;
  }

  timeFormat(time) {
    let newTime = time ? new Date(time) : new Date();
    
    // console.log(newTime);

    return newTime.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  }

  /**
   * Create a new element
   * @param {string} elem element to be created
   * @returns a node
   */
  newElem(elem) {
    return document.createElement(elem);
  }

  CelToFaren(celcius) {
    return (celcius * (9/5)) + 32
  }

  /**
   * Get an existing nodo from the DOM
   * @param {string} select 
   * @returns nodo
   */
  $(select) {
    return document.querySelector(select) || console.error("El elemento indicado no existe en el DOM");
  }

  getIconURL(icon) {
    return `http://openweathermap.org/img/wn/${icon}@2x.png`
  }
}
