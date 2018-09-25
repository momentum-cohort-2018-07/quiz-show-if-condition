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
    let quizID = this.props.id
    this.getQuiz(quizID)
    // console.log(quizID, 'quizId in componentDidMount in componenet')
  }
  getQuiz (quizID) {
    // console.log(quizID, 'quizID in getquiz componenet')
    apiCalls.getQuiz(quizID).then(quiz => {
      this.setState({ quiz })
    })
  }
  render () {
    if (this.state.quiz) {
      let quiz = this.state.quiz
      let quizID = this.props.id
      let questions = quiz.relationships.questions
      // console.log(questions, 'question variable in Quiz')
      return (<div>
        <div>{quiz.attributes.title}</div>
        <NavLink to={`/quiz/${quizID}/question/${questions[0].data.id}`} >Start</NavLink>
      </div>)
    } else {
      return ('')
    }
  }
}
export default Quiz
