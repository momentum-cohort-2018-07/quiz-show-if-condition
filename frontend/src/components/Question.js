import React, { Component } from 'react'

class Question extends Component {
  render () {
    const { question } = this.props
    console.log(this.props.question, 'active question props')
    return (<h1>{question.text}</h1>)
  }
}
export default Question
