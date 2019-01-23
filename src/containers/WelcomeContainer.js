
import React from 'react'
import { Modal,Button, Grid } from 'semantic-ui-react'
import SignUpForm from '../components/SignUpForm'
import {connect} from 'react-redux'
import {openSignUp, closeSignUp} from '../actions/stocksAction'




class WelcomeContainer extends React.Component {


  render (){
    return (
      <div>
        <Grid.Row columns={1}>
          <Grid.Column className="segment centered">
            <Button onClick={this.props.openSignUp} animated='fade' style={{"backgroundColor": "#645394", "color": "white", "fontFamily": "brian", "fontSize": "2em" }} size="big">
              <Button.Content visible>INVEST For FUTURE</Button.Content>
              <Button.Content hidden>START</Button.Content>
            </Button>
          </Grid.Column>
        </Grid.Row>
        <Modal open={this.props.openSignUpForm}>
          <Modal.Header>Sign Up</Modal.Header>
          <Modal.Content>
            <SignUpForm />
            </Modal.Content>
          </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    openSignUpForm: state.openSignUpForm
  }
}

export default connect(mapStateToProps, {openSignUp, closeSignUp}) (WelcomeContainer)
