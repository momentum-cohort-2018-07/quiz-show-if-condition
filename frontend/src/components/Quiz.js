import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Button, Title } from 'bloomer'
import PropTypes from 'prop-types'

import apiCalls from '../apiCalls'
import Card from './Card'

class Quiz extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  componentDidMount () {
    let quizID = this.props.id
    this.getQuiz(quizID)
  }
  getQuiz (quizID) {
    apiCalls.getQuiz(quizID).then(quiz => {
      this.setState({ quiz })
    })
  }
  render () {
    if (this.state.quiz) {
      let quiz = this.state.quiz
      let quizID = this.props.id
      return (
        <Card>
          <Title><div>{quiz.attributes.title}</div></Title>
          <Button className='is-warning has-text-white'><NavLink to={`/quiz/${quizID}/question/${quiz.relationships.questions.data.attributes.number}`} >Start Quiz</NavLink></Button>
        </Card>)
    } else {
      return ('')
    }
  }
}

Quiz.propTypes = {
  quizID: PropTypes.number
}
export default Quiz
