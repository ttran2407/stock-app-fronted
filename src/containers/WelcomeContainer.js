
import React from 'react'
import { Button, Icon } from 'semantic-ui-react'



class WelcomeContainer extends React.Component {

  render (){
    console.log("hello");
    return (
      <React.Fragment>
        <Button animated='fade' style={{"background-color": "#645394", "color": "white", "font-family": "brian", "font-size": "2em" }} size="big">
          <Button.Content visible>INVEST For FUTURE</Button.Content>
          <Button.Content hidden>START</Button.Content>
        </Button>

      </React.Fragment>
    )
  }
}

export default WelcomeContainer
