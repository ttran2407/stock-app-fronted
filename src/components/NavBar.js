import React, { Component } from 'react'
import {  Menu } from 'semantic-ui-react'
import {connect} from 'react-redux'
import {getUser } from '../actions/stocksAction'
import SearchBar from '../components/SearchBar'

 class NavBar extends Component {


  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {


    return (
      <Menu secondary>
        <a href="http://localhost:3001/">
          <Menu.Item icon="home" name='home'/>
        </a>

        <Menu.Menu position='right'>
          <Menu.Item>
            <SearchBar/>
          </Menu.Item>
              <Menu.Item
                name= {`hello ${this.props.user.first_name}`}
                onClick={this.handleItemClick}
              />

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

export default connect(mapStateToProps, {getUser })(NavBar)
