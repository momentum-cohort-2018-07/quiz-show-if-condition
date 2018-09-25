import React, { Component } from 'react'

// import apiCalls from '../apiCalls'

class Answer extends Component {
  render () {
    if (this.props.answer) {
      const { links, answer } = this.props
      const { data } = answer
      return (
        <div>
          <div>{data.text}</div>
          <div>{links.next}</div>
        </div>
      )
    } else {
      return ''
    }
  }
}
export default Answer
