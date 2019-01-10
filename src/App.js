import React, { Component } from 'react';
import StockContainer from './components/StockContainer'
import {Route} from 'react-router-dom'



class App extends Component {
  render() {
    return (
      <div >
        <Route path="/stocks/:symbol" component={StockContainer}></Route>
      </div>
    );
  }
}

export default App;
