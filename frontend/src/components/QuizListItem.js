import React, { Component } from 'react'
// import apiCalls from '../apiCalls'
import { NavLink } from 'react-router-dom'
import Quiz from './Quiz'

class QuizListItem extends Component {
  render () {
    let { quiz } = this.props
    console.log(quiz.id, 'quiz in QuisListItem comp.')
    return (
      <div className='quiz-node'>
        <NavLink to={`/quiz/${quiz.id}`}>{quiz.title}</NavLink>
        {/* <Quiz quiz={quiz.id} /> */}
      </div>
    )
  }
}
export default QuizListItem
