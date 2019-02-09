import React from 'react'
import {Button, Checkbox, Form, Message } from 'semantic-ui-react'
import {connect } from 'react-redux'
import { getUser, fetchOwnedstocks, fetchWatchlist, fetchTransactions} from '../actions/stocksAction'


class SignUpForm extends React.Component {

  state = {
    userName: "",
    firstName: "",
    lastName: "",
    cash: "500",
    password: "",
    passwordConfirmation: "",
    error: false,
    userNameError: false,
    firstNameError: false,
    lastNameError: false,
    passwordError: false,
    passwordConfirmationError: false,
    errorContent: 'UserName is already taken. Please try another one'
  }

  resetError = () => {
    this.setState({
      error: false,
      userNameError: false,
      firstNameError: false,
      lastNameError: false,
      passwordError: false,
      passwordConfirmationError: false,
      errorContent: 'UserName is already taken. Please try another one'
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.resetError()
    if (this.state.userName.length < 8){
      this.setState({userNameError: true, error: true, errorContent: "User Name need to be at least 8 characters"})
    } else if (this.state.firstName === ""){
      this.setState({firstNameError: true, error: true, errorContent: "First Name cannot be empty"})
    } else if (this.state.lastName === ""){
      this.setState({lastNameError: true, error: true, errorContent: "Last Name cannot be empty"})
    } else if (this.state.password.length < 8){
      this.setState({passwordError: true, error: true, errorContent: "PassWord need to be at least 8 characters"})
    } else if (this.state.passwordConfirmation !== this.state.password){
      this.setState({passwordConfirmationError: true, error: true, errorContent: "PassWord need to be match"})
    } else {
      this.createUser(this.state)
    }
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
      if (user.error !== undefined){
        this.setState({error: true})
      } else {
        localStorage.setItem("token", user.jwt);
        this.props.getUser(user.user);
        this.props.fetchWatchlist(user.user.id)
        this.props.fetchOwnedstocks(user.user.id)
        this.props.fetchTransactions(user.user.id)
      }
    })
    .catch(error => console.error(error))
  }


  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render(){
    console.log(this.state.cash)
    const {userName, firstName, lastName, cash, password, passwordConfirmation} = this.state
    return(
      <Form error={this.state.error} onSubmit={this.handleSubmit}>
        <Message
          error
          header='Failed to Sign Up'
          content={this.state.errorContent}
        />
        <Form.Field error={this.state.firstNameError} required>
          <label>First Name</label>
          <input  name='firstName' value={firstName} onChange={this.handleChange} placeholder='First Name' />
        </Form.Field>
        <Form.Field error={this.state.lastNameError} required>
          <label>Last Name</label>
          <input name='lastName' value={lastName} onChange={this.handleChange} placeholder='Last Name' />
        </Form.Field>
        <Form.Field error={this.state.userNameError} required>
          <label>User Name</label>
          <input name='userName' value={userName} onChange={this.handleChange} placeholder='UserName' />
        </Form.Field>
        <Form.Field error={this.state.passwordError} required>
          <label>Password</label>
          <input  type='password'  name='password' value={password} onChange={this.handleChange} placeholder='PassWord' />
        </Form.Field>
        <Form.Field error={this.state.passwordConfirmationError} required>
          <label>Confirm Password</label>
          <input  type='password' name='passwordConfirmation' value={passwordConfirmation} onChange={this.handleChange} placeholder='Confirm PassWord' />
        </Form.Field >
        <Form.Field required>
          <label>Deposit Cash - $500 Minimum - $10,000,000 Maximum</label>
          <input type='number' step="0.01" min={500} max={10000000} name='cash' value={cash}  onChange={this.handleChange} placeholder='$10,000' />
        </Form.Field>

        <Button type='submit'>Submit</Button>
      </Form>
    )
  }

}



export default connect (null, {getUser, fetchOwnedstocks, fetchWatchlist, fetchTransactions}) (SignUpForm)
