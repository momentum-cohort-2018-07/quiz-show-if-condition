import React, { Component } from 'react'
import './App.css'
import 'bulma/css/bulma.css'
import { Button, Label, Input } from 'bloomer'
import apiCalls from './data'

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
        <Label>Username
          <Input className='username' onChange={event => this.handleChange('username', event.target.value)} />
        </Label>
        <Label>Password
          <Input className='username' type='password' onChange={event => this.handleChange('password', event.target.value)} />
        </Label>
        <Label>Email Address
          <Input className='username' type='email' onChange={event => this.handleChange('password', event.target.value)} />
        </Label>
      </div>
    </div>
    )
  }
}

export default Register
