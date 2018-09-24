import React, { Component } from 'react'

class Active extends Component {
  render () {
    const { question } = this.props
    return (<h1>{question.text}</h1>)
  }
}
export default Active
