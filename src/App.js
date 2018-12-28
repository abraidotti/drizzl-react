import React, { Component } from 'react';
import ForecastGetter from './components/ForecastGetter'
import MiniDrawer from './components/MiniDrawer'
import './index.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formattedAddress: "",
      forecast: {},
      gotForecast: false
    }
    this.getForecast = this.getForecast.bind(this);
  }

    getForecast = (forecastObject, addressString) => {
      this.setState({
        formattedAddress: addressString,
        forecast: forecastObject,
        gotForecast: true
      });
  }

  render() {
    let activeComponent;

    if (!this.state.gotForecast) {
      activeComponent = <div><ForecastGetter sendForecast={this.getForecast} /></div>
    } else {
      activeComponent = <MiniDrawer forecast={this.state.forecast} address={this.state.formattedAddress}/>;
    }

    return (
      <div>
        {activeComponent}
      </div>
    );
  }
}

export default App;
