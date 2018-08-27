import React, { Component } from 'react';
import './App.css';
import AppNavbar from './components/AppNavbar';

import { Provider } from 'react-redux';
import store from './store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
        <AppNavbar />
        </div>
      </Provider>
    );
  }
}

export default App;
