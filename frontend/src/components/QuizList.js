import React, { Component } from 'react'
import apiCalls from '../apiCalls'
import Question from './Question'

class QuizList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      questions: [],
      activeQuestion: this.props
    }
    this.makeActive = this.makeActive.bind(this)
  }

  // getQuestion (e, quizID) {
  //   e.preventDefault()
  //   console.log(this.props.makeActive(quizID), 'make active')
  // }
  makeActive (e, quizID) {
    e.preventDefault()
    this.props.makeActive()
    apiCalls.getQuestions(quizID).then(questions => {
      this.setState({ questions })
    })
  }
  render () {
    let { quiz } = this.props
    console.log(this.state.activeQuestion, 'state active question')
    if (this.props.activeQuestion) {
      return (<div>
        {this.state.questions.map((question) => <Question key={question.data.id} question={question.data} />)}
      </div>)
    } else {
      return (
        <div className='quiz-node' onClick={e => { this.makeActive(e, quiz.id) }}>
          <div key={quiz.id}>{quiz.title}</div>
          <div>Quiz </div>
        </div>
      )
    }
  }
}
export default QuizList
