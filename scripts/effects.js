export default class Effects {
  constructor(home, forecast, cities, location) {
    this.btns = {
      before: 'home-btn',
      btns: {
        [home]: $(`.${home}`),
        [forecast]: $(`.${forecast}`),
        [cities]: $(`.${cities}`),
        [location]: $(`.${location}`)
      }
    }
  }

  setup() {

    changeNavBars(".bottombar",".sidebar");
    this.changeBarsOnResize(".bottombar",".sidebar");
    this.setBtnEvents();
  }

  changeBarsOnResize(small, large) {
    window.addEventListener("resize", () => changeNavBars(small,large))
  }

  setBtnEvents() {
    this.getAllBtns().forEach( (btn) => {
      btn.addEventListener("click", () => {
        const button = btn.closest(".btn-nav");
        
        const key = button.dataset.key;
        this.changeActiveBtn(key);
      })
    })
  }

  replaceClass(element, oldClass,newClass) {
    element.classList.remove(oldClass);
    element.classList.add(newClass)
  }

  /**
   * Change the active button
   * @param {positino} key the position of the button
   */
  changeActiveBtn(key) {
    // old btns
    this.replaceClass(this.getBtn(this.btns.before),'active','link-dark');
    this.replaceClass(this.getBtn(this.btns.before,1),'text-primary','text-dark');
    
    // new Btns
    this.replaceClass(this.getBtn(key),'link-dark','active');
    this.replaceClass(this.getBtn(key,1),'text-dark','text-primary');

    //Change the before property
    this.btns.before = key;

  }

  getBtn(key, position = 0){ 
    return this.btns.btns[key][position]
  }

  getAllBtns() {
    const btnsArr = [];
    for(let btns in this.btns.btns) {
      btnsArr.push(...this.btns.btns[btns])
    }

    return btnsArr
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


const showElem = (elems) => {
  elems.forEach( elem => elem.classList.remove("hide"))
}


const hideElem = (elems) => {

  elems.forEach( elem => elem.classList.add("hide"));
}

const $ = (selector) => {
  return [...document.querySelectorAll(selector)];
}