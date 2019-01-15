import React from 'react'
import { Grid} from 'semantic-ui-react'
import SearchBar from '../components/SearchBar'
import WatchlistContainer from './WatchlistContainer'
import {connect} from 'react-redux'
import {fetchUser, fetchOwnedstocks, fetchTransactions} from '../actions/stocksAction'
import CircularProgressbar from 'react-circular-progressbar';




class UserContainer extends React.Component {

  componentWillMount(){
      let userId= window.location.pathname.split("/").pop()
      this.props.fetchUser(userId)
      this.props.fetchOwnedstocks(userId)
      this.props.fetchTransactions(userId)
    }

    componentDidMount(){
      let cors = require('cors')
      fetch(`https://seekingalpha.com/market_currents.xml`)
      .then(res => res.text())
      .then(console.log)
    }

  render (){
    // var convert = require('xml-js');
    // var xml =
    //   '<?xml version="1.0" encoding="utf-8"?>' +
    //   '<note importance="high" logged="true">' +
    //   '    <title>Happy</title>' +
    //   '    <todo>Work</todo>' +
    //   '    <todo>Play</todo>' +
    //   '</note>';
    //   var result2 = convert.xml2json(xml, {compact: false, spaces: 4});
    const percentage = 90;
    return (
      <React.Fragment>

        <SearchBar/>
        <CircularProgressbar percentage={percentage} text={`${percentage}%`}
        counterClockwise
        styles={{
          path: { stroke: `rgb(100, 83, 148)` },
          text: { fill: '#f88', fontSize: '16px' },

        }}
        />
        <Grid columns='equal' rows='equal' divided padded>
          <Grid.Row textAlign='center'>
            <Grid.Column>
              <WatchlistContainer/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect (mapStateToProps, {fetchUser, fetchOwnedstocks, fetchTransactions})(UserContainer)
