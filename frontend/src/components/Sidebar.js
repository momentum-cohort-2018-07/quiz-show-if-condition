import React from 'react'
import 'bulma/css/bulma.css'
import { Title, Button } from 'bloomer'

const Sidebar = (props) => (
  <div className='sidebar'>
    <Title>Quizzly Bear</Title>
    { props.currentUser &&
    <div className='user-info'>
      <p>Logged in as {props.currentUser.username} </p>
      <p><Button onClick={props.onLogout}>Logout</Button></p>
    </div>
    }
  </div>
)

export default Sidebar
