import React from 'react'
import 'bulma/css/bulma.css'
import { Title, Button } from 'bloomer'
import { NavLink } from 'react-router-dom'

const Sidebar = (props) => (
  <div className='sidebar'>
    <NavLink to='/'><Title className='sidebar-title is-size-2'>Quizzly Bear</Title></NavLink>
    { props.currentUser &&
    <div className='user-info'>
      <p>Logged in as {props.currentUser.username} </p>
      <p><Button className='is-warning' onClick={props.onLogout}>Logout</Button></p>
    </div>
    }
    <div className='attribution'>
      <p>
      Created by If-Condition
        <p>
        (Jeanette O'Brien, Steve Patterson, Alex Corey and Chris Hackman)
        </p>
      </p>
      <p>
        <a href='https://github.com/momentum-cohort-2018-07/quiz-show-if-condition'>See the code at Github.</a>
      </p>
    </div>
  </div>
)

export default Sidebar
