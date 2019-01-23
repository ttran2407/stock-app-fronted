import React from 'react'
import { Grid, Header, Button } from 'semantic-ui-react'
import CircularProgressbar from 'react-circular-progressbar';

const CircularChart = (props) => (

  <React.Fragment>

    <Grid >
      <Grid.Row >
        <Grid.Column width={5}>
          <CircularProgressbar percentage={props.cashPercentage} text={`${props.cashPercentage}%`}
          counterClockwise
          strokeWidth={12}
          styles={{
            path: { stroke: `rgb(100, 83, 148)` },
            text: { fill: '#f88', fontSize: '16px' },
          }}
          />
        </Grid.Column >
        <Grid.Column width={5} textAlign='center'>
          <Header content="CASH"></Header>
          <Grid.Row> ${Math.round(props.cash * 100)/100} </Grid.Row>
          <Button  content='Deposit'></Button>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row >
        <Grid.Column width={5}>
          <CircularProgressbar percentage={Math.round((100 - props.cashPercentage) * 100)/100} text={`${Math.round((100 - props.cashPercentage) * 100)/100}%`}
            strokeWidth={12}
            styles={{
              path: { stroke: `rgb(100, 83, 148)` },
              text: { fill: '#f88', fontSize: '16px' },
            }}
          />
        </Grid.Column>
        <Grid.Column width={5} textAlign='center'>
          <Header length={2} content="STOCK"></Header>
          <Grid.Row length={2}> ${Math.round((props.balance - props.cash) * 100)/100} </Grid.Row>
          <Button  content='Show Stock Holding'></Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </React.Fragment>

)

export default CircularChart
