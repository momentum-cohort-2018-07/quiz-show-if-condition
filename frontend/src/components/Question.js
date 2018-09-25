import React, { Component } from 'react'
import { Button } from 'bloomer'

import apiCalls from '../apiCalls'
import Answer from './Answer'

class Question extends Component {
  constructor () {
    super()
    this.state = {
      question: undefined,
      answers: [],
      currentAnswer: null
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.setStateInQuestion = this.setStateInQuestion.bind(this)
  }
  setStateInQuestion (value) {
    this.setState({ currentAnswer: value })
  }
  componentDidMount () {
    let quizID = this.props.quizId
    let questionID = this.props.id
    this.getQuestion(quizID, questionID)
    this.getAnswers(quizID, questionID)
  }
  getQuestion (quizID, questionID) {
    apiCalls.getQuestion(quizID, questionID).then(question => {
      this.setState({ question })
    })
  }
  getAnswers (quizID, questionID) {
    apiCalls.getAnswers(quizID, questionID).then(answers => {
      this.setState({ answers })
    })
  }
  handleSubmit (e) {
    let quizID = this.props.quizId
    let questionID = this.props.id
    let answerID = this.state.currentAnswer
    let nextQuestion = this.state.question.links.next
    apiCalls.submitAnswer(answerID, quizID, questionID)
    apiCalls.getNextQuestion(nextQuestion).then(apiCalls.getQuiz(quizID))
    // console.log(this.state.question.links.next, 'this.state.questions.links.data.next')
  }
  render () {
    if (this.state.question && this.state.question.data.attributes.text) {
      console.log(this.state.question, 'state of question component')
      const { data, links } = this.state.question
      const question = data.attributes.text
      const answers = data.relationships.answers
      return (
        <div>
          <h1>Question 1 {question}</h1>
          {answers.map(answer => <Answer key={answer.data.id} links={links} answer={answer} setStateInQuestion={this.setStateInQuestion} />)}
          <Button className='is-primary' value={links} onClick={e => this.handleSubmit(e)}>Submit</Button>
        </div>
      )
    } else {
      return <div>no question bub</div>
    }
  }
}
export default Question
