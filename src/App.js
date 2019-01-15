import React, { Component } from 'react';
import StockContainer from './components/StockContainer'
import UserContainer from './containers/UserContainer'
import WelcomeContainer from './containers/WelcomeContainer'
import {Route} from 'react-router-dom'
import NavBar from './components/NavBar'




class App extends Component {
  render() {
    return (
      <div >
        <NavBar/>
        <Route exact path="/users/:id/stocks/:symbol" component={StockContainer}></Route>
        <Route exact path="/users/:id" component={UserContainer}></Route>
        <Route exact path="/" component={WelcomeContainer}></Route>
      </div>
    );
  }
}

export default App;
