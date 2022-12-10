const userName = 'demo@demo.com';
const password = 'demobyu';
const ls = window.localStorage;

export default class Local {
  constructor() {
    this.login = false;
  }

  getLogin() {

    const log = ls.getItem('login');
    

    if (log) return JSON.parse(log).status;

    return false;
  }


  setLogin(email, pass, status) {

    this.login = status;

    const session = {
      email,
      pass,
      status
    };

    ls.setItem('login',JSON.stringify(session));
  }
  

  validCredentials(user, pass) {

    return user === userName && pass === password
  }

}