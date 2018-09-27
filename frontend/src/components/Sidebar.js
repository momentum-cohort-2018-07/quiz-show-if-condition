import React from 'react'
import 'bulma/css/bulma.css'
import PropTypes from 'prop-types'

import { Title, Button } from 'bloomer'
import { NavLink } from 'react-router-dom'

const Sidebar = (props) => (
  <div className='sidebar'>
    <NavLink to='/'><Title className='sidebar-title is-size-2'>Quizzly Bear</Title></NavLink>
    { props.currentUser &&
    <div className='user-info'>
      <p>Logged in as {props.currentUser.username} </p>
      <Button className='is-warning' onClick={props.onLogout}>Logout</Button>
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

Sidebar.propTypes = {
  currentUser: PropTypes.shape({
    username: PropTypes.string
  }),
  onLogout: PropTypes.func.isRequired
}

export default Sidebar
