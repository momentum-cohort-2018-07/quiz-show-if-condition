import React, { Component } from 'react'
import './App.css'
import 'bulma/css/bulma.css'

import Login from './Login'
import Dashboard from './Dashboard'
import apiCalls from './data'

class App extends Component {
  constructor () {
    super()
    this.state = {
      currentUser: null
    }
    const username = window.localStorage.getItem('username')
    const token = window.localStorage.getItem('token')
    if (username && token) {
      this.state.currentUser = { username, token }
      apiCalls.setUserToken(token)
    }

    this.setUserToken = this.setUserToken.bind(this)
    this.setCurrentUser = this.setCurrentUser.bind(this)
  }
  setCurrentUser (user) {
    // window.localStorage.setItem('username', user.username)
    // window.localStorage.setItem('token', user.token)
  }
  setUserToken (e) {
    e.preventDefault()
    apiCalls.getUserToken()
  }
  render () {
    if (this.state.currentUser) {
      return (<div><Dashboard /> </div>)
    } else {
      return (
        <div>
          <div className='columns'>
            <div className='column is-one-fifth'>
              <h1>Quizzly Bear</h1>
            </div>
            <Login setUserToken={this.setUserToken} setCurrentUser={this.setCurrentUser} />
          </div>
        </div>
      )
    }
  }
}

export default App
