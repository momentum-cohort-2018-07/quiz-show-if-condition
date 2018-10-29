import React, { Component } from 'react'
import { Label, Input } from 'bloomer'

class AddQuestions extends Component {
  constructor () {
    super()
    this.state = {
      questions: [
        { question1: ''
        }
      ]

    }
  }
  render () {
    return (
      <div>
        <Label> Question
          <Input onChange/>
        </Label>
      </div>
    )
  }
}
export default AddQuestions
