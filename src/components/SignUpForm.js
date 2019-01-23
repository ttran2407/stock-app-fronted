import React from 'react'
import {Button, Checkbox, Form } from 'semantic-ui-react'
import {connect } from 'react-redux'
import { getUser, closeSignUp} from '../actions/stocksAction'


class SignUpForm extends React.Component {

  state = {
    userName: "",
    firstName: "",
    lastName: "",
    cash: "",
    password: "",
    passwordConfirmation: ""
  }

  handleSubmit = () => {
    this.createUser(this.state)
  }

  createUser = (userInfo) => {
    fetch('http://localhost:3000/users', {
      method: "POST",
      headers: {
        "Content_Type": 'application/json',
        Accepts: "application/json"
      },
      body: JSON.stringify({
        user: {
          user_name: userInfo.userName,
          password: userInfo.password,
          password_confirmation: userInfo.passwordConfirmation,
          first_name: userInfo.firstName,
          last_name: userInfo.lastName,
          cash:userInfo.cash
        }
      })
    })
    .then(res => res.json())
    .then(user => {
      localStorage.setItem("token", user.jwt);
      this.props.getUser(user);
      this.props.closeSignUp()
    })
    .catch(error => console.error(error))
  }


  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render(){
    const {userName, firstName, lastName, cash, password, passwordConfirmation} = this.state
    return(
      <Form onSubmit={this.handleSubmit}>
        <Form.Field>
          <label>First Name</label>
          <input name='firstName' value={firstName} onChange={this.handleChange} placeholder='First Name' />
        </Form.Field>
        <Form.Field>
          <label>Last Name</label>
          <input name='lastName' value={lastName} onChange={this.handleChange} placeholder='Last Name' />
        </Form.Field>
        <Form.Field>
          <label>User Name</label>
          <input name='userName' value={userName} onChange={this.handleChange} placeholder='UserName' />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input type='password'  name='password' value={password} onChange={this.handleChange} placeholder='PassWord' />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input type='password' name='passwordConfirmation' value={passwordConfirmation} onChange={this.handleChange} placeholder='Confirm PassWord' />
        </Form.Field>
        <Form.Field>
          <label>Deposit Cash - $500 Minimum - $10,000,000 Maximum</label>
          <input type='number' min={500} max={10000000} name='cash' value={cash}  onChange={this.handleChange} placeholder='$10,000' />
        </Form.Field>
        <Form.Field>
          <Checkbox label='I agree to the Terms and Conditions' />
          </Form.Field>
            <Button type='submit'>Submit</Button>
      </Form>
    )
  }

}



export default connect (null, {getUser, closeSignUp}) (SignUpForm)
