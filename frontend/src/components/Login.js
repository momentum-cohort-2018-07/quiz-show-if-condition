import React, { Component } from 'react'
import { Button, Label, Input } from 'bloomer'
import Card from './Card'

import Register from './Register'
import apiCalls from '../apiCalls'

class Login extends Component {
  constructor () {
    super()
    this.state = {
      username: '',
      password: '',
      registering: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.register = this.register.bind(this)
    this.setUser = this.setUser.bind(this)
  }
  setUser (e) {
    e.preventDefault()
    this.handleSubmit(e)
    this.props.setUserToken(e)
  }
  handleSubmit (e) {
    e.preventDefault()
    const { username, password } = this.state
    let { setCurrentUser } = this.props
    apiCalls.login(username, password)
      .then(user => setCurrentUser(user))
  }
  register (e, conditional) {
    e.preventDefault()
    this.setState({ 'registering': conditional })
  }
  render () {
    const { username, password } = this.state
    if (this.state.registering) {
      return (<Register setUser={this.setUser} register={this.register} />
      )
    } else {
      return (
        <Card>
          <div className='has-text-centered'>
            <a > Login</a>
            &nbsp;|&nbsp;
            <a onClick={e => this.register(e, true)}> Register</a>
          </div>
          <Label>Username</Label>
          <Input className='username' value={username} onChange={(e) => this.setState({username: e.target.value})} />
          <Label>Password</Label>
          <Input className='username' value={password} type='password' onChange={e => this.setState({password: e.target.value})} />
          <Button className='is-primary' onClick={(e) => this.setUser(e)}>Login</Button>
        </Card>
      )
    }
  }
}

export default Login
