import React, { Component } from 'react'
import { Title, Input, Button } from 'bloomer'

import apiCalls from '../apiCalls'

class Profile extends Component {
  constructor () {
    super()
    this.state = {
      username: '',
      password: ''
    }
  }
  componentDidMount () {
    this.getUser()
  }
  getUser () {
    apiCalls.getUserProfile(this.props.token)
      .then(res => {
        console.log(res)
      })
  }
  // handleSubmit (e) {
  //   e.preventDefault()
  //   let { username, password } = this.state
  // }
  render () {
    let { username, password } = this.state
    return (
      <div>
        <Title><div>Profile</div></Title>
        <h2>Username:
          <Input placeholder='enter your new username' value={username} onChange={(e) => this.setState({ username: e.target.value })} />
        </h2>
        <h2>Password:
          <Input placeholder='enter your new password' value={password} type='password' onChange={e => this.setState({ password: e.target.value })} />
        </h2>
        <Button type='submit' onClick={e => { this.handleSubmit(e) }}>Submit</Button>
      </div>
    )
  }
}
export default Profile
