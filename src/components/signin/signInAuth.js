import auth from "../../auth";
var axios = require("axios");
class SignInAuth {
  constructor() {
    this.flag = false;
  }
  signIn = async (E, P) => {
    var data = { email: E, password: P };
    var config = {
      method: "post",
      url: "https://a-tracker.herokuapp.com/auth/sign_in",
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify(data),
    };
    await axios(config)
      .then((response) => {
        localStorage.setItem("accessToken", response.headers["access-token"]);
        localStorage.setItem("client", response.headers["client"]);
        localStorage.setItem("uid", response.headers["uid"]);
        localStorage.setItem("firstName", response.data.data.first_name);
        console.log("here", localStorage.getItem("accessToken"));
      })

      .catch((error) => {
        if (error.response.status == 401) {
          console.log("hi");
          localStorage.removeItem("accessToken");
        }
      });
    return;
  };
}

export default new SignInAuth();
