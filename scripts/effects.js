export default class Effects {
  constructor() {
    
  }

  setup() {

    changeNavBars(".bottombar",".sidebar");
    this.changeBarsOnResize(".bottombar",".sidebar")
  }

  changeBarsOnResize(small, large) {
    window.addEventListener("resize", () => changeNavBars(small,large))
  }
};

const changeNavBars = (small, large) => {
  const rem = pxToRem(window.innerWidth)

  if(rem > 62) {
    showElem($(large))
    hideElem($(small))
    return
  }
  
  showElem($(small))
  hideElem($(large))
}

/**
 * Convert pixels in rem units
 * @param {number} px pixel units
 * @returns rem unities
 */
const pxToRem = (px) => {

  if(!(typeof px === "number")) {
    throw new Error("px is not a number");
  }

  return px / 16
}


const showElem = (elem) => {
  elem.classList.remove("hide")
}


const hideElem = (elem) => {

  elem.classList.add("hide");
}

const $ = (selector) => {
  return document.querySelector(selector);
}