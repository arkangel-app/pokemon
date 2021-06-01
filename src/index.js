import "core-js/es6/map";
import "core-js/es6/set";
import "core-js/es6/string";
import React from "react";
import ReactDOM from "react-dom";
import Juego from "./Juego";
import "antd/dist/antd.css";
import "./index.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
    };
  }

  render() {
    return (
      <div>
        <Juego />
      </div>
    );
  }
}
//TagManager.initialize(tagManagerArgs)
const DashApp = () => {
  return ReactDOM.render(<App />, document.getElementById("root"));
};
DashApp();
