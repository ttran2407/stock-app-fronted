import Stock from './Stock'
import StockChart from './StockChart'
import React from 'react'
import { Button, Container, Modal, Grid, Segment} from 'semantic-ui-react'
import Buy from './Buy'
import Sell from './Sell'
import SearchBar from './SearchBar'


class StockContainer extends React.Component {

  render (){
    return (
      <React.Fragment>
        <SearchBar/>
        <Grid columns='equal' rows='equal' divided padded>
          <Grid.Row textAlign='center'>
            <Grid.Column>
              <Segment >
                <Stock/>
                <Buy/>
                <Sell/>
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment >
                <StockChart/>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </React.Fragment>
    )
  }
}

export default StockContainer
