import React, { Component } from 'react';
import StockContainer from './components/StockContainer'
import UserContainer from './containers/UserContainer'
import WelcomeContainer from './containers/WelcomeContainer'
import {Route,Switch, withRouter} from 'react-router-dom'
import NavBar from './components/NavBar'
import {connect} from 'react-redux'
import {getUser, fetchWatchlist, fetchOwnedstocks, fetchTransactions, fetchStocks} from './actions/stocksAction'




class App extends Component {


  componentDidMount = () => {
    let token = localStorage.getItem("token");
    fetch(`http://localhost:3000/current_user`,{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Action": "application/json",
        "Authorization": `${token}`
      }
    })
    .then(res => res.json())
    .then(user => {
      if (Object.keys(user)[0] !== "message"){
        this.props.getUser(user)
        this.props.fetchWatchlist(user.user.id)
        this.props.fetchOwnedstocks(user.user.id)
        this.props.fetchTransactions(user.user.id)

      }
    })
  }


  render() {
    return (
      <div >
        <NavBar/>
        <Switch>
          <Route path="/stocks/:symbol" component={StockContainer} key={window.location.pathname}></Route>
          <Route exact path= "/" render={() =>(
              this.props.user.id ?
              <UserContainer/>:
              <WelcomeContainer/>
            )}>
          </Route>
        </Switch>

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user

  }
}

export default withRouter(connect(mapStateToProps, {getUser, fetchOwnedstocks, fetchWatchlist, fetchTransactions})(App));
