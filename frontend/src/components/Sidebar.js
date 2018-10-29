import React, { Component } from 'react'
import 'bulma/css/bulma.css'
import PropTypes from 'prop-types'

import { Title, Button } from 'bloomer'
import { NavLink } from 'react-router-dom'

class SideBar extends Component {
  constructor () {
    super()
    this.state = {
      updateProfile: false
    }
    this.onLogOut = this.onLogOut.bind(this)
  }
  onLogOut (e) {
    e.preventDefault()
    this.props.onLogout()
  }
  updateProfile () {
    this.setState(state => ({ updateProfile: true }))
    this.props.updateProfile()
  }
  render () {
    let { currentUser } = this.props
    let { updateProfile } = this.state
    if (currentUser) {
      return (
        <div className='sidebar'>
          <NavLink to='/'><Title className='sidebar-title is-size-2'>Quizzly Bear</Title></NavLink>
          { currentUser &&
          <div className='user-info'>
            <p>Logged in as {currentUser.username} </p>
            <NavLink to={`/updateProfile`}>
              <Button onClick={(e) => { this.updateProfile() }}>Profile</Button>
            </NavLink>
            <Button className='is-warning' onClick={(e) => { this.onLogOut(e) }}>Logout</Button>
          </div>
          }
          <div className='attribution'>
            <div>
      Created by Team If-Condition @ Momentum Learn
            </div>
            <div>
        (Jeanette O'Brien, Steve Patterson, Alex Corey and Chris Hagmann)
            </div>
            <div>
              <a href='https://github.com/momentum-cohort-2018-07/quiz-show-if-condition'>See the code at Github.</a>
            </div>
          </div>
        </div>
      )
    } else if (updateProfile && currentUser) {
      console.log('here')
      return (<div className='sidebar'>
        <NavLink to='/'><Title className='sidebar-title is-size-2'>Quizzly Bear</Title></NavLink>
        { currentUser &&
          <div className='user-info'>
            <p>Logged in as {currentUser.username} </p>
            <NavLink to={`/`}>
              <Button onClick={(e) => { this.updateProfile() }}>Quizzes</Button>
            </NavLink>
            <Button className='is-warning' onClick={(e) => { this.onLogOut(e) }}>Logout</Button>
          </div>
        }
        <div className='attribution'>
          <div>
      Created by Team If-Condition @ Momentum Learn
          </div>
          <div>
      (Jeanette O'Brien, Steve Patterson, Alex Corey and Chris Hagmann)
          </div>
          <div>
            <a href='https://github.com/momentum-cohort-2018-07/quiz-show-if-condition'>See the code at Github.</a>
          </div>
        </div>
      </div>)
    } else {
      return (
        <div className='sidebar'>
          <NavLink to='/'><Title className='sidebar-title is-size-2'>Quizzly Bear</Title></NavLink>
          { currentUser &&
          <div className='user-info'>
            <p>Logged in as {currentUser.username} </p>
            <Button className='is-warning' onClick={this.onLogOut()}>Logout</Button>
          </div>
          }
          <div className='attribution'>
            <div>
      Created by Team If-Condition @ Momentum Learn
            </div>
            <div>
        (Jeanette O'Brien, Steve Patterson, Alex Corey and Chris Hagmann)
            </div>
            <div>
              <a href='https://github.com/momentum-cohort-2018-07/quiz-show-if-condition'>See the code at Github.</a>
            </div>
          </div>
        </div>
      )
    }
  }
}
export default SideBar

SideBar.propTypes = {
  currentUser: PropTypes.shape({
    username: PropTypes.string
  }),
  onLogout: PropTypes.func.isRequired
}
