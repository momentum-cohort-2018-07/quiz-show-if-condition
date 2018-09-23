import React, { Component } from 'react'
import './index.css'
import 'bulma/css/bulma.css'

import Login from './components/Login'
import Sidebar from './components/Sidebar'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <Sidebar />
        <main className='main'>
          <div className='board'>
            <Login />
          </div>
        </main>
      </div>
    )
  }
}

export default App
