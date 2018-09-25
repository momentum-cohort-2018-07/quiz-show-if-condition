import React, { Component } from 'react'
import apiCalls from '../apiCalls'
// import Question from './Question'
import { NavLink } from 'react-router-dom'

class Quiz extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  componentDidMount () {
    this.getQuiz(this.props.id)
  }
  getQuiz (quizID) {
    apiCalls.getQuiz(quizID).then(quiz => {
      console.log(quiz, 'quiz')
      this.setState({ quiz })
    })
  }
  render () {
    console.log(this.state, 'this.state')
    if (this.state.quiz) {
      let quiz = this.state.quiz
      let questions = quiz.relationships.questions
      return (<div>
        <div>{quiz.attributes.title}</div>
        <NavLink to={`/question/${questions[0].data.id}`}>Start</NavLink>
      </div>)
    } else {
      return ('')
    }
  }
}
export default Quiz
