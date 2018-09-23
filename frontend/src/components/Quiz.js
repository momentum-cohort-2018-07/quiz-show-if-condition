import React, { Component } from 'react'

class Quiz extends Component {
  render () {
    let { quiz } = this.props
    return (
      <div key={quiz.id}>{quiz.title}</div>
    )
  }
}
export default Quiz
