import React, { Component } from 'react'
import { Button, Label, Input } from 'bloomer'

import Register from './Register'
import apiCalls from '../data'

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
    this.setUser = this.setUser.bind(this)
  }
  handleUsernameChange (value) {
    this.setState({ username: value })
  }
  handlePasswordChange (value) {
    this.setState({ password: value })
  }
  setUser (e) {
    e.preventDefault()
    this.handleSubmit(e)
    this.props.setUserToken(e)
  }
  handleSubmit (e) {
    e.preventDefault()
    let { setCurrentUser } = this.props
    let username = this.state.username
    let password = this.state.password
    apiCalls.login(username, password)
      .then(user => setCurrentUser(user))
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
        <a > Login</a>
        <a onClick={e => this.register(e, true)}> Register</a>
        <Label>Username</Label>
        <Input className='username' onChange={event => this.handleUsernameChange(event.target.value)} />
        <Label>Password</Label>
        <Input className='username' type='password' onChange={event => this.handlePasswordChange(event.target.value)} />
        <Button className='is-primary' type='submit' onClick={e => this.setUser(e)}>Submit</Button>
      </div>
      )
    }
  }
}

export default Login
