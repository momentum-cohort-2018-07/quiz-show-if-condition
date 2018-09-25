import React, { Component } from 'react'

import apiCalls from '../apiCalls'
import Answer from './Answer'

class Question extends Component {
  constructor () {
    super()
    this.state = {
      question: undefined
    }
  }
  componentDidMount () {
    this.getQuestion(this.props.id)
  }
  getQuestion (quizID) {
    apiCalls.getQuestion(quizID).then(question => {
      this.setState({ question })
    })
  }
  render () {
    if (this.state.question && this.state.question.data.attributes.text) {
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
      return ''
    }
  }
}
export default Question
