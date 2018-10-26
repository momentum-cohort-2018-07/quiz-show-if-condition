import React, { Component } from 'react'
import 'bulma/css/bulma.css'
import PropTypes from 'prop-types'

import { Title, Button } from 'bloomer'
import { NavLink } from 'react-router-dom'
import Profile from './Profile'
class SideBar extends Component {
  constructor () {
    super()
    this.state = {
      updateProfile: false
    }
    this.updateProfile = this.updateProfile.bind(this)
  }
  updateProfile () {
    this.setState(prevState => ({ updateProfile: !prevState.updateProfile }))
  }
  onLogOut () {
    this.props.onLogOut()
  }
  render () {
    let { currentUser } = this.props
    if (currentUser) {
      return (
        <div className='sidebar'>
          <NavLink to='/'><Title className='sidebar-title is-size-2'>Quizzly Bear</Title></NavLink>
          { currentUser &&
          <div className='user-info'>
            <p>Logged in as {currentUser.username} </p>
            <Button onClick={this.updateProfile()}> Profile</Button>
            <Button className='is-warning' onClick={this.onLogout()}>Logout</Button>
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
    } else if (this.state.updateProfile) {
      return (
        <Profile updateProfile={this.updateProfile} />
      )
    } else {
      return (
        <div className='sidebar'>
          <NavLink to='/'><Title className='sidebar-title is-size-2'>Quizzly Bear</Title></NavLink>
          { currentUser &&
          <div className='user-info'>
            <p>Logged in as {currentUser.username} </p>
            <Button className='is-warning' onClick={this.onLogout}>Logout</Button>
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
