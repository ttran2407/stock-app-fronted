import Chart from './Chart'
import React from 'react'
import {connect} from 'react-redux'

import { TypeChooser } from "react-stockcharts/lib/helper";
import {fetchStockChart} from '../actions/stocksAction'
import { render } from "react-dom";




class StockChart extends React.Component {

  componentDidMount() {
    let symbol = window.location.pathname.split("/").pop()
   this.props.fetchStockChart(symbol)
 }

  render(){
    return (
      <React.Fragment>
          {
            this.props.stockChartData == null
              ? <div>Loading...</div>:
              (<TypeChooser>
                {type => <Chart type={type} data={
                  this.props.stockChartData.map(stock => {
                    let newStock = {...stock}
                    newStock.date = new Date(stock.date)
                    return newStock
                  })
                } />}
              </TypeChooser>)
          }
      </React.Fragment>

    )
  }
}

const mapStateToProps =  state => {
  return {
    stockChartData: state.stockChartData
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchStockChart: (symbol) => dispatch(fetchStockChart(symbol))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StockChart)
