import React from 'react'
import { Grid, Header, Button } from 'semantic-ui-react'
import CircularProgressbar from 'react-circular-progressbar';

const CircularChart = (props) => (

  <React.Fragment>

    <Grid column={2} textAlign="center">
      <Grid.Column  style={{"width": "50%"}} className="cash" >
        <Grid.Row >
          <Header style={{"height": "50px", "padding-top": "10px"}} content="CASH"></Header>
        </Grid.Row>
        <Grid.Row >
          <CircularProgressbar percentage={props.cashPercentage} text={`${props.cashPercentage}%`}
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
          <div style={{"height": "60px", "padding-top": "20px" , "color": "#5692ce"}}>${Math.round(props.cash * 100)/100}</div>
        </Grid.Row>
        <Grid.Row >
          <Button style={{"height": "20%"}}  content='Deposit'></Button>
        </Grid.Row>
      </Grid.Column>

      <Grid.Column style={{"width": "50%"}} className="stock" >
        <Grid.Row>
          <Header style={{"height": "50px", "padding-top": "10px"}} content="STOCK"></Header>
        </Grid.Row>
        <Grid.Row>
          <CircularProgressbar style={{"height": "150px"}} percentage={Math.round((100 - props.cashPercentage) * 100)/100} text={`${Math.round((100 - props.cashPercentage) * 100)/100}%`}
            strokeWidth={12}
            styles={{
              path: { stroke: `rgb(100, 83, 148)` },
              text: { fill: '#f88', fontSize: '16px' },
              root: {width: '80%'}
            }}
          />
        </Grid.Row>
        <Grid.Row>
          <div style={{"height": "60px", "padding-top": "20px", "color": "#5692ce"}} > ${Math.round((props.balance - props.cash) * 100)/100} </div>

        </Grid.Row>
        <Grid.Row>
          <Button  content='Show Stock Holding'></Button>
        </Grid.Row>
      </Grid.Column>
    </Grid>

  </React.Fragment>

)

export default CircularChart
