import React, { Component } from 'react'

import apiCalls from '../apiCalls'
import AddQuiz from './AddQuiz'
import AddQuestions from './AddQuestions'

class AddQuizContainer extends Component {
  constructor () {
    super()
    this.state = {
      addQuiz: true,
      addQuestions: false,
      newQuizID: null
    }
    this.toggleAddQuiz = this.toggleAddQuiz.bind(this)
    this.createQuiz = this.createQuiz.bind(this)
  }
  createQuiz (title) {
    apiCalls.createQuiz(title)
      .then(res => {
        this.setState(state =>
          ({ newQuizID: res.data.id,
            addQuestions: !state.addQuestions }))
      })
  }
  toggleAddQuiz (e) {
    e.preventDefault()
    this.setState(state => ({ addQuiz: !state.addQuiz }))
  }
  toggleAddQuestions (e) {
    e.preventDefault()
    this.setState(state => ({ addQuestions: !state.addQuestions }))
  }
  render () {
    let { addQuestions, newQuizID } = this.state
    if (addQuestions) {
      return (
        <div>
          <AddQuestions newQuizID={newQuizID} toggleAddQuestions={this.toggleAddQuestions} />
        </div>
      )
    } else {
      return (
        <div>
          <AddQuiz toggleAddQuiz={this.toggleAddQuiz} createQuiz={this.createQuiz} />
        </div>)
    }
  }
}
export default AddQuizContainer
