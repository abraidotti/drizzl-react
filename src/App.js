import React, { Component } from 'react';

import ForecastGetter from './components/ForecastGetter'

import MiniDrawer from './components/MiniDrawer'

class App extends Component {
  render() {
    return (
      <div >
        <ForecastGetter />
        {/*<MiniDrawer />*/}
      </div>
    );
  }
}

export default App;
