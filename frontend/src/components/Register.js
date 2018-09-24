import React, { Component } from 'react'
import 'bulma/css/bulma.css'
import { Button, Label, Input } from 'bloomer'
import apiCalls from '../data'

class Register extends Component {
  constructor () {
    super()
    this.state = {
      username: '',
      password: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleUsername = this.handleUsername.bind(this)
    this.handlePassword = this.handlePassword.bind(this)
  }
  handleUsername (value) {
    this.setState({ username: value })
  }

  handlePassword (value) {
    this.setState({ password: value })
  }

  handleSubmit (e) {
    e.preventDefault()
    let username = this.state.username
    let password = this.state.password
    apiCalls.register(username, password)
  }
  render () {
    return (<div>
      <div className='column'>
        <a onClick={e => this.props.register(e)}> Login</a>
        <a onClick={e => this.register(e, false)}> Register</a>
        <Label>Username</Label>
        <Input className='username' onChange={event => this.handleUsername(event.target.value)} />
        <Label>Password</Label>
        <Input className='username' type='password' onChange={event => this.handlePassword(event.target.value)} />

        <Button className='is-primary' onClick={this.handleSubmit}>Submit</Button>
      </div>
    </div>
    )
  }
}

export default Register
