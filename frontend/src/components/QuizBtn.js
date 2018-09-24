import React, { Component } from 'react'

class QuizBtn extends Component {
  getQuestion (e, quizID) {
    e.preventDefault()
    console.log(this.props.makeActive(quizID), 'make active')
  }
  render () {
    let { quiz } = this.props
    return (
      <div className='quiz-node' onClick={e => { this.getQuestion(e, quiz.id) }}>
        <div key={quiz.id}>{quiz.title}</div>
      </div>
    )
  }
}
export default QuizBtn
