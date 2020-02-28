import React, { Component } from "react";
import Particles from "react-particles-js";
import QrCodeImage from "./components/QrCodeImage/QrCodeImage";
import Navigation from "./components/Navigation/Navigation";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
// import Rank from "./components/Rank/Rank";
import "./App.css";
import "tachyons";

const particlesOptions = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
};
const initialState = {
  input: "",
  imageUrl: "",
  route: "signin",
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: ""
  }
};
class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = data => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    });
  };

  onButtonSubmit = () => {
    fetch("http://localhost:8888/api/create", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        longitude: "10.807222",
        latitude: "-90.984722",
        hash: "HASDIONJifbw39e8das"
      })
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        console.log(response.data);
        this.setState({ imageUrl: response.data });
      })
      .catch(err => console.log(err));
  };

  onRouteChange = route => {
    if (route === "signout") {
      this.setState(initialState);
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  render() {
    const { isSignedIn, imageUrl, route, user } = this.state;
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        {route === "home" ? (
          <div>
            {/* <Rank name={user.name} entries={user.entries} /> */}
            <ImageLinkForm onButtonSubmit={this.onButtonSubmit} />
            <QrCodeImage imageUrl={imageUrl} />
          </div>
        ) : route === "signin" ? (
          <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        ) : (
          <Register
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}
          />
        )}
      </div>
    );
  }
}

export default App;
