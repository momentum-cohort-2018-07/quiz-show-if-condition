import React, { Component } from 'react'
import { Radio } from 'bloomer'
import Markdown from 'react-markdown'
import PropTypes from 'prop-types'

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
        <div className='columns'>
          <Radio className='column selection' name={'question'} value={this.props.answer.data.id} onChange={(e) => { this.setStateinQuestion(e) }} /><Markdown className='column' source={data.text} />
        </div>
      )
    } else {
      return ''
    }
  }
}

Answer.propTypes = {
  answer: PropTypes.shape({
    data: PropTypes.shape({
      id: PropTypes.number,
      text: PropTypes.string
    })
  }),
  setStateInQuestion: PropTypes.func.isRequired
}
export default Answer
