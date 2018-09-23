import React, { Component } from 'react'
import 'bulma/css/bulma.css'
import { Button, Label, Input } from 'bloomer'
import apiCalls from '../data'

class Register extends Component {
  constructor () {
    super()
    this.state = {
      username: '',
      password: '',
      emailaddress: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange (field, value) {
    this.setState({ field: value })
  }
  handleSubmit (e) {
    e.preventDefault()
    let username = this.state.username
    let password = this.state.password
    apiCalls.login(username, password)
    console.log(username, 'username')
    console.log(password, 'password')
  }
  render () {
    return (<div>
      <div className='column'>
        <Button className='login button'onClick={e => this.props.register(e)}> Login</Button>
        <Button className='login button' onClick={e => this.register(e, false)}> Register</Button>
        <Label>Username</Label>
        <Input className='username' onChange={event => this.handleChange('username', event.target.value)} />
        <Label>Password</Label>
        <Input className='username' type='password' onChange={event => this.handleChange('password', event.target.value)} />
        <Label>Email Address </Label>
        <Input className='username' type='email' onChange={event => this.handleChange('password', event.target.value)} />
      </div>
    </div>
    )
  }
}

export default Register
