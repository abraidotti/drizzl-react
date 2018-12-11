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
    let activeComponents;

    if (!this.state.gotForecast) {
      activeComponents = <div><ParticlesContainer /><ForecastGetter sendForecast={this.getForecast} /></div>
    } else {
      activeComponents = <MiniDrawer />;
    }

    return (
      <div >
        {activeComponents}
      </div>
    );
  }
}

export default App;
