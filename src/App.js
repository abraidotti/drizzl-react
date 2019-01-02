import React, { Component } from 'react';
import ForecastGetter from './components/ForecastGetter'
import Console from './components/Console'
import './index.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formattedAddress: "",
      forecast: {},
      gotForecastAndParticleParams: false,
      particleParams: {}
    }
    this.getForecast = this.getForecast.bind(this);
  }

    getForecast = (addressString, forecastObject, paramsObject) => {
      this.setState({
        formattedAddress: addressString,
        forecast: forecastObject,
        gotForecastAndParticleParams: true,
        particleParams: paramsObject
      });
  }

  render() {
    let activeComponent;

    if (!this.state.gotForecastAndParticleParams) {
      activeComponent = <ForecastGetter
                          sendForecast={this.getForecast}
                        />
    } else {
      activeComponent = <Console
                          forecast={this.state.forecast}
                          address={this.state.formattedAddress}
                          particleParams={this.state.particleParams}
                        />;
    }

    return (
      <div>
        {activeComponent}
      </div>
    );
  }
}

export default App;
