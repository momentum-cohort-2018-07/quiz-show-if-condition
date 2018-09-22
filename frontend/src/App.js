import React, { Component } from 'react'
import './App.css'
import 'bulma/css/bulma.css'

import Login from './Login'

class App extends Component {
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
