import React from 'react'

import { NavLink } from 'react-router-dom'

const QuizListItem = (props) => (
  //  { quiz } = this.props
  <div className='quiz-node'>
    <NavLink to={`/quiz/${props.quiz.id}`}>{props.quiz.title}</NavLink>
  </div>
)
export default QuizListItem
