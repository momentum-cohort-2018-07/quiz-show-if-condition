import React from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'

const QuizListItem = (props) => (
  <div className='quiz-node'>
    <NavLink to={`/quiz/${props.quiz.id}`}>{props.quiz.title}</NavLink>
  </div>
)

QuizListItem.propTypes = {
  quiz: PropTypes.shape({
    id: PropTypes.number
  })
}
export default QuizListItem
