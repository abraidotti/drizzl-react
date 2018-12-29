import React, { Component } from "react";
import Particles from "react-particles-js";

export default class ParticlesContainer extends Component {
  render() {

    console.log(this.props.params)
    return (
      <Particles
        style={{
          backgroundColor: this.props.backgroundColor,
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          top: 0,
        }}
        params={this.props.params}
      />

    );
  }
}
