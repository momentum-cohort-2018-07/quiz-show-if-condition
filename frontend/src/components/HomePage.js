import React, { Component } from 'react'
import './index.css'
import 'bulma/css/bulma.css'

import Login from './Login'
import Sidebar from './Sidebar'
import apiCalls from '../apiCalls'
import Dashboard from './Dashboard'

class Homepage extends Component {
  constructor () {
    super()
    this.setUserToken = this.setUserToken.bind(this)
    this.setCurrentUser = this.setCurrentUser.bind(this)
    this.onLogout = this.onLogout.bind(this)
  }
  setUserToken (e) {
    apiCalls.getUserToken()
  }
  render(){
      const { currentUser } = this.state
  
      if (this.state.currentUser) {
        return (
          <div className='App'>
            <Sidebar onLogout={this.props.onLogout} currentUser={currentUser} />
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
}

export default Homepage
