import React, { Component } from 'react'

import apiCalls from '../data'

class Quiz extends Component {
  getQuestions (e, quizID) {
    e.preventDefault()
    this.props.makeActive()
    this.props.makeActive(quizID)
  }
  render () {
    let { quiz } = this.props
    return (
      <div className='quiz-node' onClick={e => { this.getQuestions(e, quiz.id) }}>
        <div key={quiz.id}>{quiz.title}</div>
        <div >{quiz.questions}</div>
      </div>
    )
  }
}
export default Quiz
