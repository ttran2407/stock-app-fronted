
import React from 'react'
import { Modal,Button, Container, Header, Card, Image, Dimmer, Loader } from 'semantic-ui-react'
import SignUpForm from './SignUpForm'
import LoginForm from './LoginForm'
import {connect} from 'react-redux'


class WelcomeContainerContent extends React.Component {


  state ={
    openSignUpForm: false,
    openSignInForm: false,
    text: null,
    showList: false,
    showButton: false
  }

  componentDidMount = () => {
    const arr = [{content: "Hello there", showList: false, showButton: false},
    {content: "Thinking about investing?", showList: true, showButton: false },
    {content: "Nope, they are too costly to test", showList: false, showButton: false},
    {content: "Try MoneyPoly, It's FREE", showList: false, showButton: true}
    ]

    const length = arr.length
    let i = 0
    let timingEvent =() => {
      this.setState({
        text: arr[i]["content"],
        showList: arr[i]["showList"],
        showButton: arr[i]["showButton"]
      })
      if (i < length -1){ i += 1} else (clearInterval(intervalId))
    }
    let intervalId = setInterval(timingEvent, 3000)
  }

  handleSignUpClick = () => {
    this.setState({
      openSignUpForm: !this.state.openSignUpForm
    })
  }

  handleSignInClick = () => {
    this.setState({
      openSignInForm: !this.state.openSignInForm
    })
  }

  render (){
    return (
      <div >


        <Container style={{"marginTop": "200px"}} textAlign="center" >
          <Header  style={{"fontSize": "35px","fontFamily":"verdana","marginBottom": "20px", "fontWeight": "bold"}} color="black" >
              {this.state.text ?
              this.state.text :
              <Dimmer active inverted>
                <Loader inverted />
              </Dimmer>}
          </Header>
          {this.state.showButton ?
          (<div>
            <Button.Group  size="huge" style={{"height": "auto", "width": "auto"}} >
              <Button onClick={this.handleSignInClick} style={{"backgroundColor":"#92A8D1", "color":"black"}} >Sign In</Button>
              <Button.Or />
              <Button onClick={this.handleSignUpClick} style={{"backgroundColor":"#645394"}} positive>Sign Up</Button>
            </Button.Group>
            <br/>
            <Button style={{"marginLeft": "5px", "marginTop": "10px","width": "22.5%"}} size="huge" color="green"> Demo </Button>
          </div>)
          : null}
          {this.state.showList ?
          (
            <Card.Group itemsPerRow="4" centered>
              <Card>
                <Image src='https://img.purch.com/r/520x520/aHR0cHM6Ly93d3cudG9wdGVucmV2aWV3cy5jb20vaS9wZHAvZjZlMjhmMmRjZmU2NzVjOGVmNzdlODUzMzcwNTMwYzUuanBn' />
                <Card.Content>
                  E*Trade
                </Card.Content>
              </Card>
              <Card>
                <Image src='https://www.placevertu.com/app/uploads/sites/20/2018/04/TD-bank_Web-1.jpg' />
                <Card.Content>
                  TD Ameritrade
                </Card.Content>
              </Card>
              <Card>
                <Image src='https://adc3ef35f321fe6e725a-fb8aac3b3bf42afe824f73b606f0aa4c.ssl.cf1.rackcdn.com/tenantlogos/21205.png' />
                <Card.Content>
                  Fidelity
                </Card.Content>
              </Card>
              <Card>
                <Image src='https://is4-ssl.mzstatic.com/image/thumb/Purple128/v4/fc/e2/6e/fce26ef9-837f-6983-d1ff-81d2c9919861/source/512x512bb.jpg' />
                <Card.Content>
                  Merrill Edge
                </Card.Content>
              </Card>
            </Card.Group>
          )
          : null}
        </Container>

        <Modal
          open={this.state.openSignUpForm}
          onClose={this.handleSignUpClick}>
          <Modal.Header content="Sign Up"/>
          <Modal.Content>
            <SignUpForm/>
          </Modal.Content>
        </Modal>

        <Modal
          open={this.state.openSignInForm}
          onClose={this.handleSignInClick}>
          <Modal.Header content="Sign In"/>
          <Modal.Content>
            <LoginForm />
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

export default connect(mapStateToProps) (WelcomeContainerContent)
