import React, { Component } from 'react'
import apiCalls from '../apiCalls'

import Card from './Card'
import { NavLink } from 'react-router-dom'
import { Button, Title } from 'bloomer'

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
      console.log(quiz, 'quiz')
      this.setState({ quiz })
    })
  }
  render () {
    if (this.state.quiz) {
      let quiz = this.state.quiz
      let quizID = this.props.id
      let questions = quiz.relationships.questions
      console.log(questions, 'question variable in Quiz')
      console.log(quiz)
      return (
        <Card>
          <Title><div>{quiz.attributes.title}</div></Title>
          <Button className='is-primary'><NavLink to={`/quiz/${quizID}/question/${quiz.relationships.questions.data.attributes.number}`} >Start</NavLink></Button>
        </Card>)
    } else {
      return ('')
    }
  }
}
export default Quiz
