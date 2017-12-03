import React, { Component } from "react";
import img from "./betterImage.png";
import "./backgroundImage.css";

class backgroundImage extends Component {
  render() {
    return (
      <div>
        <img src={img} />
      </div>
    );
  }
}

export default backgroundImage;
