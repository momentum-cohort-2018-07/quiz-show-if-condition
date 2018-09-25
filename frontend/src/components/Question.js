import React, { Component } from 'react'

import apiCalls from '../apiCalls'

class Question extends Component {
  componentDidMount () {
    this.getQuestion(this.props.id)
  }
  getQuestion (quizID) {
    apiCalls.getQuestion(quizID).then(quiz => {
      console.log(quiz, 'quiz')
      this.setState({ quiz })
    })
  }
  render () {
    const { question } = this.props
    console.log(this.props, 'active question props')
    return (<h1>{question.text}</h1>)
  }
}
export default Question
