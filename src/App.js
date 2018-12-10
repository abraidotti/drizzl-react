import React, { Component } from 'react';

import ForecastGetter from './components/ForecastGetter'
import ParticlesContainer from "./components/ParticlesContainer"
import MiniDrawer from './components/MiniDrawer'

class App extends Component {
  render() {
    return (
      <div >
      <ParticlesContainer />
        <ForecastGetter />
        {/*<MiniDrawer />*/}
      </div>
    );
  }
}

export default App;
