// import _ from 'lodash'
import React, { Component } from 'react'
import { Grid, Header, Input,  List} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'


 class SearchExampleStandard extends Component {

  state={
    isLoading: false,
    results: [],
    value: ''
  }
  componentWillMount() {
    this.resetComponent()
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

  handleClick = (e) => {this.resetComponent()}

  handleSearchChange = (e) => {
    if (e.target.value.length < 1){return this.resetComponent()} else {this.setState({ isLoading: true, value: e.target.value})}
    let stockList = this.props.stocks.filter(stock => stock.name.toLowerCase().includes(this.state.value))
    if (stockList.length > 5){stockList = stockList.slice(0,4)}
    this.setState({results: stockList})
    // setTimeOut(this.resetComponent(), 3000)
  }

  render() {
    const { isLoading, results } = this.state

    return (
      <Grid>
        <Grid.Column  width={10}>
          <Input loading={isLoading} icon="search" placeholder="Search..."
            onChange={this.handleSearchChange}/>
          <List animated selection celled style={{"position": "fixed" , "zIndex":"5", "margin" : "0px", "border": "0px" }} >
            {results.map(stock =>
                <List.Item onClick={this.handleClick}  style={{"backgroundColor":"white"}} key={stock.symbol}>
                  <Link to={`/stocks/${stock.symbol}`}>
                    <Header as="h4" content={stock.symbol} />
                    {stock.name}
                  </Link>
                </List.Item>

            )}
          </List>
      </Grid.Column>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    stocks: state.stocks
  }
}
export default connect (mapStateToProps)(SearchExampleStandard)
