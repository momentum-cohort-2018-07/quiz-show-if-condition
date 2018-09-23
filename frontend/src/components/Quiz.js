import React, { Component } from 'react'

class Quiz extends Component {
  render () {
    let { quiz } = this.props
    return (
      <div className='quiz-node'>
        <div key={quiz.id}>{quiz.title}</div>
      </div>
    )
  }
}
export default Quiz
