import React, { Component } from 'react'
import { Button } from 'bloomer'
import { NavLink } from 'react-router-dom'

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
  setNewQuestion (e) {
    e.preventDefault()
    let quizID = this.props.quizId
    apiCalls.getQuiz(quizID).then(response => {
      let newQuestion = response.relationships.questions
      // console.log(newQuestion, 'new Question')
      console.log(newQuestion.links.next, 'question')
      if (!newQuestion.links.score) {
        this.setState({ question: newQuestion })
      } else {
        this.setState({ question: newQuestion })
        this.setState({ lastQuestion: true })
      }
      // console.log(this.state.showScore, 'show score')
    })
  }
  handleSubmit (e) {
    let quizID = this.props.quizId
    let questionID = this.state.question.data.attributes.number
    // console.log(this.state.question, 'questionID in Question')
    let answerID = this.state.currentAnswer
    apiCalls.submitAnswer(answerID, quizID, questionID)
  }
  showScore (e) {
    e.preventDefault()
    console.log('im here')
    let quizID = this.props.quizId
    apiCalls.getScore(quizID).then(response => {
      console.log(response, 'response in question comp')
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
          <NavLink to={`/quiz/${quizId}/question/${data.attributes.number}`} onClick={e => this.setNewQuestion(e)}>Next</NavLink>
        </div>
      )
    } else if (this.state.lastQuestion && this.state.question) {
      // console.log('Im here in the last question render')
      const { data, links } = this.state.question
      const question = data.attributes.text
      const answers = data.relationships.answers
      return (
        <div>
          <h1> Question {data.attributes.number}. {question}</h1>
          {answers.map(answer => <Answer key={answer.data.id} links={links} answer={answer} setStateInQuestion={this.setStateInQuestion} />)}
          <Button className='is-primary' value={links} onClick={e => this.handleSubmit(e)}>Submit</Button>
          <NavLink to={`/quiz/${quizId}/question/${data.attributes.number}`} onClick={e => this.showScore(e)}>Show Score</NavLink>
        </div>
      )
    } else if (this.state.score) {
      return (<div>You Scored {this.state.score}</div>)
    } else {
      return <div>no question bub</div>
    }
  }
}
export default Question
