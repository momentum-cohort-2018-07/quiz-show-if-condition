import React, { Component } from 'react'
import { Button, Title } from 'bloomer'
import { NavLink } from 'react-router-dom'
import Card from './Card'

import apiCalls from '../apiCalls'
import Answer from './Answer'

class Question extends Component {
  constructor () {
    super()
    this.state = {
      question: undefined,
      answers: [],
      currentAnswer: null,
      lastQuestion: false,
      score: null
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.setNewQuestion = this.setNewQuestion.bind(this)
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
  setNewQuestion () {
    let quizID = this.props.quizId
    apiCalls.getQuiz(quizID).then(response => {
      let newQuestion = response.relationships.questions
      if (!newQuestion.links.score) {
        this.setState({ question: newQuestion })
      } else {
        this.setState({ question: newQuestion })
        this.setState({ lastQuestion: true })
      }
    })
  }
  handleSubmit () {
    let quizID = this.props.quizId
    let questionID = this.state.question.data.attributes.number
    let answerID = this.state.currentAnswer
    if (!this.state.lastQuestion) {
      apiCalls.submitAnswer(answerID, quizID, questionID)
        .then(res => {
          this.setNewQuestion()
        })
    } else if (this.state.lastQuestion) {
      apiCalls.submitAnswer(answerID, quizID, questionID)
        .then(res => {
          this.showScore()
        })
    }
  }
  showScore () {
    let quizID = this.props.quizId
    apiCalls.getScore(quizID).then(response => {
      this.setState({ score: response })
      this.setState({ question: undefined })
      this.setState({ lastQuestion: undefined })
    })
  }
  render () {
    const { quizId } = this.props
    if (this.state.question && this.state.question.data.attributes.text && !this.state.lastQuestion) {
      const { data, links } = this.state.question
      const question = data.attributes.text
      const answers = data.relationships.answers
      return (
        <div>
          <h1> Question {data.attributes.number}. {question}</h1>
          {answers.map(answer => <Answer key={answer.data.id} links={links} answer={answer} setStateInQuestion={this.setStateInQuestion} />)}
          <Button className='is-primary' value={links} onClick={e => this.handleSubmit(e)}>Submit</Button>
          {/* <NavLink to={`/quiz/${quizId}/question/${data.attributes.number}`} onClick={e => this.setNewQuestion(e)}>Next</NavLink> */}
        </div>
      )
    } else if (this.state.lastQuestion && this.state.question) {
      const { data, links } = this.state.question
      const question = data.attributes.text
      const answers = data.relationships.answers
      return (
        <div>
          <h1> Question {data.attributes.number}. {question}</h1>
          {answers.map(answer => <Answer key={answer.data.id} links={links} answer={answer} setStateInQuestion={this.setStateInQuestion} />)}
          <Button className='is-primary' value={links} onClick={e => this.handleSubmit(e)}>Submit</Button>
          {/* <NavLink to={`/quiz/${quizId}/question/${data.attributes.number}`} onClick={e => this.showScore(e)}>Show Score</NavLink> */}
        </div>
      )
    } else if (this.state.score) {
      return (<div>You Scored {this.state.score.number_correct}/{this.state.score.number_asked}</div>)
    } else {
      return ('')
    }
  }
}
export default Question
