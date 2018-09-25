import React, { Component } from 'react'
import apiCalls from '../apiCalls'
import { NavLink } from 'react-router-dom'

class QuizListItem extends Component {
  render () {
    let { quiz } = this.props
    console.log(this.props, 'props quiz=')
    return (
      <div className='quiz-node'>
        <NavLink to={`/quiz/${quiz.id}`}>{quiz.title}</NavLink>
      </div>
    )
  }
}
export default QuizListItem
