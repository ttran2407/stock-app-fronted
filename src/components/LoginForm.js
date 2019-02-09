import React from 'react'
import {Button, Form, Message } from 'semantic-ui-react'
import { getUser, fetchOwnedstocks, fetchWatchlist, fetchTransactions} from '../actions/stocksAction'
import {connect } from 'react-redux'


class LoginForm extends React.Component {

  state = {
    userName: "",
    password: "",
    showError: false
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSubmit = () => {
    this.createAuth(this.state)
  }

  createAuth = (userInfo) => {
    fetch('http://localhost:3000/login', {
      method: "POST",
      headers: {
        "Content_Type": 'application/json',
        Accepts: "application/json"
      },
      body: JSON.stringify({
        user: {
          user_name: userInfo.userName,
          password: userInfo.password,
        }
      })
    })
    .then(res => res.json())
    .then(user => {
      if (user.error !== undefined){
        this.setState({showError: true})
      } else {
        localStorage.setItem("token", user.jwt);
        this.props.getUser(user.user);
        this.props.fetchWatchlist(user.user.id)
        this.props.fetchOwnedstocks(user.user.id)
        this.props.fetchTransactions(user.user.id)
      }

    })
  }

  render(){
    const {userName, password} = this.state
    return(
      <Form error={this.state.showError} onSubmit={this.handleSubmit}>
        <Form.Field>
          <label>User Name</label>
          <input name='userName' value={userName} onChange={this.handleChange} placeholder='UserName' />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input type='password'  name='password' value={password} onChange={this.handleChange} placeholder='PassWord' />
        </Form.Field>
        <Message
          error
          header='Failed to Log In'
          content='Invalid UserName or Password. Please try again.'
        />

        <Button type='submit'>Submit</Button>
      </Form>
    )
  }
}

export default connect (null, {getUser, fetchOwnedstocks, fetchWatchlist, fetchTransactions})(LoginForm)
