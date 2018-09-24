import React, { Component } from 'react'
import { Button, Label, Input, Field, Notification } from 'bloomer'
import Card from './Card'
import 'bulma/css/bulma.css'
import apiCalls from '../apiCalls'

class Register extends Component {
  constructor () {
    super()
    this.state = {
      username: '',
      password: '',
      passwordConf: '',
      errMsg: null
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit (e) {
    e.preventDefault()
    const { username, password, passwordConf } = this.state
    const { setUser } = this.props
    if (passwordConf === password) {
      apiCalls.register(username, password)
        .then(user => setUser(user))
        .catch(err => {
          this.setState({
            errMsg: err.message
          })
        })
    } else {
      this.setState({ errMsg: 'Your password and confirmation must match.' })
    }
  }
  render () {
    const { username, password, passwordConf, errMsg } = this.state
    return (
      <Card>
        <div className='has-text-centered'>
          <a onClick={e => this.props.register(e)}> Login</a>
        &nbsp;|&nbsp;
          <a onClick={e => this.register(e, false)}> Register</a>
        </div>
        <div className='RegisterForm'>
          { errMsg &&
          <Notification isColor='danger'>
            {errMsg}
          </Notification>
          }
          <Field>
            <Label>Username</Label>
            <Input value={username} onChange={e => this.setState({ username: e.target.value })} />
            <Label>Password</Label>
            <Input value={password} type='password' onChange={e => this.setState({ password: e.target.value })} />
            <Label>Confirm Password</Label>
            <Input value={passwordConf} type='password' onChange={e => this.setState({ passwordConf: e.target.value })} />
            <Button className='is-primary' onClick={this.handleSubmit}>Register</Button>
          </Field>
        </div>
      </Card>
    )
  }
}

export default Register
