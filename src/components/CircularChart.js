import React from 'react'
import { Grid, Header, Button, Modal, Form, Input } from 'semantic-ui-react'
import CircularProgressbar from 'react-circular-progressbar';
import StockHolding from './StockHolding'
import {connect } from 'react-redux'
import {depositMoney} from '../actions/stocksAction'

class CircularChart extends React.Component {

  state ={
    showStocksHolding: false,
    openDepositForm: false,
    deposit: "500"
  }

  handleShowStocks = () => {
    this.setState({
      showStocksHolding: !this.state.showStocksHolding
    })
  }

  handleDepositForm = () => {
    this.setState({
      openDepositForm: !this.state.openDepositForm
    })
  }

  handleSubmit =() => {
    //adding money function
    let cash = parseFloat(this.state.deposit) + parseFloat(this.props.user.cash)
    this.props.depositMoney(this.props.user.id,String(cash))
    this.setState({
      deposit: "500",
      openDepositForm: false
    })

  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render () {



    const {cashPercentage, cash, balance} = this.props

    return (
      <React.Fragment>

        <Grid column={2} textAlign="center">
          <Grid.Column  style={{"width": "50%"}} className="cash" >
            <Grid.Row >
              <Header style={{"height": "50px", "paddingTop": "10px"}} content="CASH"></Header>
            </Grid.Row>
            <Grid.Row >
              <CircularProgressbar percentage={cashPercentage} text={`${cashPercentage}%`}
              counterClockwise
              strokeWidth={12}
              styles={{
                path: { stroke: `rgb(100, 83, 148)` },
                text: { fill: '#f88', fontSize: '16px' },
                root: {width: '80%'}
              }}
              />
            </Grid.Row>
            <Grid.Row >
              <div style={{"height": "60px", "paddingTop": "20px" , "color": "#5692ce"}}>${Math.round(cash * 100)/100}</div>
            </Grid.Row>
            <Grid.Row >
              <Modal
                trigger={<Button onClick={this.handleDepositForm} style={{"height": "20%"}}  content='Deposit'></Button>}
                open={this.state.openDepositForm}
                onClose={this.handleDepositForm}>
                <Modal.Header content="Deposit"/>

                <Modal.Content>
                  <Form onSubmit={this.handleSubmit}>
                    <Form.Group widths='equal'>
                      <Form.Field
                        name="deposit"
                        min={0.1}
                        onChange={this.handleChange}
                        type='number'
                        step="0.01"
                        id='form-input-control-quantity'
                        control={Input}
                        value={this.state.deposit}

                      />
                    </Form.Group>
                    <Button  type='submit' color="green">Add</Button>
                  </Form>
                </Modal.Content>
              </Modal>
            </Grid.Row>
          </Grid.Column>

          <Grid.Column style={{"width": "50%"}} className="stock" >
            <Grid.Row>
              <Header style={{"height": "50px", "paddingTop": "10px"}} content="STOCK"></Header>
            </Grid.Row>
            <Grid.Row>
              <CircularProgressbar style={{"height": "150px"}} percentage={Math.round((100 - cashPercentage) * 100)/100} text={`${Math.round((100 - cashPercentage) * 100)/100}%`}
                strokeWidth={12}
                styles={{
                  path: { stroke: `rgb(100, 83, 148)` },
                  text: { fill: '#f88', fontSize: '16px' },
                  root: {width: '80%'}
                }}
              />
            </Grid.Row>
            <Grid.Row>
              <div style={{"height": "60px", "paddingTop": "20px", "color": "#5692ce"}} > ${Math.round((balance - cash) * 100)/100} </div>

            </Grid.Row>
            <Grid.Row>
              <Modal
                trigger={<Button onClick={this.handleShowStocks}  content='Show Stock Holding'></Button>}
                open={this.state.showStocksHolding}
                onClose={this.handleShowStocks}>
                <Modal.Header >
                  Stocks Holding List
                </Modal.Header>
                <Modal.Content>
                  <StockHolding/>
                </Modal.Content>
              </Modal>

            </Grid.Row>
          </Grid.Column>
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




export default connect (mapStateToProps,{depositMoney})(CircularChart)
