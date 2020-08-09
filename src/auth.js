import SignInAuth from "./components/signin/signInAuth";
class Auth {
  constructor() {
    this.authenticated = false;
  }

  async login(E, P, cb) {
    await SignInAuth.signIn(E, P);
    // console.log("off", localStorage.getItem("accessToken"));
    if (localStorage.getItem("accessToken")) {
      this.authenticated = true;
      cb(true);
    } else {
      cb(false);
      console.log("Wrong Credentials");
    }
  }

  logout(cb) {
    this.authenticated = false;
    localStorage.removeItem("accessToken");
    cb();
  }

  isAuthenticated() {
    console.log(localStorage.getItem("accessToken"));
    return localStorage.getItem("accessToken") != undefined;
  }
}

export default new Auth();
