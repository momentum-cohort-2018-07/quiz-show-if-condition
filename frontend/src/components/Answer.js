import React, { Component } from 'react'
import { Radio, Control } from 'bloomer'

// import apiCalls from '../apiCalls'

class Answer extends Component {
  setStateinQuestion (e) {
    const value = e.target.value
    this.props.setStateInQuestion(value)
  }
  render () {
    if (this.props.answer) {
      const { answer } = this.props
      const { data } = answer
      return (
        <div>
          <div>
            <Control>
              <Radio name={'question'} value={this.props.answer.data.id} onChange={(e) => { this.setStateinQuestion(e) }}>{data.text}</Radio>
            </Control>
          </div>
          {/* <div className='is-primary' value={links.next} /> */}
        </div>
      )
    } else {
      return ''
    }
  }
}
export default Answer
