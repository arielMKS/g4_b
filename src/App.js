import React, { Component } from "react";

import axios from "axios";
import "./App.css";

class App extends Component {
  componentDidMount() {
    console.log("componentDidMount firing");

    const url =
      "https://www.dropbox.com/s/81ssw1ng8yvrom7/g4-challenge-2018.06.0v1.zip?dl=0&file_subpath=%2Fg4-challenge%2Fjs%2Fcustomers.json";

    axios.get(url).then(response => {
      console.log("RESPONSE", response);
    });
  }

  render() {
    return (
      <div className="App">
        <h1>Hello</h1>
      </div>
    );
  }
}

export default App;
