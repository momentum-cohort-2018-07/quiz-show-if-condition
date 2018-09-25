import React, { Component } from 'react'

import apiCalls from '../apiCalls'
import Answer from './Answer'

class Question extends Component {
  constructor () {
    super()
    this.state = {
      question: undefined,
      answers: []
    }
  }
  componentDidMount () {
    let quizID = this.props.quizId
    let questionID = this.props.id

    console.log(quizID, 'in question component')
    console.log(questionID, 'questionID in question component')
    this.getQuestion(quizID, questionID)
    this.getAnswers(quizID, questionID)
  }
  getQuestion (quizID, questionID) {
    console.log(quizID, 'quizID in Question Comp.')
    apiCalls.getQuestion(quizID, questionID).then(question => {
      this.setState({ question })
    })
  }
  getAnswers (quizID, questionID) {
    apiCalls.getAnswers(quizID, questionID).then(answers => {
      this.setState({ answers })
    })
  }

  render () {
    if (this.state.question && this.state.question.data.attributes.text) {
      console.log(this.state.question, 'state of question component')
      const { data, links } = this.state.question
      const question = data.attributes.text
      const answers = data.relationships.answers
      return (
        <div>
          <h1>Question 1 {question}</h1>
          {answers.map(answer => <Answer key={answer.data.id} links={links} answer={answer} />)}
        </div>
      )
    } else {
      return <div>no question bub</div>
    }
  }
}
export default Question
