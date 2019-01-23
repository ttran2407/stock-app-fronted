import React, { Component } from 'react'
import {  Menu } from 'semantic-ui-react'
import {connect} from 'react-redux'
import {openSignUp, openLogin, getUser} from '../actions/stocksAction'
import { Modal } from 'semantic-ui-react'
import SignUpForm from '../components/SignUpForm'
import LoginForm from '../components/LoginForm'
import SearchBar from '../components/SearchBar'
import {Link} from 'react-router-dom'

 class NavBar extends Component {


  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {


    return (
      <Menu secondary>
        <Link to="/">
          <Menu.Item icon="home" name='home'/>
        </Link>
        <Menu.Menu position='right'>
          <Menu.Item>
            <SearchBar/>
          </Menu.Item>
          {this.props.user.id ?
            (
              <Menu.Item
                name= {`hello ${this.props.user.first_name}`}
                onClick={this.handleItemClick}
              />
            )
            :(
              <div>
              <Menu.Item
                name='login'
                onClick={this.props.openLogin}
              />
              <Menu.Item
                name='signup'
                onClick={this.props.openSignUp}
              />
              <Modal open={this.props.openSignUpForm}>
                <Modal.Header>Sign Up</Modal.Header>
                <Modal.Content>
                  <SignUpForm/>
                </Modal.Content>
              </Modal>

              <Modal open={this.props.openLoginForm}>
                <Modal.Header>Log In</Modal.Header>
                <Modal.Content>
                  <LoginForm/>
                </Modal.Content>
              </Modal>
            </div>

          )}

        </Menu.Menu>
      </Menu>
    )
  }
}

const mapStateToProps =(state) => {
  return {
    user: state.user,
    openSignUpForm: state.openSignUpForm,
    openLoginForm: state.openLoginForm
  }
}

export default connect(mapStateToProps, {openLogin,openSignUp,getUser })(NavBar)
