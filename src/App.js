import React, { Component } from 'react';
import ForecastGetter from './components/ForecastGetter'
import ParticlesContainer from "./components/ParticlesContainer"
import MiniDrawer from './components/MiniDrawer'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      forecast: {},
      gotForecast: false
    }
    this.getForecast = this.getForecast.bind(this);
  }

    getForecast(forecastObject){
      this.setState({
        forecast: forecastObject,
        gotForecast: true
      });
  }

  render() {
    let activeComponent;

    if (!this.state.gotForecast) {
      activeComponent = <div><ForecastGetter sendForecast={this.getForecast} /></div>
    } else {
      activeComponent = <MiniDrawer forecast={this.state.forecast}/>;
    }

    return (
      <div >
        {activeComponent}
      </div>
    );
  }
}

export default App;
