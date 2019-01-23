import React from 'react'
import {Button, Form } from 'semantic-ui-react'
import { getUser, closeLogin} from '../actions/stocksAction'
import {connect } from 'react-redux'


class LoginForm extends React.Component {

  state = {
    userName: "",
    password: "",

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
          password: userInfo.password
        }
      })
    })
    .then(res => res.json())
    .then(user => {
      localStorage.setItem("token", user.jwt);
      this.props.getUser(user);
      this.props.closeLogin()
    })
  }

  render(){
    const {userName, password} = this.state
    return(
      <Form onSubmit={this.handleSubmit}>
        <Form.Field>
          <label>User Name</label>
          <input name='userName' value={userName} onChange={this.handleChange} placeholder='UserName' />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input type='password'  name='password' value={password} onChange={this.handleChange} placeholder='PassWord' />
        </Form.Field>

        <Button type='submit'>Submit</Button>
      </Form>
    )
  }
}

export default connect (null, {getUser, closeLogin})(LoginForm)
