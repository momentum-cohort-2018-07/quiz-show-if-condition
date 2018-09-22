import React, { Component } from 'react'
import { Button, Label, Input } from 'bloomer'

import Register from './Register'
import apiCalls from './data'

class Login extends Component {
  constructor () {
    super()
    this.state = {
      username: '',
      password: '',
      registering: false
    }
    this.handleUsernameChange = this.handleUsernameChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.register = this.register.bind(this)
  }
  handleSubmit (e) {
    e.preventDefault()
    let username = this.state.username
    let password = this.state.password
    apiCalls.login(username, password)
  }
  handleUsernameChange (value) {
    this.setState({ username: value })
  }
  handlePasswordChange (value) {
    this.setState({ password: value })
  }
  register (e, conditional) {
    e.preventDefault()
    console.log('here')
    this.setState({ 'registering': conditional })
  }
  render () {
    if (this.state.registering) {
      return (<Register handleSubmit={this.handleSubmit} handleChange={this.handleChange} register={this.register} />
      )
    } else {
      return (<div className='column'>
        <Button className='login button' > Login</Button>
        <Button className='login button' onClick={e => this.register(e, true)}> Register</Button>
        <Label>Username
          <Input className='username' onChange={event => this.handleUsernameChange(event.target.value)} />
        </Label>
        <Label>Password
          <Input className='username' onChange={event => this.handlePasswordChange(event.target.value)} />
        </Label>
        <Button className='login button' type='submit' onClick={e => this.handleSubmit(e)}>Submit</Button>
      </div>
      )
    }
  }
}

export default Login
