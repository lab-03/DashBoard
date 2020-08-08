var axios = require("axios");
class SignUp {
  SignUp = async (firstName, lastName, E, P, cb) => {
    console.log("first", firstName, "last", lastName, "em", E, "ps", P);
    var obj = {
      first_name: firstName,
      last_name: lastName,
      email: E,
      password: P
    };
    var data = {
      lecturer: obj
    };
    var config = {
      method: "post",
      url: "https://a-tracker.herokuapp.com/lecturers",
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify(data)
    };
    await axios(config)
      .then(response => {
        cb(true);
      })

      .catch(error => {
        console.log(error);
        cb(false);
      });
    return;
  };
}

export default new SignUp();
