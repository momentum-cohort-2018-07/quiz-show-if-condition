import React, { Component } from 'react'
import './index.css'
import 'bulma/css/bulma.css'

import Login from './components/Login'
import Sidebar from './components/Sidebar'
import apiCalls from './data'
import Dashboard from './components/Dashboard'

class App extends Component {
  constructor () {
    super()
    this.state = {
      currentUser: null
    }
    this.setCurrentUser = this.setCurrentUser.bind(this)
    this.setUserToken = this.setUserToken.bind(this)
    this.setCurrentUser = this.setCurrentUser.bind(this)
    this.onLogout = this.onLogout.bind(this)

    const username = window.localStorage.getItem('username')
    const token = window.localStorage.getItem('token')
    if (username && token) {
      this.state.currentUser = { username, token }
      apiCalls.setUserToken(token)
    }
  }
  setCurrentUser (user) {
    console.log(this.state.currentUser, 'current user')
    window.localStorage.setItem('username', user.username)
    window.localStorage.setItem('token', user.token)
    this.setState({ currentUser: user })
  }
  setUserToken (e) {
    e.preventDefault()
    apiCalls.getUserToken()
  }
  onLogout () {
    this.setState({currentUser: false})
  }

  render () {
    const { currentUser } = this.state

    if (this.state.currentUser) {
      return (
        <div className='App'>
          <Sidebar onLogout={this.onLogout} currentUser={currentUser} />
          <main className='main'>
            <div className='board'>
              <Dashboard setUserToken={this.setUserToken} setCurrentUser={this.setCurrentUser} />
            </div>
          </main>
        </div>
      )
    }
    return (
      <div className='App'>
        <Sidebar />
        <main className='main'>
          <div className='board'>
            <Login setUserToken={this.setUserToken} setCurrentUser={this.setCurrentUser} />
          </div>
        </main>
      </div>
    )
  }
}

export default App
