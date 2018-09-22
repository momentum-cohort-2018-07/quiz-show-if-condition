import React, { Component } from 'react'
import './App.css'
import 'bulma/css/bulma.css'

import Login from './Login'
import Dashboard from './Dashboard'

class App extends Component {
  constructor () {
    super()
    this.state = {
      currentUser: token
    }
  }
  render () {
    return (
      <div>
        <div className='columns'>
          <div className='column is-one-fifth'>
            <h1>Quizzly Bear</h1>
          </div>
          <Login />
        </div>
      </div>
    )
  }
}

export default App
