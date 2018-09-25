import React, { Component } from 'react'
import apiCalls from '../apiCalls'

import Card from './Card'
// import Question from './Question'
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
    // console.log(quizID, 'quizId in componentDidMount in componenet')
  }
  getQuiz (quizID) {
    // console.log(quizID, 'quizID in getquiz componenet')
    apiCalls.getQuiz(quizID).then(quiz => {
      console.log(quiz, 'state of quiz comp')
      this.setState({ quiz })
    })
  }
  render () {
    if (this.state.quiz) {
      let quiz = this.state.quiz
      let quizID = this.props.id
      let questions = quiz.relationships.questions
      // console.log(questions, 'question variable in Quiz')
      console.log(quiz)
      return (
        <Card>
          <Title><div>{quiz.attributes.title}</div></Title>
          <Button className='is-primary'><NavLink to={`/quiz/${quizID}/question/${quiz.relationships.data.attributes.number}`} >Start</NavLink></Button>
        </Card>)
    } else {
      return ('')
    }
  }
}
export default Quiz
