import React from 'react'
import 'bulma/css/bulma.css'
import { Title } from 'bloomer'

const Sidebar = (props) => (
  <div className='sidebar'>
    <Title>Quizzly Bear</Title>
    <div className='user-info'>
      <p>Logged in as current user</p>
    </div>
  </div>
)

export default Sidebar
