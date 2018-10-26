import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom'
import './index.css'
import 'bulma/css/bulma.css'

import Login from './components/Login'
import Quiz from './components/Quiz'
import Question from './components/Question'
import Register from './components/Register'
import Sidebar from './components/Sidebar'
import apiCalls from './apiCalls'
import QuizList from './components/QuizList'
import Answers from './components/Answer'
import Profile from './components/Profile'

class App extends Component {
  constructor () {
    super()
    this.state = {
      currentUser: null,
      updateProfile: false
    }
    this.setCurrentUser = this.setCurrentUser.bind(this)
    this.onLogout = this.onLogout.bind(this)
    this.updateProfile = this.updateProfile.bind(this)

    const username = window.localStorage.getItem('username')
    const token = window.localStorage.getItem('token')
    if (username && token) {
      this.state.currentUser = { username, token }
      apiCalls.setUserToken(token)
    }
  }
  setCurrentUser (user) {
    window.localStorage.setItem('username', user.username)
    window.localStorage.setItem('token', user.token)
    this.setState({ currentUser: user })
  }
  onLogout () {
    window.localStorage.removeItem('username')
    window.localStorage.removeItem('token')
    this.setState({ currentUser: false })
  }
  updateProfile () {
    this.setState(state => ({ updateProfile: !state.updateProfile }))
  }

  render () {
    const { currentUser } = this.state
    return (
      <Router>
        <div className='App'>
          <Sidebar onLogout={this.onLogout} currentUser={currentUser} updateProfile={this.updateProfile} />
          <main className='main'>
            <div className='board'>
              <Route exact path='/' render={() =>
                <Guard condition={this.state.currentUser} redirectTo='/login'>
                  <QuizList setUserToken={this.setUserToken} onLogout={this.onLogout} setCurrentUser={this.setCurrentUser} />
                </Guard>} />

              <Route exact path='/quiz/:id' render={({ match }) =>
                <Guard condition={this.state.currentUser} redirectTo='/login'>
                  <Quiz id={match.params.id} />
                </Guard>} />

              <Route exact path='/quiz/:quizId/question/:id' render={({ match }) =>
                <Guard condition={this.state.currentUser} redirectTo='/login'>
                  <Question quizId={match.params.quizId} id={match.params.id} />
                </Guard>} />

              {<Route path='/quiz/:quizid/question/:id/answers' render={({ match }) =>
                <Guard condition={this.state.currentUser} redirectTo='/login'>
                  <Answers id={match.params.id} />
                </Guard>} /> }

              <Route path='/register' render={() =>
                <Guard condition={!this.state.currentUser} redirectTo='/'>
                  <Register setCurrentUser={this.setCurrentUser} />
                </Guard>} />

              <Route path='/login' render={() =>
                <Guard condition={!this.state.currentUser} redirectTo='/'>
                  <Login setCurrentUser={this.setCurrentUser} />
                </Guard>}
              />
            </div>
            <Route path='/updateProfile' render={({ math }) =>
              <Guard condition={this.state.currentuser} redirectTo='login'>
                <Profile updateProfile={this.updateProfile} />
              </Guard>}
            />
          </main>
        </div>

      </Router>
    )
  }
}
const Guard = ({ redirectTo, condition, children }) => {
  if (condition) {
    return children
  } else {
    return <Redirect to={redirectTo} />
  }
}

export default App
