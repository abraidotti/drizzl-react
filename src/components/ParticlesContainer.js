import React, { Component } from "react";
import Particles from "react-particles-js";

export default class ParticlesContainer extends Component {
  componentDidMount(){
    console.log('params in particles container', this.props.params)
  }

  render() {
    return (
      <Particles
        style={{
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
