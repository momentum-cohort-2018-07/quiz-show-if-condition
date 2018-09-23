import React, { Component } from 'react'

class Active extends Component {
  render () {
    const { question } = this.props
    console.log(question, 'question here')
    return (<div>{question.text}</div>)
  }
}
export default Active
